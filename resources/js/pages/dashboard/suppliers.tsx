import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Supplier {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    contact_person: string | null;
    status: string;
    created_at: string;
    products_count: number;
}

interface PaginatedSuppliers {
    data: Supplier[];
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
    suppliers: PaginatedSuppliers;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Suppliers',
        href: '/dashboard/suppliers',
    },
];

export default function Suppliers({ suppliers }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const colors = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || colors.active}`}>
                {status === 'active' ? '✅' : '❌'} {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Suppliers - Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🏢 Suppliers</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage supplier relationships and partnerships</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {suppliers.data.length} of {suppliers.total} suppliers
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">🏢</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Suppliers</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{suppliers.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">✅</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Active Suppliers</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {suppliers.data.filter(s => s.status === 'active').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">📦</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {suppliers.data.reduce((sum, s) => sum + s.products_count, 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suppliers Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Supplier
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Products
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Since
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {suppliers.data.map((supplier) => (
                                    <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                                                        <span className="text-white font-medium text-sm">
                                                            {supplier.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {supplier.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {supplier.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {supplier.contact_person || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {supplier.phone || 'No phone'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(supplier.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            <div className="flex items-center">
                                                <span className="font-medium">{supplier.products_count}</span>
                                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">products</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(supplier.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {suppliers.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow">
                        <div className="flex items-center">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing page <span className="font-medium">{suppliers.current_page}</span> of{' '}
                                <span className="font-medium">{suppliers.last_page}</span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {suppliers.links.map((link, index) => {
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