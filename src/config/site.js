// Clinic contact details shown across the site. Edit these in one place.
// Text that changes with the language (name, tagline, day names) lives in src/i18n/translations.js.
//
// Phone, email and Facebook are from the clinic's Facebook page (facebook.com/azjargalclinic).
// TODO: fill in the address and confirm the opening hours.
const site = {
  phone: "+976 7000-1088",
  emergencyPhone: "103", // Mongolia's ambulance number
  email: "azjargal.bat@gmail.com",
  address: {
    mn: "Улаанбаатар хот, ... дүүрэг, ... хороо, ... гудамж", // TODO: real address
    en: "... Street, ... District, Ulaanbaatar, Mongolia", // TODO: real address
  },
  // Link for the "View on map" button, e.g. a Google Maps share link. null hides the button.
  mapUrl: null, // TODO
  // Social links. null hides the icon.
  facebook: "https://www.facebook.com/azjargalclinic",
  // Opening hours. Use null for a closed day.
  hours: {
    weekdays: "09:00 - 18:00", // TODO: confirm
    saturday: "10:00 - 15:00", // TODO: confirm
    sunday: null, // TODO: confirm
  },
};

// Opening hours as display rows in the current language. t comes from useLang().
export const openingHours = (t) => [
  { label: t("hours.weekdays"), time: site.hours.weekdays ?? t("hours.closed") },
  { label: t("hours.saturday"), time: site.hours.saturday ?? t("hours.closed") },
  { label: t("hours.sunday"), time: site.hours.sunday ?? t("hours.closed") },
];

export default site;
