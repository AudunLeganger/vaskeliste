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
    timeSlot,
    machineNumber,
    selectedBookings,
    setSelectedBookings,
    existingBookings,
}: BookingFieldProps) {
    const [selected, setSelected] = useState(false);

    const existingBooking = existingBookings.find(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber
    );

    const handleClick = () => {
        // Check if booking is already booked
        if (existingBooking) return;

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
