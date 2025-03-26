import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mentorship = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mentorships/mentors");
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const handleRequestMentorship = (mentorId) => {
    if (!token) {
      alert("You must log in to request mentorship!");
      navigate("/login");
    } else {
      console.log("Mentorship requested for mentor:", mentorId);
    }
  };

  return (
    <div>
      <h1>Mentorship Program</h1>
      <p>Connect with industry professionals for guidance.</p>
      {mentors.length === 0 ? (
        <p>No mentors available at the moment.</p>
      ) : (
        <ul>
          {mentors.map((mentor) => (
            <li key={mentor._id}>
              <h3>{mentor.name}</h3>
              <p>{mentor.expertise}</p>
              <button onClick={() => handleRequestMentorship(mentor._id)}>
                Request Mentorship
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mentorship;
