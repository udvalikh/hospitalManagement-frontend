import React, { useEffect, useState } from 'react'
import doctorService from '../services/DoctorService';
import { errorMessage } from '../services/api';

const formatDays = (days) =>
  days && days.length > 0
    ? days.map((d) => d.charAt(0) + d.slice(1, 3).toLowerCase()).join(", ")
    : "Every day";

const DoctorList = () => {

  const [doctors, setDoctors] = useState(null);
  const [error, setError] = useState("");

  useEffect(() =>{
    doctorService.listDoctors()
      .then(setDoctors)
      .catch((err) => setError(errorMessage(err, "Could not load doctors")));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>
  if (!doctors) return <p>Loading...</p>

  return (
    <div>
        <h2>Doctors</h2>
        <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
                <tr>
                    <th>Doctor Name</th>
                    <th>Specialty</th>
                    <th>Available Days</th>
                    <th>Hours</th>
                </tr>
            </thead>
            <tbody>
                {
                    doctors.map(doctor =>
                    <tr key={doctor.doctorId}>
                        <td>Dr. {doctor.firstName} {doctor.lastName}</td>
                        <td>{doctor.specialty}</td>
                        <td>{formatDays(doctor.availableDays)}</td>
                        <td>{doctor.availableTime || "09:00-17:00"}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default DoctorList
