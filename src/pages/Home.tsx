import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LotteryBall } from "../components/LotteryBall";
import { Sparkles, Gift, ArrowRight, Dices, Edit } from "lucide-react";
import toast from "react-hot-toast";

export function Home() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [customMode, setCustomMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [walletBalance, setWalletBalance] = useState(250000); // Initial balance
  const ticketPrice = 2000;

  const generateTicket = () => {
    setIsGenerating(true);
    const newNumbers: number[] = [];
    while (newNumbers.length < 6) {
      const num = Math.floor(Math.random() * 9) + 1;
      if (!newNumbers.includes(num)) {
        newNumbers.push(num);
      }
    }
    newNumbers.sort((a, b) => a - b);

    setTimeout(() => {
      setNumbers(newNumbers);
      setIsGenerating(false);
      toast.success("Numbers generated successfully!");
    }, 1000);
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (/^[1-9]$/.test(value) && !numbers.includes(parseInt(value)))
    ) {
      setCurrentNumber(value);
    }
  };

  const addCustomNumber = () => {
    if (currentNumber && numbers.length < 6) {
      const num = parseInt(currentNumber);
      setNumbers([...numbers, num].sort((a, b) => a - b));
      setCurrentNumber("");
      if (numbers.length === 5) {
        toast.success("All numbers selected!");
      }
    }
  };

  const removeNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const buyTicket = () => {
    if (walletBalance < ticketPrice) {
      toast.error("Insufficient balance! Please top up your wallet.");
      return;
    }

    setWalletBalance((prev) => prev - ticketPrice);
    const ticket = {
      id: Math.random().toString(36).substr(2, 9),
      numbers: [...numbers],
      purchaseDate: new Date(),
      drawDate: new Date(Date.now() + 86400000),
      price: ticketPrice,
      status: "active",
    };

    // In a real app, this would be handled by a proper state management system
    const existingTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    localStorage.setItem(
      "tickets",
      JSON.stringify([...existingTickets, ticket])
    );

    toast.success("Ticket purchased successfully!");
    navigate("/my-tickets");
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
            <p className="text-2xl font-bold text-purple-600">
              1,500,000,000 MMK
            </p>
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

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setCustomMode(false)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              !customMode
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Dices size={20} />
            <span>Random</span>
          </button>
          <button
            onClick={() => setCustomMode(true)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              customMode
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Edit size={20} />
            <span>Custom</span>
          </button>
        </div>

        {customMode ? (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Choose Your Numbers</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select 6 unique numbers from 1 to 9
            </p>

            <div className="flex gap-2 justify-center mb-4">
              {numbers.map((num, index) => (
                <div
                  key={index}
                  onClick={() => removeNumber(index)}
                  className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold cursor-pointer hover:bg-purple-200 transition-colors"
                >
                  {num}
                </div>
              ))}
              {Array(6 - numbers.length)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"
                  >
                    ?
                  </div>
                ))}
            </div>

            {numbers.length < 6 && (
              <div className="flex justify-center gap-2">
                <input
                  type="text"
                  value={currentNumber}
                  onChange={handleNumberInput}
                  placeholder="Enter a number"
                  className="w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxLength={1}
                />
                <button
                  onClick={addCustomNumber}
                  disabled={!currentNumber}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={generateTicket}
            disabled={isGenerating}
            className="w-full md:w-auto flex items-center justify-center space-x-2 mx-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-lg">
              {isGenerating ? "Generating..." : "Generate Lucky Numbers"}
            </span>
          </button>
        )}
      </motion.div>

      {numbers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 md:p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
            Your Lucky Numbers
          </h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {numbers.map((number, index) => (
              <LotteryBall key={index} number={number} delay={index * 0.1} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={buyTicket}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Buy Ticket for {ticketPrice.toLocaleString()} MMK
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
