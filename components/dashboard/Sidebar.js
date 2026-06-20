import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Projects", href: "/dashboard/projects", icon: "🗂️" },
  { name: "Blog Posts", href: "/dashboard/blogs", icon: "📝" },
  { name: "Analytics", href: "/dashboard", icon: "📊" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Portfolio Admin</h1>
      </div>
      <nav className="mt-6 px-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.disabled ? "#" : item.href}
              className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                pathname === item.href
                  ? "bg-purple-700 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
