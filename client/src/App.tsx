import Datefield from "./components/Datefield.tsx";
import NameInput from "./components/NameInput.tsx";
import TimeTable from "./components/TimeTable.tsx";
import ConfirmBookingButton from "./components/ConfirmBookingButton.tsx";
import { useEffect } from "react";
import useBookings from "./hooks/useBookings.ts";
import Dayfield from "./components/Dayfield.tsx";

function App() {
    // const { existingBookings, setExistingBookings } = useBookingContext();
    const { loadBookings } = useBookings();

    // Fetch bookings from the server when the component mounts
    useEffect(() => {
        console.log("App rendered");
        loadBookings();
    }, []);

    const titleString: string = "Vaskeriliste".toUpperCase();
    const instructionString1: string =
        "Skriv deg opp på listen for å reservere vasketimer. Maksimalt en uke i forveien.".toUpperCase();
    const instructionString2: string =
        "Maskiner kan kapres fem minutter over, men merk at ingen maskiner skal startes senere enn ti minutter over. Se for øvrig retningslinjene på veggen. Sett ring:".toUpperCase();

    return (
        <>
            <h1>{titleString}</h1>
            <p>{instructionString1}</p>
            <p>{instructionString2}</p>
            <Datefield />
            <Dayfield />
            <NameInput />
            <TimeTable />
            <ConfirmBookingButton />
        </>
    );
}

export default App;
