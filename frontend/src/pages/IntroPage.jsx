import React from 'react';
import { TrendingUp, Shield, BarChart3, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const IntroPage = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#021526] via-[#1B3C53] to-[#234C6A]">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-[#021526]/80 backdrop-blur-sm border-b border-[#456882]/30 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img className='w-7 h-7' src={logo} />
                        <span className="text-2xl font-bold text-white">FinDock</span>
                    </div>
                    <div className="flex space-x-4">
                        <button onClick={handleLogin} className="px-6 py-2 text-[#D2C1B6] hover:text-white transition-colors cursor-pointer">
                            Login
                        </button>
                        <button onClick={handleRegister} className="px-6 py-2 bg-[#D2C1B6] text-[#021526] rounded-lg hover:bg-white transition-colors font-medium cursor-pointer">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Manage Your Wealth,
                            <span className="block text-[#D2C1B6]">Simplified</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                            Professional portfolio management dashboard for tracking, analyzing, and optimizing your financial investments with precision.
                        </p>
                        <button onClick={() => navigate('/home')} className="px-8 py-4 bg-[#D2C1B6] text-[#021526] rounded-lg hover:bg-blue-300 transition-colors font-semibold text-lg cursor-pointer">
                            Start Managing Your Portfolio
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
                        <div className="bg-[#1B3C53]/50 backdrop-blur-sm border border-[#456882]/30 rounded-xl p-6 hover:border-[#D2C1B6]/50 transition-all">
                            <div className="w-12 h-12 bg-[#D2C1B6]/10 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-[#D2C1B6]" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Secure Authentication</h3>
                            <p className="text-gray-400">JWT-based security with role-based access control for your peace of mind.</p>
                        </div>

                        <div className="bg-[#1B3C53]/50 backdrop-blur-sm border border-[#456882]/30 rounded-xl p-6 hover:border-[#D2C1B6]/50 transition-all">
                            <div className="w-12 h-12 bg-[#D2C1B6]/10 rounded-lg flex items-center justify-center mb-4">
                                <Wallet className="w-6 h-6 text-[#D2C1B6]" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Portfolio Tracking</h3>
                            <p className="text-gray-400">Manage multiple portfolios with detailed asset tracking across stocks, bonds, and funds.</p>
                        </div>

                        <div className="bg-[#1B3C53]/50 backdrop-blur-sm border border-[#456882]/30 rounded-xl p-6 hover:border-[#D2C1B6]/50 transition-all">
                            <div className="w-12 h-12 bg-[#D2C1B6]/10 rounded-lg flex items-center justify-center mb-4">
                                <BarChart3 className="w-6 h-6 text-[#D2C1B6]" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
                            <p className="text-gray-400">Live portfolio valuation, P&L calculations, and asset allocation insights.</p>
                        </div>

                        <div className="bg-[#1B3C53]/50 backdrop-blur-sm border border-[#456882]/30 rounded-xl p-6 hover:border-[#D2C1B6]/50 transition-all">
                            <div className="w-12 h-12 bg-[#D2C1B6]/10 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-[#D2C1B6]" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Transaction History</h3>
                            <p className="text-gray-400">Detailed buy and sell records for comprehensive financial analysis.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack Section */}
            <div className="py-16 px-6 bg-[#021526]/50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Built With Modern Technologies</h2>
                    <p className="text-gray-400 mb-12">Production-ready architecture with best practices</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Spring Boot', 'PostgreSQL', 'Docker', 'React', 'JWT Auth', 'CI/CD'].map((tech) => (
                            <span key={tech} className="px-6 py-3 bg-[#1B3C53] border border-[#456882]/30 rounded-lg text-[#D2C1B6] font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-[#456882]/30">
                <div className="max-w-7xl mx-auto text-center text-gray-400">
                    <p>© 2025 FinDock. Professional Portfolio Management.</p>
                </div>
            </footer>
        </div>
    );
};

export default IntroPage;