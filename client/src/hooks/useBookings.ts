import { useState, useCallback } from "react";
import Booking from "../interfaces/Booking";
import { useBookingContext } from "../contexts/BookingContext";


function useBookings() {
    const [status, setStatus] = useState<string>("idle");
    const { personName, existingBookings, setExistingBookings, setSelectedBookings } = useBookingContext();
    
    const filterConflictingBookings = (recievedBookings: Booking[], existingBookings: Booking[]) => {
        return recievedBookings.filter((newBooking: { timeSlot: string; machineNumber: number; dateString: string; }) => {
            return existingBookings.some(existingBooking => {
                return existingBooking.timeSlot === newBooking.timeSlot && existingBooking.machineNumber === newBooking.machineNumber && existingBooking.dateString === newBooking.dateString;
            });
        });
    }

    // Codes:
    // 200: Bookings were successfully fetched
    async function fetchBookings() {
        setStatus("loading");
        const url = "http://localhost:3000/bookings";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            const fetchedBookings = await response.json();

            setExistingBookings(fetchedBookings);
            setStatus("success");
        }
        catch(e) {
            console.log("Error fetching bookings");
            setStatus("error");
        }
    }

    // Codes:
    // 200: All bookings were successfully added to server
    // 201: Some bookings were conflicting
    // 409: All bookings were conflicting
    // Response: Array of bookings that were added (and not conflicting)
    async function postBookings(bookings: Booking[]) {
        // Check if there are any bookings to update
        if (bookings.length === 0) {
            return;
        }
        setStatus("loading");
        const url = 'http://localhost:3000/bookings';
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookings })               
            });
            console.log(response)

            if (response.status === 200) {
                // No bookings were conflicting
                console.log("Success! No bookings were conflicting");
            } else if 
                (response.status === 201) {
                // Some bookings were conflicting
                console.log("Some bookings were conflicting: ");
            } else if (response.status === 409) {
                // All bookings were conflicting
                console.log("All bookings were conflicting");
            }
            const responseBody = await response.json();
            const responseBookings: Booking[] = responseBody.bookings;
            console.log("responseBookings", responseBookings);
            responseBookings.length !== 0 ? setExistingBookings(() => [...existingBookings, ...responseBookings]) : null; 
            
            // TODO: Call fetchBookings instead of setting existingBookings
            setSelectedBookings(() => []);
            setStatus("success");
        } catch(e) {
            console.log("Error updating bookings")
            console.log(e);
            setStatus("error");
        }
    }
    
    // Codes:
    // 200: All bookings were successfully deleted
    // 201: Some bookings were deleted
    // 404: None of the bookings were deleted
    async function deleteBookings(bookings: Booking[]) {
        setStatus("loading");
        const url = 'http://localhost:3000/bookings';

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ clientPersonName: personName, bookings})
                }
            );
            if (response.status === 200) {
                // All bookings were successfully deleted
                console.log("Success! All bookings were deleted");
            } else if (response.status === 404) {
                // None of the bookings client name matched 
                console.log("Error! None of the bookings client name matched");
            } else {
                console.log("Only some bookings were deleted. Delete bookings: ", await response.json());
            }
            // Get the bookings that were not deleted
            const responseBody = await response.json();
            const deletedBookings: Booking[] = responseBody.bookings;
            // Filter out the bookings that remain
            const updatedBookings = existingBookings.filter(booking => {
                return !deletedBookings.some(deletedBooking => {
                    return deletedBooking.timeSlot === booking.timeSlot && deletedBooking.machineNumber === booking.machineNumber && deletedBooking.dateString === booking.dateString;
                });
            });
            setExistingBookings(() => updatedBookings);
            setStatus("success");
        }
        catch (e) {
            console.log("Error deleting bookings");
            setStatus("error");
        }
    }
    return { fetchBookings, postBookings, deleteBookings, status};
}

export default useBookings;