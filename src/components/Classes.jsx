import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./styles/Classes.css";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user.role;

      if (userRole !== "user") {
        setError("Access denied");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleEnroll = (classId) => {
    // Implement enrollment logic here
    console.log(`Enrolled in class ${classId}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="classes-container">
      <h2 className="title">Available Classes</h2>
      <div className="classes-list">
        {classes.map((classItem) => (
          <div className="class-card" key={classItem._id}>
            <h3 className="class-title">{classItem.title}</h3>
            <p className="class-description">{classItem.description}</p>
            <p className="class-instructor">
              Instructor: {classItem.instructor}
            </p>
            <button
              className="enroll-button"
              onClick={() => handleEnroll(classItem._id)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
