"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { AdminDashboardPanel } from "@/components/admin/AdminDashboardPanel";
import { AdminPackagesPanel } from "@/components/admin/AdminPackagesPanel";
import { AdminBookingsPanel } from "@/components/admin/AdminBookingsPanel";
import { 
  DashboardMetrics, 
  TabKey,
} from "@/components/admin/types";
import AdminWorksPanel from "@/components/admin/AdminWorksPanel";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AddPackageRequest, BookingCategoryGroup, createPackage, fetchPackages, groupPackagesByCategory, Package, removePackage, subscribePackages, updatePackage } from "../services/package.service";
import { Category, createCategory, deleteCategoryCascade, fetchCategories, removeCategory, subscribeCategories, updateCategory } from "../services/category.service";
import { Booking, fetchBookings, subscribeBookingRequests, updateBooking } from "../services/booking.servce";
import { AdminHistoryPanel } from "@/components/admin/AdminHistoryPanel";
import { fetchWorks, Work, subscribeWorks } from "../services/works.service";
import { fetchGallery, Gallery, subscribeGallery } from "../services/gallery.service";
import AdminGalleryPanel from "@/components/admin/AdminGalleryPanel";


const tabs: TabKey[] = ["Dashboard", "Packages", "Bookings", "Works", "Gallery", "History"];
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("Dashboard");
  const [authChecking, setAuthChecking] = useState(true);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics>({ bookings: 0, activePackages: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  // const [groupedCategories, setGroupedCategories] = useState<[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<Booking[]>([]);
  const [history, setHistory] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [order, setOrder] = useState("");
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState("");

  const [works, setWorks] = useState<Work[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {
            router.replace("/admin/login");
            return;
          }

          try {
            await loadDashboard(false);

          } catch (error) {
            console.log(error);

          } finally {
            setAuthChecking(false);
            setLoadingMetrics(false);
          }
        }
      );

    return () => unsubscribe();

  }, [router]);

  useEffect(() => {
    if (activeTab !== "Packages" && activeTab !== "Dashboard") return;
    loadPackagesData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Bookings" && activeTab !== "History" && activeTab !== "Dashboard") return;
    loadBookingsData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Works") return;
    loadWorksData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Gallery") return;
    loadGalleryData();
  }, [activeTab]);

  // for updating categories data when changed
  useEffect(() => { 
    const unsubscribe =
      subscribeCategories(
        (data) => {
          setCategories(data);
        }
      );
    return () => unsubscribe(); 
  }, []);

  // for updating packages data when changed
  useEffect(() => {
    const unsubscribe =
      subscribePackages(
        (data) => {
          setPackages(data);
        }
      );
    return () => unsubscribe(); 
  }, []);

  // for updating booking requests data when changed
  useEffect(() => { 
    const unsubscribe =
      subscribeBookingRequests(
        (data) => {
          setBookingRequests(data);
        }
      );
    return () => unsubscribe(); 
  }, [bookingRequests]);

  // for updating works images data when changed
  useEffect(() => { 
    const unsubscribe =
      subscribeWorks(
        (data) => {
          setWorks(data);
        }
      );
    return () => unsubscribe(); 
  }, []);

  // for updating gallery images data when changed
  useEffect(() => { 
    const unsubscribe =
      subscribeGallery(
        (data) => {
          setGallery(data);
        }
      );
    return () => unsubscribe(); 
  }, []);

  async function loadDashboard(cancelled: boolean) {

    const pendingBooking = bookingRequests.filter((booking) => booking.status === "pending");
    const activePackages = packages.filter((pkg) => pkg.status === "active");
    console.log({packages});
    console.log({activePackages});

    if (!cancelled) {
      setMetrics({
        bookings: pendingBooking.length ?? 0,
        activePackages: activePackages.length ?? 0,
      });
    }
  }

  async function loadPackagesData() {

    setLoadingPackages(true);

    setInfoMessage("");

    try {

      const [ categoriesData, packagesData, bookingData ] = await Promise.all([ fetchCategories(), fetchPackages(), fetchBookings()]);

      const grouped = groupPackagesByCategory( categoriesData, packagesData );
      console.log({grouped});

      setCategories(categoriesData);

      setPackages(packagesData);

      const activePackages = packagesData.filter((pkg) => pkg.status === "active");
      const pendingBooking = bookingData.filter((booking) => booking.status === "pending");

      setMetrics({ 
        bookings: pendingBooking.length ?? 0,
        activePackages: activePackages.length ?? 0,
      })

      // setGroupedCategories(grouped);

      setExpandedPackageId(
        packagesData[0]?.id ?? null
      );

    } catch (error) {

      console.log(error);

      setInfoMessage(
        "Failed to load packages data."
      );

    } finally {

      setLoadingPackages(false);
    }
  }

  async function loadBookingsData() {
    setLoadingBookings(true);
    try {
      const res = await fetchBookings();
      setBookingRequests(res);

      const filtered = res.filter((book) => book.status === "done" || book.status === "rejected");
      setHistory(filtered);

    } catch {
      setInfoMessage("Failed to load bookings data.");
    } finally {
      setLoadingBookings(false);
    }
  }

  async function loadWorksData() {
    setLoading(true);
    try {
      const res = await fetchWorks();
      setWorks(res); 

      setLoading(false);

    } catch {
      setInfoMessage("Failed to load works data.");
    } finally {
      setLoading(false);
    }
  }

  async function loadGalleryData() {
    setLoading(true);
    try {
      const res = await fetchGallery();
      setGallery(res); 

      setLoading(false);

    } catch {
      setInfoMessage("Failed to load gallery data.");
    } finally {
      setLoading(false);
    }
  }

  //  CATEGORY CUD

  async function addCategory( nameOverride: string, order: string) {

    const name = ( nameOverride ?? newCategory ).trim();

    if (!name || !order) {
      setInfoMessage("Please fill all fields to proceed.")
      return;
    };

    try {
      setLoading(true);
      await createCategory({ name: name, status: "active", order: order });
      setNewCategory("");
      setOrder("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setInfoMessage( "Failed to add category." );
    }
  }

  async function editCategory(categoryId: string, updates: { name: string; status?: "active" | "inactive", order: number}) {
    try { 
      setLoading(true);
      await updateCategory(categoryId, updates)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setInfoMessage( "Failed to edit category." );
    }
  }

  async function deleteCategory(categoryId: string) {
    try { 
      setLoading(true);
      const relatedPackages =
        packages.filter(
          (pkg) => pkg.categoryId === categoryId
        );

      if (relatedPackages.length > 0) {

        const confirmed = window.confirm(
            `This category contains ${relatedPackages.length} package(s). Deleting it will also remove all related packages permanently.`
          );

        if (confirmed) {
          await deleteCategoryCascade( categoryId );
        } else {
          return;
        };
      }
      await removeCategory(categoryId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setInfoMessage( "Failed to delete category." );
    }
  }


  //  PACKAGE CUD

  async function addPackage(pkg: AddPackageRequest) {
    const targetCategoryId = pkg?.categoryId ?? categories[0]?.id;
    if (!targetCategoryId) {
      setInfoMessage("Create a category first.");
      return;
    }

    if (!pkg) {
      setInfoMessage("Fill all input fields to add package");
      return;
    }

    console.log({pkg})

    try {
      setLoading(true);

      await createPackage({ 
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        includes: pkg.includes,
        optional_notes: pkg.optional_notes,
        categoryId: pkg.categoryId,
        status: pkg.status,
        category: {
          name: pkg.category.name,
          status: pkg.category.status
        }
      });
      setNewCategory("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setInfoMessage( "Failed to add package." );
    }
    
  }

  async function editPackage(pkgId: string, updates: AddPackageRequest) {
    console.log({updates});
    const targetCategoryId = updates?.categoryId ?? categories[0]?.id;
    if (!targetCategoryId) {
      setInfoMessage("Create a category first.");
      return;
    } 

    try {
      setLoading(true);
      await updatePackage(pkgId, updates);
      setNewCategory("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setInfoMessage( "Failed to add package." );
    }
  }

  async function deletePackage(packageId: string) {
    try { 
      setLoading(true);
      await removePackage(packageId)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setInfoMessage( "Failed to delete category." );
    }
  }

  async function updateBookingStatus(id: string, status: "confirmed" | "rejected" | "done" ) {
     try {
      console.log({status})
      await updateBooking(id, status);
    } catch (error) {
      console.log(error);
      setInfoMessage( "Failed to update booking status." );
    }
  }

  async function logout() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  if (authChecking) {
    return <main className="min-h-screen bg-[#f4f4f4] p-8 text-black">Loading...</main>;
  }
  console.log({categories})

  return (
    <main className={`${poppins.className} min-h-screen bg-[#f4f4f4] text-black`}>
      <AdminHeader onLogout={logout} />

      <section className="w-full px-8 pt-9 pb-12">
        <AdminTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-3 mx-auto w-full h-px bg-black/8" />
        {activeTab === "Dashboard" ? <AdminDashboardPanel loadingMetrics={loadingMetrics} metrics={metrics} /> : null}

        {activeTab === "Packages" ? (
          <AdminPackagesPanel
            categories={categories}
            packages={packages}
            loadingPackages={loadingPackages}
            expandedPackageId={expandedPackageId}
            infoMessage={infoMessage}
            newCategory={newCategory}
            onNewCategoryChange={setNewCategory}
            order={order}
            onOrderChange={setOrder}
            onAddCategory={addCategory}
            onEditCategory={editCategory}
            onDeleteCategory={deleteCategory}
            onAddPackage={addPackage}
            onEditPackage={editPackage}
            onDeletePackage={deletePackage}
            onTogglePackage={setExpandedPackageId}
            loading={loading}
          />
        ) : null}

        {activeTab === "Bookings" ? (
          <AdminBookingsPanel
            requests={bookingRequests}
            loading={loadingBookings}
            onUpdateStatus={updateBookingStatus}
          />
        ) : null}

        {activeTab === "Works" ? (
          <AdminWorksPanel 
            works={works}
            loading={loading}
          />
        ) : null}

        {activeTab === "History" ? (
          <AdminHistoryPanel 
            completed={history} 
            loading={loadingBookings}
            refresh={loadBookingsData}
          />
        ) : null}

        {activeTab === "Gallery" ? (
          <AdminGalleryPanel 
            gallery={gallery} 
            categories={categories}
            loading={loading}
          />
        ) : null}

      </section> 
    </main>
  );
}
