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
    <div className='bg-white shadow rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Doctors</h2>
        <table className='w-full text-left border-collapse'>
            <thead className='bg-teal-700 text-white'>
                <tr>
                    <th className='p-3'>Doctor Name</th>
                    <th className='p-3'>Specialty</th>
                    <th className='p-3'>Available Days</th>
                    <th className='p-3'>Hours</th>
                </tr>
            </thead>
            <tbody>
                {
                    doctors.map(doctor =>
                    <tr key={doctor.doctorId} className='border-b border-slate-200 odd:bg-white even:bg-slate-50'>
                        <td className='p-3'>Dr. {doctor.firstName} {doctor.lastName}</td>
                        <td className='p-3'>{doctor.specialty}</td>
                        <td className='p-3'>{formatDays(doctor.availableDays)}</td>
                        <td className='p-3'>{doctor.availableTime || "09:00-17:00"}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default DoctorList
