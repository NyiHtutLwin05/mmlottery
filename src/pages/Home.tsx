import { useState } from 'react';
import { motion } from 'framer-motion';
import { LotteryBall } from '../components/LotteryBall';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  
  const generateTicket = () => {
    setIsGenerating(true);
    const newNumbers: number[] = [];
    while (newNumbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!newNumbers.includes(num)) {
        newNumbers.push(num);
      }
    }
    newNumbers.sort((a, b) => a - b);
    
    setTimeout(() => {
      setNumbers(newNumbers);
      setIsGenerating(false);
      toast.success('Ticket generated successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Try Your Luck Today!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Generate your lucky numbers and win big in our weekly lottery draw
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Weekly Prize</h3>
            <p className="text-2xl font-bold text-purple-600">1,500,000,000 MMK</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Next Draw</h3>
            <p className="text-2xl font-bold text-blue-600">23:45:12</p>
          </motion.div>
        </div>
        
        <button
          onClick={generateTicket}
          disabled={isGenerating}
          className="w-full md:w-auto flex items-center justify-center space-x-2 mx-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
        >
          <Sparkles className="w-6 h-6" />
          <span className="text-lg">{isGenerating ? 'Generating...' : 'Generate Lucky Numbers'}</span>
        </button>
      </motion.div>

      {numbers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 md:p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">Your Lucky Numbers</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {numbers.map((number, index) => (
              <LotteryBall key={index} number={number} delay={index * 0.1} />
            ))}
          </div>
          
          <div className="text-center">
            <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg hover:shadow-xl">
              Buy Ticket for 2,000 MMK
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Next draw: Tomorrow at 9 PM MMT
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}