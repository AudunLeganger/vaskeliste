import express, { Request, Response } from "express";
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

let existingBookings: Booking[] = [];

const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

// Request to get all bookings for a given date
app.get("/bookings", (req: Request, res: Response) => {
    const selectedDateString: string = req.query.date as string;
    const bookingsOnSelectedDate: Booking[] = existingBookings.filter(booking => booking.dateString === selectedDateString);
    res.send(bookingsOnSelectedDate);
});

// Request to add a set of bookings to the server
app.post("/bookings", (req: Request, res: Response) => {
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
});

app.delete("/bookings", (req: Request, res: Response) => {
    const clientPersonName = req.body.clientPersonName;
    const  recievedBookings = req.body.bookings;
    // Get the stored bookings that are at the same time as the recieved bookings
    const bookingsAtSameTime = filterConflictingBookings(recievedBookings, existingBookings);
    // Filter out the bookings that are made by the client
    const bookingsToRemove = bookingsAtSameTime.filter(booking => booking.personName === clientPersonName);
    // Remove the filtered bookings from the stored bookings
    existingBookings = existingBookings.filter(booking => !bookingsToRemove.includes(booking));
})
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})