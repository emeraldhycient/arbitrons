// pages/dashboard.tsx
'use client';

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';
import CustomHead from '@/components/common/customHead';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
    // Sample data for charts
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue',
                data: [500, 700, 1000, 800, 1500, 1200, 2000],
                borderColor: '#B026FF',
                backgroundColor: 'rgba(176, 38, 255, 0.2)',
            },
        ],
    };

    const appointmentData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Appointments',
                data: [10, 20, 15, 25, 30, 40, 35],
                borderColor: '#B026FF',
                backgroundColor: 'rgba(176, 38, 255, 0.2)',
            },
        ],
    };

    const topClientsData = {
        labels: ['Client A', 'Client B', 'Client C'],
        datasets: [
            {
                label: 'Top Clients',
                data: [10000, 8000, 6500],
                backgroundColor: ['#B026FF', '#9F29B2', '#7A1E8F'],
            },
        ],
    };

    return (
        <>
            <CustomHead title="Dashboard - Invoice101" description="View your dashboard metrics" />
            <div className="flex-1 p-6 bg-gray-900 text-white overflow-y-auto">
                <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <h2 className="text-xl font-bold mb-4">Total Invoices</h2>
                        <p className="text-5xl">120</p>
                        <span className="text-sm text-green-400">↑ 10% from last month</span>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <h2 className="text-xl font-bold mb-4">Pending Payments</h2>
                        <p className="text-5xl">$5,000</p>
                        <span className="text-sm text-red-400">↓ 5% from last month</span>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
                        <p className="text-5xl">25</p>
                        <span className="text-sm text-green-400">↑ 20% from last month</span>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
                        <p className="text-5xl">$20,000</p>
                        <span className="text-sm text-green-400">↑ 15% from last month</span>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Revenue Over Time</h2>
                        <Line data={revenueData} options={{ responsive: true }} />
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Appointments Over Time</h2>
                        <Line data={appointmentData} options={{ responsive: true }} />
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Top Clients</h2>
                        <Bar data={topClientsData} options={{ responsive: true, indexAxis: 'y' }} />
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center">
                                <span>Invoice #123</span>
                                <span className="text-lg">$500</span>
                                <span className="text-green-400">Paid</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Invoice #124</span>
                                <span className="text-lg">$750</span>
                                <span className="text-yellow-400">Pending</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Invoice #125</span>
                                <span className="text-lg">$1,200</span>
                                <span className="text-red-400">Overdue</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
