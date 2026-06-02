import * as XLSX from "xlsx";
import { Booking } from "@/app/services/booking.servce";

export const exportBookingsToExcel = (bookings: Booking[]) => {
    const formattedData = bookings.map((booking) => ({
        Client: booking.fullname,
        Phone: booking.phone,
        Package: booking.package.name,
        PackagePrice: booking.package.price,
        AppointmentDate: booking.date,
        Status: booking.status,
        Quantity: booking.quantity,
        TotalPrice: booking.quantity * booking.totalPrice,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Booking History");

    XLSX.writeFile(workbook, "bookings-history.xlsx");

}