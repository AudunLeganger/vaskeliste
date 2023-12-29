interface Booking {
    timeSlot: string;
    machineNumber: number;
    personName: string;
    date: string;
}

export interface SelectedBooking {
    timeSlot: string;
    machineNumber: number;
}

export default Booking;