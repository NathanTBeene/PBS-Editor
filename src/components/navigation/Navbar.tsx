import { useState } from "react";
import {
  Home,
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  FolderOpen,
  Settings,
  Download,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "users", icon: Users, label: "Users" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
    { id: "analytics", icon: TrendingUp, label: "Analytics" },
    { id: "files", icon: FolderOpen, label: "Files" },
  ];

  const bottomItems = [
    { id: "export", icon: Download, label: "Export" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  interface NavItemProps {
    item: {
      id: string;
      icon: React.ElementType;
      label: string;
    };
    onClick: (id: string) => void;
    isActive: boolean;
  }

  const NavItem = ({ item, onClick, isActive }: NavItemProps) => {
    const Icon = item.icon;

    return (
      <button
        onClick={() => onClick(item.id)}
        className={`
          w-full flex items-center h-12 text-left transition-colors duration-200 relative
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
          }
        `}
      >
        <div className="w-16 flex justify-center flex-shrink-0">
          <Icon size={20} />
        </div>
        {isExpanded && (
          <span className="font-medium text-sm transition-opacity duration-300">
            {item.label}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full bg-slate-800 border-r border-slate-700
          transition-all duration-300 ease-in-out z-50 flex flex-col overflow-x-hidden
          ${isExpanded ? "w-60" : "w-16"}
        `}
      >
        {/* Hamburger Toggle */}
        <div className="flex items-center justify-start pl-3 h-16 border-b border-slate-700">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors duration-200"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Main Navigation Items */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              onClick={setActiveItem}
              isActive={activeItem === item.id}
            />
          ))}
        </nav>

        {/* Bottom Buttons */}
        <div className="border-t border-slate-700 pb-2">
          {bottomItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              onClick={setActiveItem}
              isActive={activeItem === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
