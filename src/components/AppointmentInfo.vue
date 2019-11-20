<template>
  <div v-if="isLoading">Loading appointment data...</div>
  <div v-else>
    <p>Room {{roomNumber}}</p>
    <p>App Date {{appointmentDate}}</p>
    <p>Vital signs: {{vitalData}}</p>
    <p>{{fullPatientName}}</p>
    <ConsentForms :initials="initials" />
  </div>
</template>

<script>
import ConsentForms from "../components/ConsentForms";
import get from "../api/get";
import moment from "moment";
export default {
  components: { ConsentForms },
  data() {
    return {
      item: null,
      waitingTime: { formated: "", value: null },
      isLoading: true,
      timerId: null,
      initials: ""
    };
  },
  props: {
    code: { required: true }
  },
  watch: {
    item() {
      if (!this.item) {
        return "";
      }

      const { appointment } = this.item;

      const first = appointment.first_name.slice(0, 1);
      const second = appointment.last_name.slice(0, 1);
      this.initials = `${first}${second}`;
    }
  },
  computed: {
    roomNumber() {
      if (!this.item) {
        return "";
      }

      const { code, appointment } = this.item;
      return `${code} (${appointment.code})`;
    },
    appointmentDate() {
      if (!this.item) {
        return "";
      }

      return moment(this.item.appointment.start_date).format("MM/DD/YYYY");
    },
    vitalData() {
      if (
        !this.item ||
        !this.item.appointment ||
        !this.item.appointment.vital_signs
      ) {
        return "";
      }
      const {
        height_ft,
        height_in,
        weight,
        bmi
      } = this.item.appointment.vital_signs;
      return `HT: ${height_ft}'${height_in}'', WT: ${weight}lbs., BMI: ${bmi}}`;
    },
    fullPatientName() {
      if (!this.item || !this.item.appointment) {
        return "";
      }
      const { appointment } = this.item;
      const age = appointment.birthday
        ? moment().diff(moment(appointment.birthday), "years") + " years"
        : "";
      const gender = appointment.gender === "Male" ? "M" : "W";
      const appeal = this.getAppeal(appointment);
      return `${appeal} ${appointment.first_name} ${appointment.last_name}, ${age}, ${gender}`;
    }
  },
  mounted() {
    this.getAppointmentData();
  },
  methods: {
    getAppointmentData() {
      get
        .getAppointmentData(this.code)
        .then(resp => {
          if (resp) {
            this.item = resp;
          } else {
            console.log("No appointment available");
          }

          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          console.error(error);
        });
    },
    getAppeal(appointment) {
      return appointment.is_doctor
        ? "Dr."
        : appointment.gender === "Male"
        ? "Mr."
        : "Ms.";
    }
  }
};
</script>