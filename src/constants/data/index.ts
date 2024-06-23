// constants/navItems.ts
import { FaLayerGroup, FaFileInvoice, FaCalendarAlt, FaClipboardList, FaUsers, FaCog, FaFileAlt, FaMoneyBill, FaChartBar, FaBell } from 'react-icons/fa';
import { NavItem } from '../interfaces';
import { RiHome6Fill } from "react-icons/ri";


export const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: RiHome6Fill },
    { path: '/dashboard/invoices', label: 'Invoices', icon: FaFileInvoice },
    { path: '/estimates', label: 'Estimates', icon: FaFileAlt },
    { path: '/bills', label: 'Bills', icon: FaLayerGroup },
    { path: '/appointments', label: 'Appointments', icon: FaCalendarAlt },
    { path: '/documents', label: 'Documents', icon: FaClipboardList },
    { path: '/clients', label: 'Clients', icon: FaUsers },
    { path: '/reports', label: 'Reports', icon: FaChartBar },
    { path: '/notifications', label: 'Notifications', icon: FaBell },
    { path: '/settings', label: 'Settings', icon: FaCog },
];
