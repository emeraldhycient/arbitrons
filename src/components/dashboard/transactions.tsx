import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';

const TransactionList: React.FC = () => {
    const transactions = [
        { id: 123, amount: 500, status: 'Paid' },
        { id: 124, amount: 750, status: 'Pending' },
        { id: 125, amount: 1200, status: 'Overdue' },
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

    return (
        <ul className="space-y-3">
            {transactions.map(transaction => (
                <li key={transaction.id} className="bg-cardBg p-4 rounded-lg shadow-md flex items-center justify-between transform transition-transform hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center space-x-3">
                        <div className="text-lg">
                            {statusIcon(transaction.status)}
                        </div>
                        <div>
                            <span className="block text-sm font-semibold">Invoice #{transaction.id}</span>
                            <span className="block text-xs text-gray-400">Amount: ${transaction.amount}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className={`text-xs font-bold ${transaction.status === 'Paid' ? 'text-green-400' : transaction.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                            {transaction.status}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TransactionList;
