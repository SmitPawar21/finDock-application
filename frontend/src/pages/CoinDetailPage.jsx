import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Copy,
  Check,
  DollarSign,
  BarChart,
  ArrowUp,
  ArrowDown,
  Info,
  X,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Helper function to format large numbers
const formatNumber = (num) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num?.toFixed(2)}`;
};

// --- Reusable UI Components from original code (unchanged) ---
const InfoDetail = ({ label, value, subValue = null }) => (
  <div className="bg-slate-800/50 rounded-lg p-4">
    <p className="text-slate-400 text-sm mb-1">{label}</p>
    <p className="text-white text-xl font-semibold">{value}</p>
    {subValue && <p className="text-slate-500 text-xs mt-1">{subValue}</p>}
  </div>
);

const StatCard = ({ label, value, change, icon }) => (
  <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-cyan-400/50 transition-colors duration-300">
    <div className="flex items-center gap-3">
      <div className="bg-slate-700/50 p-2 rounded-md">{icon}</div>
      <div>
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-slate-100 text-2xl font-bold">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-semibold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{change.toFixed(2)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);


// --- NEW: Transaction Modal Component ---
const TransactionModal = ({ isOpen, onClose, action, coinName, coinSymbol }) => {
  if (!isOpen) return null;

  const [quantity, setQuantity] = useState('');

  const handleConfirm = () => {
    if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }
    // In a real app, you would handle the transaction logic here
    alert(`Success! You have placed an order to ${action} ${quantity} ${coinSymbol.toUpperCase()}.`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose} // Close modal on backdrop click
    >
      <div
        className="bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-md shadow-2xl shadow-cyan-500/10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{action} {coinName}</h2>
          <button onClick={onClose} className="text-slate-400 p-1 rounded-full hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-slate-300 mb-2">
            Quantity ({coinSymbol.toUpperCase()})
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow"
            autoFocus
          />
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <button onClick={onClose} className="px-5 py-2.5 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600 font-semibold transition-colors">Cancel</button>
          <button onClick={handleConfirm} className={`px-5 py-2.5 rounded-md font-semibold text-white transition-colors ${action === 'Buy' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}>
            Confirm {action}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function CoinDetailsPage() {
  const location = useLocation();
  const { data } = location.state || {};
  const [copied, setCopied] = useState(false);
  
  // --- NEW state for UI enhancements ---
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(''); // Can be 'Buy' or 'Sell'

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>No coin data available. Please go back and select a coin.</p>
      </div>
    );
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransaction = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const descriptionText = data?.description?.en || 'No description available.';
  const isLongDescription = descriptionText.length > 350;

  return (
    <>
      {/* --- NEW: Render Transaction Modal --- */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={modalAction}
        coinName={data?.name}
        coinSymbol={data?.symbol}
      />

      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        {/* --- MODIFIED: Header --- */}
        <header className="border-b border-slate-700 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img className='w-14 h-14 rounded-full shadow-lg shadow-cyan-500/20' src={data?.smallImage} alt={data?.name} />
              <div>
                <h1 className="text-3xl font-bold text-white">{data?.name}</h1>
                <p className="text-slate-400 text-lg uppercase">{data?.symbol}</p>
              </div>
            </div>
            {/* --- NEW: Action Buttons --- */}
            <div className="flex gap-3">
              <button onClick={() => handleTransaction('Buy')} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-6 rounded-lg transition-transform duration-200 hover:scale-105 shadow-md">
                Buy
              </button>
              <button onClick={() => handleTransaction('Sell')} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-6 rounded-lg transition-transform duration-200 hover:scale-105 shadow-md">
                Sell
              </button>
            </div>
          </div>
        </header>

        {/* --- Main Content --- */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- Left Column (Main Stats & Info) --- */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price Section */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <p className="text-slate-400 text-sm font-medium mb-2">Current Price</p>
                <div className="flex items-baseline gap-3 mb-6">
                  <h2 className="text-5xl font-bold text-cyan-400">${data?.price?.toPrecision(4)}</h2>
                  <span className={`text-lg font-semibold flex items-center gap-1 ${data?.change7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {data?.change7d >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    {data?.change7d?.toFixed(2)}% (7d)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoDetail label="Total Volume" value={formatNumber(data?.totalVolume) ?? 'N/A'} />
                  <InfoDetail label="Watchlist Users" value={data?.watchlistUsers?.toLocaleString() ?? 'N/A'} />
                  <InfoDetail label="Market Rank" value={`#${data?.marketRank ?? 'N/A'}`} />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard label="Market Cap" value={formatNumber(data?.marketCap)} icon={<DollarSign size={20} className="text-cyan-400" />} />
                <StatCard label="30d Change" value="" change={data?.change30d} icon={<BarChart size={20} className="text-cyan-400" />} />
                <StatCard label="All-Time High" value={`$${data?.ath?.toPrecision(4)}`} icon={<ArrowUp size={20} className="text-red-400" />} />
                <StatCard label="All-Time Low" value={`$${data?.atl?.toPrecision(4)}`} icon={<ArrowDown size={20} className="text-green-400" />} />
              </div>

              {/* --- NEW: About Section with Description and Categories --- */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h3 className="text-white text-xl font-semibold mb-4">About {data?.name}</h3>
                {/* Collapsible Description */}
                <div
                  className="text-slate-300 leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{
                    __html: isDescriptionExpanded || !isLongDescription
                      ? descriptionText
                      : `${descriptionText.substring(0, 350)}...`
                  }}
                />
                {isLongDescription && (
                  <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className="text-cyan-400 hover:text-cyan-300 font-semibold mt-4 text-sm">
                    {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                  </button>
                )}
                {/* Scrollable Categories */}
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <h4 className="text-slate-400 text-sm font-medium mb-3">Categories</h4>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    {data?.categories?.length > 0 ? data.categories.map((cat) => (
                      <span key={cat} className="flex-shrink-0 px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full text-slate-300 text-xs font-medium whitespace-nowrap">
                        {cat}
                      </span>
                    )) : <span className="text-slate-500 text-xs">No categories listed.</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Right Column (Supply & Other Info) --- */}
            <div className="lg:col-span-1 space-y-8">
              {/* Supply Section */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Supply Information</h3>
                <div className="space-y-4">
                  <InfoDetail label="Circulating Supply" value={data?.circulatingSupply ? `${(data.circulatingSupply / 1e9).toFixed(2)}B` : 'N/A'} subValue={data?.circulatingSupply?.toLocaleString()} />
                  <InfoDetail label="Max Supply" value={data?.maxSupply ? `${(data.maxSupply / 1e9).toFixed(2)}B` : 'N/A'} subValue={data?.maxSupply?.toLocaleString()} />
                </div>
                {data?.maxSupply && data?.circulatingSupply && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                      <span>Circulating</span>
                      <span>{((data.circulatingSupply / data.maxSupply) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full" style={{ width: `${(data.circulatingSupply / data.maxSupply) * 100}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* All-Time Stats */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center gap-2 text-white text-lg font-semibold mb-4"><Info size={18} /><span>Price History</span></div>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">From All-Time High ({data?.athDate ? new Date(data.athDate).toLocaleDateString() : 'N/A'})</p>
                    <p className="text-red-400 text-xl font-bold flex items-center gap-1.5"><TrendingDown size={18} />{data?.athChange ? `${Math.abs(data?.athChange?.usd ?? data?.athChange).toFixed(2)}%` : 'N/A'}</p>
                  </div>
                  <div className="border-t border-slate-700"></div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">From All-Time Low ({data?.atlDate ? new Date(data.atlDate).toLocaleDateString() : 'N/A'})</p>
                    <p className="text-green-400 text-xl font-bold flex items-center gap-1.5"><TrendingUp size={18} />{data?.atlChange ? `+${(data?.atlChange?.usd ?? data?.atlChange).toFixed(2)}%` : 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Contract Section */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Contract Address</h3>
                <div className="bg-slate-900/70 rounded-md p-4 flex items-center justify-between gap-2">
                  <p className="text-slate-200 font-mono text-sm break-all">{data?.contractAddress ?? 'N/A'}</p>
                  <button onClick={() => copyToClipboard(data?.contractAddress ?? '')} className={`p-2 rounded-md transition-all duration-200 flex-shrink-0 ${copied ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 hover:bg-slate-600 text-slate-400'}`} title="Copy address">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}