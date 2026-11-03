import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const storedRole = localStorage.getItem("role");
        if (!storedRole) {
            navigate("/login");
        } else {
            setRole(storedRole);
        }
    }, [navigate]);

    if (!role) {
        return <p className='text-center mt-10'>Loading Dashboard...</p>
    }


    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <h1 className='text-3xl font-bold text-blue-700 mb-6'>
                {role} Dashboard
            </h1>

            {role === "DOCTOR" && (
                <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
                    <h2 className="text-xl font-semibold mb-4">Doctor Panel</h2>
                    <p className="text-gray-600 mb-4">
                        Here you can view and manage your patients’ appointments.
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        View Appointments
                    </button>
                </div>
            )}

            {role === "PATIENT" && (
                <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
                    <h2 className="text-xl font-semibold mb-4">Patient Panel</h2>
                    <p className="text-gray-600 mb-4">
                        Here you can book appointments and check your medical records.
                    </p>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Book Appointment
                    </button>
                </div>
            )}

        </div>
    )
}

export default Dashboard