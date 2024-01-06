// Show all week days
// Get start date from Datefield
// Get end date from Datefield
// Get current date
// Highlight current DAY in blue
// Highlight selected DAY in red
// Make DAYS between start date and end date clickable
// Grey out all other days
import { useEffect, useState } from "react";
import { useBookingContext } from "../contexts/BookingContext";

// Helper functions
const getDayFromDate = (date: Date) => {
    const day: string = date.toLocaleDateString("nb-NO", { weekday: "long" });
    return day.charAt(0).toUpperCase() + day.slice(1);
};

const isCurrentDate = (date: Date): boolean => {
    const currentDate = new Date().getDate();
    return date.getDate() === currentDate;
};

const isSelectedDate = (date: Date, selectedDate: Date | null): boolean => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate();
};

const isDisabled = (date: Date): boolean => {
    return (
        date.getTime() > new Date().getTime() + 7 * 24 * 60 * 60 * 1000 ||
        date.getTime() < new Date().getTime() - 8 * 24 * 60 * 60 * 1000
    );
};
/*
function getWeekNumber(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const millisecondsInDay = 86400000;
    const numDays =
        (date.getTime() - firstDayOfYear.getTime()) / millisecondsInDay;
    const weekNo = Math.ceil(numDays / 7);
    console.log("Week number:", weekNo);
    return weekNo;
}
*/

function getWeekNumber(dateArg: Date) {
    // Set to nearest Thursday (counting Sunday as the start of the week): current date + 4 - current day number
    // Make Sunday's day number 7
    const date = new Date(dateArg);
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(
        ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
    return weekNo;
}

export default function Dayfield() {
    const { selectedDate, setSelectedDate } = useBookingContext();
    const [weekNumber, setWeekNumber] = useState(0);
    const [weekDates, setWeekDates] = useState<Date[]>([]);

    useEffect(() => {
        const startOfWeek =
            selectedDate.getDate() - ((selectedDate.getDay() + 6) % 7);
        const weekDates = Array.from(
            { length: 7 },
            (_, i) =>
                new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    startOfWeek + i,
                    12
                )
        );
        setWeekDates(weekDates);
        setWeekNumber(getWeekNumber(selectedDate));
    }, [weekNumber, selectedDate]);

    return (
        <div>
            Uke {weekNumber}
            {weekDates.map((date, index) => {
                return (
                    <button
                        key={index}
                        disabled={isDisabled(date)}
                        style={{
                            outline: isCurrentDate(date)
                                ? "3px solid #14305c"
                                : "none",
                            backgroundColor: isSelectedDate(date, selectedDate)
                                ? "pink"
                                : "white",
                            color: isDisabled(date) ? "grey" : "black",
                            margin: "0.3em 0.5em",
                        }}
                        onClick={() => setSelectedDate(date)}
                    >
                        {getDayFromDate(date)}
                    </button>
                );
            })}
            <button
                onClick={() => {
                    // decrement selectedDate by 1 day
                    setSelectedDate(
                        new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000)
                    );
                }}
            >
                prev
            </button>
            <button
                onClick={() => {
                    // increment selectedDate by 1 day
                    setSelectedDate(
                        new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
                    );
                }}
            >
                next
            </button>
        </div>
    );
}
