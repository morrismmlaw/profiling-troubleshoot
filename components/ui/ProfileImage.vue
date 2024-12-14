<template>
  <div>
    <nuxt-img class="position-relative rounded-circle profile-card-image" :src="props.imgUrl" alt="Card image cap" />

    <button @click="handleUpload" v-if="props.hasUpload" class="position-absolute upload-icon">
      <o-tooltip label="Upload an alternative image" position="bottom" data-bs-toggle="modal" data-bs-target="#empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-upload"
          viewBox="0 0 16 16">
          <path
            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path
            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
        </svg>
      </o-tooltip>
    </button>

    <div ref="modal" class="modal fade" id="empty-cart" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded shadow border-0">
          <div class="modal-body py-5">
            <div class="text-center">
              <div>
                <cropper ref="cropperRef" class="cropper" :src="img" :stencil-props="{ aspectRatio: 10 / 12 }"
                  @change="change" />
              </div>
              <div class="mt-4">
                <div class="mt-4">
                  <a href="javascript:void(0)" class="btn btn-primary">Start Shopping</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>

import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const show = ref(false)
const modal = ref(null)
const cropperRef = ref(null)


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

const img = ref('https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80')

const change = ({ coordinates, canvas }) => {
  console.log(coordinates, canvas);
}

const handleUpload = () => {
  console.log("Upload an Image");
}

onMounted(() => {
  const modalElement = modal.value;
  if (modalElement) {
    modalElement.addEventListener('shown.bs.modal', () => {
      const cropperInstance = cropperRef.value;
      if (cropperInstance) {
        cropperInstance.refresh();
      }
    });
  }
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

  border: none;
}
</style>