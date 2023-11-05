import React, { useState } from 'react';
import ServiceItem from '../../components/Common/ServiceItem';
import BillManagement from '../../components/Common/BillManagement'; // Import the BillManagement component

const servicesData = [
  { id: 1, name: 'International Roaming', isActive: false },
  { id: 2, name: 'Ring-in Tone Personalization', isActive: true },
  // Add more services
];

function ServicesList() {
  const [services, setServices] = useState(servicesData);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState('');

  const handleToggle = (serviceId) => {
    // Implement service activation/deactivation logic
    // For the mock, update the service status in the state
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId ? { ...service, isActive: !service.isActive } : service
      )
    );
  };

  const handleViewBills = () => {
    // Placeholder for fetching and displaying bills
    setBills(['Bill 1', 'Bill 2', 'Bill 3']);
  };

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
  };

  const activatedServices = services.filter((service) => service.isActive);
  const deactivatedServices = services.filter((service) => !service.isActive);

  return (
    <div style={{ marginTop: '90px' }}>
      <h1>Services List</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Activated Services</h2>
          {activatedServices.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              onToggle={() => handleToggle(service.id)}
            />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h2>Deactivated Services</h2>
          {deactivatedServices.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              onToggle={() => handleToggle(service.id)}
            />
          ) )}
        </div>
      </div>
      <BillManagement bills={bills} onPayBill={handlePayBill} />
    </div>
  );
}

export default ServicesList;
