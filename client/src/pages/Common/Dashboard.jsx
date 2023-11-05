import React from 'react';
import BillManagement from '../../components/Common/BillManagement';
import ServicesList from '../../components/Common/ServiceItem';

function Dashboard() {
  return (
    <div className="flex space-x-4">
      <ServicesList />
      <BillManagement />
    </div>
  );
}

export default Dashboard;
