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
  BookingRequest,
  BookingCategory,
  BookingCategoryGroup,
  BookingDataResponse,
  BookingPackage,
  DashboardMetrics,
  NewPackageInput,
  TabKey,
} from "@/components/admin/types";
import AdminWorksPanel from "@/components/admin/AdminWorksPanel";

const tabs: TabKey[] = ["Dashboard", "Packages", "Bookings", "Works", "Gallery", "History", "Setting"];
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
  const [categories, setCategories] = useState<BookingCategory[]>([]);
  const [packages, setPackages] = useState<BookingPackage[]>([]);
  const [groupedCategories, setGroupedCategories] = useState<BookingCategoryGroup[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [expandedPackageId, setExpandedPackageId] = useState<number | null>(null);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const sessionRes = await fetch("/api/admin/session", { cache: "no-store" });
        const session = (await sessionRes.json()) as { authenticated?: boolean };

        if (!sessionRes.ok || !session.authenticated) {
          router.replace("/admin/login");
          return;
        }

        await loadDashboard(cancelled);
      } catch {
        router.replace("/admin/login");
      } finally {
        if (!cancelled) {
          setAuthChecking(false);
          setLoadingMetrics(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (activeTab !== "Packages") return;
    loadPackagesData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Bookings") return;
    loadBookingsData();
  }, [activeTab]);

  async function loadDashboard(cancelled: boolean) {
    const dashboardRes = await fetch("/api/admin/dashboard", { cache: "no-store" });
    if (!dashboardRes.ok) return;

    const data = (await dashboardRes.json()) as DashboardMetrics;
    if (!cancelled) {
      setMetrics({
        bookings: data.bookings ?? 0,
        activePackages: data.activePackages ?? 0,
      });
    }
  }

  async function loadPackagesData() {
    setLoadingPackages(true);
    setInfoMessage("");
    try {
      const bookingRes = await fetch("/api/admin/booking", { cache: "no-store" });
      if (!bookingRes.ok) {
        setInfoMessage("Failed to load packages data.");
        return;
      }

      const bookingData = (await bookingRes.json()) as BookingDataResponse;
      const safeCategories = Array.isArray(bookingData.categories) ? bookingData.categories : [];
      const safePackages = Array.isArray(bookingData.packages) ? bookingData.packages : [];
      const safeGrouped = Array.isArray(bookingData.grouped) ? bookingData.grouped : [];
      setCategories(safeCategories);
      setPackages(safePackages);
      setGroupedCategories(safeGrouped);
      setExpandedPackageId(safePackages[0]?.id ?? null);
    } catch {
      setInfoMessage("Failed to load packages data.");
    } finally {
      setLoadingPackages(false);
    }
  }

  async function loadBookingsData() {
    setLoadingBookings(true);
    try {
      const res = await fetch("/api/admin/bookings", { cache: "no-store" });
      if (!res.ok) {
        setInfoMessage("Failed to load bookings data.");
        return;
      }

      const data = (await res.json()) as BookingRequest[];
      setBookingRequests(Array.isArray(data) ? data : []);
    } catch {
      setInfoMessage("Failed to load bookings data.");
    } finally {
      setLoadingBookings(false);
    }
  }

  async function addCategory(nameOverride?: string) {
    const name = (nameOverride ?? newCategory).trim();
    if (!name) return;
    const res = await fetch("/api/admin/booking/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        sort_order: categories.length,
        active: true,
      }),
    });
    if (res.ok) {
      setNewCategory("");
      await loadPackagesData();
    }
  }

  async function editCategory(category: BookingCategory, nextName: string) {
    const trimmed = nextName.trim();
    if (!trimmed) return;
    await fetch(`/api/admin/booking/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...category,
        name: trimmed,
      }),
    });
    await loadPackagesData();
  }

  async function deleteCategory(categoryId: number) {
    await fetch(`/api/admin/booking/categories/${categoryId}`, { method: "DELETE" });
    await loadPackagesData();
  }

  async function addPackage(input?: NewPackageInput) {
    const targetCategoryId = input?.category_id ?? categories[0]?.id;
    if (!targetCategoryId) {
      setInfoMessage("Create a category first.");
      return;
    }

    const includes = input?.includes ?? [];
    const payload = {
      category_id: targetCategoryId,
      name: input?.name?.trim() || "New Package",
      type: input?.type?.trim() || "normal",
      description: input?.description?.trim() || "Describe your package here.",
      price: Number.isFinite(input?.price) ? Math.max(0, Math.round(input!.price)) : 0,
      duration: input?.duration?.trim() || "2-3 hr",
      optional_note: null,
      includes: includes.filter((v) => v.trim()).map((v) => v.trim()),
      image_url: null,
      sort_order: packages.length,
      active: true,
    };
    const res = await fetch("/api/admin/booking/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      await loadPackagesData();
    }
  }

  async function editPackage(pkg: BookingPackage, nextName: string) {
    const trimmed = nextName.trim();
    if (!trimmed) return;
    await fetch(`/api/admin/booking/packages/${pkg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...pkg,
        name: trimmed,
      }),
    });
    await loadPackagesData();
  }

  async function deletePackage(packageId: number) {
    await fetch(`/api/admin/booking/packages/${packageId}`, { method: "DELETE" });
    await loadPackagesData();
  }

  async function updateBookingStatus(id: number, status: "pending" | "confirmed" | "rejected" | "done") {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadBookingsData();
    await loadDashboard(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (authChecking) {
    return <main className="min-h-screen bg-[#f4f4f4] p-8 text-black">Loading...</main>;
  }

  return (
    <main className={`${poppins.className} min-h-screen bg-[#f4f4f4] text-black`}>
      <AdminHeader onLogout={logout} />

      <section className="w-full px-8 pt-9 pb-12">
        <AdminTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-3 mx-auto w-[1600px] h-px bg-black/8" />
        {activeTab === "Dashboard" ? <AdminDashboardPanel loadingMetrics={loadingMetrics} metrics={metrics} /> : null}

        {activeTab === "Packages" ? (
          <AdminPackagesPanel
            groupedCategories={groupedCategories}
            packages={packages}
            loadingPackages={loadingPackages}
            expandedPackageId={expandedPackageId}
            infoMessage={infoMessage}
            newCategory={newCategory}
            onNewCategoryChange={setNewCategory}
            onAddCategory={addCategory}
            onEditCategory={editCategory}
            onDeleteCategory={deleteCategory}
            onAddPackage={addPackage}
            onEditPackage={editPackage}
            onDeletePackage={deletePackage}
            onTogglePackage={setExpandedPackageId}
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
          <AdminWorksPanel />
        ) : null}

      </section>
    </main>
  );
}
