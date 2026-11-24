"use client";

import { PostHogProvider } from "posthog-js/react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostHogProvider
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY!}
      options={{
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      }}
    >
      {children}
    </PostHogProvider>
  );
}