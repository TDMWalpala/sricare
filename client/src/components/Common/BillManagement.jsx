import React, { useEffect, useState } from 'react';

function BillManagement() {
  const [currentBills, setCurrentBills] = useState([]);
  const [pastBills, setPastBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    // Fetch current bills
    fetch('/api/get-current-bills')
      .then((response) => response.json())
      .then((data) => setCurrentBills(data))
      .catch((error) => console.error('Error fetching current bills:', error));

    // Fetch past bills
    fetch('/api/get-past-bills')
      .then((response) => response.json())
      .then((data) => setPastBills(data))
      .catch((error) => console.error('Error fetching past bills:', error));
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (selectedBill) {
      setIsPaying(true);

      try {
        const response = await fetch('/api/pay-bill', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            billId: selectedBill.id,
            cardNumber: cardNumber,
          }),
        });

        if (response.ok) {
          setIsPaying(false);
          setSelectedBill(null);
          setCardNumber('');
          // Refetch bills or update state accordingly
        } else {
          console.error('Payment error:', response.statusText);
        }
      } catch (error) {
        console.error('Payment error:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Bill Management</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Current Bills</h2>
        <ul className="list-disc ml-6">
          {currentBills.map((bill) => (
            <li key={bill.id}>{bill.title}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Past Bills</h2>
        <ul className="list-disc ml-6">
          {pastBills.map((bill) => (
            <li key={bill.id}>{bill.title}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Payment</h2>
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <select
              onChange={(e) => setSelectedBill(e.target.value)}
              value={selectedBill ? selectedBill.id : ''}
              className="w-1/2 border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select a bill</option>
              {currentBills.map((bill) => (
                <option key={bill.id} value={bill.id}>
                  {bill.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={isPaying}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Pay Bill
          </button>
        </form>
      </div>
    </div>
  );
}

export default BillManagement;
