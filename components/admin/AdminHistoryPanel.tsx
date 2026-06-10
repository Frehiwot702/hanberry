"use client";

import { useMemo, useState } from "react";
import { Booking, clearBookingHistory } from "@/app/services/booking.servce";
import { exportBookingsToExcel } from "@/lib/exportBookings";


export function AdminHistoryPanel({completed, loading, refresh} : {completed: Booking[]; loading: boolean; refresh: () => void}) {

    const [search, setSearch] = useState("");
    console.log({completed})
    const [error, setError] = useState<string | null>(null);
    const [loadingAction, setLoadingAction] = useState(false);

    const handleClearHistory = async () => {
      setLoadingAction(true);
      try {
        const bookingIds = completed.map((booking) => booking.id);
        await clearBookingHistory(bookingIds);
        setLoadingAction(false);
        refresh();
      } catch(error) {
        setError("Failed to clear history, try again!");
        console.log(error)
        setLoadingAction(false);
      }
    }

    const pendingRequests = useMemo(() => {
        const q = search.toLowerCase().trim();
        return completed.filter((r) => { 
            return r.fullname.toLowerCase().includes(q) || r.phone.includes(q);
        });
    }, [completed, search]);
  
    return (
        <section className="mt-10 max-w-[1600px] mx-auto space-y-5">
        <div className='w-full lg:flex items-end justify-between'>
            <div>
                <h1 className="text-[32px] font-semibold">History</h1>
                <p className="text-black/65 mt-2 text-[16px]">
                    Review your completed appointments and manage past records with ease.
                </p>
            </div>
            <div className="flex items-center gap-4 mt-5 lg:mt-0">
              <button
                  className="h-[46px] rounded-full bg-[#1F7244] text-white px-6 text-[16px]"
                  onClick={() => exportBookingsToExcel(completed)}
              >Export to Excel</button>
              <button
                  className="h-[46px] rounded-full bg-red-400 text-white px-6 text-[16px]"
                  onClick={() => handleClearHistory()}
              >{loadingAction ? "Clearing..." : "Clear history"}</button>
            </div>
        </div>
        {error && <p className='text-center text-red-500'>{error}</p>}
        <SearchBar value={search} onChange={setSearch} />
        <BookingsTable
            rows={pendingRequests}
            loading={loading}
            pending 
        />
        </section>
    );
}

function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search for customer using name or phone number"
        className="h-[58px] w-full rounded-full border border-black/30 px-6 text-[18px]"
      />
      <button className="h-[58px] rounded-full bg-black text-white px-8 text-[18px]">Search</button>
    </div>
  );
}

function BookingsTable({
  rows,
  loading,
  pending = false, 
}: {
  rows: Booking[];
  loading: boolean;
  pending?: boolean; 
}) {
  return (
    <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 flex overflow-x-auto overflow-y-auto max-h-[600px]">
      <table className="w-full text-left">
        <thead className="bg-black/5 text-[16px]">
          <tr>
            {/* <th className="px-4 py-3">ID</th> */}
            <th className="px-4 py-3">Customer Name</th>
            <th className="px-4 py-3">Phone Number</th>
            <th className="px-4 py-3">Person Quantity</th>
            <th className="px-4 py-3">Package</th>
            <th className="px-4 py-3">Package Price</th>
            <th className="px-4 py-3">Appointment Date</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th> 
          </tr>
        </thead>
        <tbody className="text-[15px]">
          {loading ? (
            <tr>
              <td className="px-4 py-4" colSpan={pending ? 8 : 7}>
                Loading...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td className="px-4 py-4" colSpan={pending ? 8 : 7}>
                No bookings found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-t border-black/10">
                {/* <td className="px-4 py-3">{row.id}</td> */}
                <td className="px-4 py-3">{row.fullname}</td>
                <td className="px-4 py-3">{row.phone}</td>
                <td className="px-4 py-3">{row.quantity}</td>
                <td className="px-4 py-3">{row.package.name}</td>
                <td className="px-4 py-3">{row.package.price}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.totalPrice} ETB</td>
                <td className="px-4 py-3 first-letter:uppercase">{row.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
