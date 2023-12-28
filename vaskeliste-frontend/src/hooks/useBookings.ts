import { useState } from "react";
import SelectedBooking from "../interfaces/SelectedBooking.ts";
function useBookings() {
    const [status, setStatus] = useState<string>("idle");
    
    function sendBookingsToBackend(selectedBookings: SelectedBooking[]) {
        if (selectedBookings.length === 0) {
            return;
        }
        setStatus("loading");
        const url = 'http://localhost:3000/bookings';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ bookings: selectedBookings })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            setStatus("success");
        })
        .catch((e) => {
            console.log(e);
            setStatus("error");
        });
    }
    return { sendBookingsToBackend, status};
}

export default useBookings;