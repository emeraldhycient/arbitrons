'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Item {
    description: string;
    quantity: number;
    price: number;
}

const CreateInvoicePage: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [clientId, setClientId] = useState<string>('');
    const [items, setItems] = useState<Item[]>([{ description: '', quantity: 1, price: 0 }]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [status, setStatus] = useState<string>('DRAFT');
    const [dueDate, setDueDate] = useState<string>('');
    const [scheduleSend, setScheduleSend] = useState<string>('');
    const router = useRouter();

    const handleItemChange = (index: number, field: keyof Item, value: any) => {
        const newItems = [...items];
        newItems[index][field]= value as never
        setItems(newItems);

        const newTotalAmount = newItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(newTotalAmount);
    };

    const addItem = () => {
        setItems([...items, { description: '', quantity: 1, price: 0 }]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);

        const newTotalAmount = newItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(newTotalAmount);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, clientId, items, totalAmount, status, dueDate, scheduleSend }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            router.push('/invoices');
        } catch (error) {
            console.error('Error creating invoice:', error);
            // Optionally handle the error with a user-friendly message or UI
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Create New Invoice</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-bold mb-2">User ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Client ID</label>
                    <input
                        type="text"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Items</label>
                    {items.map((item, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                className="w-1/3 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                className="w-1/6 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                                className="w-1/6 p-2 border rounded"
                                required
                            />
                            <button type="button" onClick={() => removeItem(index)} className="btn btn-danger">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="btn btn-secondary">
                        Add Item
                    </button>
                </div>
                <div>
                    <label className="block font-bold mb-2">Total Amount</label>
                    <input
                        type="text"
                        value={`$${totalAmount.toFixed(2)}`}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
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
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Schedule Send (optional)</label>
                    <input
                        type="datetime-local"
                        value={scheduleSend}
                        onChange={(e) => setScheduleSend(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Invoice
                </button>
            </form>
        </div>
    );
};

export default CreateInvoicePage;
