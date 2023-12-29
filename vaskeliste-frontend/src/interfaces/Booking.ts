interface Booking {
    timeSlot: string;
    machineNumber: number;
    personName: string;
    dateString: string;
}

export interface SelectedBooking {
    timeSlot: string;
    machineNumber: number;
}

export default Booking;