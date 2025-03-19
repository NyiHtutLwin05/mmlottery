import { useState } from 'react';
import { motion } from 'framer-motion';
import { TicketCard } from '../components/TicketCard';
import { Ticket } from '../types';

export function MyTickets() {
  // Mock data - in a real app, this would come from an API
  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      numbers: [7, 13, 23, 32, 41, 45],
      purchaseDate: new Date(),
      drawDate: new Date(Date.now() + 86400000), // Tomorrow
      price: 2,
      status: 'active'
    },
    {
      id: '2',
      numbers: [3, 11, 19, 27, 35, 44],
      purchaseDate: new Date(Date.now() - 86400000), // Yesterday
      drawDate: new Date(Date.now() - 86400000),
      price: 2,
      status: 'lost'
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tickets</h1>
        <p className="text-gray-600">View and manage your lottery tickets</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't purchased any tickets yet.</p>
        </div>
      )}
    </div>
  );
}