import { addDoc, collection, onSnapshot, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { doc, getDocs, updateDoc } from "firebase/firestore";

export type Booking = {
  id: string;
  fullname: string;
  phone: string;
  date: string;
  package: {
    id: string;
    name: string;
    price: number;
  }  
  duration: string;
  email: string | null;
  quantity: number;
  totalPrice: number; 
  status: "pending" | "confirmed" | "rejected" | "done"
}

export type AddBookingRequest = {
  fullname: string;
  phone: string;
  date: string;
  package: {
    id: string;
    name: string;
    price: number;
  }  
  duration: string;
  email: string | null;
  quantity: number;
  totalPrice: number; 
}

const bookingRef = collection(db, "bookings");


export const createBooking = async (data: AddBookingRequest) => {
  return await addDoc(collection(db, "bookings"), {
    ...data,
    status: "pending", 
  });
};


export const fetchBookings = async () => {
   const snap = await getDocs(bookingRef);
  
  return snap.docs.map((doc) => {

    const data = doc.data();

    return {
      id: doc.id, 
      fullname: data.fullname,
      phone: data.phone,
      date: data.date,
      package: {
        id: data.package.id,
        name: data.package.name,
        price: data.package.price,
      }, 
      duration: data.duration,
      email: data.email || null,
      quantity: data.quantity,
      totalPrice: data.totalPrice,
      status: data.status
    };
  });
};

export const updateBooking = async (
  id: string,
  status: "confirmed" | "rejected" | "done"
) => {
  await updateDoc(doc(db, "bookings", id), {
    status
  });
};

export const subscribeBookingRequests = (
  callback: (
    data: Booking[]
  ) => void
) => {

  return onSnapshot(
    bookingRef,
    (snapshot) => {

      const bookings = snapshot.docs.map((doc) => {

          const data = doc.data();

          return {
            id: doc.id,
            fullname: data.fullname,
            phone: data.phone,
            date: data.date,
            package: {
              id: data.package.id,
              name: data.package.name,
              price: data.package.price,
            }, 
            duration: data.duration,
            email: data.email || null,
            quantity: data.quantity,
            totalPrice: data.totalPrice,
            status: data.status
          };
        });

      callback(bookings);
    }
  );
};

export const clearBookingHistory = async (bookingIds: string[]) => {
  const batch = writeBatch(db);
  bookingIds.forEach((id) => {
    const ref = doc(db, "bookings", id);
    batch.delete(ref);
  })

  await batch.commit();
}

// createBooking({
//   clientName: "Selam",
//   phone: "+2519xxxx",
//   packageId: "pkg123",
//   categoryId: "bridal123",
//   date: "2026-07-01",
//   notes: "Soft glam look"
// });