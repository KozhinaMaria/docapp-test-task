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
ul {
  list-style: none;
  margin: 0;
}
</style>