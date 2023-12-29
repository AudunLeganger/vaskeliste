import { memo, useCallback, useEffect } from "react";
import { useBookingContext } from "../contexts/BookingContext";
import useBookings from "../hooks/useBookings";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Datefield() {
    const { selectedDateString, setSelectedDateString, setSelectedBookings } =
        useBookingContext();
    const { fetchBookings } = useBookings();

    const memorizedFetchBookings = useCallback(fetchBookings, []);

    useEffect(() => {
        if (selectedDateString) {
            memorizedFetchBookings(selectedDateString);
        }
    }, [selectedDateString, memorizedFetchBookings]);

    const handleDateChange = (date: Date) => {
        const dateString = date.toISOString().split("T")[0];
        if (dateString === selectedDateString) {
            return;
        }
        setSelectedDateString(() => dateString);

        // Clear selectedBookings
        setSelectedBookings(() => []);
        // Fetch bookings for the new date from backend
        memorizedFetchBookings(dateString);
    };

    useEffect(() => {
        console.log(selectedDateString);
        if (selectedDateString) {
            memorizedFetchBookings(selectedDateString);
        }
    }, [memorizedFetchBookings]);

    const thisDate = new Date();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(thisDate.getMonth() - 1);

    const oneWeekAhead = new Date();
    oneWeekAhead.setDate(thisDate.getDate() + 7);

    return (
        <>
            <span>Dato: </span>
            <DatePicker
                selected={new Date(selectedDateString)}
                onChange={handleDateChange}
                minDate={oneMonthAgo}
                maxDate={oneWeekAhead}
                calendarStartDay={1}
            />
        </>
    );
}

export default Datefield;
