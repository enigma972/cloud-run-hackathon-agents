"use client"

import { ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export function AppearanceView() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    welcome: true,
    icebreakers: true,
    display: true,
    advanced: true,
  })

  const [welcomeMessage, setWelcomeMessage] = useState("Hi! What can I help you with?")
  const [showPopup, setShowPopup] = useState(false)
  const [iceBreakers, setIceBreakers] = useState(["Question1", "Question2"])
  const [newIceBreaker, setNewIceBreaker] = useState("")

  const [displaySettings, setDisplaySettings] = useState({
    title: "AI Bot",
    subtitle: "Ask me any question.",
    placeholder: "Type your message here",
    avatar: "",
    buttonImage: "",
    position: "Right",
    primaryColor: "#7C3AED",
    autoTrigger: false,
    triggerTime: 6,
  })

  const handleChange = (key: string, value: any) => {
    setDisplaySettings((prev) => ({ ...prev, [key]: value }))
    markDirty("display")
  }

  const [advancedSettings, setAdvancedSettings] = useState({
    language: "English (UK)",
    watermark: true,
  })

  const [dirty, setDirty] = useState<Record<string, boolean>>({
    welcome: false,
    icebreakers: false,
    display: false,
    advanced: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const markDirty = (key: keyof typeof dirty) => {
    setDirty((prev) => ({ ...prev, [key]: true }))
  }

  const handleSave = async (section: keyof typeof dirty) => {
    console.log(`Saving ${section} data...`)
    setDirty((prev) => ({ ...prev, [section]: false }))
  }

  const addIceBreaker = () => {
    if (newIceBreaker.trim()) {
      setIceBreakers([...iceBreakers, newIceBreaker.trim()])
      setNewIceBreaker("")
      markDirty("icebreakers")
    }
  }

  const deleteIceBreaker = (index: number) => {
    setIceBreakers(iceBreakers.filter((_, i) => i !== index))
    markDirty("icebreakers")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, key: "avatar" | "buttonImage") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDisplaySettings((prev) => ({ ...prev, [key]: reader.result as string }))
        markDirty("display")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = (key: "avatar" | "buttonImage") => {
    setDisplaySettings((prev) => ({ ...prev, [key]: "" }))
    markDirty("display")
  }

  return (
    <div className="flex gap-6 p-6 h-full">
      <div className="flex-1 space-y-4 overflow-y-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Agent Info</h1>

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
            <>
              <input
                type="text"
                value={welcomeMessage}
                onChange={(e) => {
                  setWelcomeMessage(e.target.value)
                  markDirty("welcome")
                }}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <label className="flex items-center justify-between text-sm mt-3">
                <span className="text-foreground">Show questions in Popup as well?</span>
                <input
                  type="checkbox"
                  checked={showPopup}
                  onChange={(e) => {
                    setShowPopup(e.target.checked)
                    markDirty("welcome")
                  }}
                  className="w-5 h-5 accent-primary rounded"
                />
              </label>

              <p className="text-xs text-muted-foreground mt-1">
                Activating this will display your icebreaker questions as a popup before the user opens the chat menu.
              </p>

              <button
                onClick={() => handleSave("welcome")}
                disabled={!dirty.welcome}
                className={`mt-3 px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
                  dirty.welcome
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Save Info
              </button>
            </>
          )}
        </div>

        {/* Ice Breaker Questions */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("icebreakers")} className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Ice Breaker Questions</h2>
              <p className="text-sm text-muted-foreground">
                Give people suggested prompts to start the conversation with your agent.
              </p>
            </div>
            {expandedSections.icebreakers ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.icebreakers && (
            <>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newIceBreaker}
                    onChange={(e) => setNewIceBreaker(e.target.value)}
                    placeholder="Add new question..."
                    className="flex-1 bg-muted border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={addIceBreaker}
                    className="bg-primary text-primary-foreground px-3 rounded-lg flex items-center justify-center hover:bg-primary/80 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <ul className="space-y-2">
                  {iceBreakers.map((q, i) => (
                    <li
                      key={i}
                      className="bg-muted border border-border rounded-lg px-4 py-2 flex justify-between items-center"
                    >
                      <span>{q}</span>
                      <button
                        onClick={() => deleteIceBreaker(i)}
                        className="text-muted-foreground hover:text-destructive transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSave("icebreakers")}
                disabled={!dirty.icebreakers}
                className={`mt-3 px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
                  dirty.icebreakers
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Save Info
              </button>
            </>
          )}
        </div>

        {/* Display Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("display")} className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Display Settings</h2>
              <p className="text-sm text-muted-foreground">
                Customize how your chat looks and when it appears.
              </p>
            </div>
            {expandedSections.display ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.display && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={displaySettings.title}
                    onChange={(e) => {
                      setDisplaySettings({ ...displaySettings, title: e.target.value })
                      markDirty("display")
                    }}
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={displaySettings.subtitle}
                    onChange={(e) => {
                      setDisplaySettings({ ...displaySettings, subtitle: e.target.value })
                      markDirty("display")
                    }}
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Input Placeholder</label>
                  <input
                    type="text"
                    value={displaySettings.placeholder}
                    onChange={(e) => {
                      setDisplaySettings({ ...displaySettings, placeholder: e.target.value })
                      markDirty("display")
                    }}
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-start">
                    <label className="text-sm font-medium mb-2">Agent Avatar</label>
                    <div className="relative w-16 h-16 rounded-full bg-muted border border-border overflow-hidden flex items-center justify-center">
                      {displaySettings.avatar ? (
                        <img src={displaySettings.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">👤</span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "avatar")}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <label className="text-sm font-medium mb-2">Button Image</label>
                    <div className="relative w-16 h-16 rounded-lg bg-muted border border-border overflow-hidden flex items-center justify-center">
                      {displaySettings.buttonImage ? (
                        <img src={displaySettings.buttonImage} alt="Button" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">🔵</span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "buttonImage")}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Agent Position</label>
                    <select
                      value={displaySettings.position}
                      onChange={(e) => {
                        setDisplaySettings({ ...displaySettings, position: e.target.value })
                        markDirty("display")
                      }}
                      className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>Right</option>
                      <option>Left</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Primary Color</label>
                    <input
                      type="color"
                      value={displaySettings.primaryColor}
                      onChange={(e) => {
                        setDisplaySettings({ ...displaySettings, primaryColor: e.target.value })
                        markDirty("display")
                      }}
                      className="w-12 h-12 border border-border rounded cursor-pointer"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={displaySettings.autoTrigger}
                    onChange={(e) => {
                      setDisplaySettings({ ...displaySettings, autoTrigger: e.target.checked })
                      markDirty("display")
                    }}
                    className="w-5 h-5 accent-primary rounded"
                  />
                  <span>Auto Trigger</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Trigger time (seconds)</span>
                  <input
                    type="number"
                    value={displaySettings.triggerTime}
                    onChange={(e) => {
                      setDisplaySettings({ ...displaySettings, triggerTime: Number(e.target.value) })
                      markDirty("display")
                    }}
                    className="w-16 bg-background border border-border rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSave("display")}
                disabled={!dirty.display}
                className={`mt-3 px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
                  dirty.display
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Save Info
              </button>
            </>
          )}
        </div>

        {/* Advanced Settings */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("advanced")} className="w-full flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Advanced Settings</h3>
            {expandedSections.advanced ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.advanced && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Output Language</label>
                  <select
                    value={advancedSettings.language}
                    onChange={(e) => {
                      setAdvancedSettings({ ...advancedSettings, language: e.target.value })
                      markDirty("advanced")
                    }}
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>English (UK)</option>
                    <option>English (US)</option>
                    <option>French</option>
                  </select>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={advancedSettings.watermark}
                    onChange={(e) => {
                      setAdvancedSettings({ ...advancedSettings, watermark: e.target.checked })
                      markDirty("advanced")
                    }}
                    className="w-5 h-5 accent-primary rounded"
                  />
                  <span>Watermark</span>
                </label>
              </div>

              <button
                onClick={() => handleSave("advanced")}
                disabled={!dirty.advanced}
                className={`mt-3 px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
                  dirty.advanced
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Save Info
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
