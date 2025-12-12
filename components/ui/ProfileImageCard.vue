<script lang="ts" setup>
import { ref } from 'vue'
import DottedLine from './DottedLine.vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  editable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['croppedImg'])

const defaultImg = ref('https://scholars.hkbu.edu.hk/assets/no-portrait-473c6d005990baa1f418d9c668dcd4ec.png');
const imgUrl = ref('');
const imgStrapiID = ref('');

import ProfileImage from './ProfileImage.vue';
import type { CroppedImg } from '~/types/profileImage';

const handleCroppedImg = (croppedImg: Ref<CroppedImg>) => {
  try {
    // Case Reset to HKBU Scholar
    if (croppedImg.value.clear === true) {
      // imgUrl.value = defaultImg.value;
      imgUrl.value = props.profile.attributes.photoURL || defaultImg.value;
      emit('croppedImg', croppedImg);
    } else {
      // handle the croppedImg value as needed
      // console.log('Capture Emit Cropped image:', croppedImg);
      imgUrl.value = croppedImg.value.imgUrl;
      imgStrapiID.value = croppedImg.value.strapiID;
      console.log('Capture ProfileImgCard image:', croppedImg.value.strapiID);
      emit('croppedImg', croppedImg);
    }
  } catch (error) {
    console.log(error);
  }

};

const initImages = () => {
  imgUrl.value = props.profile.attributes.photoURL || defaultImg.value;

  if (props.profile.attributes.uploadPhoto) {
    let customImgURL = props.profile.attributes.uploadPhoto.url;
    customImgURL = 'https://profile-cms.sci.hkbu.edu.hk' + customImgURL;
    console.log(customImgURL);
    imgUrl.value = customImgURL;
  }
}

onMounted(() => {
  initImages();
  console.log('ProfileImageCard', props.profile);
})

</script>

<template>
  <div class="container-fluid p-0">
    <div class="card shadow rounded-5 profile-card">
      <div class="row p-1 m-1">
        <div class="d-flex justify-content-center">
          <ProfileImage :img-url="imgUrl" :profile="profile" :has-upload="true" @cropped-img="handleCroppedImg" :editable="props.editable"/>
        </div>
      </div>
      <div class="row">
        <div class="text-center mb-0">
          <!-- <h5 class="card-title profile-card-text"> {{ props.profile.attributes.post }} </h5> -->
          <!-- <p class="profile-card-text salute">{{ props.profile.attributes.salute }} </p> -->
          <p class="profile-card-text name">{{ props.profile.attributes.name }} </p>
          <p class="profile-card-text name">{{ props.profile.attributes.chiname }} </p>
        </div>
      </div>
      <!-- <hr class="dotted-line"> -->
      <!-- <div class="dotted"></div> -->
      <DottedLine />
      <div class="row">
        <o-tooltip variant="info" :label="`${props.profile.attributes.orcidURL}`" multiline>
          <template #content>
            <div class="sdg-info">
              <p><strong>ORCID</strong> <br> {{ props.profile.attributes.orcidURL }}</p>
            </div>
          </template>
          <div class="card-body">
            <div class="imgcard-info">
              <img src="/img/orcid.logo.icon.svg" alt="orcid logo" class="orcid-logo" style="width: 1.2rem;">
              <a :href="props.profile.attributes.orcidURL" class="card-text profile-card-text-row ms-2">{{
                props.profile.attributes.orcidURL }} </a>
            </div>
          </div>
        </o-tooltip>
        <o-tooltip variant="info" :label="`${props.profile.attributes.url}`" multiline>
          <template #content>
            <div class="sdg-info">
              <p><strong>HKBU Scholar</strong> <br> {{ props.profile.attributes.url }}</p>
            </div>
          </template>
          <div class="card-body">
            <div class="imgcard-info">
              <img src="/img/orcid.logo.icon.svg" alt="orcid logo" class="orcid-logo" style="width: 1.2rem;">
              <a :href="props.profile.attributes.url" class="card-text profile-card-text-row ms-2 ">{{
                props.profile.attributes.url }} </a>
            </div>
          </div>
        </o-tooltip>
      </div>
      <DottedLine />
      <div class="row">
        <div clss="card-body">
          <div class="row">
            <div class="d-flex justify-content-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-person-badge me-2 mt-1" viewBox="0 0 16 16">
                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
              </svg>
              <p class="profile-card-text">Department(s)</p>
            </div>
          </div>
          <div class="row">
            <p class="d-flex justify-content-center text-white profile-card-text"> {{ props.profile.attributes.unit }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="dotted"></div> -->
      <DottedLine />
      <div class="row">
        <div class="card-body text-center d-flex justify-content-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-envelope-fill mt-1" viewBox="0 0 16 16">
            <path
              d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
          </svg>
          <a :href="props.profile.attributes.email" class="card-text profile-card-text ms-2">{{
            props.profile.attributes.email }} </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-card {
  // background-color: #14688a;
  background-image: linear-gradient(295deg, #14688a, #409db5);

}

.profile-card-text {
  font-family: var(--font-family);
  font-weight: 200;
  font-size: 0.9rem;

  color: aliceblue;
  margin-bottom: 5px;

  &.salute {
    font-weight: 10;
    font-style: italic;

    color: lightgrey;
    text-shadow: #070a0b;
  }

  &.name {
    font-style: normal;
    font-weight: bold;
    font-size: 1.21rem;
  }

}


.profile-card-text-row {
  color: aliceblue;

  max-width: calc(85%);
  /* width: calc(80%); */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

hr {
  border: none;
  height: 1px;
  background-color: white;
  background-image: linear-gradient(to right, transparent, white 50%, transparent);
  background-size: 1px 1px;
  background-repeat: repeat-x;
}

.imgcard-info {
  display: flex;
  justify-content: start;
}
</style>
