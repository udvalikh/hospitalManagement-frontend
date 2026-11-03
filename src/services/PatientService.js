import api from "./api";

const patientService = {
  // Admin or doctor
  listPatients: () => api.get("/patients").then((res) => res.data),

  getPatient: (id) => api.get(`/patients/${id}`).then((res) => res.data),

  // { firstName, lastName, insuranceNumber, phone, email }
  updatePatient: (id, profile) => api.put(`/patients/${id}`, profile).then((res) => res.data),

  getAppointments: (id, { date, status } = {}) =>
    api.get(`/patients/${id}/appointments`, { params: { date, status } }).then((res) => res.data),

  // Admin only
  deletePatient: (id) => api.delete(`/patients/${id}`),
};

export default patientService;
