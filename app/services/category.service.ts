import { doc, addDoc, collection, getDocs, deleteDoc, updateDoc, onSnapshot, query, where, writeBatch} from "firebase/firestore";
import { db } from "@/lib/firebase";

const categoryRef = collection(db, "categories");

export type Category = {
  id: string;
  name: string;
  status: "active" | "inactive";
  order: number;
}

export type AddCategoryRequest = {
  name: string;
  status: string;
  order: string;
}


export const fetchCategories = async (): Promise<Category[]> => {
  const snap = await getDocs(categoryRef);

   return snap.docs.map((doc) => {

      const data = doc.data();

      return {
        id: doc.id,
        name: data.name ?? "",
        status: data.status,
        order: data.order
      };
    });
}

export const createCategory = async (data: AddCategoryRequest) => {
  return await addDoc(collection(db, "categories"), {
    name: data.name,
    status: data.status,
    order: Number(data.order)
  });
};

export const updateCategory = async (id: string, data: Partial<{name: string; status?: "active" | "inactive", order: number}>) => {
  return await updateDoc(
    doc(db, "categories", id),
    data
  )
}

export const removeCategory = async (id: string) => {
  await deleteDoc(doc(db, "categories", id));
}

export const deleteCategoryCascade = async ( categoryId: string ) => {

    const batch = writeBatch(db);

    // CATEGORY REF
    const categoryRef =
      doc(
        db,
        "categories",
        categoryId
      );

    // FIND RELATED PACKAGES
    const packageQuery =
      query( collection( db, "packages" ),
      where( "categoryId", "==", categoryId )
    );

    const packageSnap = await getDocs( packageQuery );

    // DELETE RELATED PACKAGES
    packageSnap.docs.forEach(
      (pkgDoc) => { 
        batch.delete(
        pkgDoc.ref
      );
    });

    // DELETE CATEGORY
    batch.delete(categoryRef);

    // COMMIT EVERYTHING
    await batch.commit();
};

export const subscribeCategories = (
  callback: (
    data: Category[]
  ) => void
) => {

  return onSnapshot(
    categoryRef,
    (snapshot) => {

      const categories = snapshot.docs.map((doc) => {

          const data = doc.data();

          return {
            id: doc.id,
            name: data.name ?? "",
            status: data.status,
            order: data.order
          };
        });

      callback(categories);
    }
  );
};


// import { getDocs, collection } from "firebase/firestore";

// export const getCategories = async () => {
//   const snap = await getDocs(collection(db, "categories"));

//   return snap.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }));
// };