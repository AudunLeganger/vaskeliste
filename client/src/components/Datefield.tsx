import { useBookingContext } from "../contexts/BookingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Datefield() {
    const { selectedDate, setSelectedDate, setSelectedBookings } =
        useBookingContext();

    const handleDateChange = (date: Date) => {
        if (date === selectedDate) {
            return;
        }
        setSelectedDate(() => date);

        // Clear selectedBookings
        setSelectedBookings(() => []);
    };

    const thisDate = new Date();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(thisDate.getDate() - 7);

    const oneWeekAhead = new Date();
    oneWeekAhead.setDate(thisDate.getDate() + 7);

    return (
        <>
            <span>Dato: </span>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={oneWeekAgo}
                maxDate={oneWeekAhead}
                calendarStartDay={1}
                dateFormat="dd.MM.yyyy"
            />
        </>
    );
}

export default Datefield;
