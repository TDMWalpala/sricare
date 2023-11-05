import React, { useState } from 'react';

function ServiceActivation() {
  const [selectedService, setSelectedService] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleActivateService = () => {
    // Placeholder for service activation logic
    alert(`Activated ${selectedService} service`);
    setIsActive(true);
  };

  const handleDeactivateService = () => {
    // Placeholder for service deactivation logic
    alert(`Deactivated ${selectedService} service`);
    setIsActive(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Service Activation/Deactivation</h2>
      <div className="flex items-center space-x-4 mb-4">
        <label className="text-gray-700">Select a service:</label>
        <select
          value={selectedService}
          onChange={handleServiceChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Select a service</option>
          <option value="International Roaming">International Roaming</option>
          <option value="Ring-in Tone">Ring-in Tone</option>
          <option value="Data Top-ups">Data Top-ups</option>
          <option value="VAS Services">VAS Services</option>
        </select>
      </div>
      <button
        onClick={handleActivateService}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
      >
        Activate
      </button>
      <button
        onClick={handleDeactivateService}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Deactivate
      </button>
      {isActive && <p className="text-green-600 mt-4">{selectedService} service is active.</p>}
    </div>
  );
}

export default ServiceActivation;
