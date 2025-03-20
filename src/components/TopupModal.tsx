import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Smartphone, Ban as Bank } from "lucide-react";
import toast from "react-hot-toast";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number) => void;
}

export function TopUpModal({ isOpen, onClose, onTopUp }: TopUpModalProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "mobile" | "bank"
  >("mobile");

  const handleTopUp = () => {
    const numAmount = parseInt(amount);
    if (!numAmount || numAmount < 1000) {
      toast.error("Please enter a valid amount (minimum 1,000 MMK)");
      return;
    }
    onTopUp(numAmount);
    toast.success("Top up successful!");
    onClose();
    setAmount("");
  };

  const paymentMethods = [
    {
      id: "mobile",
      name: "Mobile Banking",
      icon: <Smartphone className="w-6 h-6" />,
      description: "KBZ Pay, Wave Pay, CB Pay",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Visa, Mastercard, MPU",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Bank className="w-6 h-6" />,
      description: "Direct bank transfer",
    },
  ];

  const quickAmounts = [10000, 20000, 50000, 100000];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Top Up Wallet</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount (MMK)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter amount"
                  min="1000"
                />
                <div className="flex gap-2 mt-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className="flex-1 px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`w-full flex items-center p-3 rounded-lg border transition-colors ${
                        paymentMethod === method.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`${
                          paymentMethod === method.id
                            ? "text-purple-600"
                            : "text-gray-500"
                        }`}
                      >
                        {method.icon}
                      </div>
                      <div className="ml-3 text-left">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-500">
                          {method.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTopUp}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Top Up
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
