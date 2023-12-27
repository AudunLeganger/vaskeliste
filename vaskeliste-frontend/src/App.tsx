import { useState } from "react";
import Datefield from "./components/Datefield.tsx";
import TimeTable from "./components/TimeTable.tsx";
import ConfirmBookingButton from "./components/ConfirmBookingButton.tsx";
import SelectedBooking from "./interfaces/SelectedBooking.tsx";
import ExistingBooking from "./interfaces/ExistingBooking.tsx";

function App() {
    const titleString: string = "Vaskeriliste".toUpperCase();
    const instructionString1: string =
        "Skriv deg opp på listen for å reservere vasketimer. Maksimalt en uke i forveien.".toUpperCase();
    const instructionString2: string =
        "Maskiner kan kapres fem minutter over, men merk at ingen maskiner skal startes senere enn ti minutter over. Se for øvrig retningslinjene på veggen. Sett ring:".toUpperCase();

    const personName: string = "Ola Nordmann";

    // TODO: Get bookings from backend

    const [selectedBookings, setSelectedBookings] = useState<SelectedBooking[]>(
        []
    );
    const [existingBookings, setExistingBookings] = useState<ExistingBooking[]>(
        []
    );

    return (
        <>
            <h1>{titleString}</h1>
            <p>{instructionString1}</p>
            <p>{instructionString2}</p>
            <Datefield />
            <TimeTable
                selectedBookings={selectedBookings}
                setSelectedBookings={setSelectedBookings}
                existingBookings={existingBookings}
                setExistingBookings={setExistingBookings}
            />
            <ConfirmBookingButton
                selectedBookings={selectedBookings}
                setSelectedBookings={setSelectedBookings}
                existingBookings={existingBookings}
                setExistingBookings={setExistingBookings}
                personName={personName}
            />
        </>
    );
}

export default App;
