import { doc, addDoc, collection, getDocs, deleteDoc, updateDoc, onSnapshot} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category } from "./category.service";

const packageRef = collection(db, "packages");

export type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  optional_notes: string;
  status: "active" | "inactive";
  categoryId: string;
  category: {
    name: string;
    status: "active" | "inactive";
  }
}

export type AddPackageRequest = {
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  optional_notes?: string;
  status: "active" | "inactive";
  categoryId: string;
  category: {
    name: string;
    status: "active" | "inactive";
  }
};

export type BookingCategoryGroup = {
  category: Category;
  packages: Package[];
};

export const fetchPackages = async (): Promise<Package[]> => {
  const snap = await getDocs(packageRef);

  return snap.docs.map((doc) => {

      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        duration: data.duration,
        includes: Array.isArray(data.includes) ? data.includes : [],
        optional_notes: data.optional_notes,
        status: data.status,
        categoryId: data.categoryId,  
        category: {
          name: data.category.name,
          status: data.category.status
        }
      };
  });
}

export const createPackage = async (data: AddPackageRequest) => {
  console.log({data})
  return await addDoc(collection(db, "packages"), {
    name: data.name,
    description: data.description,
    price: data.price,
    duration: data.duration,
    includes: data.includes,
    optional_notes: data.optional_notes ? data.optional_notes : "",
    status: data.status,
    categoryId: data.categoryId,
    category: {
      name: data.category.name,
      status: data.category.status
    }
  });
};

export const updatePackage= async (id: string, data: Partial<AddPackageRequest>) => {
  return await updateDoc(
    doc(db, "packages", id),
    data
  )
}

export const removePackage = async (id: string) => {
  await deleteDoc(doc(db, "packages", id));
}

export const groupPackagesByCategory = (
  categories: Category[],
  packages: Package[]
): BookingCategoryGroup[] => {

  return categories.map((category) => ({
    category,

    packages: packages.filter(
      (pkg) =>
        pkg.categoryId === category.id
    ),
  }));
};

export const subscribePackages = (
  callback: (
    data: Package[]
  ) => void
) => {

  return onSnapshot(
    packageRef,
    (snapshot) => {

      const packages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name, 
            description: data.description,
            price: data.price,
            duration: data.duration,
            includes: data.includes,
            optional_notes: data.optional_notes,
            status: data.status,
            categoryId: data.categoryId,
            category: {
              name: data.category.name,
              status: data.category.status
            }
          };
        });

      callback(packages);
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