import { Booking } from "./../interfaces/Booking";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../constants";

export function useSocket(
    onNewBookings: (newBookings: Booking[]) => void,
    onRemovedBookings: (removedBookings: Booking[]) => void
): void {
    useEffect(() => {
        // console.log(SOCKET_URL);
        const socket = io(SOCKET_URL);

        socket.on("newBookings", onNewBookings);
        socket.on("removedBookings", onRemovedBookings);

        return () => {
            socket.off("newBookings", onNewBookings);
            socket.off("removedBookings", onRemovedBookings);
        };
    }, [onNewBookings, onRemovedBookings]);
}
