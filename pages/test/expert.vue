<template>
  <div>
    <div class="nav-offset">
      Hello World
      <div>
        <ExpertCard_old :expert="expert" />
      </div>

      <div>
        <ExpertCard/>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>

import ExpertCard_old from '~/components/ui/ExpertCard_old.vue';

import ExpertCard from '~/components/ui/ExpertCard.vue';

const expert = {
  id: 1,
  name: 'John Doe',
  title: 'Professor',
  faculty: 'Engineering',
  department: 'Computer Science',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'John Doe is a renowned professor in the field of computer science.',
  fields: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
  isAvailableForSupervision: true
};

</script>

<style></style>