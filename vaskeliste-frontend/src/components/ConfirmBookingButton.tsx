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
        selectedDateString,
    } = useBookingContext();

    const { updateAndFetchBookings, status } = useBookings();

    // Used to perform booking without backend
    const performBookingLocal = () => {
        // Add personName to each booking in selectedBookings
        const updatedSelectedBookings: Booking[] = selectedBookings.map(
            (selectedBooking: SelectedBooking) => {
                return {
                    ...selectedBooking,
                    personName,
                    dateString: selectedDateString,
                };
            }
        );
        setExistingBookings(() => [
            ...existingBookings,
            ...updatedSelectedBookings,
        ]);

        // Send selectedBookings to backend
        // sendBookingsToBackend(updatedSelectedBookings);
        // console.log(status);

        // Add selectedBookings to existingBookings
        setExistingBookings([...existingBookings, ...updatedSelectedBookings]);

        // Clear selectedBookings
        setSelectedBookings(() => []);
        console.log(existingBookings);
    };

    // Used to perform unbooking without backend
    const performUnbookingLocal = () => {
        // Removed the selected bookings from existingBookings
        const updatedExistingBookings: Booking[] = existingBookings.filter(
            (existingBooking: Booking) => {
                return !selectedBookings.some(
                    (selectedBooking: SelectedBooking) => {
                        return (
                            existingBooking.timeSlot ===
                                selectedBooking.timeSlot &&
                            existingBooking.machineNumber ===
                                selectedBooking.machineNumber
                        );
                    }
                );
            }
        );
        setExistingBookings(() => [...updatedExistingBookings]);
        // Clear selectedBookings
        setSelectedBookings(() => []);
        console.log(existingBookings);
    };

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
        updateAndFetchBookings(updatedSelectedBookings);
    };
    // Send selectedBookings to backend
    //  sendBookingsToBackend(updatedSelectedBookings);

    // Clear selectedBookings
    // setSelectedBookings(() => []);

    // Add selectedBookings to existingBookings
    // setExistingBookings([...existingBookings, ...updatedSelectedBookings]);

    // Clear selectedBookings
    // setSelectedBookings([]);

    function handleClick() {
        if (bookingMode) {
            performBookingLocal();
        } else {
            performUnbookingLocal();
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
