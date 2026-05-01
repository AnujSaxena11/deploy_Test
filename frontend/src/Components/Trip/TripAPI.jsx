import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTripById = async (id) => {
  const res = await axios.get(`${API}/api/read-trips/my-trip/${id}`, { withCredentials: true });
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API}/api/auth/get-user/${id}`, { withCredentials: true });
  return res.data;
};

export const sendInvite = async (tripId, email) => {
  const res = await axios.post(
    `${API}/api/trips/invite-user/${tripId}`,
    { email },
    { withCredentials: true }
  );
  return res.data;
};

export const getMembers = async (tripId) => {
  const res = await axios.get(`${API}/api/trips/${tripId}/members`, { withCredentials: true });
  // console.log(res);
  return res.data;
};

export const checkItineraryExists = async (tripId) => {
  try {
    await axios.get(`${API}/api/read-itinerary/trip/${tripId}`, { withCredentials: true });
    return true;
  } catch (err) {
    if (err?.response?.status === 404) return false;
    throw err;
  }
};

export const acceptRequest = async (token) => {
  const res = await axios.get(`${API}/api/trips/accept-invite`, {
    params: { token },
    withCredentials: true
  });
  return res.data;
};

export const getMyTrips = async () => {
  const res = await axios.get(`${API}/api/read-trips/my-trips`, { withCredentials: true });
  return res.data;
};

export const getTripExpenses = async (tripId) => {
  const res = await axios.get(`${API}/api/expense-splitter/get-expenses/${tripId}`, { withCredentials: true });
  return res.data;
};

export const addExpense = async (tripId, payload) => {
  const res = await axios.post(
    `${API}/api/expense-splitter/add-expense/${tripId}`,
    payload,
    { withCredentials: true }
  );
  return res.data;
};

export const getSettlements = async (tripId) => {
  const res = await axios.get(`${API}/api/expense-splitter/get-settlement/${tripId}`, { withCredentials: true });
  return res.data;
};

export const settleExpense = async (tripId, payload) => {
  const res = await axios.post(
    `${API}/api/expense-splitter/settle-expense/${tripId}`,
    payload,
    { withCredentials: true }
  ).catch((e) => console.log(e));
  return res.data;
};

export const confirmSettlement = async (settlementId) => {
  const res = await axios.post(
    `${API}/api/expense-splitter/confirm-settlement/${settlementId}`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

export const getUserBalance = async (tripId) => {
  const res = await axios.get(`${API}/api/expense-splitter/get-balance/${tripId}`, { withCredentials: true });
  return res.data;
};

export const getDocuments = async (tripId) => {
  const res = await axios.get(`${API}/api/docs/trips/${tripId}`, { withCredentials: true });
  return res.data;
};

export const getDocumentById = async (docId) => {
  const res = await axios.get(`${API}/api/docs/${docId}`, { withCredentials: true });
  return res.data;
};


export const uploadDocument = async (tripId, file, title, description) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("description", description);
  const res = await axios.post(`${API}/api/docs/trips/${tripId}`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteDocument = async (docId) => {
  const res = await axios.delete(`${API}/api/docs/${docId}`, { withCredentials: true });
  return res.data;
};