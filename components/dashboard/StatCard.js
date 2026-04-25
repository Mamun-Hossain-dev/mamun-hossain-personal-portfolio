import { motion } from "framer-motion";

export default function StatCard({ title, value, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700"
    >
      <div className="flex items-center">
        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 text-2xl">
          {icon}
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
