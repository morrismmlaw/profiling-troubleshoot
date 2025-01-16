<script setup lang="ts">
import { reactive, watch, defineEmits } from 'vue';
import { useProfileStore } from '../composables/useProfile'; // replace with your actual path
import TiptapEditor from './TiptapEditor.vue' // path to your Tiptap editor component
import ImageCard from './ui/ProfileImageCard.vue';
import type { CroppedImg } from '~/types/profileImage';

import ProfileSave from './ui/ProfileSave.vue';

/**
 * Record Whether Image has been Changed -> Don't want to upload the Image,
 * after These is a Custom Image, and Other Tags Field Changed at Save
 * 
 * The Point is on UploadPhoto, if current id unchanged -> turn false;
 */
const hasChangedImage = ref(false);

// Watch the hasChangedImage state
watch(hasChangedImage, (newValue, oldValue) => {
  console.log(`hasChangedImage changed from ${oldValue} to ${newValue}`);
  // Add any additional logic you need to handle the change
  if (newValue) {
    // Perform actions when the image has changed
    console.log('Image has changed!');
  } else {
    // Perform actions when the image has not changed
    console.log('Image has not changed.');
  }
});

const props = defineProps({
  profile: {
    type: Object,
    default: null
  },

  //Include all the sdgs and fcras - for Options populations.
  collections: {
    type: Object,
    default: () => ({})
  }
});

// onMounted(() => {
//   console.log("props.profile", props.profile);
//   console.log("props.collections", props.collections);
// })

const profileStore = useProfileStore();

const emit = defineEmits(['save']);
const handleUploadPhoto = (croppedImg: Ref<CroppedImg>) => {
  if (croppedImg.value.hasChangedImage) {
    if (croppedImg.value.clear === true) {
      //Set it to Clear.
      formData.uploadPhoto = null;
      // delete formData.uploadPhoto;
      hasChangedImage.value = true;
    } else {
      let oldID = formData.uploadPhoto;
      let imgObj = croppedImg.value;
      // console.log("Capture ProfileForm: ", obj);
      formData.uploadPhoto = imgObj.strapiID;
      // console.log('FormData StrapiID:', formData.uploadPhoto);
      hasChangedImage.value = true;
    }
  } else {
    hasChangedImage.value = false;
  }
}

//Used for Reactive for ORUGA to Update..
const formData = reactive({
  documentId: props.profile?.attributes.documentId || '',

  research_interest: props.profile?.attributes.research_interest || '', //Remind, the profile's field is winout s.. 
  biography: props.profile?.attributes.biography || '',

  // SDG: props.profile?.attributes.SDG ? props.profile.attributes.SDG.split(',').map(Number) : [],
  // SDG-link..  http://158.182.151.62:1337/uploads/E_WEB_Goal_04_1779e135aa.png.. Fix ?
  sdgs: props.profile?.attributes.sdgs ? props.profile.attributes.sdgs : [],
  // FCRA: props.profile?.attributes.FCRA || "", //String type

  fcras: props.profile?.attributes.fcras || [],
  research_foci: props.profile?.attributes.research_foci || [],
  research_centres: props.profile?.attributes.research_centres || [],

  available_supervisions: props.profile?.attributes.available_supervisions || [],
  departments: props.profile?.attributes.departments || [],

  photoURL: props.profile?.attributes.photoURL || [],
  uploadPhoto: props.profile?.attributes.uploadPhoto || [],

  tech_offers: props.profile?.attributes.tech_offers || [],
});


const handleSubmit = () => { //Going to send back to profile.vue parent. 
  delete formData.photoURL;

  emit('save', {
    formData: formData,
    hasChangedImage: hasChangedImage.value
  });
};

// ORUGA SECTION
const ROOptions = props.collections['research-outputs']; //HTHIS IS FOR DA SEARCH ENGINE.
const sdgOptions = props.collections.sdgs;
const SRCOptions = props.collections['research-centres'];
const RFOptions = props.collections['research-foci'];
const FCRAOptions = props.collections['fcras'];
const ASOptions = props.collections['available-supervisions'];
const DEPOptions = props.collections['departments'];
const KTOptions = props.collections['tech-offers'];

// Map SRCOptions into the ORUGA TagInput format
const SRCOptionsOrugaNew = SRCOptions.map((option) => {
  return {
    label: option.name,
    value: {
      id: option.id,
      documentId: option.documentId,
      name: option.name,
      abbr: option.abbr,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
      publishedAt: option.publishedAt,
    },
  };
});

// Map RFOptions into the ORUGA TagInput format
const RFOptionsOrugaNew = RFOptions.map((option) => {
  return {
    label: option.name,
    value: {
      id: option.id,
      documentId: option.documentId,
      name: option.name,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
      publishedAt: option.publishedAt,
    }
  };
});

// Map FCRAOptions into the ORUGA TagInput format
const FCRAOptionsOrugaNew = FCRAOptions.map((option) => {
  return {
    label: option.name,
    value: {
      id: option.id,
      documentId: option.documentId,
      name: option.name,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
      publishedAt: option.publishedAt,
    }
  };
});

// Map ASOptions into the ORUGA TagInput format
const ASOptionsOrugaNew = ASOptions.map((option) => {
  return {
    label: option.name,
    value: {
      id: option.id,
      documentId: option.documentId,
      name: option.name,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
      publishedAt: option.publishedAt,
    }
  };
});

// Map DEPOptions into the ORUGA TagInput format
const DEPOptionsOrugaNew = DEPOptions.map((option) => {
  return {
    label: option.name,
    value: {
      id: option.id,
      documentId: option.documentId,
      name: option.name,
      abbr: option.abbr,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
      publishedAt: option.publishedAt,
    }
  };
});

const KTOptionsOrugaNew = KTOptions.map((option) => {
  return {
    label: option.name,
    value: {
      id: option.id,
      documentId: option.documentId,
      name: option.name,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
      publishedAt: option.publishedAt,
    }
  };
});

const sortTagOptions = () => {
  DEPOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  // ASOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  FCRAOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  RFOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  SRCOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));

  KTOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
}

const debugTagsMsg = () => {

  // console.log('SRC Options', SRCOptions);
  // console.log('RF Options', RFOptions);
  // console.log('FCRA Options', FCRAOptions);
  // console.log('AS Options', ASOptions);
  // console.log('DEP Options', DEPOptions);

  // console.log("SRC OPTIONS ORUGA2", SRCOptionsOrugaNew);
  // console.log("RO OPTIONS ORUGA2", ROOptionsOrugaNew);
  // console.log("FCRA OPTIONS ORUGA2", FCRAOptionsOrugaNew);
  // console.log("AS OPTIONS ORUGA2", ASOptionsOrugaNew);
  // console.log("DEP OPTIONS ORUGA2", DEPOptionsOrugaNew);

  // console.log('SDG FORMDATA', formData.SDG);
  // console.log('sdgs FORMDATA', formData.sdgs);
}

//FCRA Search
const fcraOptionsOrugaSAMPLE = [
  {
    label: "Jesse Simmons",
    value: {
      id: 1,
      user: { first_name: "Jesse", last_name: "Simmons" },
      date: "2016/10/15 13:43:27",
      gender: "Male",
    },
  },
];

const Tags = ref([]);
const SRCTags = ref([]);
const ROTags = ref([]);
const RFTags = ref([]);
const ASTags = ref([]);
const FCRATags = ref([]);
const DEPTags = ref([]);
const KTTags = ref([]);

const allowNew = ref(false);
const allowDuplicates = ref(false);
const openOnFocus = ref(true);
const keepFirst = ref(false);
const keepOpen = ref(true);

const checkboxGroup = ref([]);

const loadFormDataToORUGA = () => {
  if (!formData) {
    throw new Error("No Form Data!");
  }

  // Load default SDG data into checkbox group.
  if (formData.sdgs) {
    // Map the SDG objects to their IDs
    // console.log("Loading checkbox");
    // checkboxGroup.value = formData.sdgs.map((sdg) => sdg);
    checkboxGroup.value = formData.sdgs.map((sdg) => sdg.sdgid);
  }

  if (formData.research_foci) {
    // console.log('load research_foci', formData.research_foci);
    // console.log('load RSOptionsOrugaNew', ROOptionsOrugaNew);
    RFTags.value = formData.research_foci.map((rs) => {
      const matchingOption = RFOptionsOrugaNew.find((option) => {
        // console.log("Checking", option.label, rs.name);
        return option.label === rs.name
      });
      // console.log("Match Research focus:", matchingOption);
      return matchingOption ? matchingOption.value : [];
    });
  }

  if (formData.research_centres) {
    SRCTags.value = formData.research_centres.map((rs) => {
      const matchingOption = SRCOptionsOrugaNew.find((option) => {
        return option.label === rs.name
      });
      return matchingOption ? matchingOption.value : [];
    });
  }

  if (formData.fcras) {
    FCRATags.value = formData.fcras.map((rs) => {
      const matchingOption = FCRAOptionsOrugaNew.find((option) => {
        return option.label === rs.name
      });
      return matchingOption ? matchingOption.value : [];
    });
  }

  if (formData.available_supervisions) {
    ASTags.value = formData.available_supervisions.map((rs) => {
      const matchingOption = ASOptionsOrugaNew.find((option) => {
        return option.label === rs.name
      });
      return matchingOption ? matchingOption.value : [];
    });
  }

  if (formData.departments) {
    DEPTags.value = formData.departments.map((rs) => {
      const matchingOption = DEPOptionsOrugaNew.find((option) => {
        return option.label === rs.name
      });
      return matchingOption ? matchingOption.value : [];
    });
  }

  if (formData.tech_offers) {
    KTTags.value = formData.tech_offers.map((rs) => {
      const matchingOption = KTOptionsOrugaNew.find((option) => {
        return option.label === rs.name
      });
      return matchingOption ? matchingOption.value : [];
    });
  }
}

/**
 * This function takes a sdgid as a parameter and returns the corresponding SDG object from the collections prop, after removing the 'documentId' and 'iconweb.documentId' properties.
 * @param {string} id - The sdgid of the SDG object to retrieve.
 * @returns {Object} The SDG object with the 'documentId' and 'iconweb.documentId' properties removed, or undefined if no matching object is found.
 */
const getSdgObject = (id) => {
  let sdgObj = props.collections.sdgs.find((sdg) => sdg.sdgid === id)
  // console.log('return id', id, obj);
  delete sdgObj.documentId;
  delete sdgObj.iconweb.documentId;
  // console.log("SDG OBJ", sdgObj);

  return sdgObj;
}

const syncCheckboxToFormData = () => {
  formData.sdgs = checkboxGroup.value.map((sdgId) => {
    return getSdgObject(sdgId)
  })
}

//Got 6 ORUGA Tags to Sync to FormData! 
const syncTagsFormData = () => {
  formData.research_centres = SRCTags.value;
  formData.research_foci = RFTags.value;

  formData.fcras = FCRATags.value;
  formData.available_supervisions = ASTags.value;

  formData.departments = DEPTags.value;
  formData.tech_offers = KTTags.value;
}

const imgCardStyle = computed(() => {
  if (window.innerWidth <= 768) {
    return { width: '100%' }
  } else {
    return { width: '22rem' }
  }
})

// Load checkbox group to FormData when checkbox group is modified
watch(checkboxGroup, (newVal, oldVal) => {
  try {
    formData.sdgs = [];
    console.log('Checkbox Changed', formData)
    formData.sdgs = newVal.map((sdgId) => {
      return getSdgObject(sdgId)
    })

  } catch (error) {
    console.error(error)
    // handle the error appropriately
  }
})

// Load Tags Input group to FormData when modified
watch([SRCTags, ROTags, RFTags, FCRATags, ASTags, DEPTags, KTTags], (newVal, oldVal) => {
  try {
    syncTagsFormData();
    console.log('FormData Changed', formData)
  } catch (error) {
    console.error(error)
    // handle the error appropriately
  }
})

watch(() => props.profile.attributes.ssoid, (newVal, oldVal) => {
  console.log(`SSOID changed from ${oldVal} to ${newVal}`)
  try {
    loadFormDataToORUGA()
    // syncCheckboxToFormData()
  } catch (error) {
    console.error('Error in watcher callback:', error)
    // Handle the error appropriately
  }
})

const activeTab = ref(0);
const showBooks = ref(false);

const ORUGAcheckBeforeAdd = (event, tags) => {
  console.log(event);
  console.log(tags);

  const eventExists = tags.some(tag => tag.id === event.id);
  return !eventExists;
}
// ORUGA SECTION

onMounted(() => {
  loadFormDataToORUGA();
  syncCheckboxToFormData();

  sortTagOptions();
  debugTagsMsg();

  console.log("Current FormData", formData);
})


const handleHasChange = (e) => {

  console.log('Has Image been changed?', e);

  if (e === true) {
    hasChangedImage.value = true;
  } else {
    hasChangedImage.value = false;
  }

  console.log('Has Image been changed?', hasChangedImage.value);
}

</script>

<template>

  <div class="container-fluid p-0 m-0">
    <div class="d-flex justify-content-center profile-form-container">

      <div class="row" :key="profile.attributes.ssoid">

        <div class="col">
          <div class="me-1 profile-form-card">
            <!-- {{ console.log('profile', profile) }} -->
            <image-card :profile="profile" @cropped-img="handleUploadPhoto" @has-changed-image="handleHasChange" />
          </div>
        </div>

        <div class="col mb-5">
          <section>
            <o-tabs v-model="activeTab" destroy-on-hide :animated="false">
              <div class="card ms-md-0 ms-2 shadow rounded-5 border-0 p-2">
                <o-tab-item :value="0" label="About me" icon="image">
                  <div class="card-body">
                    <section>
                      <o-field class="col-form-tag-profile" label="DEPARTMENT">
                        <o-taginput :validateItem="(event) => ORUGAcheckBeforeAdd(event, DEPTags)" v-model="DEPTags"
                          :options="DEPOptionsOrugaNew" :allow-new="allowNew" :allow-duplicates="false"
                          :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst" icon="tag"
                          placeholder="Select options" expanded />
                      </o-field>
                    </section>
                    <div class="row mb-3 rounded-5 border-4">
                      <div class="row">
                        <o-field label="POST TITLE" class="col-form-label-profile">
                          <o-input :placeholder="`${props.profile.attributes.post}`" disabled />
                        </o-field>
                      </div>
                    </div>
                    <div class="row mb-3 rounded-5 border-4">
                      <div class="row">
                        <label for="biography" class="col col-form-label-profile">Biography</label>
                      </div>
                      <div class="row pe-0">
                        <div class="col pe-0">
                          <tiptap-editor :formData="formData" field="biography" />
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="row">
                        <label for="academicInterests" class="col col-form-label-profile">Academic Interests</label>
                      </div>
                      <div class="row pe-0">
                        <div class="col pe-0">
                          <tiptap-editor :formData="formData" field="research_interest" />
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="row">
                        <label for="academicInterests" class="col col-form-label-profile">Research Awards / Achievements
                          (Optional)</label>
                      </div>
                      <div class="row pe-0">
                        <div class="col pe-0">
                          <tiptap-editor :formData="formData" field="research_interest" />
                        </div>
                      </div>
                    </div>
                  </div>
                </o-tab-item>

                <o-tab-item :value="1" label="My Research" icon="pen">
                  <div class="card-body">
                    <section>
                      <o-field class="col-form-tag-profile" label="RESEARCH FOCUS">
                        <o-taginput :validateItem="(event) => ORUGAcheckBeforeAdd(event, RFTags)" v-model="RFTags"
                          :options="RFOptionsOrugaNew" :allow-new="allowNew" :allow-duplicates="false"
                          :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst" icon="tag"
                          placeholder="Select options" expanded />
                      </o-field>
                    </section>
                    <section>
                      <o-field class="col-form-tag-profile" label="FACULTY COLLABORATIVE RESEARCH AREA">
                        <o-taginput :validateItem="(event) => ORUGAcheckBeforeAdd(event, FCRATags)" v-model="FCRATags"
                          :options="FCRAOptionsOrugaNew" :allow-new="allowNew" :allow-duplicates="false"
                          :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst" icon="tag"
                          placeholder="Select options" expanded />
                      </o-field>
                    </section>
                    <section>
                      <o-field class="col-form-tag-profile" label="STRATEGIC RESEARCH CENTRE">
                        <o-taginput :validateItem="(event) => ORUGAcheckBeforeAdd(event, SRCTags)" v-model="SRCTags"
                          :options="SRCOptionsOrugaNew" :allow-new="allowNew" :allow-duplicates="false"
                          :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst" icon="tag"
                          placeholder="Select options" expanded />
                      </o-field>
                    </section>
                  </div>
                </o-tab-item>

                <o-tab-item :value="2" label="SDGs" icon="book">
                  <div class="card-body">
                    <div class="">
                      <h6 class="col-form-tag-profile">SUSTAINABLE DEVELOPMENT GOALS (SDGs)</h6>
                    </div>
                    <div class="">
                      <div class="columns is-multiline">
                        <div class="column is-one-fifth" v-for="sdg in sdgOptions" :key="sdg">
                          <o-field class="sdg-field">
                            <o-tooltip label="HTML Content" size="large" variant="info" multiline>
                              <template #content>
                                <div class="sdg-info">
                                  <p><strong>Title</strong> <br> {{ sdg.title }}</p>
                                  <p><strong>Description</strong> <br> {{ sdg.slogan }}</p>
                                </div>
                              </template>
                              <o-checkbox v-model="checkboxGroup" :native-value="`${sdg.sdgid}`" :label="sdg.sdgid">
                                <p class="col-form-label-profile-sdg"> SDG {{ sdg.sdgid }} </p>
                                <nuxt-img
                                  :src="`https://edu.unicef.org.hk/image/catalog/teaching%20resource/goal${sdg.sdgid}a.png`"
                                  :alt="sdg.title" class="img-fluid checkbox-img" />
                              </o-checkbox>
                            </o-tooltip>
                          </o-field>
                        </div>
                      </div>
                    </div>
                  </div>
                </o-tab-item>

                <o-tab-item :value="3" label="Teaching and Supervision" icon="music">
                  <div class="card-body">
                    <section>
                      <o-field class="col-form-tag-profile" label="AVAILABILITY FOR SUPERVISION">
                        <o-taginput :validateItem="(event) => ORUGAcheckBeforeAdd(event, ASTags)" v-model="ASTags"
                          :options="ASOptionsOrugaNew" :allow-new="allowNew" :allow-duplicates="false"
                          :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst" icon="tag"
                          placeholder="Select options" expanded />
                      </o-field>
                    </section>
                  </div>
                </o-tab-item>

                <o-tab-item :value="4" label="Knowledge Transfer" icon="book">
                  <div class="card-body">
                    <section>
                      <o-field class="col-form-tag-profile" label="KNOWLEDGE TRANSFER">
                        <o-taginput :validateItem="(event) => ORUGAcheckBeforeAdd(event, KTTags)" v-model="KTTags"
                          :options="KTOptionsOrugaNew" :allow-new="allowNew" :allow-duplicates="false"
                          :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst" icon="tag"
                          placeholder="Select options" expanded />
                      </o-field>
                    </section>
                  </div>
                </o-tab-item>

                <o-tab-item :value="5" :visible="false" label="Additional" icon="book">
                  What light is light, if Silvia be not seen? <br />
                  Except I be by Silvia in the night, <br />
                  There is no music in the nightingale.
                </o-tab-item>

                <div class="me-3">
                  <ProfileSave :handle-submit="handleSubmit" :profile-store="profileStore" />
                </div>
              </div>
            </o-tabs>
          </section>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss"></style>

<style lang="scss" scoped>
.columns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
}

@media (max-width: 600px) {
  .columns {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 7px;
  }
}

.sdg-field {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.4rem;
  transition: box-shadow 0.2s ease;
  justify-content: space-between;
}

.sdg-field:hover {
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
  box-shadow: 0 4px 8px rgba(0, 119, 255, 0.354);
}

.checkbox-img {
  margin-left: -11px;
}

.profile-form-container {
  display: flex;
  flex-direction: row;
}

.profile-form-card {
  width: 300px;
}

@media (max-width: 900px) {
  .profile-form-container {
    flex-direction: column;
  }

  .profile-form-card {
    width: 100%;
  }
}

.card-body {
  width: 60vw;
}
</style>