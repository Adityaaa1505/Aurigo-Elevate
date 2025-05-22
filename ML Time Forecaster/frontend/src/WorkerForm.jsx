import { useState } from "react";

const WorkerForm = ({ onResponse }) => {
  const [formData, setFormData] = useState({
    projectType: '',
    city: '',
    state: '',
    area: '',
    workers: '',
    time: 8,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSliderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      time: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        onResponse(data)
        console.log('Success:', data);
      } else {
        console.log('Error: Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroupRow}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Project Type:</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.inputGroupRow}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Site Area (in sq. m):</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>No. of People:</label>
          <input
            type="number"
            name="workers"
            value={formData.workers}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Working Hours / Day:</label>
          <div style={styles.sliderContainer}>
            <input
              type="range"
              name="hoursPerWorker"
              min="5"
              max="10"
              value={formData.time}
              onChange={handleSliderChange}
              style={styles.slider}
            />
            <span style={styles.sliderValue}>{formData.time}h</span>
          </div>
        </div>
      </div>
      <button type="submit" style={styles.submitButton}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#333',
  },
  label: {
    color: '#555',
  },
  input: {
    width: '100%',
    margin: '5px 0'
  },
  sliderValue: {
    fontSize: '12px',
    color: '#555',
  },
  submitButton: {
    width: '100%',
    padding: '4px',
    fontSize: '15x',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default WorkerForm;
