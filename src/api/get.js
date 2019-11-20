import fetch from "./genericFetch";

export default {
    getRooms() {
        return fetch("rooms.json").then(response => response.json());
    },
    getAppointmentData(code) {
        return fetch("rooms.json").then(response => response.json()).then(json => {
            return [...json].find(d => d.code === +code);
        });
    },
    getConsentForms() {
        return fetch("consent-forms.json").then(response => response.json());
    },
    getConsentDetails(code) {
        return fetch(`consent-form-details/${code}.json`).then(response => response.json());
    }
};