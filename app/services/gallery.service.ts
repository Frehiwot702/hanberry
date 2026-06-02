import { doc, addDoc, collection, getDocs, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const galleryRef = collection(db, "gallery");

export type Gallery = {
  id: string;
  imageUrl: string;
  height: number;
  categoryId?: string;
}

export const fetchGallery = async (): Promise<Gallery[]> => {
  const snap = await getDocs(galleryRef);
  
  return snap.docs.map((doc) => {

    const data = doc.data();

    return {
      id: doc.id,
      imageUrl: data.imageUrl,
      height: data.height ?? 300,
      categoryId: data.categoryId
    };
  });
}

export const addGalleryItem = async (imageUrl: string, publicId: string, height: string, categoryId?: string) => {
  return await addDoc(collection(db, "gallery"), {
      imageUrl: imageUrl,
      publicId: publicId,
      height: Number(height) ?? 700,
      categoryId: categoryId ? categoryId : ''
  });
}

export const removeGallery = async (id: string) => {
  await deleteDoc(doc(db, "gallery", id));
}

export const subscribeGallery = (
  callback: (
    data: Gallery[]
  ) => void
) => {

  return onSnapshot(
    galleryRef,
    (snapshot) => {

      const gallery = snapshot.docs.map((doc) => {

          const data = doc.data();
          return {
            id: doc.id,
            imageUrl: data.imageUrl, 
            height: data.height ?? 300,
            categoryId: data.categoryId
          }; 
        });

      callback(gallery);
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