<template>
  <div>
    <div class="forms__content">
      <ul class="forms__list">
        <div v-if="consentForms.length === 0">No consent forms available.</div>
        <li v-for="(consentForm, index) in consentForms" :key="index">
          <label v-bind:for="consentForm.code">
            <input
              type="checkbox"
              v-bind:value="consentForm.code"
              v-bind:id="consentForm.code"
              v-model="checkedForms"
              :checked="false"
            />
            <span>{{ consentForm.title }}</span>
          </label>
        </li>
      </ul>

      <button @click="toggleForms">Select/UnSelect</button>
      <button v-if="showSignBtn" @click="showTabs">Sign</button>
    </div>
    <TabsContainer
      :checkedForms="checkedForms"
      :consentForms="consentForms"
      :initials="initials"
      v-if="showTabsContainer"
    />
  </div>
</template>

<script>
import TabsContainer from "../components/TabsContainer";
import get from "../api/get";
export default {
  name: "ConsentForms",
  components: { TabsContainer },
  data() {
    return {
      checkedForms: [],
      consentForms: [],
      showTabsContainer: false,
      showSignBtn: false
    };
  },
  props: {
    initials: { required: false }
  },
  created() {
    this.getConsentFormList();
  },
  watch: {
    checkedForms() {
      this.showSignBtn = this.checkedForms.length > 0;
    },
    consentForm(el) {
      console.log(el);
    }
  },
  methods: {
    getConsentFormList() {
      get
        .getConsentForms()
        .then(resp => {
          this.consentForms = resp;
        })
        .catch(error => {
          console.error(error);
        });
    },
    showTabs() {
      this.showTabsContainer = true;
    },
    toggleForms() {
      if (this.checkedForms.length > 0) {
        this.checkedForms = [];
      } else {
        this.consentForms.forEach(f =>
          this.checkedForms.push(f.code.toString())
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.forms__content {
  box-shadow: rgba(0, 0, 0, 0.4) 0 1px 5px;
  background-color: #c8c8c896;
  margin: 20px;
  padding: 10px;
}

.form__list {
  padding: 0;
  margin: 5px;
}
</style>