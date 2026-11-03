import api from "./api";

const doctorService = {
  // Public
  listDoctors: (specialty) =>
    api.get("/doctors", { params: specialty ? { specialty } : {} }).then((res) => res.data),
  getSpecialties: () => api.get("/doctors/specialties").then((res) => res.data),
  getDoctor: (id) => api.get(`/doctors/${id}`).then((res) => res.data),
  // date: "2030-01-07" -> free 30-minute start times that day
  getSlots: (id, date) => api.get(`/doctors/${id}/slots`, { params: { date } }).then((res) => res.data),
  isAvailable: (id, dateTime) =>
    api.get(`/doctors/${id}/availability`, { params: { dateTime } }).then((res) => res.data.available),

  // Admin or that doctor
  getAppointments: (id, { date, status } = {}) =>
    api.get(`/doctors/${id}/appointments`, { params: { date, status } }).then((res) => res.data),
  // profile: { firstName, lastName, specialty, phone, availableDays: ["MONDAY"], availableTime: "09:00-17:00" }
  updateDoctor: (id, profile) => api.put(`/doctors/${id}`, profile).then((res) => res.data),

  // Admin only
  createDoctor: (doctor) => api.post("/doctors", doctor).then((res) => res.data),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
};

export default doctorService;
