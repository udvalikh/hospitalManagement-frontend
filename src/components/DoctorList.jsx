import React, { useEffect, useState } from 'react'
import doctorService from '../services/DoctorService';
import { errorMessage } from '../services/api';
import { useLang } from '../i18n/LanguageContext';
import { formatDays } from '../utils/format';

const DoctorList = () => {

  const { t } = useLang();
  const [doctors, setDoctors] = useState(null);
  const [error, setError] = useState("");

  useEffect(() =>{
    doctorService.listDoctors()
      .then(setDoctors)
      .catch((err) => setError(errorMessage(err, t("doctorList.loadFailed"))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p className="text-red-600">{error}</p>
  if (!doctors) return <p>{t("dashboard.loading")}</p>

  return (
    <div className='bg-white shadow-sm border border-brand-100 rounded-3xl p-6 overflow-x-auto'>
        <h2 className='text-xl font-bold text-brand-900 mb-4'>{t("doctorList.title")}</h2>
        <table className='w-full text-left border-collapse'>
            <thead className='bg-brand-700 text-white'>
                <tr>
                    <th className='p-3 rounded-tl-xl'>{t("doctorList.name")}</th>
                    <th className='p-3'>{t("doctorList.specialty")}</th>
                    <th className='p-3'>{t("doctorList.days")}</th>
                    <th className='p-3 rounded-tr-xl'>{t("doctorList.hours")}</th>
                </tr>
            </thead>
            <tbody>
                {
                    doctors.map(doctor =>
                    <tr key={doctor.doctorId} className='border-b border-brand-100 odd:bg-white even:bg-brand-50/50'>
                        <td className='p-3'>{t("home.doctorPrefix")} {doctor.firstName} {doctor.lastName}</td>
                        <td className='p-3'>{doctor.specialty}</td>
                        <td className='p-3'>{formatDays(doctor.availableDays, t)}</td>
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
