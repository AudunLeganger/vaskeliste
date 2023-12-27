import React from "react";
import SelectedBooking from "../interfaces/SelectedBooking";

interface NameInputProps {
    personName: string;
    setPersonName: (name: string) => void;
    selectedBookings: SelectedBooking[];
}

function NameInput({
    personName,
    setPersonName,
    selectedBookings,
}: NameInputProps) {
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
