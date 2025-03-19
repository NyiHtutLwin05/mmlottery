import { motion } from 'framer-motion';
import { Calendar, Trophy, Search } from 'lucide-react';
import { LotteryBall } from '../components/LotteryBall';

interface DrawResult {
  id: string;
  date: string;
  numbers: number[];
  prize: string;
  winners: number;
}

export function Results() {
  const results: DrawResult[] = [
    {
      id: '1',
      date: '2024-03-15',
      numbers: [7, 13, 23, 32, 41, 45],
      prize: '1,500,000,000 MMK',
      winners: 1
    },
    {
      id: '2',
      date: '2024-03-14',
      numbers: [3, 11, 19, 27, 35, 44],
      prize: '1,200,000,000 MMK',
      winners: 2
    },
    {
      id: '3',
      date: '2024-03-13',
      numbers: [5, 16, 22, 31, 38, 42],
      prize: '1,000,000,000 MMK',
      winners: 1
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Lottery Results</h1>
        <p className="text-gray-600">View past draw results and winning numbers</p>
      </motion.div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by date or draw number"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 md:p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Calendar className="text-gray-400" size={20} />
                <span className="font-medium">{result.date}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="text-yellow-500" size={20} />
                <span className="font-semibold text-yellow-600">{result.prize}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              {result.numbers.map((number, idx) => (
                <LotteryBall key={idx} number={number} delay={idx * 0.1} />
              ))}
            </div>

            <div className="text-center md:text-left text-sm text-gray-600">
              {result.winners} winner{result.winners !== 1 ? 's' : ''}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}