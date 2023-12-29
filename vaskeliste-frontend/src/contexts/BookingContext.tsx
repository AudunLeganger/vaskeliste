import React, { useState, useContext } from "react";
import Booking, { SelectedBooking } from "../interfaces/Booking";

interface BookingContextValue {
    selectedBookings: SelectedBooking[];
    setSelectedBookings: React.Dispatch<
        React.SetStateAction<SelectedBooking[]>
    >;
    existingBookings: Booking[];
    setExistingBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    personName: string;
    setPersonName: React.Dispatch<React.SetStateAction<string>>;
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    bookingMode: boolean;
    setBookingMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BookingProviderProps {
    children: React.ReactNode;
}

export function useBookingContext() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error(
            "useBookingContext must be used within a BookingProvider"
        );
    }
    return context;
}

export const BookingContext = React.createContext<BookingContextValue | null>(
    null
);

export const BookingProvider: React.FC<BookingProviderProps> = ({
    children,
}: BookingProviderProps) => {
    const [selectedBookings, setSelectedBookings] = useState<SelectedBooking[]>(
        []
    );
    const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
    const [personName, setPersonName] = useState<string>("Ola Nordmann");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [bookingMode, setBookingMode] = useState<boolean>(true);

    return (
        <BookingContext.Provider
            value={{
                selectedBookings,
                setSelectedBookings,
                existingBookings,
                setExistingBookings,
                personName,
                setPersonName,
                selectedDate,
                setSelectedDate,
                bookingMode,
                setBookingMode,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
