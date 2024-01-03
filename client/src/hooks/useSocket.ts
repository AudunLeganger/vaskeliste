import { Booking } from "./../interfaces/Booking";
import { useEffect } from "react";
import { io } from "socket.io-client";

const baseUrl = "http://localhost:3000";

export function useSocket(
    onNewBookings: (newBookings: Booking[]) => void,
    onRemovedBookings: (removedBookings: Booking[]) => void
) {
    useEffect(() => {
        const socket = io(baseUrl);

        socket.on("newBookings", onNewBookings);
        socket.on("removedBookings", onRemovedBookings);

        return () => {
            socket.off("newBookings", onNewBookings);
            socket.off("removedBookings", onRemovedBookings);
        };
    }, [onNewBookings, onRemovedBookings]);
}
