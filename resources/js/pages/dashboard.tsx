import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Stats {
    total_users: number;
    total_suppliers: number;
    total_products: number;
    total_orders: number;
    total_revenue: number;
    low_stock_products: number;
    pending_orders: number;
    active_suppliers: number;
}

interface Product {
    id: number;
    name: string;
    sku: string;
    stock_quantity: number;
    supplier: {
        id: number;
        name: string;
    };
}

interface OrderItem {
    id: number;
    quantity: number;
    unit_price: string;
    total_price: string;
    product: {
        id: number;
        name: string;
        sku: string;
    };
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    order_items: OrderItem[];
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
    lowStockProducts: Product[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentOrders, lowStockProducts }: Props) {
    const formatCurrency = (amount: number | string) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(num);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };

        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colors[status as keyof typeof colors] || colors.pending}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">👥</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_users.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">🏢</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Suppliers</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.active_suppliers.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">📦</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_products.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">🛒</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_orders.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue and Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Revenue</h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(stats.total_revenue)}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pending Orders</h3>
                        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending_orders}</p>
                        <Link href="/dashboard/orders" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            View all orders →
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Low Stock Alert</h3>
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.low_stock_products}</p>
                        <Link href="/dashboard/products" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            View products →
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                            <Link href="/dashboard/orders" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{order.order_number}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.user.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(order.total_amount)}</p>
                                            <div className="mt-1">
                                                {getStatusBadge(order.status)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(order.created_at)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low Stock Products */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Products</h3>
                            <Link href="/dashboard/products" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {lowStockProducts.map((product) => (
                                <div key={product.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Supplier: {product.supplier.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                product.stock_quantity === 0 
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                                {product.stock_quantity} left
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link
                        href="/dashboard/users"
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
                    >
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-blue-600 dark:text-blue-300 text-xl">👥</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Manage Users</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">View and manage customer accounts</p>
                    </Link>

                    <Link
                        href="/dashboard/suppliers"
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
                    >
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-green-600 dark:text-green-300 text-xl">🏢</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Suppliers</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage supplier relationships</p>
                    </Link>

                    <Link
                        href="/dashboard/products"
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
                    >
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-purple-600 dark:text-purple-300 text-xl">📦</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Inventory</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Track products and stock levels</p>
                    </Link>

                    <Link
                        href="/dashboard/orders"
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
                    >
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-orange-600 dark:text-orange-300 text-xl">🛒</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Orders</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Process and track orders</p>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}