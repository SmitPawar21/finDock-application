import React, { useState, useRef, useEffect } from 'react';
import { Search, TrendingUp, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Cookies from 'js-cookie';

const CryptoCoinsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [searchPage, setSearchPage] = useState(0);
    const scrollRef = useRef(null);
    const coinsPerPage = 20;

    const [trendingCoins, setTrendingCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [searchedCoins, setSearchedCoins] = useState([]);

    const fetchTrendingData = async () => {
        try {
            console.log("token: ", Cookies.get('token'));

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/coins/trending`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });

            const data = await response.json();

            setTrendingCoins(data.coins)
        } catch (e) {
            console.error(e);
        }
    }

    const fetchPaginatedData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/coins?page=${currentPage}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });

            const data = await response.json();

            setPaginatedCoins(data.content);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchSearchCoins = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/coins/search?query=${searchQuery}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });

            const data = await response.json();

            console.log("searched coins: ", data);
            setSearchedCoins(data);
            setSearchPage(0); // Reset to first page on new search
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchTrendingData();
    }, []);

    useEffect(() => {
        fetchPaginatedData();
    }, [currentPage]);

    // Pagination logic for main coins
    const totalPages = Math.ceil(19000 / coinsPerPage);
    const startIndex = currentPage * coinsPerPage;

    // Pagination logic for search results
    const searchTotalPages = Math.ceil(searchedCoins.length / coinsPerPage);
    const searchStartIndex = searchPage * coinsPerPage;
    const searchEndIndex = searchStartIndex + coinsPerPage;
    const paginatedSearchCoins = searchedCoins.slice(searchStartIndex, searchEndIndex);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#010617] text-white">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#234C6A] bg-gradient-to-br from-[#0a1929] via-[#1B3C53] to-[#234C6A]">
                <div className="px-6 py-8">
                    <h1 className="text-4xl font-bold mb-2">Cryptocurrency Market</h1>
                    <p className="text-gray-400">Track and analyze cryptocurrency prices in real-time</p>
                </div>

                <button className='cursor-pointer flex items-center gap-2 bg-[#456882] hover:bg-[#567a9a] text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-lg mr-6'>
                    <ArrowLeft />
                    Back To Home
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Trending Coins Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="text-[#456882]" size={24} />
                            <h2 className="text-2xl font-bold">Trending Coins</h2>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-2 bg-[#1B3C53] hover:bg-[#234C6A] rounded-lg transition"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-2 bg-[#1B3C53] hover:bg-[#234C6A] rounded-lg transition"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {trendingCoins.map(coin => (
                            <div
                                key={coin.id}
                                className="min-w-[280px] bg-[#1B3C53] rounded-xl p-6 hover:bg-[#234C6A] transition cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 flex items-center justify-center text-2xl">
                                            <img className='w-full' src={coin.item.small} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{coin.item.name}</h3>
                                            <p className="text-gray-400 text-sm">{coin.item.symbol}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    Market Cap:
                                    <p className="text-gray-400 text-sm">{coin.item.data.market_cap}</p>
                                </div>
                                <div className="flex flex-col items-start justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-yellow-200">${coin.item.data.price.toLocaleString()}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-lg ${coin.item.data.price_change_percentage_24h.usd >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                        {coin.item.data.price_change_percentage_24h.usd >= 0 ? '+' : ''}{coin.item.data.price_change_percentage_24h.usd.toFixed(6)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-5">
                            <h2 className="text-xl font-bold">Search Coins By Name</h2>
                        </div>

                        <div className='flex justify-center items-center w-full bg-[#1B3C53] border border-[#234C6A] focus:border-[#456882] rounded-xl '>
                            <Search className="ml-5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search cryptocurrencies by name or symbol..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-white pl-4 pr-4 py-4  focus:outline-none transition"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        fetchSearchCoins();
                                    }
                                }}
                            />
                            <button onClick={fetchSearchCoins} className='cursor-pointer flex items-center gap-2 bg-[#456882] hover:bg-[#567a9a] text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 shadow-lg mr-6'>Search</button>
                        </div>
                    </div>
                </div>

                {/* Search Results Container with Pagination */}
                {searchQuery && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Search Results ({searchedCoins.length})</h2>
                        {searchedCoins.length > 0 ? (
                            <>
                                <div className="bg-[#1B3C53] rounded-xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-10">
                                            {paginatedSearchCoins.map((coin, index) => (
                                                <div
                                                    key={coin.id}
                                                    className="bg-[#234C6A]/30 border border-[#234C6A] rounded-lg p-4 hover:bg-[#234C6A]/50 cursor-pointer transition"
                                                >
                                                    {/* Coin Info */}
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 bg-[#456882] rounded-full flex items-center justify-center text-lg font-bold">
                                                            {coin.symbol.charAt(0)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold truncate">{coin.name}</p>
                                                            <p className="text-gray-400 text-sm">{coin.symbol}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Search Results Pagination */}
                                <div className="flex items-center justify-between mt-6">
                                    <p className="text-gray-400">
                                        Showing {searchStartIndex + 1}-{Math.min(searchEndIndex, searchedCoins.length)} of {searchedCoins.length} results
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSearchPage(prev => Math.max(0, prev - 1))}
                                            disabled={searchPage === 0}
                                            className="px-4 py-2 bg-[#1B3C53] hover:bg-[#234C6A] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-4 py-2 bg-[#234C6A] rounded-lg">
                                            Page {searchPage + 1} of {searchTotalPages}
                                        </span>
                                        <button
                                            onClick={() => setSearchPage(prev => Math.min(searchTotalPages - 1, prev + 1))}
                                            disabled={searchPage === searchTotalPages - 1}
                                            className="px-4 py-2 bg-[#1B3C53] hover:bg-[#234C6A] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-[#1B3C53] rounded-xl p-12 text-center">
                                <p className="text-gray-400">Press Enter after searching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                )}

                {/* All Coins Container with Pagination */}
                <div>
                    <h2 className="text-xl font-bold mb-4">All Cryptocurrencies</h2>
                    <div className="bg-[#0d1f2b] rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            {/* Card Grid Container */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-10">
                                {paginatedCoins.map((coin, index) => (
                                    <div
                                        key={coin.id}
                                        className="bg-[#234C6A]/30 border border-[#234C6A] rounded-lg p-4 hover:bg-[#234C6A]/50 cursor-pointer transition"
                                    >
                                        {/* Coin Info */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-[#456882] rounded-full flex items-center justify-center text-lg font-bold">
                                                {coin.symbol.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold truncate">{coin.name}</p>
                                                <p className="text-gray-400 text-sm">{coin.symbol}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* All Coins Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-gray-400">
                            Showing {startIndex + 1}-{Math.min(startIndex + coinsPerPage, startIndex + paginatedCoins.length)} of 19,000 cryptocurrencies
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="px-4 py-2 bg-[#1B3C53] hover:bg-[#234C6A] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 bg-[#234C6A] rounded-lg">
                                Page {currentPage + 1} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="px-4 py-2 bg-[#1B3C53] hover:bg-[#234C6A] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoCoinsPage;