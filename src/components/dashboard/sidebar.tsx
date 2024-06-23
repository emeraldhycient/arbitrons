'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { navItems } from '@/constants/data';
import { NavItem } from '@/constants/interfaces';

const Sidebar: React.FC<{ isOpen?: boolean; setSidebarOpen?: (isOpen: boolean) => void }> = ({ isOpen, setSidebarOpen }) => {
    const pathname = usePathname();

    const activeLink = (path: string) =>
        pathname === path ? 'bg-blackBg text-neonPurple animate-pulse-glow-sm' : '';

    return (
        <div className={`fixed inset-y-0 left-0 bg-blackBg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 sm:relative sm:translate-x-0 sm:w-64 z-50 border-r border-gray-700 shadow-lg sm:shadow-2xl sm:rounded-lg`}>
            <div className="sm:hidden flex justify-end p-4">
                <button className="text-neonPurple" onClick={() => setSidebarOpen?.(false)}>
                    <FaTimes />
                </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
                <h2 className="text-2xl font-bold text-neonPurple mb-8">Invoice101</h2>
                <nav>
                    <ul>
                        {navItems.map((item: NavItem) => (
                            <li key={item.path} className={`mb-4 ${activeLink(item.path)}`}>
                                <Link href={item.path}>
                                    <span className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                                        <item.icon className="mr-2" /> {/* Instantiate the icon component */}
                                        <span className="text-sm font-bold">{item.label}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
