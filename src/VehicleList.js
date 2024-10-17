import React from 'react';

const VehicleList = ({ fleet, deleteVehicle, handleEditClick, handleViewDocumentsClick }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Vehicle Name</th>
            <th>License Plate</th>
            <th>Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fleet.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No vehicles available</td>
            </tr>
          ) : (
            fleet.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.name}</td>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.model}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(vehicle)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteVehicle(vehicle.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewDocumentsClick(vehicle)}
                  >
                    View Documents
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
