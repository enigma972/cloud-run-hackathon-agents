"use client"

import { ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"

export function InfoView() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="flex gap-6 p-6 h-full">
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agent Info</h1>
          <p className="text-muted-foreground">Your AI Agent overview</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("info")} className="w-full flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Your AI Agent Name</h2>
            {expandedSection === "info" ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSection === "info" && (
            <input
              type="text"
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("description")} className="w-full flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Description</h2>
            {expandedSection === "description" ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSection === "description" && (
            <textarea
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Save Info
          </button>
        </div>
      </div>
    </div>
  )
}
