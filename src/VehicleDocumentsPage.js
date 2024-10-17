import React from 'react';
import { Link } from 'react-router-dom';

const VehicleDocumentsPage = ({ fleet }) => {
  const vehiclesWithDocuments = fleet.filter(vehicle => vehicle.documents && vehicle.documents.length > 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Vehicles with Uploaded Documents</h2>
      <ul className="list-group">
        {vehiclesWithDocuments.length > 0 ? (
          vehiclesWithDocuments.map((vehicle) => (
            <li key={vehicle.id} className="list-group-item">
              <strong>{vehicle.name} - {vehicle.licensePlate}</strong>
              <ul className="list-group mt-2">
                {vehicle.documents.map((doc, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {doc.name}
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      View/Download
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No vehicles have uploaded documents yet.</p>
        )}
      </ul>
      <Link to="/" className="btn btn-primary mt-4">Back to Fleet</Link>
    </div>
  );
};

export default VehicleDocumentsPage;
