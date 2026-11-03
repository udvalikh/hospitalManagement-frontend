import api from "./api";

// Dates are ISO-8601 local time, e.g. "2030-01-07T09:30:00".
const appointmentService = {
  // Doctors only see their own schedule, patients only their own bookings.
  listAppointments: ({ doctorId, patientId, date, status } = {}) =>
    api.get("/appointments", { params: { doctorId, patientId, date, status } }).then((res) => res.data),

  getAppointment: (id) => api.get(`/appointments/${id}`).then((res) => res.data),

  // Patients: { doctorId, appointmentDate, reason? }. Admins also pass patientId.
  bookAppointment: (appointment) => api.post("/appointments", appointment).then((res) => res.data),

  // Reschedule: { doctorId, appointmentDate, reason? }
  rescheduleAppointment: (id, changes) => api.put(`/appointments/${id}`, changes).then((res) => res.data),

  // status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }).then((res) => res.data),

  cancelAppointment: (id) => appointmentService.updateStatus(id, "CANCELLED"),

  // Admin only (hard delete; prefer cancelling)
  deleteAppointment: (id) => api.delete(`/appointments/${id}`),
};

export default appointmentService;
