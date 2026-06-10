"use client";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          if (!user) {
            router.push("/admin/login");
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
}