import { Booking } from "./interfaces/Booking";

const ipAdressString = "localhost";
const portString = "3000";
const url = `http://${ipAdressString}:${portString}/api/bookings`;
// const url = "https://9c13-217-118-58-237.ngrok-free.app";

// Codes:
// 200: Bookings were successfully fetched
// Response body: All bookings stored on the server
async function fetchBookings(): Promise<Booking[]> {
    console.log("Trying to FETCH Bookings");
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("GOT A RESPONSE");
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return response.json();
}

// Codes:
// 200: All bookings were successfully added to server
// 201: Some bookings were conflicting
// 409: All bookings were conflicting
// Response body: Array of bookings that were added (and not conflicting)
async function postBookings(bookingsToPost: Booking[]): Promise<Booking[]> {
    // Check if there are any bookings to update
    if (bookingsToPost.length === 0) {
        return Promise.resolve([]);
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookings: bookingsToPost }),
    });
    if (response.status !== 200) {
        throw new Error(response.status.toString());
    }
    return response.json();
}

// Codes:
// 200: All bookings were successfully deleted
// 201: Some bookings were deleted
// 404: None of the bookings were deleted
// Response body: Array of bookings that were not deleted
async function deleteBookings(
    personName: string,
    bookingsToDelete: Booking[]
): Promise<Booking[]> {
    if (bookingsToDelete.length === 0) {
        return Promise.resolve([]);
    }
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientPersonName: personName,
            bookings: bookingsToDelete,
        }),
    });

    if (response.status === 200) {
        // All bookings were successfully deleted
        console.log("Success! All bookings were deleted");
    } else if (response.status === 201) {
        console.log("Only some bookings were deleted. Delete bookings: ");
    } else if (response.status === 404) {
        // None of the bookings client name matched
        console.log("Error! None of the bookings client name matched");
    } else {
        throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    // Get the bookings that were not deleted
    return response.json();
}

export { fetchBookings, postBookings, deleteBookings };
