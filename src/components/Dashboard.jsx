import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../i18n/LanguageContext';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import DoctorList from './DoctorList';
import PageLayout from './layout/PageLayout';

const Dashboard = () => {

    const { session } = useAuth();
    const { t } = useLang();
    const role = session.role;

    return (
        <PageLayout footer={false} className="bg-brand-50/60">
            {/* Page header (logout lives in the navbar) */}
            <div className='bg-gradient-to-r from-brand-700 to-brand-500 text-white'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    <p className='text-brand-200 text-sm uppercase tracking-widest'>
                        {t("dashboard.label", { role: t(`dashboard.roles.${role}`) })}
                    </p>
                    <h1 className='text-3xl font-bold mt-1'>{t("dashboard.hello", { name: session.username })}</h1>
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
