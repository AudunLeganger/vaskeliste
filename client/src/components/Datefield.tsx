import { useBookingContext } from "../contexts/BookingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Datefield() {
    const { selectedDateString, setSelectedDateString, setSelectedBookings } =
        useBookingContext();

    const handleDateChange = (date: Date) => {
        const dateString = date.toISOString().split("T")[0];
        if (dateString === selectedDateString) {
            return;
        }
        setSelectedDateString(() => dateString);

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
                selected={new Date(selectedDateString)}
                onChange={handleDateChange}
                minDate={oneWeekAgo}
                maxDate={oneWeekAhead}
                calendarStartDay={1}
            />
        </>
    );
}

export default Datefield;
