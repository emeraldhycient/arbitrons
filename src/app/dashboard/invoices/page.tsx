'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaFileDownload, FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';
import CustomHead from '@/components/common/customHead';
import Button from '@/components/common/button';
import { Invoice } from '@/constants/interfaces';

const dummyInvoices: Invoice[] = [
    { id: 123, client: { name: 'John Doe' }, totalAmount: 500, status: 'Paid' },
    { id: 124, client: { name: 'Jane Smith' }, totalAmount: 750, status: 'Pending' },
    { id: 125, client: { name: 'Alice Johnson' }, totalAmount: 1200, status: 'Overdue' },
];

const statusIcon = (status: string) => {
    switch (status) {
        case 'Paid':
            return <FaCheckCircle className="text-green-400" />;
        case 'Pending':
            return <FaExclamationCircle className="text-yellow-400" />;
        case 'Overdue':
            return <FaTimesCircle className="text-red-400" />;
        default:
            return null;
    }
};

const statusPill = (status: string) => {
    let pillStyle = 'bg-gray-600 text-white';
    if (status === 'Paid') pillStyle = 'bg-green-500 text-white';
    if (status === 'Pending') pillStyle = 'bg-yellow-500 text-black';
    if (status === 'Overdue') pillStyle = 'bg-red-500 text-white';

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pillStyle}`}>
            {status}
        </span>
    );
};

const InvoicesPage: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('Date');
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 5;

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch('/api/invoices');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setInvoices(data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
                setInvoices(dummyInvoices); // Use dummy data on error
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const filteredInvoices = invoices.filter((invoice) => filter === 'All' || invoice.status === filter);
    const sortedInvoices = filteredInvoices.sort((a, b) => {
        if (sortBy === 'Amount') {
            return b.totalAmount - a.totalAmount;
        }
        // Assuming 'Date' is the default sorting criteria
        return b.id - a.id;
    });

    const paginatedInvoices = sortedInvoices.slice(
        (currentPage - 1) * invoicesPerPage,
        currentPage * invoicesPerPage
    );

    return (
        <div className="bg-dashboard-bg min-h-screen text-dashboard-text">
            <CustomHead
                title="Dashboard - Invoice101"
                description="Dashboard and management system"
                leftComponent={<Link href="/"><span className="text-lg font-bold">Invoices</span></Link>}
                rightComponent={
                    <Button variant="primary" size="small">
                        <Link href="/invoices/create" className="flex items-center">
                            <FaPlus className="mr-2" /> Create New
                        </Link>
                    </Button>
                }
            />
            <div className="flex justify-between items-center p-8 md:px-24 md:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="filter" className="text-sm font-semibold text-gray-400">Filter by Status:</label>
                        <select
                            id="filter"
                            value={filter}
                            onChange={handleFilterChange}
                            className="bg-cardBg text-gray-400 px-2 py-1 rounded text-sm"
                        >
                            <option value="All">All</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="sort" className="text-sm font-semibold text-gray-400">Sort by:</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={handleSortChange}
                            className="bg-cardBg text-gray-400 px-2 py-1 rounded text-sm"
                        >
                            <option value="Date">Date</option>
                            <option value="Amount">Amount</option>
                        </select>
                    </div>
                </div>
            </div>
            <ul className="space-y-4 p-8 md:px-24 md:py-4">
                {loading
                    ? [...Array(invoicesPerPage)].map((_, index) => (
                        <li key={index} className="bg-cardBg p-4 mb-3 rounded-lg shadow-lg flex justify-between animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-700 rounded-full h-6 w-6"></div>
                                <div className="flex flex-col items-start">
                                    <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                                    <div className="h-3 bg-gray-700 rounded w-20"></div>
                                    <div className="h-3 bg-gray-700 rounded w-20"></div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="h-4 bg-gray-700 rounded w-16"></div>
                            </div>
                        </li>
                    ))
                    : paginatedInvoices.map((invoice) => (
                        <Link key={invoice.id} href={`/dashboard/invoices/${invoice.id}`}>
                            <li className="bg-cardBg p-4 mb-3 rounded-lg shadow-lg flex justify-between transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className="text-xl flex-shrink-0">
                                        {statusIcon(invoice.status)}
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="block text-sm font-semibold mb-3">Invoice #{invoice.id}</span>
                                        <span className="block text-sm text-gray-400 mb-3">Client: {invoice.client.name}</span>
                                        <span className="block text-sm text-gray-400">Amount: ${invoice.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {statusPill(invoice.status)}
                                    <Link href={`/invoices/${invoice.id}/download`} className="flex items-center text-gray-400 hover:text-green-500 transition-all duration-300 text-xs">
                                        <FaFileDownload size={16} className="mr-1" />
                                    </Link>
                                </div>
                            </li>
                        </Link>
                    ))}
            </ul>
            <div className="flex justify-center p-4">
                {Array(Math.ceil(filteredInvoices.length / invoicesPerPage))
                    .fill(0)
                    .map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default InvoicesPage;
