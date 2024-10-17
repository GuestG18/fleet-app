import React, { useState, useEffect } from 'react';
import AddVehicleForm from './AddVehicleForm';
import VehicleList from './VehicleList';
import EditVehicleForm from './EditVehicleForm';
import Navbar from './Navbar';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [fleet, setFleet] = useState([]);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null); // For the modal
  const [selectedFile, setSelectedFile] = useState(null);

  // Modal control
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedFleet = JSON.parse(localStorage.getItem('fleet'));
    if (storedFleet) {
      setFleet(storedFleet);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fleet', JSON.stringify(fleet));
  }, [fleet]);

  const addVehicle = (vehicle) => {
    setFleet([...fleet, { ...vehicle, documents: [] }]);
  };

  const deleteVehicle = (id) => {
    setFleet(fleet.filter((vehicle) => vehicle.id !== id));
  };

  const handleEditClick = (vehicle) => {
    setVehicleToEdit(vehicle);
  };

  const updateVehicle = (updatedVehicle) => {
    const updatedFleet = fleet.map((vehicle) =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    );
    setFleet(updatedFleet);
    setVehicleToEdit(null);
  };

  const cancelEdit = () => {
    setVehicleToEdit(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const importedVehicles = jsonData.map((row) => ({
        id: Date.now() + Math.random(),
        name: row['Vehicle Name'],
        licensePlate: row['License Plate'],
        model: row['Model'],
        documents: [],
      }));

      setFleet([...fleet, ...importedVehicles]);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addDocument = (vehicleId) => {
    const updatedFleet = fleet.map((vehicle) => {
      if (vehicle.id === vehicleId) {
        const docUrl = URL.createObjectURL(selectedFile); // Create a URL for the document
        const newDocument = {
          name: selectedFile.name,
          url: docUrl,
        };
        const vehicleDocuments = vehicle.documents || [];
        return {
          ...vehicle,
          documents: [...vehicleDocuments, newDocument],
        };
      }
      return vehicle;
    });

    setFleet(updatedFleet);
    setSelectedFile(null); // Clear the file after upload
    setShowModal(false); // Close the modal after upload
  };

  const handleViewDocumentsClick = (vehicle) => {
    const vehicleDocuments = vehicle.documents || [];
    
    if (vehicleDocuments.length === 0) {
      alert(`No documents uploaded for ${vehicle.name}.`);
    } else {
      const documentList = vehicleDocuments
        .map((doc) => `<a href="${doc.url}" target="_blank">${doc.name}</a>`)
        .join('<br/>');
  
      const docWindow = window.open("", "Documents", "width=400,height=300");
      docWindow.document.write(`<h3>Documents for ${vehicle.name}</h3>${documentList}`);
    }
  };
  

  const filteredFleet = fleet.filter((vehicle) => {
    return (
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Fleet Management System</h1>

        {vehicleToEdit ? (
          <EditVehicleForm
            vehicleToEdit={vehicleToEdit}
            updateVehicle={updateVehicle}
            cancelEdit={cancelEdit}
          />
        ) : (
          <>
            <AddVehicleForm addVehicle={addVehicle} />

            {/* File Input for Excel upload */}
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="form-control mb-4"
            />

            {/* Centered Search Bar */}
            <div className="row justify-content-center">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  className="form-control mb-4 text-center"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <VehicleList
              fleet={filteredFleet}
              deleteVehicle={deleteVehicle}
              handleEditClick={handleEditClick}
              handleViewDocumentsClick={handleViewDocumentsClick}
            />

            {/* Upload Document Button */}
            <div className="text-center mb-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Upload Document for a Vehicle
              </button>
            </div>

            {/* Modal for Uploading Documents */}
            {showModal && (
              <div
                className="modal show d-block"
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Upload Document</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label>Select a vehicle:</label>
                        <select
                          className="form-select"
                          onChange={(e) => setSelectedVehicle(Number(e.target.value))} // Convert to number
                          value={selectedVehicle || ''}
                        >
                          <option value="">Choose a vehicle</option>
                          {fleet.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                              {vehicle.name} - {vehicle.licensePlate} {/* Show both name and license plate */}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label>Upload PDF:</label>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => addDocument(selectedVehicle)}
                        disabled={!selectedFile || !selectedVehicle}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
