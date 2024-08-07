import React, { useState, useEffect } from "react";
import "./styles/withdrawRequest.css"; // Import the CSS file

// Utility function to decode JWT and extract user ID
const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
    return payload.user.id; // Adjust according to your token structure
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Function to fetch classes from the backend
const fetchClasses = async () => {
  const response = await fetch("http://localhost:5000/classes"); // Adjust the URL if needed
  if (!response.ok) {
    throw new Error("Failed to fetch classes");
  }
  return response.json();
};

const WithdrawalForm = () => {
  const [classId, setClassId] = useState("");
  const [reason, setReason] = useState("");
  const [userId, setUserId] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Get user ID from JWT token
    const id = getUserIdFromToken();
    setUserId(id);

    // Fetch classes from the backend
    const getClasses = async () => {
      try {
        const classes = await fetchClasses();
        setClasses(classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    getClasses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId, reason, userId }),
      });

      if (response.ok) {
        alert("Withdrawal request submitted successfully!");
      } else {
        alert("Error submitting withdrawal request");
      }
    } catch (error) {
      alert("Error submitting withdrawal request");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Withdrawal Request</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="classId">Class:</label>
          <select
            id="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            required
          >
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WithdrawalForm;
