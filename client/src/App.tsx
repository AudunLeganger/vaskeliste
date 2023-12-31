import { BookingProvider } from "./contexts/BookingContext";
import Datefield from "./components/Datefield.tsx";
import NameInput from "./components/NameInput.tsx";
import TimeTable from "./components/TimeTable.tsx";
import ConfirmBookingButton from "./components/ConfirmBookingButton.tsx";

function App() {
    // Fetch bookings from backend

    // Fetch bookings from backend on first render

    const titleString: string = "Vaskeriliste".toUpperCase();
    const instructionString1: string =
        "Skriv deg opp på listen for å reservere vasketimer. Maksimalt en uke i forveien.".toUpperCase();
    const instructionString2: string =
        "Maskiner kan kapres fem minutter over, men merk at ingen maskiner skal startes senere enn ti minutter over. Se for øvrig retningslinjene på veggen. Sett ring:".toUpperCase();

    return (
        <>
            <BookingProvider>
                <h1>{titleString}</h1>
                <p>{instructionString1}</p>
                <p>{instructionString2}</p>
                <Datefield />
                <NameInput />
                <TimeTable />
                <ConfirmBookingButton />
            </BookingProvider>
        </>
    );
}

export default App;
