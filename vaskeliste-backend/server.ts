import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

// TODO: Use a database instead of an in-memory array
// TODO: Add a route for fetching bookings

let existingBookings: any[] = [];

app.use(cors())
app.use(express.json());

app.post("/bookingsForDate", (req: Request, res: Response) => {
    console.log("POST /bookingsForDate")
    // Get bookings for a specific date
    const selectedDateString = req.body.selectedDateString;
    // Filter bookings for the selected date
    const bookingsToSend = existingBookings.filter(booking => booking.dateString === selectedDateString);
    res.send(bookingsToSend);

});

app.post("/bookings", (req: Request, res: Response) => {
    const newBookings = req.body.bookings;
    // Filtering out bookings where machine and time slot is already booked
    newBookings.filter((newBooking: { machineNumber: number; timeSlot: string; }) => !existingBookings.some(existingBooking => newBooking.machineNumber == existingBooking.machineNumber && newBooking.timeSlot == existingBooking.timeSlot));
    /*
    for (const newBooking of newBookings) {
        for (const existingBooking of existingBookings) {
            if (newBooking.machineNumber == existingBooking.machineNumber && newBooking.timeSlot == existingBooking.timeSlot) {

                return res.status(400).send("Booking conflict at machine " + newBooking.machine + " and time slot " + newBooking.timeSlot + ".");
            }
        }
    }*/

    // log new bookings in readable format
    for (const newBooking of newBookings) {
        console.log("New booking: " + newBooking.personName + " at machine " + newBooking.machine + " and time slot " + newBooking.timeSlot + ".");


    }
    existingBookings = [...existingBookings, ...newBookings];
    res.send(existingBookings);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})