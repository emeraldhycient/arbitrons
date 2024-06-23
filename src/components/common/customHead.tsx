// components/Head.tsx
import React from 'react';
import Head from 'next/head';
import { CustomHeadProps } from '@/constants/interfaces';

const CustomHead: React.FC<CustomHeadProps> = ({
    title = 'Invoice101',
    description = 'Manage your invoices and appointments efficiently',
    leftComponent,
    centerComponent,
    rightComponent
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="flex flex-wrap items-center justify-between bg-blackBg text-white p-4 shadow-md border-b border-gray-700 w-full">
                <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                    {leftComponent}
                </div>
                <div className="flex justify-center w-full sm:w-auto flex-grow mb-2 sm:mb-0">
                    {centerComponent}
                </div>
                <div className="flex items-center justify-end w-full sm:w-auto">
                    {rightComponent}
                </div>
            </header>
        </>
    );
};

export default CustomHead;
