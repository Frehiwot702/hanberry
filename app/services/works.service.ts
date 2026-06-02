import { doc, addDoc, collection, getDocs, deleteDoc, updateDoc, onSnapshot, query, where, writeBatch} from "firebase/firestore";
import { db } from "@/lib/firebase";

const workRef = collection(db, "works");

export type Work = {
  id: string;
  imageUrl: string;
  height: number;
}

export const fetchWorks = async (): Promise<Work[]> => {
  const snap = await getDocs(workRef);
  
  return snap.docs.map((doc) => {

    const data = doc.data();

    return {
      id: doc.id,
      imageUrl: data.imageUrl,
      height: data.height ?? 300
    };
  });
}

export const addWork = async (imageUrl: string, publicId: string, height: number) => {
  console.log({imageUrl, publicId, height})
  return await addDoc(collection(db, "works"), {
      imageUrl: imageUrl,
      publicId: publicId,
      height: height
  });
}

export const replaceWork = async ( id: string, imageUrl: string ) => {

  await updateDoc( doc(db, "works", id),
    {
      imageUrl,
    }
  );
};

export const subscribeWorks = (
  callback: (
    data: Work[]
  ) => void
) => {

  return onSnapshot(
    workRef,
    (snapshot) => {

      const works = snapshot.docs.map((doc) => {

          const data = doc.data();
          return {
            id: doc.id,
            imageUrl: data.imageUrl, 
            height: data.height ?? 300
          }; 
        });

      callback(works);
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