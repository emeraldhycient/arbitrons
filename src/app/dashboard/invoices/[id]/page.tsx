'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { FaEdit, FaSave } from 'react-icons/fa';

interface Item {
    description: string;
    quantity: number;
    price: number;
}

interface Invoice {
    id: number;
    userId: string;
    clientId: string;
    items: Item[];
    totalAmount: number;
    status: string;
    dueDate: string;
    scheduleSend?: string;
}

const dummyInvoice: Invoice = {
    id: 1,
    userId: '123',
    clientId: '456',
    items: [
        { description: 'Service A', quantity: 1, price: 100 },
        { description: 'Service B', quantity: 2, price: 50 },
    ],
    totalAmount: 200,
    status: 'DRAFT',
    dueDate: '2023-12-31',
};

const InvoiceDetailsPage: React.FC = () => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const { id } = useParams();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await fetch(`/api/invoices/${id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setInvoice(data);
            } catch (error) {
                console.error('Error fetching invoice:', error);
                setInvoice(dummyInvoice); // Use dummy data on error
            }
        };

        fetchInvoice();
    }, [id]);

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!invoice) return;

        try {
            const response = await fetch(`/api/invoices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoice),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setIsEditing(false);
            router.push('/invoices');
        } catch (error) {
            console.error('Error updating invoice:', error);
            // Optionally handle the error with a user-friendly message or UI
        }
    };

    if (!invoice) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Invoice Details</h1>
                <button
                    onClick={() => setIsEditing((prev) => !prev)}
                    className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
                >
                    <FaEdit className="mr-2" /> {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block font-bold mb-2">User ID</label>
                    <input
                        type="text"
                        value={invoice.userId}
                        onChange={(e) => setInvoice({ ...invoice, userId: e.target.value })}
                        className="w-full p-2 border rounded"
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Client ID</label>
                    <input
                        type="text"
                        value={invoice.clientId}
                        onChange={(e) => setInvoice({ ...invoice, clientId: e.target.value })}
                        className="w-full p-2 border rounded"
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Items</label>
                    {invoice.items.map((item, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => {
                                    const newItems = [...invoice.items];
                                    newItems[index].description = e.target.value;
                                    setInvoice({ ...invoice, items: newItems });
                                }}
                                className="w-1/3 p-2 border rounded"
                                required
                                disabled={!isEditing}
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => {
                                    const newItems = [...invoice.items];
                                    newItems[index].quantity = Number(e.target.value);
                                    setInvoice({ ...invoice, items: newItems });
                                }}
                                className="w-1/6 p-2 border rounded"
                                required
                                disabled={!isEditing}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => {
                                    const newItems = [...invoice.items];
                                    newItems[index].price = Number(e.target.value);
                                    setInvoice({ ...invoice, items: newItems });
                                }}
                                className="w-1/6 p-2 border rounded"
                                required
                                disabled={!isEditing}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block font-bold mb-2">Total Amount</label>
                    <input
                        type="text"
                        value={`$${invoice.totalAmount.toFixed(2)}`}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Status</label>
                    <select
                        value={invoice.status}
                        onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                        disabled={!isEditing}
                    >
                        <option value="DRAFT">Draft</option>
                        <option value="SENT">Sent</option>
                        <option value="PAID">Paid</option>
                    </select>
                </div>
                <div>
                    <label className="block font-bold mb-2">Due Date</label>
                    <input
                        type="date"
                        value={invoice.dueDate}
                        onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Schedule Send</label>
                    <input
                        type="datetime-local"
                        value={invoice.scheduleSend || ''}
                        onChange={(e) => setInvoice({ ...invoice, scheduleSend: e.target.value })}
                        className="w-full p-2 border rounded"
                        disabled={!isEditing}
                    />
                </div>
                {isEditing && (
                    <button type="submit" className="btn btn-primary">
                        <FaSave className="mr-2" /> Save Changes
                    </button>
                )}
            </form>
        </div>
    );
};

export default InvoiceDetailsPage;
