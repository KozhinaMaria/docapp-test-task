<template>
  <li @click="showAppointment" class="room__item">
    <table>
      <tr>
        <td>Room:</td>
        <td>{{roomNumber}}</td>
      </tr>
      <tr>
        <td>Patient:</td>
        <td>{{fullPatientName}}</td>
      </tr>
      <tr>
        <td>Status:</td>
        <td>{{roomStatus}}</td>
      </tr>
      <tr>
        <td>Starts:</td>
        <td>{{waitingTime.formated}}</td>
      </tr>
      <tr>
        <td>Time:</td>
        <td>{{appointmentTime}}</td>
      </tr>

      <tr>
        <td>D:</td>
        <td>{{docName}}</td>
      </tr>
      <tr>
        <td>A:</td>
        <td>{{assistName}}</td>
      </tr>
    </table>
  </li>
</template>

<script>
import moment from "moment";
export default {
  name: "RoomPreview",
  data() {
    return {
      waitingTime: { formated: "", value: null },
      timerId: null
    };
  },
  props: {
    item: { type: Object, required: true }
  },
  computed: {
    roomNumber() {
      if (!this.item) {
        return "";
      }

      const { code, appointment } = this.item;
      return `${code} (${appointment.code})`;
    },
    fullName() {
      if (!this.item) {
        return "";
      }

      const { first_name, last_name } = this.item.appointment;
      return `${first_name} ${last_name}`;
    },
    docName() {
      if (!this.item) {
        return "";
      }

      return this.item.appointment.doctor_title;
    },
    assistName() {
      if (!this.item) {
        return "";
      }

      return this.item.appointment.assistant;
    },
    roomStatus() {
      if (!this.item) {
        return "";
      }

      return this.item.status.title;
    },
    appointmentTime() {
      if (!this.item) {
        return "";
      }

      return moment(this.item.appointment.start_time, "HH:mm:ss").format(
        "hh:mm A"
      );
    },
    fullPatientName() {
      if (!this.item || !this.item.appointment) {
        return "";
      }
      const { appointment } = this.item;
      return `${appointment.first_name} ${appointment.last_name}`;
    }
  },
  mounted() {
    this.setupTimer();
  },
  beforeDestroy() {
    clearInterval(this.timerId);
    this.timerId = null;
  },
  methods: {
    showAppointment() {
      this.$router.push({
        name: "appointment",
        params: { code: this.item.code }
      });
    },
    setupTimer() {
      this.timerId = setInterval(() => {
        if (!this.waitingTime || !this.waitingTime.value) {
          this.waitingTime.value = this.item.update_time;
        }

        const timeNew = moment(this.waitingTime.value).add("seconds", -1);
        this.waitingTime.value = timeNew;
        this.waitingTime.formated = timeNew.format("HH:mm:ss");
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.room__item {
  margin: 20px;
  max-width: 200px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 3px 10px;
  padding: 18px 20px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ececec;
    cursor: pointer;
    transform: scale(1.1);
  }
}
</style>