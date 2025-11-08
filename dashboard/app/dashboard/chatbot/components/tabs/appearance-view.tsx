"use client"

import { ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"

export function AppearanceView() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    welcome: true,
    display: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="flex gap-6 p-6 h-full">
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agent Info</h1>
        </div>

        {/* Welcome Message */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("welcome")} className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Welcome Message</h2>
              <p className="text-sm text-muted-foreground">Write a welcome message</p>
            </div>
            {expandedSections.welcome ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.welcome && (
            <div className="space-y-3">
              <input
                type="text"
                defaultValue="Hi! What can I help you with?"
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        </div>

        {/* Ice Breaker Questions */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ice breaker Questions</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Give people suggested prompts to start the conversation with your agent
          </p>
          <div className="space-y-3">
            <input
              type="text"
              defaultValue="Question1"
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              defaultValue="Question2"
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="text-primary hover:text-primary/80 font-medium text-sm mt-2">+ Add Question</button>
        </div>

        {/* Display Settings */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("display")} className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Display</h2>
              <p className="text-sm text-muted-foreground">
                Customize how your chat looks and when it appears. Change colors, position, and chat window style to
                match your brand.
              </p>
            </div>
            {expandedSections.display ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.display && (
            <div className="space-y-6 pt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  defaultValue="AI Bot"
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Subtitle</span>
                  <span className="text-xs text-muted-foreground">20/90</span>
                </label>
                <input
                  type="text"
                  defaultValue="Ask me any question."
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Input Placeholder Text</label>
                <input
                  type="text"
                  defaultValue="Type your message here"
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Agent Avatar</label>
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">👤</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Button Image</label>
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">🔵</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Agent Position</label>
                  <select className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Right</option>
                    <option>Left</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary border border-border"></div>
                    <span className="text-sm text-muted-foreground">#7C3AED</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-foreground">Auto Trigger</span>
                </label>
                <div className="bg-muted border border-border rounded-lg px-4 py-3 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Trigger time (seconds)</span>
                  <input
                    type="number"
                    defaultValue="6"
                    className="w-12 bg-background border border-border rounded px-2 py-1 text-foreground text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Settings */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Advanced Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Output Language</label>
              <select className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>English (UK)</option>
                <option>English (US)</option>
                <option>French</option>
              </select>
            </div>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Watermark</span>
              <input type="checkbox" className="w-4 h-4" defaultChecked />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
