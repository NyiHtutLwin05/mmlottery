import { motion } from 'framer-motion';

interface LotteryBallProps {
  number: number;
  delay?: number;
}

export function LotteryBall({ number, delay = 0 }: LotteryBallProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 
                 flex items-center justify-center text-white font-bold text-xl shadow-lg"
    >
      {number}
    </motion.div>
  );
}