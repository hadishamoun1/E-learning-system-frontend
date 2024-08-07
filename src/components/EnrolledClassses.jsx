import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./styles/EnrolledClasses.css";

const EnrolledClasses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
      } catch (err) {
        setError("Invalid token");
        setLoading(false);
        return;
      }

      const userId = decodedToken.user?.id;

      if (!userId) {
        setError("User ID not found in token");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userEnrollments = res.data.filter(
          (enrollment) => enrollment.user === userId
        );

        const classDetailsPromises = userEnrollments.map((enrollment) =>
          axios.get(`http://localhost:5000/classes/${enrollment.class._id}`)
        );

        const classDetails = await Promise.all(classDetailsPromises);

        const enrollmentsWithClassDetails = userEnrollments.map(
          (enrollment, index) => ({
            ...enrollment,
            classDetails: classDetails[index].data,
          })
        );

        setEnrollments(enrollmentsWithClassDetails);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching enrollments or class details:", err);
        setError(
          err.response
            ? err.response.data.message
            : "Error fetching enrollments or class details"
        );
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="enrolled-classes-container">
      <h2 className="title">My Enrolled Classes</h2>
      <div className="enrolled-classes-list">
        {enrollments.map((enrollment) => (
          <div className="enrolled-class-card" key={enrollment._id}>
            <h3 className="class-title">{enrollment.classDetails.title}</h3>
            <p className="class-description">
              {enrollment.classDetails.description}
            </p>
            <p className="class-instructor">
              Instructor: {enrollment.classDetails.instructor}
            </p>
            <p className="enrollment-date">
              Enrolled on:{" "}
              {new Date(enrollment.enrolledAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
