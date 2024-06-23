import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const invoices = await prisma.invoice.findMany({
            include: {
                client: true,
                items: true,
            },
        });
        return NextResponse.json(invoices, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { clientId, items, totalAmount, status, dueDate, scheduleSend } = await request.json();
        const newInvoice = await prisma.invoice.create({
            data: {
                clientId,
                totalAmount,
                status,
                dueDate,
                scheduleSend,
                items: {
                    create: items,
                },
            },
        });
        return NextResponse.json(newInvoice, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}
