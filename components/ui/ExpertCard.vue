<template>
  <div>

    <div>
      <div class="container">
        <div class="row shadow-sm mb-2 rounded" style="margin-top: 5px;">
          <div class="col-md-3 col-lg-3 col-xxl-3 profile-col">
            <div class="profile-wrapper">
              <div class="profile-image-container">

                <div v-if="props.profile.uploadPhoto">
                  <!-- {{ console.log(props.profile.uploadPhoto) }} -->
                  <NuxtImg :src="customPhotoURL" class="expert-card-image" @click="navigateToProfile"></NuxtImg>

                </div>
                <div v-else>
                  <NuxtImg :src="props.profile.photoURL" class="expert-card-image" @click="navigateToProfile"></NuxtImg>
                </div>

              </div>

            </div>
          </div>
          <div class="col-md-8">
            <div>
              <div class="row">
                <div class="col" style="margin-top: 5px">
                  <div>
                    <h1 class="clickable-header" @click="navigateToProfile"> {{ props.profile.name }} </h1>
                    <div class="row">
                      <div class="col-auto">
                        <label class="form-label icon-label-wrapper"><svg class="bi bi-book icon-svg"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path
                              d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783">
                            </path>
                          </svg><sub class="text-sub">
                            {{ props.profile.post }}</sub></label>
                      </div>
                      <div class="col">
                        <label class="form-label icon-label-wrapper"><svg class="bi bi-star-fill icon-svg"
                            xmlns="http://www.w3.org/2000/svg" width="0.5em" height="0.5em" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                            </path>
                          </svg><sub class="text-sub">
                            <span v-for="(department, index) in props.profile.departments" :key="index">
                              Department of {{ department.name }}
                              {{ index < props.profile.departments.length - 1 ? ', ' : '' }} </span>
                          </sub></label>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col biography-col">
                  <div>
                    <div class="biography-container">
                      <div v-html="truncatedBiography"></div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div>
                    <div v-if="props.profile.research_foci.length > 0" class="row">
                      <div class="col"><label class="col-form-label research-label">
                          <b>Research Focus: </b>
                          <span v-for="(focus, index) in props.profile.research_foci" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.research_foci.length - 1 ? ', ' : '' }} </span>
                        </label>
                      </div>
                    </div>
                    <div v-if="props.profile.research_centres.length > 0" class="row">
                      <div class="col"><label class="col-form-label research-label">
                          <b>Strategic Research Centre: </b>
                          <span v-for="(focus, index) in props.profile.research_centres" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.research_centres.length - 1 ? ', ' : '' }} </span>
                        </label>
                      </div>
                    </div>
                    <div v-if="props.profile.departments.length > 0" class="row">
                      <div class="col"><label class="col-form-label research-label">
                          <b>Department: </b>
                          <span v-for="(focus, index) in props.profile.departments" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.departments.length - 1 ? ', ' : '' }} </span>
                        </label>
                      </div>
                    </div>
                    <div v-if="props.profile.available_supervisions.length > 0" class="row">
                      <div class="col"><label class="col-form-label research-label">
                          <b>Availability for Supervision: </b>
                          <span v-for="(focus, index) in props.profile.available_supervisions" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.available_supervisions.length - 1 ? ', ' : ''
                            }}</span>
                        </label>
                      </div>
                    </div>
                    <div v-if="props.profile.fcras.length > 0" class="row">
                      <div class="col"><label class="col-form-label research-label">
                          <b>Faculty Collaborative Research Area: </b>
                          <span v-for="(focus, index) in props.profile.fcras" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.fcras.length - 1 ? ', ' : '' }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="publication-match"><label class="form-label publication-label"><small
                        class="form-text"><svg class="publication-icon" xmlns="http://www.w3.org/2000/svg" width="1em"
                          height="1em" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M4 4C4 2.89543 4.89543 2 6 2H10.5858C11.1162 2 11.6249 2.21071 12 2.58579L15.4142 6C15.7893 6.37507 16 6.88378 16 7.41421V16C16 17.1046 15.1046 18 14 18H12.4722C13.4223 16.9385 14 15.5367 14 14C14 10.6863 11.3137 8 8 8C6.46329 8 5.06151 8.57771 4 9.52779V4Z"
                            fill="currentColor"></path>
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8 10C5.79086 10 4 11.7909 4 14C4 14.7414 4.20229 15.4364 4.55397 16.0318L3.29289 17.2929C2.90237 17.6834 2.90237 18.3166 3.29289 18.7071C3.68342 19.0976 4.31658 19.0976 4.70711 18.7071L5.96818 17.446C6.56362 17.7977 7.25862 18 8 18C10.2091 18 12 16.2091 12 14C12 11.7909 10.2091 10 8 10ZM6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C7.44744 16 6.94881 15.7772 6.58579 15.4142C6.22276 15.0512 6 14.5526 6 14Z"
                            fill="currentColor"></path>
                        </svg>Your search matched against this person&#39;s publications.</small></label></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="matchedFields.length">
      <div v-for="item in matchedFields" :key="item.field">
        <span class="matched-field"><strong>Matched in {{ item.field }}:</strong> <span v-html="item.value"></span></span>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

interface ResearchItem {
  id: string;
  name: string;
}

interface Profile {
  ssoid: string;
  name: string;
  post: string;
  unit: string;
  photoURL: string;
  uploadPhoto: Object;
  biography?: string;
  research_foci: ResearchItem[];
  research_centres: ResearchItem[];
  departments: ResearchItem[];
  available_supervisions: ResearchItem[];
  fcras: ResearchItem[];
}

const router = useRouter();

const props = defineProps<{
  profile: Profile;
  highlight?: Record<string, any>; // highlight prop for matched fields
}>();

const truncatedBiography = computed(() => {
  if (!props.profile.biography) {
    return ''; // Return an empty string if biography is null or undefined
  }
  const words = props.profile.biography.split(' ');
  if (words.length > 50) {
    return words.slice(0, 50).join(' ') + '...';
  }
  return props.profile.biography;
});

const navigateToProfile = () => {
  router.push({
    path: `/${props.profile.ssoid}`,
    // query: { from: 'search'}
  })
};

const customPhotoURL = computed(() => {
  if (props.profile.uploadPhoto) {
    return 'https://profile-cms.sci.hkbu.edu.hk' + props.profile.uploadPhoto['url'];
  } else {
    return props.profile.photoURL;
  }
});

const matchedFields = computed(() => {
  if (!props.highlight) return [];
  return Object.entries(props.highlight)
    .filter(([field, value]) => value && value !== (props.profile as any)[field])
    .map(([field, value]) => ({ field, value }));
});

// let customPhotoURL = 'https://profile-cms.sci.hkbu.edu.hk' + props.profile.uploadPhoto;
if (props.profile.uploadPhoto) {
  // console.log('TESTING Custom Photo', customPhotoURL.value);
} else {
  // customPhotoURL = props.profile.photoURL;
}


</script>

<style>
.expert-card-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.expert-card-image:hover {
  filter: brightness(0.8);
}

.clickable-header {
  font-size: 19px;
  line-height: 20px;
  cursor: pointer;
  text-decoration: none;
}

.clickable-header:hover {
  text-decoration: underline;
}

.profile-image-container {
  padding: 30px;
  padding-top: 0;
  margin: 10px -20px 0 0;
}

.profile-info-row {
  margin-top: 5px;
}

.icon-label {
  font-size: 22px;
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
}

.text-sub {
  font-size: 13px;
  height: auto;
  padding: 0;
}

.research-label {
  font-size: 12px;
}

.profile-col {
  padding-top: 29px;
}

.profile-wrapper {
  padding: 30px;
  padding-top: 0;
  margin: 10px 0 0 -40px;
}

.icon-label-wrapper {
  margin-right: 5px;
}

.icon-svg {
  font-size: 22px;
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
}

.biography-col {
  height: fit-content;
}

.publication-match {
  margin-top: -5px;
  padding-top: 0;
}

.publication-label {
  padding: 0;
  margin-top: 5px;
}

.publication-icon {
  font-size: 24px;
  margin-left: -3px;
}

.matched-field {
  display: block;
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #17406a;
  background: #e6f0fa;
  border-radius: 4px;
  padding: 2px 6px;
}
</style>
