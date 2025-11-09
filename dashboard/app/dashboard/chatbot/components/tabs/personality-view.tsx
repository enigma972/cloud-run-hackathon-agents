"use client"

import { ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export function PersonalityView() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personality: true,
    model: false,
    tool: false,
    length: false,
    tone: false,
    instructions: false,
  })

  // États des champs
  const [selectedTone, setSelectedTone] = useState("professional")
  const [selectedModel, setSelectedModel] = useState("chatgpt-4-mini")
  const [selectedLength, setSelectedLength] = useState("Standard")
  const [instructions, setInstructions] = useState<string[]>([])
  const [newInstruction, setNewInstruction] = useState("")
  const [personalityText, setPersonalityText] = useState("")

  // États des boutons de sauvegarde
  const [dirty, setDirty] = useState<Record<string, boolean>>({
    personality: false,
    model: false,
    tool: false,
    length: false,
    tone: false,
    instructions: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const markDirty = (key: keyof typeof dirty) => {
    setDirty((prev) => ({ ...prev, [key]: true }))
  }

  // 🔥 Prépare la fonction de sauvegarde (Firebase à ajouter plus tard)
  const handleSave = async (section: keyof typeof dirty) => {
    console.log(`Saving ${section} data to Firebase...`)
    // Exemple pour Firestore :
    // await setDoc(doc(db, "users", userId), { [section]: data }, { merge: true })
    setDirty((prev) => ({ ...prev, [section]: false }))
  }

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction.trim()])
      setNewInstruction("")
      markDirty("instructions")
    }
  }

  const deleteInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index))
    markDirty("instructions")
  }

  const tones = [
    { id: "professional", label: "Professional" },
    { id: "informal", label: "Informal" },
    { id: "optimistic", label: "Optimistic" },
    { id: "pessimistic", label: "Pessimistic" },
    { id: "joyful", label: "Joyful" },
    { id: "sad", label: "Sad" },
    { id: "sincere", label: "Sincere" },
    { id: "hypocritical", label: "Hypocritical" },
    { id: "fearful", label: "Fearful" },
    { id: "hopeful", label: "Hopeful" },
    { id: "happy", label: "Happy" },
  ]

  return (
    <div className="flex gap-6 p-6 h-full">
      <div className="flex-1 space-y-4 overflow-y-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Agent Personality</h1>

        {/* Personality Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("personality")} className="w-full flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Your name is "AI Assistant"</h2>
            {expandedSections.personality ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.personality && (
            <>
              <textarea
                value={personalityText}
                onChange={(e) => {
                  setPersonalityText(e.target.value)
                  markDirty("personality")
                }}
                placeholder="Describe your AI's personality..."
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
              />
              <button
                onClick={() => handleSave("personality")}
                disabled={!dirty.personality}
                className={`px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
                  dirty.personality
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Save Info
              </button>
            </>
          )}
        </div>

        {/* Chat Model Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-2">Select Chat Model</h3>
          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value)
              markDirty("model")
            }}
            className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="chatgpt-4-mini">ChatGPT 5 Mini (Azure)</option>
            <option value="gpt4">GPT-4</option>
            <option value="gpt35">GPT-3.5</option>
          </select>
          <button
            onClick={() => handleSave("model")}
            disabled={!dirty.model}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
              dirty.model
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Save Info
          </button>
        </div>

        {/* Tool Calling Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Show tool calling</h3>
              <p className="text-sm text-muted-foreground">
                Enable to display real-time tool calls during AI responses for transparency.
              </p>
            </div>
            <input
              type="checkbox"
              onChange={() => markDirty("tool")}
              className="w-6 h-6 rounded accent-primary"
            />
          </div>
          <button
            onClick={() => handleSave("tool")}
            disabled={!dirty.tool}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
              dirty.tool
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Save Info
          </button>
        </div>
        {/* Agent Instructions Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <button onClick={() => toggleSection("instructions")} className="w-full flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-start">Agent Instructions</h3>
              <p className="text-sm text-muted-foreground">
                Add or remove specific instructions that your AI agent should follow.
              </p>
            </div>
            {expandedSections.instructions ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.instructions && (
            <>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInstruction}
                    onChange={(e) => setNewInstruction(e.target.value)}
                    placeholder="Enter a new instruction..."
                    className="flex-1 bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={addInstruction}
                    className="bg-primary text-primary-foreground px-3 rounded-lg flex items-center justify-center hover:bg-primary/80 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <ul className="space-y-2 text-sm text-foreground">
                  {instructions.length > 0 ? (
                    instructions.map((inst, i) => (
                      <li
                        key={i}
                        className="bg-muted px-4 py-2 rounded-lg border border-border flex justify-between items-center"
                      >
                        <span>{inst}</span>
                        <button
                          onClick={() => deleteInstruction(i)}
                          className="text-muted-foreground hover:text-destructive transition"
                          title="Delete instruction"
                        >
                          <Trash2 size={18} />
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-muted-foreground italic">No instructions added yet.</li>
                  )}
                </ul>
              </div>

              <button
                onClick={() => handleSave("instructions")}
                disabled={!dirty.instructions}
                className={`mt-3 px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
                  dirty.instructions
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Save Info
              </button>
            </>
          )}
        </div>

        {/* Answer Length Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Answer Length</h3>
          <div className="flex gap-4">
            {["Concise", "Standard", "Thorough"].map((length) => (
              <label key={length} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="answer-length"
                  value={length}
                  checked={selectedLength === length}
                  onChange={() => {
                    setSelectedLength(length)
                    markDirty("length")
                  }}
                  className="accent-primary w-5 h-5"
                />
                <span className="text-foreground font-medium">{length}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => handleSave("length")}
            disabled={!dirty.length}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
              dirty.length
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Save Info
          </button>
        </div>

        {/* Agent Tone Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Agent Tone</h3>
          <div className="grid grid-cols-2 gap-3">
            {tones.map((tone) => (
              <label
                key={tone.id}
                className="flex items-center gap-2 cursor-pointer bg-muted rounded-lg px-4 py-2 hover:bg-muted/80 transition"
              >
                <input
                  type="radio"
                  name="tone"
                  value={tone.id}
                  checked={selectedTone === tone.id}
                  onChange={() => {
                    setSelectedTone(tone.id)
                    markDirty("tone")
                  }}
                  className="accent-primary w-5 h-5"
                />
                <span className="font-medium text-foreground">{tone.label}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => handleSave("tone")}
            disabled={!dirty.tone}
            className={`px-4 py-2 rounded-lg font-medium transition-colors w-fit ${
              dirty.tone
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Save Info
          </button>
        </div>
      </div>
    </div>
  )
}
