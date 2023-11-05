import React, { useState } from 'react';

function BillManagement({ bills, onPayBill }) {
  const [selectedBill, setSelectedBill] = useState('');

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
  };

  return (
    <div>
      <h2>Bill Management</h2>
      <button onClick={() => onPayBill(bills)}>View Bills</button>
      <ul>
        {bills.map((bill) => (
          <li key={bill} onClick={() => handlePayBill(bill)}>
            {bill}
          </li>
        ))}
      </ul>
      {selectedBill && (
        <div>
          <h3>Pay Bill</h3>
          <button onClick={() => handlePayBill('')}>Back to Bills</button>
          <div>
            {/* Add payment form here */}
            Selected Bill: {selectedBill}
            {/* Payment form */}
            {/* Example: */}
            <input type="text" placeholder="Enter card details" />
            <button onClick={() => onPayBill(selectedBill)}>Pay Bill</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillManagement;
