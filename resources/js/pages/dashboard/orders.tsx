import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';



interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: string;
    notes: string | null;
    shipped_at: string | null;
    created_at: string;
    user: User;
    order_items_count: number;
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    orders: PaginatedOrders;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/dashboard/orders',
    },
];

export default function Orders({ orders }: Props) {
    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseFloat(amount));
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

        const icons = {
            pending: '⏳',
            processing: '⚙️',
            shipped: '🚚',
            delivered: '✅',
            cancelled: '❌',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || colors.pending}`}>
                {icons[status as keyof typeof icons]} {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const statusCounts = {
        pending: orders.data.filter(o => o.status === 'pending').length,
        processing: orders.data.filter(o => o.status === 'processing').length,
        shipped: orders.data.filter(o => o.status === 'shipped').length,
        delivered: orders.data.filter(o => o.status === 'delivered').length,
        cancelled: orders.data.filter(o => o.status === 'cancelled').length,
    };

    const totalRevenue = orders.data
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders - Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🛒 Orders</h1>
                        <p className="text-gray-600 dark:text-gray-400">Process and track customer orders</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {orders.data.length} of {orders.total} orders
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">🛒</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{orders.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">⏳</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{statusCounts.pending}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">🚚</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Shipped</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{statusCounts.shipped}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">✅</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{statusCounts.delivered}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">💰</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(totalRevenue.toString())}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                                                        <span className="text-white font-medium text-sm">
                                                            #{order.id}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {order.order_number}
                                                    </div>
                                                    {order.shipped_at && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            Shipped: {formatDate(order.shipped_at)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {order.user.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {order.user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            <div className="flex items-center">
                                                <span className="font-medium">{order.order_items_count}</span>
                                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">items</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(order.total_amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(order.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {orders.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow">
                        <div className="flex items-center">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing page <span className="font-medium">{orders.current_page}</span> of{' '}
                                <span className="font-medium">{orders.last_page}</span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {orders.links.map((link, index) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }

                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}