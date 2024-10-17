import React from 'react';

const VehicleItem = ({ vehicle, deleteVehicle, handleEditClick }) => {
  return (
    <li className="d-flex justify-content-between align-items-center mb-2">
      {vehicle.name} - {vehicle.licensePlate} ({vehicle.model})
      <div>
        <button
          onClick={() => handleEditClick(vehicle)} // Call handleEditClick with the vehicle
          className="btn btn-warning btn-sm mx-2"
        >
          Edit
        </button>
        <button
          onClick={() => deleteVehicle(vehicle.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default VehicleItem;
