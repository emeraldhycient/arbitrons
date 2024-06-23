// constants/navItems.ts
import { FaTachometerAlt, FaFileInvoice, FaCalendarAlt, FaClipboardList, FaUsers, FaCog } from 'react-icons/fa';
import { NavItem } from '../interfaces';



export const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/invoices', label: 'Invoices', icon: FaFileInvoice },
    { path: '/appointments', label: 'Appointments', icon: FaCalendarAlt },
    { path: '/documents', label: 'Documents', icon: FaClipboardList },
    { path: '/clients', label: 'Clients', icon: FaUsers },
    { path: '/settings', label: 'Settings', icon: FaCog },
];
