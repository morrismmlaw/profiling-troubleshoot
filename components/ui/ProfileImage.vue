/**
* A component for displaying a user profile image and allowing the user to upload and crop a new image.
* @example
* <profile-image img-url="https://example.com/image.jpg" />
*/

<template>
  <div>
    <nuxt-img class="position-relative rounded-circle profile-card-image shadow-lg" :src="props.imgUrl"
      alt="Card image cap" />

    <button @click="handleUpload" v-if="props.hasUpload" class="position-absolute upload-icon">
      <o-tooltip label="Upload an alternative image" position="bottom" data-bs-toggle="modal"
        data-bs-target="#modal-cropper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-upload"
          viewBox="0 0 16 16">
          <path
            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path
            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
        </svg>
      </o-tooltip>
    </button>

    <div ref="modal" class="modal fade" id="modal-cropper" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded shadow border-0 mx-5">
          <div class="modal-header">
            <h5 class="modal-title">Upload and Crop Image</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body mt-2">
            <div class="text-center">
              <div>
                <cropper ref="cropperRef" class="cropper" :src="img" :stencil-props="{ aspectRatio: 1 / 1 }"
                  @change="change" />
                <o-field @change="handleUpload" v-show="!hasUpload">
                  <o-upload v-model="dropFiles" drag-drop>
                    <div style="text-align: center">
                      <p>
                        <o-icon icon="upload" size="is-large" />
                      </p>
                      <p>Drop your JPG / PNG Image here or click to upload</p>
                    </div>
                  </o-upload>
                </o-field>
              </div>
              <div class="pt-2 mt-2">
                <div class="input-group-sm">
                  <div class="d-flex justify-content-end">
                    <button class="btn btn-danger" @click="clearImage">Clear</button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" @click="handleSaveClick">Save</button>
                  </div>
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
import type { CroppedImg } from '~/types/profileImage';

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
  profile: {
    type: Object,
    default: {},
  }
});

const hasChanged = ref(false);

const emit = defineEmits(['update:imgUrl', 'croppedImg', 'hasChangedImage']);

// const img = ref('https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
const img = ref('')
const croppedImg = ref<CroppedImg>({
  imgUrl: '',
  strapiID: '',
  hasChangedImage: false,
})

const dropFiles = ref<File[]>([]);
const hasUpload = ref(false);

const clearImage = () => {
  img.value = ('');
  hasUpload.value = false;
}

const change = ({ coordinates, canvas }) => {
  console.log(coordinates, canvas);
}

const validImageTypes = ['image/jpeg', 'image/png'];
const fileType = ref('');

const handleUpload = (event) => {

  if (!event.target.files) {
    return;
  }

  const file = event.target.files[0];
  fileType.value = file.type;
  console.log("Upload an Image", fileType);

  if (file && validImageTypes.includes(fileType.value)) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.value = e.target.result;
      hasUpload.value = true;
      // console.log(img.value)
    };
    reader.readAsDataURL(file);
  } else {
    alert('Invalid file type. Please select a JPG / PNG image.');
  }
}

const handleSaveClick = async () => {
  const saveResult = await saveCroppedImage();
  if (saveResult) {
    const { canvas } = cropperRef.value.getResult(); // Emit new Image to Image Card 
    croppedImg.value.imgUrl = canvas.toDataURL(fileType.value);
    croppedImg.value.hasChangedImage = true;
    emit('croppedImg', croppedImg);
    emit('hasChangedImage', true);
  } else {
    console.log('Clear image');
    emit('croppedImg', null);
    emit('hasChangedImage', true);
  }
}

/**
 * Need to wrap Dat Upload In Promise -> Good Practice / else the emit's thigns will be incompleted with Strapi Value
 */
const saveCroppedImage = async () => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const filename = `${props.profile.attributes.keyid}_${timestamp}`;
  const client = useStrapiClient();
  if (cropperRef.value) {
    const { canvas } = cropperRef.value.getResult();
    try {
      if (canvas) {
        const formData = new FormData();
        const blobPromise = new Promise((resolve, reject) => {
          canvas.toBlob(async blob => {
            if (blob) {
              formData.append('files', blob, filename);
              try {
                const uploadResponse = await client(`/upload`, { method: 'POST', body: formData });
                console.log('upload return data', uploadResponse);
                croppedImg.value.strapiID = uploadResponse[0].id; // HAHA need to be id, not document id for media asset linkage
                // console.log('Uploaded Image ID:', uploadResponse[0].documentId);
                resolve(true);
              } catch (error) {
                console.error('Error uploading image:', error);
                resolve(false);
              }
            } else { resolve(false); }
          }, `${fileType.value}`);
        });
        return await blobPromise;
      }
    }
    catch (error) {
      console.error('Error during image cropping:', error);
      return false;
    }
  }
  return false;
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

//POSITION CSS!
.upload-icon {
  color: white;
  width: 40px;
  height: 40px;

  position: absolute;

  left: calc(50% + 30px);
  top: calc(50% - 70px);

  background: gray;
  border-radius: 50%;
  border: none;

  opacity: 0.9;

  :hover {
    opacity: 1;
    // background-color: rgb(161, 161, 161, 0.3);
    // border-radius: 50%;
    transform: scale(1.07);
    transition: transform 0.1s ease-in-out;
  }

}
</style>