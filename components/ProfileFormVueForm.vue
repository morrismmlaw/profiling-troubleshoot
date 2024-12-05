<script setup>
// You might place these anywhere else in your project
import '@vueform/vueform/dist/vueform.css';
</script>

<template>
  <Vueform>
    <StaticElement name="title" tag="h1" content="Academic Profile Form"
      description="A form to display academic profile information" />
    <TextElement name="full_name" label="Full Name" description="Enter your full name" placeholder="John Doe" />
    <TextElement name="salutation" label="Salutation" description="Enter your salutation (e.g. Dr, Mr, Ms)" />
    <TextElement name="last_name" label="Last Name" description="Enter your last name" />
    <TextElement name="other_name" label="Other Name" description="Enter your other name" />
    <TextElement name="department" label="Department" description="Enter your department" />
    <TextElement name="position" label="Position" description="Enter your position" />
    <TextElement name="email" label="Email" description="Enter your email address" :rules="[
      'required',
      'email',
    ]" />
    <TextElement name="chinese_name" label="Chinese Name" description="Enter your Chinese name" />
    <EditorElement name="biography" label="Biography" description="Enter your biography" />
    <EditorElement name="Biography_1" label="Research Interests" description="Enter your biography" />
    <CheckboxgroupElement name="sustainable_development_goals(_s_d_g)" label="Sustainable Development Goals (SDG)"
      :columns="{ container: 12, label: 3, wrapper: 12 }" :items="[
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
      ]" description="17 SDGs" />

    <MultiselectElement name="f_c_r_a" :close-on-select="false" :search="true" :native="false" label="FCRA"
      input-type="search" autocomplete="off" description="Enter your FCRA" />
    <TextElement name="research_focus" label="Research Focus" description="Enter your research focus" />
    <TextElement name="availability_for_supervision" label="Availability for Supervision"
      description="Enter your availability for supervision" />
    <ButtonElement name="submit" button-label="Submit" :submits="true" :full="true" align="center" />
  </Vueform>
</template>

<style scoped>
/* @import 'bootstrap/scss/bootstrap.scss';
@import '@vueform/vueform/themes/bootstrap/scss/index.scss'; */
</style>