import React, { useState, useEffect } from 'react';
import BillManagement from "../../components/Common/BillManagement"; // Import the BillManagement component
import Navbar from '../../components/Common/Navbar';

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [DeactivatedServices, setDeactivatedServices] = useState(false);
  const [ActivatedServices, setActivatedServices] = useState(false);

  useEffect(() => {
    // Fetch services from the API when the component mounts
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/get-service'); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchDeactivatedServices = async () => {
  //   try {
  //     const response = await fetch(`/api/get-deactivated-services/${userId}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setDeactivatedServices(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const fetchActivatedServices = async () => {
  //   try {
  //     const response = await fetch(`/api/get-user-service/:userid`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setActivatedServices(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setIsActive(services.find((service) => service.type === event.target.value)?.isActive || false);
  };

  const handleToggleService = async () => {
    try {
      const response = await fetch('/api/toggle-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedService,
          isActive: !isActive,
        }),
      }); // Replace with your API endpoint for toggling the service status

      if (response.ok) {
        setIsActive(!isActive);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter activated and deactivated services
  const activatedServices = services.filter((service) => service.isActive);
  const deactivatedServices = services.filter((service) => !service.isActive);

  return (
    <>
    <Navbar />
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Service Management</h2>
      <div className="flex-col items-center space-x-4 mb-4">
        <h1>Activated Services</h1>
        <div className="flex items-center space-x-4 mb-4">
        <label className="text-gray-700">Select a service:</label>
        <select
          value={selectedService}
          onChange={handleServiceChange}
          className="border border-gray-300 rounded-md p-2 w-1/4"
        >
          <option value="">Select a service</option>
          {
            // Show activated services
            activatedServices.map((service) => (
              <option key={service.id} value={service.type}>
                {service.type}
              </option>
            ))
          }
        </select>
        <button   onClick={() => handleToggleService(selectedService)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md">Deactivate</button>
                  </div>
      </div>
      <div className="flex-col items-center space-x-4 mb-4 ">
        <h1>Deactivated Services</h1>
        <label className="text-gray-700">Select a service:</label>
        <select
          value={selectedService}
          onChange={handleServiceChange}
          className="border border-gray-300 rounded-md p-2 w-1/4"
        >
          <option value="">Select a service</option>
          {
            // Show activated services
            deactivatedServices.map((service) => (
              <option key={service.id} value={service.type}>
                {service.type}
              </option>
            ))
          }
        </select>
        <button  onClick={() => handleToggleService(selectedService)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md">Activate</button>
      </div>
      
        
      
      {/* Include the BillManagement component */}
      <BillManagement />
    </div>
    </>
  );
}

export default ServiceManagement;
