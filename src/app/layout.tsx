import type { Metadata } from "next"
import "@/styles/globals.css"
import { AppProvider } from "./provider"
import { Notifications } from "@/components/ui/notification/notification"

export const metadata: Metadata = {
  title: "Quonet",
  description: "Application for posting questions.",
  icons: {
    icon: "/favicon.ico",
  },
}

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`font-arial antialiased`}>
        <AppProvider>
          <Notifications />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
