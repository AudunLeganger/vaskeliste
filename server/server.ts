import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

interface Booking {
    timeSlot: string;
    machineNumber: number;
    dateString: string;
    personName: string;
  }

const filterNonConflictingBookings = (recievedBookings: Booking[], existingBookings: Booking[]) => {
    return recievedBookings.filter((newBooking: { timeSlot: string; machineNumber: number; dateString: string; }) => existingBookings.every(existingBooking => {
        return !(existingBooking.timeSlot === newBooking.timeSlot && existingBooking.machineNumber === newBooking.machineNumber && existingBooking.dateString === newBooking.dateString);
    }));
}

const filterConflictingBookings = (recievedBookings: Booking[], existingBookings: Booking[]) => {
    return recievedBookings.filter((newBooking: { timeSlot: string; machineNumber: number; dateString: string; }) => {
        return existingBookings.some(existingBooking => {
            return existingBooking.timeSlot === newBooking.timeSlot && existingBooking.machineNumber === newBooking.machineNumber && existingBooking.dateString === newBooking.dateString;
        });
    });
}

const printBookingArray = (bookings: Booking[]) => {
    // Print the bookings in a readable format
    console.log("Bookings:")
    bookings.forEach(booking => {
        console.log(`Time: ${booking.timeSlot}, Machine: ${booking.machineNumber}, Date: ${booking.dateString}, Person: ${booking.personName}`)
    });
}

let existingBookings: Booking[] = [];

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);
app.use(cors())
app.use(express.json());

// Request to get all bookings for a given date
app.get("/bookings", (req: Request, res: Response) => {
    console.log("Get request recieved")
    res.status(200).send(existingBookings);
});

// Request to add a set of bookings to the server
app.post("/bookings", (req: Request, res: Response) => {
    console.log("Post request recieved")
    const recievedBookings = req.body.bookings;
    const nonConflictingBookings = filterNonConflictingBookings(recievedBookings, existingBookings);

    // If no bookings are conflicting, add all bookings
    if (recievedBookings.length === nonConflictingBookings.length) {
        res.status(200).send({ bookings: nonConflictingBookings });
    } 
    // If all bookings are conflicting, send an error
    else if (nonConflictingBookings.length === 0) {
        res.status(409).send({ bookings: [] });
    } 
    // If some bookings are conflicting, send the non-conflicting bookings
    else {
        res.status(201).send( { bookings : nonConflictingBookings })
    }
    existingBookings = [...existingBookings, ...nonConflictingBookings];

    io.emit("newBookings", nonConflictingBookings)
});

// Request to delete a set of bookings from the server
app.delete("/bookings", (req: Request, res: Response) => {
    console.log("Delete request recieved")
    const clientPersonName = req.body.clientPersonName;
    const  recievedBookings = req.body.bookings;
    // Get the stored bookings that are at the same time as the recieved bookings
    const bookingsAtSameTime = filterConflictingBookings(recievedBookings, existingBookings);
    // Filter out the bookings that are made by the client
    const bookingsToRemove = bookingsAtSameTime.filter(booking => booking.personName === clientPersonName);

    if (bookingsToRemove.length === 0) {
        // If no bookings match existing bookings under client name, send an error
        res.status(404).send({ bookings: [] });
        return;
    }
    
    else if (bookingsToRemove.length === recievedBookings.length) {
        // If all bookings match existing bookings under client name, send the bookings
        res.status(200).send({ bookings: bookingsToRemove });
    }

    else {
        // If some bookings match existing bookings under client name, send the bookings
        res.status(201).send({ bookings: bookingsToRemove });
    }
    // Remove the filtered bookings from the stored bookings
    existingBookings = existingBookings.filter(booking => !bookingsToRemove.some(bookingToRemove => bookingToRemove.timeSlot === booking.timeSlot && bookingToRemove.machineNumber === booking.machineNumber && bookingToRemove.dateString === booking.dateString));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})