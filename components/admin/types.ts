import { Category } from "@/app/services/category.service";

export type DashboardMetrics = {
  bookings: number;
  activePackages: number;
};

export type TabKey = "Dashboard" | "Packages" | "Bookings" | "Works" | "Gallery" | "History" | "Setting";

export type BookingCategory = {
  id: number;
  name: string; 
  active: boolean;
};

export type BookingPackage = {
  id: number;
  category_id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  duration: string;
  optional_note: string | null;
  includes: string[];
  image_url: string | null;
  sort_order: number;
  active: boolean;
};

export type BookingCategoryGroup = BookingCategory & { packages: BookingPackage[] };

export type BookingDataResponse = {
  categories: Category[];
  packages: BookingPackage[];
  grouped: BookingCategoryGroup[];
};

export type NewPackageInput = {
  category_id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
};

export type BookingRequestStatus = "pending" | "confirmed" | "rejected" | "done";

export type BookingRequest = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  package_name: string;
  duration: string;
  person_quantity: number;
  preferred_date: string | null;
  status: BookingRequestStatus;
  notes: string | null;
  created_at: string;
};
