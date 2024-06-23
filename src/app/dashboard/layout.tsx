// components/Layout.js
import Sidebar from '@/components/dashboard/sidebar';
import React from 'react';

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div className="flex h-screen w-full text-white">
            <Sidebar/>
            {children}
        </div>
    );
}
