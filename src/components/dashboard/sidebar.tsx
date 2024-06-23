'use client'
// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaFileInvoice, FaCalendarAlt, FaClipboardList, FaUsers, FaCog, FaTimes } from 'react-icons/fa';

const Sidebar: React.FC<{ isOpen?: boolean; setSidebarOpen?: (isOpen: boolean) => void }> = ({ isOpen, setSidebarOpen }) => {
    const pathname = usePathname();

    const activeLink = (path: string) =>
        pathname === path ? 'bg-blackBg text-neonPurple animate-pulse-glow-sm' : '';

    return (
        <div className={`fixed inset-0 bg-blackBg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 sm:relative sm:translate-x-0 sm:w-64 z-50`}>
            <div className="sm:hidden flex justify-end p-4">
                <button
                    className="text-neonPurple"                >
                    <FaTimes />
                </button>
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-neonPurple mb-8">Invoice101</h2>
                <nav>
                    <ul>
                        <li className={`mb-4 ${activeLink('/dashboard')}`}>
                            <Link href="/dashboard">
                                <span className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                                    <FaTachometerAlt className="mr-2" /> Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className={`mb-4 ${activeLink('/invoices')}`}>
                            <Link href="/invoices">
                                <span className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                                    <FaFileInvoice className="mr-2" /> Invoices
                                </span>
                            </Link>
                        </li>
                        <li className={`mb-4 ${activeLink('/appointments')}`}>
                            <Link href="/appointments">
                                <span className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                                    <FaCalendarAlt className="mr-2" /> Appointments
                                </span>
                            </Link>
                        </li>
                        <li className={`mb-4 ${activeLink('/documents')}`}>
                            <Link href="/documents">
                                <span className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                                    <FaClipboardList className="mr-2" /> Documents
                                </span>
                            </Link>
                        </li>
                        <li className={`mb-4 ${activeLink('/clients')}`}>
                            <Link href="/clients">
                                <span className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                                    <FaUsers className="mr-2" /> Clients
                                </span>
                            </Link>
                        </li>
                        <li className={`mb-4 ${activeLink('/settings')}`}>
                            <Link href="/settings">
                                <span className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                                    <FaCog className="mr-2" /> Settings
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
