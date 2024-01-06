import useBookings from "../hooks/useBookings";
import { useBookingContext } from "../contexts/BookingContext";

function ConfirmBookingButton() {
    const { selectedBookings, bookingMode } = useBookingContext();

    const { addBookings, deleteSelectedBookings } = useBookings();

    function handleClick() {
        if (bookingMode) {
            addBookings();
        } else {
            deleteSelectedBookings();
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
