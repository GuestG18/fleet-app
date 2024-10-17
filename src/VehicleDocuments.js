import React from 'react';

const VehicleDocuments = ({ vehicle }) => {
  return (
    <div className="vehicle-documents mt-2">
      <h6>Documents for {vehicle.name} - {vehicle.licensePlate}</h6>
      {vehicle.documents && vehicle.documents.length > 0 ? (
        <ul className="list-group">
          {vehicle.documents.map((doc, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {doc.name}
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                View/Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents uploaded yet.</p>
      )}
    </div>
  );
};

export default VehicleDocuments;
