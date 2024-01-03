// Show all week days
// Get start date from Datefield
// Get end date from Datefield
// Get current date
// Highlight current DAY in blue
// Highlight selected DAY in red
// Make DAYS between start date and end date clickable
// Grey out all other days
import { useMemo } from "react";
import { useBookingContext } from "../contexts/BookingContext";

const getDayFromDate = (date: Date) => {
    const day: string = date.toLocaleDateString("nb-NO", { weekday: "long" });
    return day.charAt(0).toUpperCase() + day.slice(1);
};

export default function Dayfield() {
    const { selectedDate, setSelectedDate } = useBookingContext();
    const datesOfWeek = useMemo(() => {
        const startOfWeek =
            selectedDate.getDate() - ((selectedDate.getDay() + 6) % 7);
        return Array.from(
            { length: 7 },
            (_, i) =>
                new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    startOfWeek + i,
                    12
                )
        );
    }, [selectedDate]);

    const currentDate = useMemo(() => new Date().getDate(), []);

    return (
        <div>
            {datesOfWeek.map((date, index) => {
                const isCurrentDate = date.getDate() === currentDate;
                const isSelectedDate =
                    selectedDate && date.getDate() === selectedDate.getDate();
                const isDisabled =
                    date.getTime() >
                        new Date().getTime() + 7 * 24 * 60 * 60 * 1000 ||
                    date.getTime() <
                        new Date().getTime() - 8 * 24 * 60 * 60 * 1000;

                return (
                    <button
                        key={index}
                        disabled={isDisabled}
                        style={{
                            outline: isCurrentDate ? "3px dashed red" : "none",
                            backgroundColor: isSelectedDate ? "pink" : "white",
                            color: isDisabled ? "grey" : "black",
                        }}
                        onClick={() => setSelectedDate(date)}
                    >
                        {getDayFromDate(date)}
                    </button>
                );
            })}
        </div>
    );
}
