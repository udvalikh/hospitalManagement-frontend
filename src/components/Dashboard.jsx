import React from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import DoctorList from './DoctorList';

const TITLES = { ADMIN: "Admin", DOCTOR: "Doctor", PATIENT: "Patient" };

const Dashboard = () => {

    const { session, logout } = useAuth();
    const navigate = useNavigate();
    const role = session.role;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className='min-h-screen bg-gray-50 p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-blue-700'>
                    {TITLES[role] || role} Dashboard
                </h1>
                <div>
                    <span className='mr-4 text-gray-600'>Signed in as {session.username}</span>
                    <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 text-white rounded-lg">
                        Logout
                    </button>
                </div>
            </div>

            {role === "DOCTOR" && <DoctorDashboard />}

            {role === "PATIENT" && <PatientDashboard />}

            {role === "ADMIN" && <DoctorList />}

        </div>
    )
}

export default Dashboard
