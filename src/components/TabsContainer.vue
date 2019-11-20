<template>
  <div>
    <nav>
      <ul>
        <a
          v-for="(tab, index) in checkedForms"
          :key="`item-${index}`"
          v-text="getTabName(tab)"
          @click="selectedTab = tab;getConsentDetails();"
        ></a>
      </ul>
    </nav>
    <ul>
      <li v-for="(content, index) in contentTab" :key="index" v-bind:id="selectedTab">
        {{content.content}}
        <br />
        <label v-if="content.need_initials" v-bind:for="index">
          <strong v-if="contentTab[index].signed">{{initials}}</strong>
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
      contentTab: {},
      selectedTab: "",
      signedList: []
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
      this.contentTab = {};
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
        get
          .getConsentDetails(this.selectedTab)
          .then(resp => {
            this.contentTab = resp;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    getTabName(tab) {
      const find = this.consentForms.find(f => f.code === tab);
      return find ? find.short_title : "";
    },
    showInitials(el) {
      el.target.parentElement.append("Some text", document.createElement("p"));
      el.target.style.display = "none";
      this.contentTab[el.target.id].signed = true;
    }
  }
};
</script>