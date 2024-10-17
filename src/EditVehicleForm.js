// EditVehicleForm.js
import React, { useState } from 'react';

const EditVehicleForm = ({ vehicleToEdit, updateVehicle, cancelEdit }) => {
  const [vehicle, setVehicle] = useState(vehicleToEdit);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVehicle(vehicle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Vehicle</h3>
      <div className="mb-3">
        <label>Vehicle Name</label>
        <input
          type="text"
          name="name"
          value={vehicle.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>License Plate</label>
        <input
          type="text"
          name="licensePlate"
          value={vehicle.licensePlate}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Vehicle Model</label>
        <input
          type="text"
          name="model"
          value={vehicle.model}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Vehicle</button>
      <button type="button" onClick={cancelEdit} className="btn btn-secondary ms-2">Cancel</button>
    </form>
  );
};

export default EditVehicleForm;
