import React from 'react';

function ServiceActivation({ service, onToggle }) {
  const { id, name, isActive } = service;

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <div className={`p-4 ${isActive ? 'bg-green-200' : 'bg-red-200'} rounded-lg my-2`}>
      <h2 className="text-xl font-semibold">{name}</h2>
      {isActive ? (
        <button onClick={handleToggle} className="bg-red-500 text-white py-2 px-4 rounded-md">
          Deactivate
        </button>
      ) : (
        <button onClick={handleToggle} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Activate
        </button>
      )}
    </div>
  );
}

export default ServiceActivation;
