import useBookings from "../hooks/useBookings";
import Booking, { SelectedBooking } from "../interfaces/Booking";
import { useBookingContext } from "../contexts/BookingContext";

function ConfirmBookingButton() {
    const {
        selectedBookings,
        setSelectedBookings,
        personName,
        bookingMode,
        selectedDateString,
    } = useBookingContext();

    const { postBookings, deleteBookings } = useBookings();

    const performBooking = () => {
        // Add personName and date to each booking in selectedBookings
        const updatedSelectedBookings: Booking[] = selectedBookings.map(
            (selectedBooking: SelectedBooking) => {
                return {
                    ...selectedBooking,
                    personName,
                    dateString: selectedDateString,
                };
            }
        );
        // Send selectedBookings to backend
        postBookings(updatedSelectedBookings);
    };

    const performUnbooking = () => {
        // Removed the selected bookings from existingBookings
        const updatedSelectedBookings: Booking[] = selectedBookings.map(
            (selectedBooking: SelectedBooking) => {
                return {
                    ...selectedBooking,
                    personName,
                    dateString: selectedDateString,
                };
            }
        );
        // Send selectedBookings to backend
        deleteBookings(updatedSelectedBookings);
    };

    function handleClick() {
        if (bookingMode) {
            performBooking();
        } else {
            performUnbooking();
        }
        setSelectedBookings(() => []);
    }

    return (
        <>
            <button
                onClick={handleClick}
                disabled={selectedBookings.length === 0}
            >
                {bookingMode ? "Bekreft booking" : "Bekreft avbooking"}
            </button>
        </>
    );
}

export default ConfirmBookingButton;
