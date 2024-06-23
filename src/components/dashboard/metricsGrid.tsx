import React from 'react';
import { FaFileInvoiceDollar, FaMoneyCheckAlt, FaCalendarCheck, FaChartLine } from 'react-icons/fa';

const MetricsGrid: React.FC = () => {
    const metrics = [
        {
            title: 'Total Invoices',
            value: '120',
            icon: FaFileInvoiceDollar,
            trend: '↑ 10% from last month',
            trendColor: 'text-green-400',
        },
        {
            title: 'Pending Payments',
            value: '$5,000',
            icon: FaMoneyCheckAlt,
            trend: '↓ 5% from last month',
            trendColor: 'text-red-400',
        },
        {
            title: 'Upcoming Appointments',
            value: '25',
            icon: FaCalendarCheck,
            trend: '↑ 20% from last month',
            trendColor: 'text-green-400',
        },
        {
            title: 'Monthly Revenue',
            value: '$20,000',
            icon: FaChartLine,
            trend: '↑ 15% from last month',
            trendColor: 'text-green-400',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="bg-cardBg p-4 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg flex flex-col justify-between h-36"
                >
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2 truncate">
                            <metric.icon className="text-2xl text-neonPurple" />
                            <div className="flex flex-col">
                                <h2 className="text-xs font-semibold truncate">{metric.title}</h2>
                                <span className={`text-xs font-medium truncate ${metric.trendColor}`}>{metric.trend}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <p className="text-lg font-bold">{metric.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MetricsGrid;
