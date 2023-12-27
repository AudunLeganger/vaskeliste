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
    existingBookings: ExistingBooking[];
}

function BookingField({
    timeSlot, // the current time slot
    machineNumber, // the current machine number
    selectedBookings, // the list of currently selected bookings
    setSelectedBookings, // the function to update the list of currently selected bookings
    existingBookings, // the list of existing bookings
}: BookingFieldProps) {
    const [selected, setSelected] = useState(false);
    const existingBooking = existingBookings.find(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber
    );

    const handleClick = () => {
        // Check if booking is already booked
        if (existingBooking) {
            // Check if the person who booked is the same as the person who is trying to book
            // If so: Highlight the current booking in red
            // If not: Return
        }

        // if so: highlight the current booking in red

        // Create booking object
        const booking: SelectedBooking = { timeSlot, machineNumber };
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
    };

    const style = {
        color: "black",
        backgroundColor: existingBooking
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
