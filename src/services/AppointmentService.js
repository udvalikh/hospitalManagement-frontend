const BASE_URL = "http://localhost:8080";

const appointmentService = {
  getDoctorAppointments: function () {
    return fetch(BASE_URL + "/doctor/appointments")
      .then((response) => response.json());
  },

  getPatientAppointments: function () {
    return fetch(BASE_URL + "/patient/appointments")
      .then((response) => response.json());
  },

  bookAppointment: function (appointment) {
    return fetch(BASE_URL + "/patient/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointment)
    }).then((response) => response.json());
  },

  updateAvailability: function (availability) {
    return fetch(BASE_URL + "/doctor/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(availability)
    }).then((response) => response.json());
  }
};

export default appointmentService;