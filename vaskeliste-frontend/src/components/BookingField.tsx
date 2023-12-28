import { useState } from "react";
import SelectedBooking from "../interfaces/SelectedBooking.tsx";
import ExistingBooking from "../interfaces/ExistingBooking.tsx";

interface BookingFieldProps {
    timeSlot: string;
    machineNumber: number;
    selectedBookings: SelectedBooking[];
    setSelectedBookings: React.Dispatch<
        React.SetStateAction<SelectedBooking[]>
    >;
    bookingMode: boolean;
    setBookingMode: React.Dispatch<React.SetStateAction<boolean>>;
    existingBookings: ExistingBooking[];
    inputPersonName: string;
}

function BookingField({
    timeSlot, // the current time slot
    machineNumber, // the current machine number
    selectedBookings, // the list of currently selected bookings
    setSelectedBookings, // the function to update the list of currently selected bookings
    existingBookings, // the list of existing bookings
    inputPersonName, // the name of the person who is booking
    bookingMode,
    setBookingMode,
}: BookingFieldProps) {
    const [selected, setSelected] = useState(false); // whether the current booking is selected
    const [selectedUnbooking, setSelectedUnbooking] = useState(false); // whether the current field is selected for unbooking

    // If it exists, get an existing booking for the current time slot and machine number
    const existingBooking = existingBookings.find(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber
    );

    // If the current user has booked this slot, this point to this booking
    const ownBooking = existingBookings.find(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber &&
            booking.personName === inputPersonName
    );

    const handleClick = () => {
        console.log(selectedBookings);
        console.log(selectedUnbooking);
        if (existingBooking && !ownBooking) {
            // Case: The field is booked by another user
            // Expected behavior: Do nothing
            return;
        }

        // Create booking object
        const booking: SelectedBooking = { timeSlot, machineNumber };

        // If there are no existing bookings selected
        if (selectedBookings.length === 0) {
            // If the field is empty, the user is in the process of booking
            if (!existingBooking) {
                setSelectedUnbooking(false);
                setBookingMode(true);
            }
            // If the field is booked by the current user, the user is in the process of unbooking
            else if (ownBooking) {
                console.log("Unbooking: field is EMPTY, user is unbooking");
                setSelectedUnbooking(true);
                setBookingMode(false);
            }
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
            return;
        }

        // If the field is already selected, deselect it
        if (
            selectedBookings.some(
                (booking) =>
                    booking.timeSlot === timeSlot &&
                    booking.machineNumber === machineNumber
            )
        ) {
            setSelectedUnbooking(false);
            setSelected(false);
            setSelectedBookings((prev) =>
                prev.filter(
                    (b) =>
                        b.timeSlot !== booking.timeSlot ||
                        b.machineNumber !== booking.machineNumber
                )
            );
            // If there are no selected bookings left, bookingMode is set to true
            if (selectedBookings.length === 0) {
                setBookingMode(true);
            }
            return;
        }

        // If the field is empty but the user is in the process of unbooking, or the field is booked by the current user but the user is in the process of booking
        if ((!existingBooking && !bookingMode) || (ownBooking && bookingMode)) {
            return;
        }

        // If the field is empty and the user is in the process of booking, or the field is booked by the current user and the user is in the process of unbooking
        if ((!existingBooking && bookingMode) || (ownBooking && !bookingMode)) {
            if (ownBooking && !bookingMode) {
                setSelectedUnbooking(true);
            } else {
                setSelectedUnbooking(false);
            }
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
        }

        /*
        // If the field is empty and there are no existing bookings selected
        if (!existingBooking && selectedBookings.length === 0) {
            // Case: The field is empty and there are no existing bookings selected
            // Expected behavior: Select the field for booking
            setIsBooking(true);
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
            return;
        }

        // If the field is booked by the current user and no empty fields are selected for booking
        if (ownBooking && selectedBookings.length === 0) {
            // Case: The field is booked by the current user and no empty fields are selected for booking
            // Expected behavior: Select the field for UNbooking
            setIsBooking(false);
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
            return;
        }

        // If the field is already selected for unbooking, deselect it
        if (ownBooking && selected) {
            setSelected(false);
            setSelectedBookings((prev) =>
                prev.filter(
                    (b) =>
                        b.timeSlot !== booking.timeSlot ||
                        b.machineNumber !== booking.machineNumber
                )
            );
            return;
        }

        // If the field is empty but the user is in the process of unbooking, or
        // the field is booked by the current user but the user is in the process of booking
        if ((!existingBooking && !isBooking) || (ownBooking && isBooking)) {
            return;
        }

        // If the field is empty and the user is in the process of booking, or
        // the field is booked by the current user and the user is in the process of unbooking
        if ((!existingBooking && isBooking) || (ownBooking && !isBooking)) {
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
        }
        //END */

        // OLD CODE
        /* 
        let updatedSelectedBookings: SelectedBooking[];

        // Check if booking is already selected
        if (!selected) {
            // Add booking to selectedBookings array
            updatedSelectedBookings = [...selectedBookings, booking];
        } else {
            // Remove booking from selectedBookings array
            updatedSelectedBookings = selectedBookings.filter(
                (selectedBooking) =>
                    selectedBooking.timeSlot !== booking.timeSlot ||
                    selectedBooking.machineNumber !== booking.machineNumber
            );
        }

        // Update selectedBookings
        setSelectedBookings(() => updatedSelectedBookings);
        setSelected(!selected);
        */
    };

    const style = {
        color: "black",
        backgroundColor: selectedUnbooking
            ? "red"
            : existingBooking
            ? "white"
            : selected
            ? "green"
            : "white",
        width: "10em",
        height: "2em",
        overflow: "hidden",
        border: "2px solid black",
    };

    return (
        <td
            className={selected ? "selected" : ""}
            onClick={handleClick}
            style={style}
        >
            {existingBooking ? existingBooking.personName : ""}
        </td>
    );
}

export default BookingField;
