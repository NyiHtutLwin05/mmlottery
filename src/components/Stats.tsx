import { motion } from "framer-motion";
import { Trophy, Users, DollarSign, Timer } from "lucide-react";
import { useState, useEffect } from "react";

export function Stats() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
  });

  const [jackpot, setJackpot] = useState(1500000000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    // Simulate jackpot increase
    const jackpotTimer = setInterval(() => {
      setJackpot((prev) => prev + Math.floor(Math.random() * 1000000));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(jackpotTimer);
    };
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const stats = [
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      label: "Jackpot",
      value: `${jackpot.toLocaleString()} MMK`,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      label: "Players",
      value: "12,458",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      label: "Total Won",
      value: "890,450,000 MMK",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Timer className="w-6 h-6 text-purple-500" />,
      label: "Next Draw",
      value: `${formatTime(timeLeft.hours)}:${formatTime(
        timeLeft.minutes
      )}:${formatTime(timeLeft.seconds)}`,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">
                    {stat.label}
                  </p>
                  <motion.p
                    key={stat.value}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`text-sm md:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
