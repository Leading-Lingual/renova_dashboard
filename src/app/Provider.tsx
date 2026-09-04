"use client";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/context/SidebarProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        {children}
        <Toaster position="top-right" richColors />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
