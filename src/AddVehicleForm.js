import React, { useState } from 'react';

const AddVehicleForm = ({ addVehicle }) => {
  const [vehicle, setVehicle] = useState({
    id: '',
    name: '',
    licensePlate: '',
    model: '',
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle({ ...vehicle, id: Date.now() });
    setVehicle({ id: '', name: '', licensePlate: '', model: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
      <input
        type="text"
        className="form-control"
        name="name"
        placeholder="Vehicle Name"
        value={vehicle.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="form-control"
        name="licensePlate"
        placeholder="License Plate"
        value={vehicle.licensePlate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="form-control"
        name="model"
        placeholder="Vehicle Model"
        value={vehicle.model}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-primary">Add Vehicle</button>
    </form>
  );
};

export default AddVehicleForm;
