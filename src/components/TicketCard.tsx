import { motion } from "framer-motion";
import { Ticket as TicketType } from "../types";
import { Calendar, Timer, Award } from "lucide-react";

interface TicketCardProps {
  ticket: TicketType;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100"
    >
      {/* Ticket Header */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800">
              Lucky Draw Ticket
            </h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">#{ticket.id}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            ticket.status === "active"
              ? "bg-green-100 text-green-800"
              : ticket.status === "won"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
      </div>

      {/* Lottery Numbers */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
        <div className="grid grid-cols-6 gap-2">
          {ticket.numbers.map((num, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm"
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Footer */}
      <div className="flex flex-col space-y-2 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>Draw Date:</span>
          </div>
          <span className="font-medium">
            {ticket.drawDate.toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Timer size={16} />
            <span>Price:</span>
          </div>
          <span className="font-medium">
            {ticket.price.toLocaleString()} MMK
          </span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-b-xl" />
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full" />
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full" />
    </motion.div>
  );
}
