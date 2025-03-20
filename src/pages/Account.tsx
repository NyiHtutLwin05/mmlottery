import { motion } from "framer-motion";
import { useState } from "react";
import {
  CreditCard,
  History,
  Settings,
  Bell,
  Gift,
  ChevronRight,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { TopUpModal } from "../components/TopupModal";

export function Account() {
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(250000);

  const handleTopUp = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
  };

  const transactions = [
    {
      type: "deposit",
      amount: 100000,
      date: "2024-03-15",
      description: "Wallet Top-up",
    },
    {
      type: "purchase",
      amount: -10000,
      date: "2024-03-14",
      description: "5 Lottery Tickets",
    },
    {
      type: "win",
      amount: 50000,
      date: "2024-03-13",
      description: "Lucky Draw Win",
    },
  ];

  const menuItems = [
    {
      icon: <CreditCard size={20} />,
      label: "Payment Methods",
      badge: "2 Cards",
    },
    {
      icon: <History size={20} />,
      label: "Purchase History",
      badge: "24 Items",
    },
    { icon: <Bell size={20} />, label: "Notifications", badge: "3 New" },
    { icon: <Settings size={20} />, label: "Account Settings" },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Account
          </h1>
          <p className="text-gray-600">
            Manage your account settings and view transactions
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-full md:col-span-2 space-y-6"
          >
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Wallet size={24} />
                  <span className="text-lg font-semibold">Wallet Balance</span>
                </div>
                <button
                  onClick={() => setIsTopUpModalOpen(true)}
                  className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  Top Up
                </button>
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-4">
                {walletBalance.toLocaleString()} MMK
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Gift size={16} />
                <span>5 Active Tickets</span>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Recent Transactions
              </h2>
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "deposit"
                            ? "bg-green-100"
                            : transaction.type === "win"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <ArrowDownRight className="text-green-600" />
                        ) : transaction.type === "win" ? (
                          <Gift className="text-yellow-600" />
                        ) : (
                          <ArrowUpRight className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString()} MMK
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Menu Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-full md:col-span-1 bg-white rounded-xl p-4 md:p-6 shadow-sm h-fit"
          >
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-600">{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="text-sm text-gray-500">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onTopUp={handleTopUp}
      />
    </>
  );
}
