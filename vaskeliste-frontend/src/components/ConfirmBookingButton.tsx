import SelectedBooking from "../interfaces/SelectedBooking.tsx";
import ExistingBooking from "../interfaces/ExistingBooking.tsx";
import useBookings from "../hooks/useBookings.tsx";

interface ConfirmBookingButtonProps {
    selectedBookings: SelectedBooking[];
    setSelectedBookings: (bookings: SelectedBooking[]) => void;
    existingBookings: ExistingBooking[];
    setExistingBookings: (bookings: ExistingBooking[]) => void;
    personName: string;
    bookingMode: boolean;
}

function ConfirmBookingButton({
    selectedBookings,
    setSelectedBookings,
    existingBookings,
    setExistingBookings,
    personName,
    bookingMode,
}: ConfirmBookingButtonProps) {
    const { sendBookingsToBackend, status } = useBookings();
    const handleClick = () => {
        // Add personName to each booking in selectedBookings
        const updatedSelectedBookings = selectedBookings.map(
            (selectedBooking) => {
                return { ...selectedBooking, personName };
            }
        );

        // Send selectedBookings to backend
        sendBookingsToBackend(updatedSelectedBookings);

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
