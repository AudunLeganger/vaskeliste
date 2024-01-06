import { useState } from "react";
import Booking, { SelectedBooking } from "../interfaces/Booking";
import { useBookingContext } from "../contexts/BookingContext";
import { deleteBookings, fetchBookings, postBookings } from "../api";
import { useSocket } from "./useSocket";

// Helper function to merge existing bookings with new bookings. Returns a new array with the merged bookings.
function mergeBookings(
    existingBookings: Booking[],
    newBookings: Booking[]
): Booking[] {
    return [
        ...existingBookings.filter(
            (existingBooking) =>
                !newBookings.some(
                    (newBooking) =>
                        newBooking.timeSlot === existingBooking.timeSlot &&
                        newBooking.machineNumber ===
                            existingBooking.machineNumber &&
                        newBooking.dateString === existingBooking.dateString
                )
        ),
        ...newBookings,
    ];
}

// Helper function to remove deleted bookings from existing bookings. Returns a new array with the deleted bookings removed.
function removeDeletedBookings(
    existingBookings: Booking[],
    bookingsToDelete: Booking[]
): Booking[] {
    return existingBookings.filter(
        (booking) =>
            !bookingsToDelete.some(
                (bookingToDelete) =>
                    bookingToDelete.timeSlot === booking.timeSlot &&
                    bookingToDelete.machineNumber === booking.machineNumber &&
                    bookingToDelete.dateString === booking.dateString
            )
    );
}

function useBookings() {
    const [status, setStatus] = useState<string>("idle");
    const {
        personName,
        selectedDate,
        selectedBookings,
        existingBookings,
        setExistingBookings,
        setSelectedBookings,
        setBookingMode,
    } = useBookingContext();

    const selectedDateString = selectedDate.toISOString().split("T")[0];
    useSocket(
        (newBookings) => {
            const mergedBookings = mergeBookings(existingBookings, newBookings);
            setExistingBookings(mergedBookings);
        },
        (removedBookings) => {
            const filteredBookings = removeDeletedBookings(
                existingBookings,
                removedBookings
            );
            setExistingBookings(filteredBookings);
        }
    );

    async function loadBookings(): Promise<void> {
        setStatus("loading");
        try {
            console.log("trying to LOAD bookings");

            const bookings = await fetchBookings();
            console.log("loadBookings:", bookings);
            setExistingBookings(() => bookings);
            setStatus("success");
            console.log("successfully LOADED bookings");
        } catch (error) {
            console.error("Error fetching bookings", error);
            setStatus("error");
        }
    }

    async function addBookings(): Promise<void> {
        console.log("Recieved call to add bookings");
        setStatus("loading");
        try {
            const bookingsToPost: Booking[] = selectedBookings.map(
                (booking: SelectedBooking) => ({
                    ...booking,
                    personName,
                    dateString: selectedDateString,
                })
            );
            const postedBookings = await postBookings(bookingsToPost);
            console.log("Posted bookings: ", postedBookings);
            setExistingBookings(() => [...existingBookings, ...postedBookings]);
            setStatus("success");
        } catch (error) {
            console.error("Error fetching bookings", error);
            if (error instanceof Error) {
                if (error.message === "409" || error.message === "201") {
                    setStatus("conflict");
                } else {
                    setStatus("error");
                }
            }
            loadBookings();
        }
        clearSelectedBookings();
    }

    async function deleteSelectedBookings(): Promise<void> {
        setStatus("loading");
        try {
            const bookingsToDelete: Booking[] = selectedBookings.map(
                (booking: SelectedBooking) => ({
                    ...booking,
                    personName,
                    dateString: selectedDateString,
                })
            );
            const deletedBookings = await deleteBookings(
                personName,
                bookingsToDelete
            );
            setExistingBookings(() =>
                removeDeletedBookings(existingBookings, deletedBookings)
            );
            setStatus("success");
        } catch (error) {
            console.error("Error fetching bookings", error);
            setStatus("error");
        }
        clearSelectedBookings();
    }

    function clearSelectedBookings(): void {
        setSelectedBookings(() => []);
        setBookingMode(true);
    }

    return {
        loadBookings,
        addBookings,
        deleteSelectedBookings,
        clearSelectedBookings,
        status,
    };
}

export default useBookings;
