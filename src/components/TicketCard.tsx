import { motion } from 'framer-motion';
import { Ticket } from '../types';
import { Calendar, Timer } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Ticket #{ticket.id}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          ticket.status === 'active' ? 'bg-green-100 text-green-800' :
          ticket.status === 'won' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
      </div>
      
      <div className="flex gap-2 mb-4">
        {ticket.numbers.map((num, idx) => (
          <div key={idx} className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-semibold">
            {num}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{ticket.drawDate.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Timer size={16} />
          <span>${ticket.price}</span>
        </div>
      </div>
    </motion.div>
  );
}