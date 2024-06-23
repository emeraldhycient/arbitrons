import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust the import path as needed
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Invoice ID is required' });
    }

    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id: parseInt(id as string, 10) },
        });

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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
