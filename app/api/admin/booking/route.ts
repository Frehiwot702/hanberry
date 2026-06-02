import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchCategories } from "@/app/services/category.service";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  const [categoriesRes, packagesRes] = await Promise.all([
    supabase.from("booking_categories").select("*").order("sort_order", { ascending: true }),
    supabase.from("booking_packages").select("*").order("sort_order", { ascending: true }),
  ]);

  if (categoriesRes.error || packagesRes.error) {
    return NextResponse.json({ error: "Failed to load booking data" }, { status: 500 });
  }

  const categories = await fetchCategories() ?? [];
  const packages = packagesRes.data ?? [];
  const grouped = categories.map((category) => ({
    ...category,
    packages: packages.filter((pkg) => pkg.category_id === category.id),
  }));

  return NextResponse.json({
    categories,
    packages,
    grouped,
  });
}
