<template>
  <div>
    <RoomList />
    <router-view></router-view>
  </div>
</template>

<script>
import RoomList from "../components/RoomList";
export default {
  name: "home",
  components: {
    RoomList
  }
};
</script>