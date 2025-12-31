import type { Metadata } from "next"
import "@/styles/globals.css"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { AppProvider } from "./provider"
import { getUserQueryOptions } from "@/lib/auth"
import { Notifications } from "@/components/ui/notification/notification"

export const metadata: Metadata = {
  title: "Quonet",
  description: "Application for posting questions.",
  icons: {
    icon: "/favicon.ico",
  },
}

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  /*for prefetching data n send it to client with query keys so queryClient doesn't fetch. */
  /*
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserQueryOptions());
  const dehydratedState = dehydrate(queryClient);
  */
  return (
    <html lang="en">
      <body className={`font-arial antialiased`}>
        <AppProvider>
          <HydrationBoundary state={undefined}>
            <Notifications />
            {children}
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout

export const dynamic = "force-dynamic"
