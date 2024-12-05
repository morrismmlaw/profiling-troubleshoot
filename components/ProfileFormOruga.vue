<template>
  <div>
    <h1>Academic Profile Form</h1>
    <p>A form to display academic profile information</p>

    <o-button variant="primary">Primary</o-button>
    <o-button variant="success">Success</o-button>
    <o-button variant="danger">Danger</o-button>
    <o-button variant="warning">Warning</o-button>
    <o-button variant="info">Info</o-button>

    <o-field label="Full Name">
      <o-input v-model="formData.full_name" placeholder="John Doe" />
    </o-field>

    <o-field label="Salutation">
      <o-input v-model="formData.salutation" placeholder="Dr, Mr, Ms" />
    </o-field>

    <o-field label="Last Name">
      <o-input v-model="formData.last_name" />
    </o-field>

    <o-field label="Other Name">
      <o-input v-model="formData.other_name" />
    </o-field>

    <o-field label="Department">
      <o-input v-model="formData.department" />
    </o-field>

    <o-field label="Position">
      <o-input v-model="formData.position" />
    </o-field>

    <o-field label="Email">
      <o-input v-model="formData.email" type="email" />
    </o-field>

    <o-field label="Chinese Name">
      <o-input v-model="formData.chinese_name" />
    </o-field>

    <o-field label="Biography">
      <o-input v-model="formData.biography" type="textarea" />
    </o-field>

    <o-field label="Research Interests">
      <o-input v-model="formData.research_interests" type="textarea" />
    </o-field>

    <o-field label="Sustainable Development Goals (SDG)">
      <o-checkbox v-for="sdg in sdgOptions" :key="sdg" v-model="formData.sustainable_development_goals"
        :native-value="sdg">
        {{ sdg }}
      </o-checkbox>
    </o-field>

    <o-field label="FCRA">
      <o-select v-model="formData.fcra" multiple :data="fcraOptions" />
    </o-field>

    <o-field label="Research Focus">
      <o-input v-model="formData.research_focus" />
    </o-field>

    <o-field label="Availability for Supervision">
      <o-input v-model="formData.availability_for_supervision" />
    </o-field>

    <o-button @click="submitForm" type="is-primary" fullwidth>Submit</o-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  full_name: '',
  salutation: '',
  last_name: '',
  other_name: '',
  department: '',
  position: '',
  email: '',
  chinese_name: '',
  biography: '',
  research_interests: '',
  sustainable_development_goals: [],
  fcra: [],
  research_focus: '',
  availability_for_supervision: '',
});

const sdgOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
const fcraOptions = ['Option 1', 'Option 2', 'Option 3']; // Replace with actual FCRA options

const submitForm = () => {
  // Handle form submission here
};
</script>

<style scoped>
/* @import 'bootstrap/scss/bootstrap.scss';
@import '@vueform/vueform/themes/bootstrap/scss/index.scss'; */
</style>