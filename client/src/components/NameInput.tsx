import React from "react";
import { useBookingContext } from "../contexts/BookingContext";

function NameInput() {
    const { personName, setPersonName, selectedBookings } = useBookingContext();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPersonName(event.target.value);
    };
    return (
        <div>
            <label htmlFor="name">Navn: </label>
            <input
                id="name"
                type="text"
                value={personName}
                onChange={handleChange}
                disabled={selectedBookings.length !== 0}
            />
        </div>
    );
}

export default NameInput;
