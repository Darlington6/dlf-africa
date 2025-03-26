// frontend/src/components/MentorshipPortal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MentorshipPortal = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/mentors')
      .then((response) => setMentors(response.data))
      .catch((error) => console.error('Error fetching mentors:', error));
  }, []);

  const requestMentorship = (mentorId) => {
    axios.post(`http://localhost:5000/api/mentors/${mentorId}/request`, { studentId: '12345' })
      .then(() => alert('Mentorship request sent!'))
      .catch((err) => console.error('Mentorship error:', err));
  };

  return (
    <div>
      <h2>Available Mentors</h2>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor._id}>
            {mentor.name} — {mentor.expertise}
            <button onClick={() => requestMentorship(mentor._id)}>Request Mentorship</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorshipPortal;
