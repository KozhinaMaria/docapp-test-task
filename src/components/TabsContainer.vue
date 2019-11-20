<template>
  <div>
    <nav>
      <ul class="tabs__list">
        <li
          class="tabs__item"
          :class="{active : selectedTab === tab}"
          v-for="(tab, index) in checkedForms"
          :key="`item-${index}`"
          v-text="getTabName(tab)"
          @click="selectedTab = tab;getConsentDetails();"
        ></li>
      </ul>
    </nav>
    <ul class="tabs__content">
      <li
        class="tabs__content-item"
        v-for="(content, index) in contentTab"
        :key="index"
        v-bind:id="selectedTab"
      >
        <p class="tabs__content-text">{{content.content}}</p>
        <br />
        <label v-if="content.need_initials" v-bind:for="content.content">
          <strong v-if="content.signed" class="initials">{{initials}}</strong>
          <input
            v-else
            type="checkbox"
            v-bind:value="index"
            v-bind:id="content.content"
            v-on:change="content.signed = true"
          />
          <em
            class="subscribe"
          >I certify that I read and write English and have read and fully understand this consent for surgery.</em>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import get from "../api/get";
export default {
  data() {
    return {
      contentTab: [],
      selectedTab: "",
      signedList: [],
      tabList: {}
    };
  },
  props: {
    checkedForms: { required: true },
    consentForms: { required: true },
    initials: { required: false }
  },
  watch: {
    checkedForms() {
      this.selectedTab = this.checkedForms[0];
      this.getConsentDetails();
    }
  },
  mounted() {
    this.selectedTab = this.checkedForms[0];
    this.getConsentDetails();
  },
  methods: {
    getConsentDetails() {
      if (this.selectedTab) {
        if (!this.tabList[this.selectedTab]) {
          get
            .getConsentDetails(this.selectedTab)
            .then(resp => {
              const mapped = resp.map(r => ({
                ...r,
                signed: false
              }));
              this.contentTab = mapped;
              this.tabList[this.selectedTab] = mapped;
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.contentTab = this.tabList[this.selectedTab];
        }
      } else {
        this.contentTab = [];
      }
    },
    getTabName(tab) {
      const find = this.consentForms.find(f => f.code === tab);
      return find ? find.short_title : "";
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs__list {
  display: flex;
  justify-content: space-evenly;
  padding: 0;
  margin: 0;
}
.tabs__item {
  flex-grow: 1;
  background-color: grey;
  opacity: 0.5;
  box-shadow: 1px 1px 1px black;
  padding: 5px;
  margin: 5px;
  text-align: center;
  transition: all 0.2s ease-in-out;

  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
  &.active {
    opacity: 1;
  }
}

.tabs__content-item {
  border-bottom: 1px solid silver;
  padding: 20px 0;
}

.tabs__content {
  margin: 0;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 3px 10px;
  background: #ececec;
}

.tabs__content-text {
  margin: 0;
}

.subscribe {
  font-size: 10px;
  background: #4caf50;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 1px;
  padding: 5px;
  border-radius: 10px 0px 10px 10px;
}
.initials {
  font-family: cursive;
}
</style>