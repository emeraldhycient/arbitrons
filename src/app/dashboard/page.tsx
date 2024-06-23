// pages/dashboard.tsx
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
import CustomHead from '@/components/common/customHead';
import Link from 'next/link';

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
        <div className='w-full'>
            <CustomHead
                title="Dashboard - Invoice101"
                description="Dashboard and management system"
                leftComponent={<Link href="/"><span className="text-lg font-bold">Dashboard</span></Link>}
                centerComponent={<span className="text-md">Welcome to your dashboard</span>}
                rightComponent={<Link href="/profile"><span className="text-md">Profile</span></Link>}
            />
            <div className="flex-1 p-4 bg-darkBg text-lightText overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-cardBg p-3 rounded-lg shadow-md flex flex-col justify-between">
                        <h2 className="text-sm font-bold mb-1">Total Invoices</h2>
                        <p className="text-sm font-medium">120</p>
                        <span className="text-xs text-green-400">↑ 10% from last month</span>
                    </div>
                    <div className="bg-cardBg p-3 rounded-lg shadow-md flex flex-col justify-between">
                        <h2 className="text-sm font-bold mb-1">Pending Payments</h2>
                        <p className="text-sm font-medium">$5,000</p>
                        <span className="text-xs text-red-400">↓ 5% from last month</span>
                    </div>
                    <div className="bg-cardBg p-3 rounded-lg shadow-md flex flex-col justify-between">
                        <h2 className="text-sm font-bold mb-1">Upcoming Appointments</h2>
                        <p className="text-sm font-medium">25</p>
                        <span className="text-xs text-green-400">↑ 20% from last month</span>
                    </div>
                    <div className="bg-cardBg p-3 rounded-lg shadow-md flex flex-col justify-between">
                        <h2 className="text-sm font-bold mb-1">Monthly Revenue</h2>
                        <p className="text-sm font-medium">$20,000</p>
                        <span className="text-xs text-green-400">↑ 15% from last month</span>
                    </div>
                </div>
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
                        <ul className="space-y-1">
                            <li className="flex justify-between items-center">
                                <span className="text-xs">Invoice #123</span>
                                <span className="text-sm font-medium">$500</span>
                                <span className="text-xs text-green-400">Paid</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-xs">Invoice #124</span>
                                <span className="text-sm font-medium">$750</span>
                                <span className="text-xs text-yellow-400">Pending</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-xs">Invoice #125</span>
                                <span className="text-sm font-medium">$1,200</span>
                                <span className="text-xs text-red-400">Overdue</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="bg-cardBg p-3 rounded-lg shadow-md">
                        <h2 className="text-sm font-bold mb-1">Revenue by Category</h2>
                        <Pie data={revenueByCategoryData} options={{ responsive: true }} />
                    </div>
                    <div className="bg-cardBg p-3 rounded-lg shadow-md">
                        <h2 className="text-sm font-bold mb-1">Invoice Status Breakdown</h2>
                        <Pie data={invoiceStatusData} options={{ responsive: true }} />
                    </div>
                    <div className="bg-cardBg p-3 rounded-lg shadow-md">
                        <h2 className="text-sm font-bold mb-1">Weekly Active Users</h2>
                        <Line data={weeklyActiveUsersData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
