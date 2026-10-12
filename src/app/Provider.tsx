"use client";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SidebarProvider } from "@/context/SidebarProvider";
import { ResetPasswordProvider } from "@/context/ResetPasswordProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <ResetPasswordProvider>
          <SidebarProvider>
            {children}
            <Toaster position="top-right" richColors />
          </SidebarProvider>
        </ResetPasswordProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
