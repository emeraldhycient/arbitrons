import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id: Number(id) },
            include: {
                client: true,
                items: true,
            },
        });

        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        return NextResponse.json(invoice, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
    }
}

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
