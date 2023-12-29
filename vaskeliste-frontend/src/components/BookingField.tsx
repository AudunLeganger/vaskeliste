import { useBookingContext } from "../contexts/BookingContext";

interface BookingFieldProps {
    timeSlot: string;
    machineNumber: number;
}

function BookingField({
    timeSlot, // the current time slot
    machineNumber, // the current machine number
}: BookingFieldProps) {
    // Get the selectedBookings array and the setSelectedBookings function from the BookingContext
    const {
        selectedBookings,
        setSelectedBookings,
        existingBookings,
        personName: inputPersonName,
        bookingMode,
        setBookingMode,
    } = useBookingContext();
    // If it exists, get an existing booking for the current time slot and machine number
    const isExistingBooking = existingBookings.some(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber
    );

    // If the current user has booked this slot, this point to this booking
    const isOwnBooking = existingBookings.some(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber &&
            booking.personName === inputPersonName
    );

    const existingBooking = existingBookings.find(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber
    );

    const isSelected = selectedBookings.find(
        (booking) =>
            booking.timeSlot === timeSlot &&
            booking.machineNumber === machineNumber
    );

    const handleClick = () => {
        if (isExistingBooking && !isOwnBooking) {
            // Case: The field is booked by another user
            // Expected behavior: Do nothing
            return;
        }

        const thisBooking = { timeSlot, machineNumber };
        // If there are no existing bookings selected
        if (selectedBookings.length === 0) {
            // If the field is empty, the user is in the process of booking
            if (!isExistingBooking) {
                setBookingMode(true);
            }
            // If the field is booked by the current user, the user is in the process of unbooking
            else if (isOwnBooking) {
                setBookingMode(false);
            }
            setSelectedBookings((prev) => [...prev, thisBooking]);
            return;
        }

        // If the field is already selected, deselect it
        if (
            selectedBookings.some(
                (booking) =>
                    thisBooking.machineNumber === booking.machineNumber &&
                    thisBooking.timeSlot === booking.timeSlot
            )
        ) {
            setSelectedBookings((prev) =>
                prev.filter(
                    (booking) =>
                        booking.machineNumber !== thisBooking.machineNumber ||
                        booking.timeSlot !== thisBooking.timeSlot
                )
            );
            // If there are no selected bookings left, bookingMode is set to true
            if (selectedBookings.length === 0) {
                setBookingMode(true);
            }
            return;
        }

        // If the field is empty but the user is in the process of unbooking, or the field is booked by the current user but the user is in the process of booking
        // Expected behavior: Do nothing
        if (
            (!isExistingBooking && !bookingMode) ||
            (isOwnBooking && bookingMode)
        ) {
            return;
        }

        // If the field is empty and the user is in the process of booking, or the field is booked by the current user and the user is in the process of unbooking
        // Expected behavior: Select the field for booking / unbooking
        if (
            (!isExistingBooking && bookingMode) ||
            (isOwnBooking && !bookingMode)
        ) {
            setSelectedBookings((prev) => [...prev, thisBooking]);
        }

        /*
        // If the field is empty and there are no existing bookings selected
        if (!existingBooking && selectedBookings.length === 0) {
            // Case: The field is empty and there are no existing bookings selected
            // Expected behavior: Select the field for booking
            setIsBooking(true);
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
            return;
        }

        // If the field is booked by the current user and no empty fields are selected for booking
        if (ownBooking && selectedBookings.length === 0) {
            // Case: The field is booked by the current user and no empty fields are selected for booking
            // Expected behavior: Select the field for UNbooking
            setIsBooking(false);
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
            return;
        }

        // If the field is already selected for unbooking, deselect it
        if (ownBooking && selected) {
            setSelected(false);
            setSelectedBookings((prev) =>
                prev.filter(
                    (b) =>
                        b.timeSlot !== booking.timeSlot ||
                        b.machineNumber !== booking.machineNumber
                )
            );
            return;
        }

        // If the field is empty but the user is in the process of unbooking, or
        // the field is booked by the current user but the user is in the process of booking
        if ((!existingBooking && !isBooking) || (ownBooking && isBooking)) {
            return;
        }

        // If the field is empty and the user is in the process of booking, or
        // the field is booked by the current user and the user is in the process of unbooking
        if ((!existingBooking && isBooking) || (ownBooking && !isBooking)) {
            setSelected(true);
            setSelectedBookings((prev) => [...prev, booking]);
        }
        //END */

        // OLD CODE
        /* 
        let updatedSelectedBookings: SelectedBooking[];

        // Check if booking is already selected
        if (!selected) {
            // Add booking to selectedBookings array
            updatedSelectedBookings = [...selectedBookings, booking];
        } else {
            // Remove booking from selectedBookings array
            updatedSelectedBookings = selectedBookings.filter(
                (selectedBooking) =>
                    selectedBooking.timeSlot !== booking.timeSlot ||
                    selectedBooking.machineNumber !== booking.machineNumber
            );
        }

        // Update selectedBookings
        setSelectedBookings(() => updatedSelectedBookings);
        setSelected(!selected);
        */
    };

    const style = {
        color: "black",
        backgroundColor:
            isSelected && !bookingMode
                ? "red"
                : isExistingBooking
                ? "white"
                : isSelected && bookingMode
                ? "green"
                : "white",
        width: "10em",
        height: "2em",
        overflow: "hidden",
        border: "2px solid black",
    };

    return (
        <td
            className={isSelected ? "selected" : ""}
            onClick={handleClick}
            style={style}
        >
            {existingBooking ? existingBooking.personName : ""}
        </td>
    );
}

export default BookingField;
