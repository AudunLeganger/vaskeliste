import BookingField from "./BookingField";

function TimeTable() {
    // Define the machine names
    const machines = [
        "Maskin 1",
        "Maskin 2",
        "Maskin 3",
        "Maskin 4",
        "Maskin 5",
    ];

    // Define the time slots
    const times = [
        "06-07",
        "07-08",
        "08-09",
        "09-10",
        "10-11",
        "11-12",
        "12-13",
        "13-14",
        "14-15",
        "15-16",
        "16-17",
        "17-18",
        "18-19",
        "19-20",
        "20-21",
        "21-22",
        "22-23",
        "23-24",
    ];

    return (
        <table>
            <thead>
                <tr>
                    <th>Tid</th>
                    {machines.map((machine, index) => (
                        <th key={index}>{machine}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {times.map((time, timeIndex) => (
                    <tr key={timeIndex}>
                        <td>{time}</td>
                        {machines.map((_machine, machineIndex) => (
                            <BookingField
                                key={`${timeIndex}-${machineIndex + 1}`}
                                timeSlot={time}
                                machineNumber={machineIndex + 1}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TimeTable;
