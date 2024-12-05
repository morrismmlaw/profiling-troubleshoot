<template>
  <div class="container-fluid">
    <h1>Academic Profile Form</h1>
    <p>A form to display academic profile information</p>

    <div class="row">

      <div class="col">

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
      </div>

      <div class="col">

        <o-field label="Biography">
          <o-input v-model="formData.biography" type="textarea" />
        </o-field>

        <o-field label="Research Interests">
          <o-input v-model="formData.research_interests" type="textarea" />
        </o-field>

        <h4>Sustainable Development Goals (SDG)</h4>
        <div class="columns is-multiline">
          <div class="column is-one-fifth" v-for="sdg in sdgOptions" :key="sdg">
            <o-field>
              <o-checkbox v-model="formData.sustainable_development_goals" :native-value="sdg">
                {{ sdg }}
              </o-checkbox>
            </o-field>
          </div>
        </div>

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
    </div>

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

const sdgOptions = ['SDG1', 'SDG2', 'SDG3', 'SDG4', 'SDG5', 'SDG6', 'SDG7', 'SDG8', 'SDG9', 'SDG10', 'SDG11', 'SDG12', 'SDG13', 'SDG14', 'SDG15', 'SDG16', 'SDG17']
const fcraOptions = ['Option 1', 'Option 2', 'Option 3']; // Replace with actual FCRA options

const submitForm = () => {
  // Handle form submission here
};
</script>

<style scoped>
.columns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
}
</style>