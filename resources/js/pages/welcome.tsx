import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Business Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <header className="w-full px-6 py-4">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">📊</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard Pro</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Go to Dashboard →
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                📊 Business Dashboard
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Made Simple
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Comprehensive dashboard application for managing users, suppliers, inventory, and orders. 
                                Track your business metrics with beautiful, real-time visualizations.
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">User Management</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Track customer accounts, verification status, and order history
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏢</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Supplier Network</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Manage supplier relationships and track product sourcing
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Inventory Control</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Monitor stock levels, categories, and low inventory alerts
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🛒</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Order Processing</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Track orders from placement to delivery with status updates
                                </p>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎯 Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-green-500 text-xl">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Real-time Analytics</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">Live dashboard with revenue tracking and performance metrics</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-green-500 text-xl">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Smart Alerts</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">Automatic notifications for low stock and pending orders</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-green-500 text-xl">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Data Visualization</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">Beautiful charts and graphs for better insights</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-green-500 text-xl">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Multi-Entity Management</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">Unified interface for users, suppliers, products, and orders</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-green-500 text-xl">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Responsive Design</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">Perfect experience on desktop, tablet, and mobile devices</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-green-500 text-xl">✅</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Dark Mode Support</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">Comfortable viewing experience in any lighting condition</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mock Data Showcase */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📈 Sample Data Included</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">25+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Sample Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">15+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Suppliers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">50+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Orders</div>
                                </div>
                            </div>
                            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                                Pre-populated with realistic sample data to explore all features immediately
                            </p>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            {auth.user ? (
                                <div className="space-y-4">
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                                    >
                                        <span className="mr-2">🚀</span>
                                        Access Your Dashboard
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Welcome back! Your dashboard is ready with all the latest data.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                                        >
                                            <span className="mr-2">🚀</span>
                                            Start Free Trial
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl text-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
                                        >
                                            <span className="mr-2">👤</span>
                                            Sign In
                                        </Link>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Join thousands of businesses already using our dashboard platform
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Built with ❤️ using Laravel, React, and modern web technologies
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}