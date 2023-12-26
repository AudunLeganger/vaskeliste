import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Datefield() {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date: Date) => {
        setDate(date);
    };

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const oneWeekAhead = new Date();
    oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);
    
    return (
        <>
            <span>Dato: </span>
            <DatePicker
                selected={date}
                onChange={handleDateChange}
                minDate={oneMonthAgo}
                maxDate={oneWeekAhead}
                calendarStartDay={1}
            />
        </>
    );
}

export default Datefield;