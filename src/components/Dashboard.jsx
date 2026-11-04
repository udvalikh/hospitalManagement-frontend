import React from 'react';
import { useAuth } from '../context/AuthContext';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import DoctorList from './DoctorList';
import PageLayout from './layout/PageLayout';

const TITLES = { ADMIN: "Admin", DOCTOR: "Doctor", PATIENT: "Patient" };

const Dashboard = () => {

    const { session } = useAuth();
    const role = session.role;

    return (
        <PageLayout footer={false}>
            {/* Page header (logout lives in the navbar) */}
            <div className='bg-gradient-to-r from-teal-600 to-sky-600 text-white'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    <p className='text-teal-100 text-sm uppercase tracking-widest'>{TITLES[role] || role} Dashboard</p>
                    <h1 className='text-3xl font-bold mt-1'>Hello, {session.username}</h1>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-8'>
                {role === "DOCTOR" && <DoctorDashboard />}

                {role === "PATIENT" && <PatientDashboard />}

                {role === "ADMIN" && <DoctorList />}
            </div>
        </PageLayout>
    )
}

export default Dashboard
