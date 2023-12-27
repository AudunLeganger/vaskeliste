import SelectedBooking from "../interfaces/SelectedBooking.tsx";
import ExistingBooking from "../interfaces/ExistingBooking.tsx";

interface ConfirmBookingButtonProps {
    selectedBookings: SelectedBooking[];
    setSelectedBookings: (bookings: SelectedBooking[]) => void;
    existingBookings: ExistingBooking[];
    setExistingBookings: (bookings: ExistingBooking[]) => void;
    personName: string;
}

function ConfirmBookingButton({
    selectedBookings,
    setSelectedBookings,
    existingBookings,
    setExistingBookings,
    personName,
}: ConfirmBookingButtonProps) {
    const handleClick = () => {
        // Add personName to each booking in selectedBookings
        const updatedSelectedBookings = selectedBookings.map(
            (selectedBooking) => {
                return { ...selectedBooking, personName };
            }
        );

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
                Bekreft booking
            </button>
        </>
    );
}

export default ConfirmBookingButton;
