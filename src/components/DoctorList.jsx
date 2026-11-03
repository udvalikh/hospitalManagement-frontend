import React, { useEffect, useState } from 'react'
import { listDoctors } from '../services/DoctorService';

const DoctorList = () => {

  const [doctors, setDoctors] = useState([]);
  
  useEffect(() =>{
    listDoctors().then((response) => {
        
        console.log("API Response:", response.data);
        setDoctors(response.data);
    }).catch(error => {
            console.error(error);
    });
  }, []);

  if (!Array.isArray(doctors)) return <p>Loading...</p>

  return (
    <div>
        <h2>Doctors</h2>
        <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
                <tr>
                    <th>Doctor Name</th>
                    <th>Available Days</th>
                </tr>
            </thead>
            <tbody>
                {
                    doctors.map(doctor =>
                    <tr key={doctor.id}>
                        <td>{doctor.firstName}{doctor.lastName}</td>
                        <td>{doctor.avalableDays}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default DoctorList

