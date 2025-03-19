import { Link, useLocation } from 'react-router-dom';
import { Ticket, User, Wallet, Trophy } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Ticket className="w-8 h-8 text-purple-600 transform group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LuckyDraw
            </span>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="bg-green-100 px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2">
              <Wallet size={18} className="text-green-600" />
              <span className="font-semibold text-green-600 text-sm md:text-base">250,000 MMK</span>
            </div>
            
            <Link
              to="/results"
              className={`hidden md:flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                isActive('/results')
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Trophy size={20} />
              <span>Results</span>
            </Link>
            
            <Link
              to="/my-tickets"
              className={`hidden md:flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                isActive('/my-tickets')
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Ticket size={20} />
              <span>My Tickets</span>
            </Link>
            
            <Link
              to="/account"
              className={`flex items-center space-x-1 px-3 md:px-4 py-2 rounded-lg transition-colors ${
                isActive('/account')
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <User size={20} />
              <span className="hidden md:inline">Account</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link
              to="/results"
              className={`flex flex-col items-center py-1 ${
                isActive('/results') ? 'text-yellow-600' : 'text-gray-600'
              }`}
            >
              <Trophy size={20} />
              <span className="text-xs mt-1">Results</span>
            </Link>
            <Link
              to="/my-tickets"
              className={`flex flex-col items-center py-1 ${
                isActive('/my-tickets') ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              <Ticket size={20} />
              <span className="text-xs mt-1">Tickets</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}