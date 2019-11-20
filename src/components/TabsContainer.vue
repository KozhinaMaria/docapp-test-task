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
      <li v-for="(content, index) in contentTab" :key="index" v-bind:id="selectedTab">
        {{content.content}}
        <br />
        <label v-if="content.need_initials" v-bind:for="index">
          <strong v-if="content.signed">{{initials}}</strong>
          <input
            v-else
            type="checkbox"
            v-bind:value="index"
            v-bind:id="index"
            v-on:change="showInitials"
            v-model="signedList"
          />
          <span>I certify that I read and write English and have read and fully understand this consent for surgery.</span>
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
      this.contentTab = [];
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
      }
    },
    getTabName(tab) {
      const find = this.consentForms.find(f => f.code === tab);
      return find ? find.short_title : "";
    },
    showInitials(el) {
      this.contentTab[el.target.id].signed = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs__list {
  display: flex;
  justify-content: space-evenly;
  padding: 0;
}
.tabs__item {
  flex-grow: 1;
  background-color: grey;
  opacity: 0.5;
  box-shadow: 1px 1px 1px black;
  padding: 5px;
  text-align: center;

  cursor: pointer;

  &:hover,
  &.active {
    opacity: 0.7;
  }
}

.tabs__content {
  //margin: 20px;
  padding: 0;
  //background-color: grey;
}
</style>