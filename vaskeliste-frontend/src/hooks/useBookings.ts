import { useState } from "react";
import Booking from "../interfaces/Booking";
import { useBookingContext } from "../contexts/BookingContext";


function useBookings() {
    const [status, setStatus] = useState<string>("idle");
    const { setExistingBookings } = useBookingContext();
    
    async function updateAndFetchBookings(bookings: Booking[]) {
        // Check if there are any bookings to update
        if (bookings.length === 0) {
            return;
        }
        setStatus("loading");
        const url = 'http://localhost:3000/bookings';
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookings })               
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            const updatedBookings = await response.json();
            setExistingBookings(updatedBookings);
            setStatus("success");
        } catch(e) {
            console.log(e);
            setStatus("error");
        }
    }
    return { updateAndFetchBookings, status};
}

export default useBookings;