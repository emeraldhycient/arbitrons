'use client';

import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import Link from 'next/link';
import CustomHead from '@/components/common/customHead';
import Button from '@/components/common/button';
import { FaPlus } from "react-icons/fa";
import TransactionList from '@/components/dashboard/transactions';
import MetricsGrid from '@/components/dashboard/metricsGrid';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    // Sample data for charts
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue',
                data: [500, 700, 1000, 800, 1500, 1200, 2000],
                borderColor: '#8A2BE2',
                backgroundColor: 'rgba(138, 43, 226, 0.2)',
            },
        ],
    };

    const appointmentData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Appointments',
                data: [10, 20, 15, 25, 30, 40, 35],
                borderColor: '#8A2BE2',
                backgroundColor: 'rgba(138, 43, 226, 0.2)',
            },
        ],
    };

    const topClientsData = {
        labels: ['Client A', 'Client B', 'Client C'],
        datasets: [
            {
                label: 'Top Clients',
                data: [10000, 8000, 6500],
                backgroundColor: ['#8A2BE2', '#6A0DAD', '#4B0082'],
            },
        ],
    };

    const revenueByCategoryData = {
        labels: ['Consulting', 'Development', 'Design'],
        datasets: [
            {
                label: 'Revenue by Category',
                data: [12000, 9000, 5000],
                backgroundColor: ['#8A2BE2', '#6A0DAD', '#4B0082'],
            },
        ],
    };

    const invoiceStatusData = {
        labels: ['Paid', 'Pending', 'Overdue'],
        datasets: [
            {
                label: 'Invoice Status',
                data: [60, 25, 15],
                backgroundColor: ['#34D399', '#FBBF24', '#F87171'],
            },
        ],
    };

    const weeklyActiveUsersData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Weekly Active Users',
                data: [50, 60, 70, 80, 100, 90, 110],
                borderColor: '#8A2BE2',
                backgroundColor: 'rgba(138, 43, 226, 0.2)',
            },
        ],
    };

    return (
        <div className="h-full">
            <CustomHead
                title="Dashboard - Invoice101"
                description="Dashboard and management system"
                leftComponent={<Link href="/"><span className="text-lg font-bold">Dashboard</span></Link>}
                rightComponent={<Button variant="primary" size="small"><Link href="/dashboard/invoices" className='flex items-center'>Invoices <FaPlus className='mx-2' /></Link></Button>}
            />
            <div className="p-8 md:px-24 md:py-16 bg-darkBg text-lightText overflow-y-auto">
               <MetricsGrid/>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="bg-cardBg p-3 rounded-lg shadow-md">
                        <h2 className="text-sm font-bold mb-1">Revenue Over Time</h2>
                        <Line data={revenueData} options={{ responsive: true }} />
                    </div>
                    <div className="bg-cardBg p-3 rounded-lg shadow-md">
                        <h2 className="text-sm font-bold mb-1">Appointments Over Time</h2>
                        <Line data={appointmentData} options={{ responsive: true }} />
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="bg-cardBg p-3 rounded-lg shadow-md">
                        <h2 className="text-sm font-bold mb-1">Top Clients</h2>
                        <Bar data={topClientsData} options={{ responsive: true, indexAxis: 'y' }} />
                    </div>
                    <div className="bg-cardBg p-3 rounded-lg shadow-md">
                        <h2 className="text-sm font-bold mb-1">Recent Transactions</h2>
                       <TransactionList/>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-cardBg p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                        <h2 className="text-sm font-bold text-lightText mb-2">Revenue by Category</h2>
                        <div className="h-48">
                            <Pie data={revenueByCategoryData} options={{ responsive: true }} />
                        </div>
                    </div>
                    <div className="bg-cardBg p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                        <h2 className="text-sm font-bold text-lightText mb-2">Invoice Status Breakdown</h2>
                        <div className="h-48">
                            <Pie data={invoiceStatusData} options={{ responsive: true }} />
                        </div>
                    </div>
                    <div className="bg-cardBg p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                        <h2 className="text-sm font-bold text-lightText mb-2">Weekly Active Users</h2>
                        <div className="h-48">
                            <Line data={weeklyActiveUsersData} options={{ responsive: true }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
