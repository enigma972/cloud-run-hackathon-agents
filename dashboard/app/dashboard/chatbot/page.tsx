"use client"

import { Navigation } from "./components/navigation"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { InfoView } from "./components/tabs/info-view"
import { PersonalityView } from "./components/tabs/personality-view"
import { AppearanceView } from "./components/tabs/appearance-view"
import { TrainingView } from "./components/tabs/training-view"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"

export default function SetupContent() {
  const searchParams = useSearchParams()
  const view = searchParams.get("view") || "info"

  const [activeTab, setActiveTab] = useState("info")

  const tabs = {
    info: <InfoView />,
    personality: <PersonalityView />,
    appearance: <AppearanceView />,
    training: <TrainingView />,
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="p-flex-1 overflow-y-auto">{tabs[activeTab as keyof typeof tabs]}</div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    // <div className="flex flex-col min-h-screen bg-background">
    //   <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    //   <div className="p-flex-1 overflow-y-auto">{tabs[activeTab as keyof typeof tabs]}</div>
    // </div>
  )
}
