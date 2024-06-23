// app/invoices/[id]/download/page.tsx

'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';

const DownloadInvoicePage = () => {
    const { id } = useParams();

    useEffect(() => {
        const fetchAndGeneratePDF = async () => {
            const response = await fetch(`/api/invoices/${id}`);
            const invoice = await response.json();

            // Generate PDF
            const doc = new jsPDF();
            doc.text(`Invoice ID: ${invoice.id}`, 10, 10);
            doc.text(`Client: ${invoice.clientName}`, 10, 20);
            doc.text(`Amount: $${invoice.amount}`, 10, 30);
            doc.text(`Status: ${invoice.status}`, 10, 40);
            // Save the PDF
            doc.save(`Invoice-${invoice.id}.pdf`);
        };

        fetchAndGeneratePDF();
    }, [id]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Downloading Invoice...</h1>
        </div>
    );
};

export default DownloadInvoicePage;
