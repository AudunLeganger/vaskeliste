import useBookings from "../hooks/useBookings";
import { useBookingContext } from "../contexts/BookingContext";

function ConfirmBookingButton() {
    const { selectedBookings, bookingMode } = useBookingContext();

    const { addBookings, deleteSelectedBookings } = useBookings();

    const performBooking = () => {
        // Add personName and date to each booking in selectedBookings
        addBookings();
    };

    const performUnbooking = () => {
        deleteSelectedBookings();
    };

    function handleClick() {
        if (bookingMode) {
            performBooking();
        } else {
            performUnbooking();
        }
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
