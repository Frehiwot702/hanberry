"use client";

import Image from "next/image";
import { DashboardMetrics } from "./types";

interface AdminDashboardPanelProps {
  loadingMetrics: boolean;
  metrics: DashboardMetrics;
}

export function AdminDashboardPanel({ loadingMetrics, metrics }: AdminDashboardPanelProps) {
  return (
    <>
      <div className="mt-12 relative h-[150px] w-full overflow-hidden rounded-[34px] mx-auto pb-10">
        <Image
          src="/images/Rectangle 103.png"
          alt="Welcome banner gradient"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <p className="absolute left-8 bottom-7 text-white text-lg font-semibold">
          Welcome back! Here&apos;s what&apos;s happening with your beauty studio today.
        </p>
      </div>

      <StatCard
        className="mt-6"
        title="Pending Bookings"
        description="Stay updated with your client appointments and manage upcoming requests with ease."
        value={loadingMetrics ? "..." : String(metrics.bookings)}
      />
      <StatCard
        className="mt-8"
        title="Active Packages"
        description="View and refine your beauty packages to keep your services fresh and up to date."
        value={loadingMetrics ? "..." : String(metrics.activePackages)}
      />
    </>
  );
}

function StatCard({
  className,
  title,
  description,
  value,
}: {
  className?: string;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <article
      className={`w-full rounded-[34px] h-[150px] border border-black/35 bg-[#f4f4f4] px-10 py-7 flex items-center justify-between mx-auto ${className ?? ""}`}
    >
      <div>
        <h2 className="text-[28px] md:text-[38px] leading-none font-extrabold">{title}</h2>
        <p className="mt-4 text-[12px] md:text-[16px] text-black/60 leading-tight max-w-[560px] font-light">{description}</p>
      </div>
      <span className="text-[62px] md:text-[72px] font-bold leading-none">{value}</span>
    </article>
  );
}
