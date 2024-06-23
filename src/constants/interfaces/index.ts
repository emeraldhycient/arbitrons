import { IconType } from 'react-icons';


export interface CustomHeadProps {
    title?: string;
    description?: string;
    leftComponent?: React.ReactNode;
    centerComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
}

export interface NavItem {
    path: string;
    label: string;
    icon: IconType;
}