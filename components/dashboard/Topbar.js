import { motion } from "framer-motion";

export default function Topbar({ user }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div></div> {/* Spacer */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.displayName || user?.email}
            </p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>

          <div className="relative">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {}}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </header>
  );
}
