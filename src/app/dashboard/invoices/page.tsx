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
            }
        };

        fetchInvoices();
    }, []);

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
            <ul className="space-y-4 p-8 md:px-24 md:py-16">
                {invoices.map((invoice) => (
                    <Link key={invoice.id} href={`/dashboard/invoices/${invoice.id}`}>
                        <li className="bg-cardBg p-4 mb-3 rounded-lg shadow-lg flex justify-between transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <div className="text-xl flex-shrink-0">
                                    {statusIcon(invoice.status)}
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="block text-sm font-semibold">Invoice #{invoice.id}</span>
                                    <span className="block text-xs text-gray-400">Client: {invoice.client.name}</span>
                                    <span className="block text-xs text-gray-400">Amount: ${invoice.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {statusPill(invoice.status)}
                                <Link href={`/invoices/${invoice.id}/download`} className="flex items-center text-green-400 hover:text-green-500 transition-all duration-300 text-xs">
                                    <FaFileDownload size={16} className="mr-1" />
                                </Link>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default InvoicesPage;
