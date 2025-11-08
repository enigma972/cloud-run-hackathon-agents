"use client"

import { useState, Suspense } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const mainNavItems = [
  { id: "info", label: "Info" },
  { id: "personality", label: "Personality"},
  { id: "appearance", label: "Appearance"},
  { id: "training", label: "Training"},
]


// Composant interne qui gère la navigation
function NavigationContent({ activeTab, setActiveTab }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileActiveSection, setMobileActiveSection] = useState<"presence" | "content" | null>(null)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    setIsOpen(false)
    setMobileActiveSection(null)
  }

  const getActiveTabLabel = () => {
    const allItems = [...mainNavItems]
    const activeItem = allItems.find(item => item.id === activeTab)
    return activeItem ? `${activeItem.label}` : "Navigation"
  }

  return (
    <div className="border-b border-sidebar-border bg-sidebar sticky top-0 z-50">
      {/* Barre de navigation mobile compacte */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/50 border border-border hover:bg-card transition-colors"
          >
            <Menu size={18} />
            <span className="font-medium text-sm">{getActiveTabLabel()}</span>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Menu mobile dépliant */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-sidebar border-b border-border shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              {/* En-tête mobile */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Navigation</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-card/50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation par sections mobile */}
              <div className="space-y-4">
                {/* Section Agent Presence */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setMobileActiveSection(mobileActiveSection === "presence" ? null : "presence")}
                    className="w-full flex items-center justify-between px-4 py-3 bg-card/30 hover:bg-card/50 transition-colors"
                  >
                    <span className="font-semibold text-sm">Agent Presence</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${mobileActiveSection === "presence" ? "rotate-180" : ""}`} 
                    />
                  </button>
                  
                  {mobileActiveSection === "presence" && (
                    <div className="border-t border-border bg-sidebar">
                      {mainNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border last:border-b-0 ${
                            activeTab === item.id
                              ? "bg-primary/10 text-primary border-r-4 border-r-primary"
                              : "hover:bg-card/30 text-foreground"
                          }`}
                        >
                          <span className="font-medium text-sm flex-1">{item.label}</span>
                          {activeTab === item.id && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section Agent Content */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setMobileActiveSection(mobileActiveSection === "content" ? null : "content")}
                    className="w-full flex items-center justify-between px-4 py-3 bg-card/30 hover:bg-card/50 transition-colors"
                  >
                    <span className="font-semibold text-sm">Agent Content</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${mobileActiveSection === "content" ? "rotate-180" : ""}`} 
                    />
                  </button>
                </div>
              </div>

              {/* Bouton fermer en bas sur mobile */}
              <div className="mt-6 pt-4 border-t border-border">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-card border border-border rounded-lg font-medium text-sm hover:bg-card/50 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation desktop - toujours visible */}
      <div className="hidden md:block px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Main Agent Presence Navigation */}
          <div className="flex-1">
            <nav className="flex flex-wrap gap-2">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap border ${
                    activeTab === item.id
                      ? "bg-card text-sidebar-foreground shadow-sm border-primary/20"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-card/50 border-transparent hover:border-border"
                  }`}
                >
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant exporté avec Suspense
export function Navigation(props: NavigationProps) {
  return (
    <Suspense fallback={<NavigationSkeleton />}>
      <NavigationContent {...props} />
    </Suspense>
  )
}

// Squelette de chargement
function NavigationSkeleton() {
  return (
    <div className="border-b border-sidebar-border bg-sidebar sticky top-0 z-50">
      {/* Squelette mobile */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/30 border border-border animate-pulse">
          <div className="w-5 h-5 bg-muted-foreground/20 rounded"></div>
          <div className="h-4 bg-muted-foreground/20 rounded flex-1 max-w-[120px]"></div>
          <div className="w-4 h-4 bg-muted-foreground/20 rounded"></div>
        </div>
      </div>

      {/* Squelette desktop */}
      <div className="hidden md:block px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Squelette Agent Presence */}
          <div className="flex-1">
            <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-3 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {mainNavItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/30 border border-transparent animate-pulse"
                >
                  <div className="h-4 bg-muted-foreground/20 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Squelette Agent Content */}
          <div className="flex-1">
            <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}