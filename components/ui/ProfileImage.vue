<template>
  <div>
    <nuxt-img class="position-relative rounded-circle profile-card-image" :src="props.imgUrl" alt="Card image cap" />
    <p v-if="props.hasUpload" class="position-absolute upload-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-upload"
        viewBox="0 0 16 16">
        <path
          d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
        <path
          d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
      </svg>
    </p>

  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  hasUpload: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.profile-card-image {
  object-fit: cover;
  width: var(--profile-image-size);
  height: var(--profile-image-size);
}

.upload-icon {
  color: white;

  width: 40px;
  height: 40px;

  left: calc(75% - 70px);
  top: calc(50% - 50px);

  background: gray;
  border-radius: 50%;

  svg {
    margin-top: 7px;
    margin-left: 8px;
  }

}
</style>