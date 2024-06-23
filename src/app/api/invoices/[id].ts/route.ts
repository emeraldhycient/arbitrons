import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/invoices/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
    }

    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        return NextResponse.json(invoice, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/invoices/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const { clientId, items, totalAmount, status, dueDate, scheduleSend } = await request.json();
        const updatedInvoice = await prisma.invoice.update({
            where: { id: Number(id) },
            data: {
                clientId,
                totalAmount,
                status,
                dueDate,
                scheduleSend,
                items: {
                    deleteMany: {},
                    create: items,
                },
            },
        });

        return NextResponse.json(updatedInvoice, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }
}
