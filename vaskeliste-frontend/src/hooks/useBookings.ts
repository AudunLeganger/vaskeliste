import { useState, useCallback } from "react";
import Booking from "../interfaces/Booking";
import { useBookingContext } from "../contexts/BookingContext";


function useBookings() {
    const [status, setStatus] = useState<string>("idle");
    const { selectedDateString, existingBookings, setExistingBookings, setSelectedBookings } = useBookingContext();
    
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
            console.log(response)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            const updatedBookings = await response.json();
            console.log("updatedBookings", updatedBookings);
            setExistingBookings(updatedBookings);
            console.log("existingBookings", existingBookings);
            setSelectedBookings(() => []);
            setStatus("success");
        } catch(e) {
            console.log("Error updating bookings")
            console.log(e);
            setStatus("error");
        }
    }

    const fetchBookings = useCallback(async (selectedDateString: string) => {
        console.log("Fetching bookings")
        setStatus("loading");
        const url = 'http://localhost:3000/bookingsForDate';
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ selectedDateString })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            const newBookings = await response.json();
            if (JSON.stringify(newBookings) !== JSON.stringify(existingBookings)) {
                console.log("Recieved new bookings", newBookings);
                setExistingBookings(newBookings);
            } else {console.log("No new bookings")}
            setStatus("success");
        } catch(e) {
            console.log(e);
            console.log("Error fetching bookings");
            setStatus("error");
        }
    }, [existingBookings, setExistingBookings])
    return { updateAndFetchBookings, fetchBookings, status};
}

export default useBookings;