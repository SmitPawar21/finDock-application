import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Plus, Eye, TrendingUp, Wallet, Coins, CoinsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const portfolioSummary = {
  totalValue: 125845.78,
  totalProfitLoss: 12345.67,
  totalProfitLossPercentage: 10.87,
};

const assetAllocationData = [
  { name: 'Stocks', value: 400 },
  { name: 'Bonds', value: 300 },
  { name: 'Crypto', value: 500 },
  { name: 'Mutual Funds', value: 300 },
];

const COLORS = ['#456882', '#234C6A', '#1B3C53'];

const recentTransactions = [
  { id: 1, name: 'NVIDIA Corp (NVDA)', type: 'Buy', amount: 2500.00, date: '2025-09-30' },
  { id: 2, name: 'Vanguard S&P 500 ETF (VOO)', type: 'Buy', amount: 5000.00, date: '2025-09-28' },
  { id: 3, name: 'Apple Inc (AAPL)', type: 'Sell', amount: -1500.00, date: '2025-09-25' },
  { id: 4, name: 'US Treasury Bond', type: 'Buy', amount: 1000.00, date: '2025-09-22' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const isProfit = portfolioSummary.totalProfitLoss >= 0;

  const handleCoins = () => {
    navigate("/coins");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-[#234C6A] bg-gradient-to-br from-[#0a1929] via-[#1B3C53] to-[#234C6A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-300 text-sm sm:text-base">Your portfolio at a glance.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleCoins} className="cursor-pointer hidden sm:flex items-center gap-2 bg-[#d4c5b0] hover:bg-[#c4b5a0] text-[#0a1929] font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-lg">
                <CoinsIcon size={20}/> 
                Explore Crypto Coins
              </button>
              <button className="cursor-pointer hidden sm:flex items-center gap-2 bg-[#d4c5b0] hover:bg-[#c4b5a0] text-[#0a1929] font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-lg">
                <Plus size={20} /> Add Asset
              </button>
              <button className="cursor-pointer flex items-center gap-2 bg-[#456882] hover:bg-[#567a9a] text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-lg">
                <Eye size={20} /> <span className="hidden sm:inline">View All Portfolios</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Portfolio Value */}
          <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] p-6 rounded-xl shadow-2xl border border-[#456882]/30 hover:shadow-[#456882]/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Total Portfolio Value</h2>
              <Wallet className="text-[#d4c5b0]" size={24} />
            </div>
            <p className="text-4xl font-bold text-white mb-2">
              ${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-gray-400 text-sm">Across all assets</p>
          </div>

          {/* Profit/Loss */}
          <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] p-6 rounded-xl shadow-2xl border border-[#456882]/30 hover:shadow-[#456882]/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Profit / Loss</h2>
              <TrendingUp className="text-[#d4c5b0]" size={24} />
            </div>
            <div className={`flex items-center gap-2 mb-2 ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
              {isProfit ? <ArrowUpRight size={32} /> : <ArrowDownRight size={32} />}
              <span className="text-4xl font-bold">
                ${Math.abs(portfolioSummary.totalProfitLoss).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className={`text-lg font-semibold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
              {isProfit ? '+' : ''}{portfolioSummary.totalProfitLossPercentage}% {isProfit ? 'gain' : 'loss'}
            </p>
          </div>

          {/* Asset Allocation Chart */}
          <div className="bg-gradient-to-br bg-black p-6 rounded-xl shadow-2xl border border-[#456882]/30">
            <h2 className="text-gray-300 text-xs font-semibold tracking-wider uppercase mb-4">Asset Allocation</h2>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    cursor={{ fill: 'transparent' }} 
                    contentStyle={{ 
                      background: '#1B3C53', 
                      border: '1px solid #456882', 
                      borderRadius: '0.5rem',
                      color: '#ffffff !important'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] p-6 rounded-xl shadow-2xl border border-[#456882]/30">
          <h2 className="text-gray-300 text-xs font-semibold tracking-wider uppercase mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#456882]/50">
                  <th className="py-3 px-4 font-semibold text-gray-300 text-sm">Asset Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-300 text-sm">Type</th>
                  <th className="py-3 px-4 font-semibold text-gray-300 text-sm">Date</th>
                  <th className="py-3 px-4 font-semibold text-gray-300 text-sm text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, index) => (
                  <tr 
                    key={tx.id} 
                    className="border-b border-[#456882]/30 hover:bg-[#234C6A]/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 text-white font-medium">{tx.name}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        tx.type === 'Buy' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{tx.date}</td>
                    <td className={`py-4 px-4 text-right font-mono font-semibold ${
                      tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Add Asset Button */}
        <div className="sm:hidden mt-6">
          <button className="w-full flex items-center justify-center gap-2 bg-[#d4c5b0] hover:bg-[#c4b5a0] text-[#0a1929] font-semibold py-3 px-5 rounded-lg transition-all duration-300 shadow-lg">
            <Plus size={20} /> Add Asset
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;