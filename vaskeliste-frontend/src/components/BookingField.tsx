import { useEffect, useState } from "react";
import Booking from "../interfaces/Booking.tsx";

interface BookingFieldProps {
    time: string;
    machineNumber: number;
    selectedBookings: Booking[];
    setSelectedBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

function BookingField({
    time,
    machineNumber,
    selectedBookings,
    setSelectedBookings,
}: BookingFieldProps) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        const booking: Booking = { time, machineNumber };
        let updatedSelectedBookings: Booking[];

        // Check if booking is already selected
        if (!selected) {
            // Add booking to selectedBookings array
            updatedSelectedBookings = [...selectedBookings, booking];
        } else {
            // Remove booking from selectedBookings array
            updatedSelectedBookings = selectedBookings.filter(
                (selectedBooking) =>
                    selectedBooking.time !== booking.time ||
                    selectedBooking.machineNumber !== booking.machineNumber
            );
        }
        setSelectedBookings(() => updatedSelectedBookings);
        setSelected(!selected);
    };

    const style = {
        backgroundColor: selected ? "green" : "white",
        border: "2px solid black",
        padding: "10px",
    };

    return (
        <td
            className={selected ? "selected" : ""}
            onClick={handleClick}
            style={style}
        ></td>
    );
}

export default BookingField;
