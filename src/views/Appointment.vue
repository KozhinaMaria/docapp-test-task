<template>
  <div>
    <AppointmentInfo :code="code" />
    <router-view></router-view>
  </div>
</template>

<script>
import AppointmentInfo from "../components/AppointmentInfo";
export default {
  data() {
    return {};
  },
  components: {
    AppointmentInfo
  },
  computed: {
    code() {
      return this.$route.params.code;
    }
  }
};
</script>

<style lang="scss">
body {
  line-height: 1.5em;
}
ul {
  list-style: none;
}
button {
  border: none;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  background-color: white;
  color: black;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 3px 12px;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #555555;
  color: white;
  transform: scale(1.1);
}
</style>