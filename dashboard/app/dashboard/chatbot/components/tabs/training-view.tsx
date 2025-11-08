"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export function TrainingView() {
  const [activeTab, setActiveTab] = useState<"knowledge" | "manual">("knowledge")

  return (
    <div className="flex gap-6 p-6 h-full">
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Add Training Data</h1>
          <p className="text-muted-foreground">
            Just upload document file or add a link to website, to train this AI Agent with your own data
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("knowledge")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "knowledge"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            👑 Knowledge Base
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "manual"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Manual Data
          </button>
        </div>

        {activeTab === "knowledge" && (
          <div className="space-y-4">
            {/* Sub-tabs */}
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                Upload File
              </button>
              <button className="px-4 py-2 bg-muted text-foreground hover:bg-muted/80 rounded-lg font-medium">
                Enter URL
              </button>
              <button className="px-4 py-2 bg-muted text-foreground hover:bg-muted/80 rounded-lg font-medium flex items-center gap-2">
                <span>Crawl URLs</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Pro</span>
              </button>
              <button className="px-4 py-2 bg-muted text-foreground hover:bg-muted/80 rounded-lg font-medium flex items-center gap-2">
                <span>FAQs</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Pro</span>
              </button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="text-4xl">📁</div>
                <p className="text-foreground font-medium">
                  Drop here or <span className="text-primary hover:underline cursor-pointer">browse</span>
                </p>
                <p className="text-sm text-muted-foreground">(.pdf, .docx, .csv, .txt) up to 10.0MB</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">Knowledge Base Storage Used: 0 B / 2.56 MB</p>
          </div>
        )}

        {activeTab === "manual" && (
          <div className="space-y-4">
            <p className="text-muted-foreground">Manual data entry options would go here</p>
          </div>
        )}

        {/* Previous Uploads */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Previous Uploads</h3>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search sources..."
              className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <p className="text-muted-foreground text-center py-4">No sources found</p>
        </div>
      </div>
    </div>
  )
}
