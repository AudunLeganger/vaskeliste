import useBookings from "../hooks/useBookings";
import Booking, { SelectedBooking } from "../interfaces/Booking";
import { useBookingContext } from "../contexts/BookingContext";

function ConfirmBookingButton() {
    const {
        selectedBookings,
        setSelectedBookings,
        existingBookings,
        setExistingBookings,
        personName,
        bookingMode,
        selectedDate,
    } = useBookingContext();

    const { sendBookingsToBackend, status } = useBookings();
    const handleClick = () => {
        // Add personName to each booking in selectedBookings
        const updatedSelectedBookings: Booking[] = selectedBookings.map(
            (selectedBooking: SelectedBooking) => {
                return { ...selectedBooking, personName, date: selectedDate };
            }
        );
        setExistingBookings(() => [
            ...existingBookings,
            ...updatedSelectedBookings,
        ]);

        // Clear selectedBookings
        setSelectedBookings(() => []);

        // Send selectedBookings to backend
        sendBookingsToBackend(updatedSelectedBookings);
        console.log(status);

        // Add selectedBookings to existingBookings
        setExistingBookings([...existingBookings, ...updatedSelectedBookings]);

        // Clear selectedBookings
        setSelectedBookings([]);
    };

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
