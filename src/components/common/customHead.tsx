// components/Head.tsx
import React from 'react';
import Head from 'next/head';

const CustomHead: React.FC<{ title?: string; description?: string }> = ({ title = 'Invoice101', description = 'Manage your invoices and appointments efficiently' }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default CustomHead;
