import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Change this if deploying

export const registerUser = async (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = async (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const enrollInCourse = async (courseId, token) => axios.post(`${API_URL}/courses/enroll/${courseId}`, {}, { headers: { Authorization: token } });
export const requestMentorship = async (mentorId, token) => axios.post(`${API_URL}/mentorships/request`, { mentorId }, { headers: { Authorization: token } });
export const donate = async (donationData) => axios.post(`${API_URL}/donations`, donationData);
