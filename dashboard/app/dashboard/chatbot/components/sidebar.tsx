"use client"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const navItems = [
  {
    group: "Agent Presence",
    items: [
      { id: "info", label: "Info", icon: "ℹ️" },
      { id: "personality", label: "Personality", icon: "👤" },
      { id: "appearance", label: "Appearance", icon: "🎨" },
      { id: "training", label: "Training", icon: "📚" },
      { id: "tools", label: "Tools", icon: "🔧" },
    ],
  },
  {
    group: "Agent Content",
    items: [
      { id: "users-data", label: "Users Data", icon: "👥" },
      { id: "conversations", label: "Conversations", icon: "💬" },
    ],
  },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-center p-6">
      <div className="space-y-8">
        {navItems.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{group.group}</p>
            <nav className="space-y-2">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  )
}
