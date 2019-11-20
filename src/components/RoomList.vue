<template>
  <ul class="room__list">
    <div v-if="rooms.length === 0" class="room-preview">No rooms available.</div>
    <RoomPreview v-for="(room, index) in rooms" :item="room" :key="room.code + index" />
  </ul>
</template>

<script>
import RoomPreview from "../components/RoomPreview";
import get from "../api/get";
export default {
  name: "RoomList",
  components: {
    RoomPreview
  },
  data() {
    return {
      rooms: []
    };
  },
  created() {
    this.getRoomList();
  },
  methods: {
    getRoomList() {
      get
        .getRooms()
        .then(resp => {
          this.rooms = resp;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.room__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  list-style: none;
}
</style>