<script setup lang="ts">
import { reactive, watch, defineEmits } from 'vue';
import { useProfileStore } from '../composables/useProfile'; // replace with your actual path
import TiptapEditor from './TiptapEditor.vue' // path to your Tiptap editor component
import ImageCard from './ui/ProfileImageCard.vue';
import type { CroppedImg } from '~/types/profileImage';

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

onMounted(() => {
  console.log("props.profile", props.profile);
  console.log("props.collections", props.collections);
})

const profileStore = useProfileStore();

const emit = defineEmits(['save']);
const handleUploadPhoto = (croppedImg: Ref<CroppedImg>) => {
  let obj = croppedImg.value;
  console.log("Capture ProfileForm: ", obj);
  formData.uploadPhoto = obj.strapiID;
  console.log('FormData StrapiID:', formData.uploadPhoto);
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
});


const handleSubmit = () => { //Going to send back to profile.vue parent. 
  emit('save', {
    research_interest: formData.research_interest, //HAHA TYPO
    biography: formData.biography,
    sdgs: formData.sdgs,

    research_centres: formData.research_centres,
    research_foci: formData.research_foci,

    fcras: formData.fcras,
    available_supervisions: formData.available_supervisions,

    departments: formData.departments,

    // photoURL: formData.photoURL, // NO NEED TO UPDATE// HKBU SCHOLAR DEFINED
    uploadPhoto: formData.uploadPhoto, //Save the Strapi ID of the Avatar.

    documentId: formData.documentId, //This is the Uniquite ID of THis USER.. Profile.. - BY STRAPI Standard.
    // FCRA: formData.FCRA, //DEBUGGING
    // research_focus: formData.research_focus,
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

const ROOptionsOrugaNew = ROOptions.map((option) => {
  return {
    label: option.title,
    value: {
      id: option.id,
      documentId: option.document_id,
      recno: option.recno,
      uoacode: option.uoacode,
      title: option.title,
      lastname: option.lastname,
      othername: option.othername,
      chiname: option.chiname,
      dept: option.dept,
      statement: option.statement,
      createdAt: option.created_at,
      updatedAt: option.updated_at,
      publishedAt: option.published_at,
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

const sortTagOptions = () => {
  DEPOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  // ASOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  FCRAOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  RFOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
  SRCOptionsOrugaNew.sort((a, b) => a.label.localeCompare(b.label));
}

sortTagOptions();

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

//Got 5 Tags to Sync! 
const syncTagsFormData = () => {
  formData.research_centres = SRCTags.value;
  formData.research_foci = RFTags.value;

  formData.fcras = FCRATags.value;
  formData.available_supervisions = ASTags.value;

  formData.departments = DEPTags.value;
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
watch([SRCTags, ROTags, RFTags, FCRATags, ASTags, DEPTags], (newVal, oldVal) => {
  try {
    syncTagsFormData();
    console.log('FormData Changed', formData)
  } catch (error) {
    console.error(error)
    // handle the error appropriately
  }
})

onMounted(() => {
  loadFormDataToORUGA();
  syncCheckboxToFormData();

  debugTagsMsg();
})
// ORUGA SECTION

</script>

<template>

  <div class="container-fluid px-5">
    <div class="row mt-4 mb-4">
      <div class="col-sm-3 col-md-3 col-lg-3 mb-2">
        <image-card :profile="profile" @cropped-img="handleUploadPhoto" />
      </div>

      <div class="col-sm-10 col-md-10 col-lg-9">
        <form @submit.prevent="handleSubmit">
          <div class="card ms-md-0 ms-2 shadow rounded-5 border-0">
            <div class="card-body">

              <div class="row mb-3 rounded-5 border-4">
                <div class="row">
                  <label for="biography" class="col col-form-label">Biography</label>
                </div>
                <div class="row">
                  <div class="col">
                    <tiptap-editor :formData="formData" field="biography" />
                  </div>
                </div>
              </div>
              <div class="row mb-3">

                <div class="row">
                  <label for="academicInterests" class="col col-form-label">Academic Interests</label>
                </div>
                <div class="row">
                  <div class="col">
                    <tiptap-editor :formData="formData" field="research_interest" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-sm-12 col-md-12">
                  <h6 class="col-form-label">Sustainable Development Goals (SDGs)</h6>
                </div>
                <div class="col-11 col-sm-11 col-md-12">
                  <div class="columns is-multiline">
                    <div class="column is-one-fifth" v-for="sdg in sdgOptions" :key="sdg">
                      <o-field class="sdg-field">
                        <!-- <o-tooltip :label="`SDG: ${sdg.sdgid} \n\n Slogan: ${sdg.slogan}`" multiline> -->
                        <o-tooltip label="HTML Content" size="large" variant="info" multiline>
                          <template #content>
                            <div class="sdg-info">
                              <!-- <p><strong>SDG:</strong> {{ sdg.sdgid }}</p> -->
                              <p><strong>Title</strong> <br> {{ sdg.title }}</p>
                              <p><strong>Description</strong> <br> {{ sdg.slogan }}</p>
                            </div>
                          </template>
                          <o-checkbox v-model="checkboxGroup" :native-value="`${sdg.sdgid}`" :label="sdg.sdgid">
                            <!-- <o-checkbox v-model="checkboxGroup" :native-value="sdg" :label="sdg.sdgid"> -->
                            <p class="col-form-label-sdg"> SDG {{ sdg.sdgid }} </p>
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

              <section>
                <o-field class="col-form-tag" label="DEPARTMENT">
                  <o-taginput v-model="DEPTags" :options="DEPOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Select options" expanded />
                </o-field>
              </section>
              <section>
                <o-field class="col-form-tag" label="STRATEGIC RESEARCH CENTRE">
                  <o-taginput v-model="SRCTags" :options="SRCOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Select options" expanded />
                </o-field>
                <!-- <p><b>FCRAS:</b> {{ fcraTags }}</p> -->
              </section>
              <section>
                <o-field class="col-form-tag" label="RESEARCH FOCUS">
                  <o-taginput v-model="RFTags" :options="RFOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Select options" expanded />
                </o-field>
                <!-- <p><b>RESEARCH FOCUS:</b> {{ RSTags }}</p> -->
              </section>
              <section>
                <o-field class="col-form-tag" label="FACULTY COLLABORATIVE RESEARCH AREA">
                  <o-taginput v-model="FCRATags" :options="FCRAOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Select options" expanded />
                </o-field>
              </section>
              <section>
                <o-field class="col-form-tag" label="AVAILABILITY FOR SUPERVISION">
                  <o-taginput v-model="ASTags" :options="ASOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Select options" expanded />
                </o-field>
              </section>

              <div class="d-flex justify-content-end mt-4">
                <button type="submit" class="btn btn-primary" :disabled="profileStore.isLoading">
                  {{ profileStore.isLoading ? 'Saving...' : 'Save' }}
                </button>
              </div>
              <p v-if="profileStore.error" class="text-danger mt-3">{{ profileStore.error }}</p>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>

</template>

<style>
:root {
  --white: #FFF;
  --black: #2E2B29;
  --black-contrast: #110F0E;
  --gray-1: rgba(61, 37, 20, .05);
  --gray-2: rgba(61, 37, 20, .08);
  --gray-3: rgba(61, 37, 20, .12);
  --gray-4: rgba(53, 38, 28, .3);
  --gray-5: rgba(28, 25, 23, .6);
  --green: #22C55E;
  --purple: #6A00F5;
  --purple-contrast: #5800CC;
  --purple-light: rgba(88, 5, 255, .05);
  --yellow-contrast: #FACC15;
  --yellow: rgba(250, 204, 21, .4);
  --yellow-light: #FFFAE5;
  --red: #FF5C33;
  --red-light: #FFEBE5;
  --shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04)
}
</style>

<style scoped>
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

.col-form-label {
  color: #006d88;
  font-family: Montserrat, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .6px;
  line-height: 24px;
  min-width: 50%;
  text-transform: uppercase;
}

.col-form-tag {
  color: #006d88;
  font-family: Montserrat, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .6px;
  line-height: 24px;
  min-width: 50%;
  /* text-transform: uppercase; */
}

.col-form-label-sdg {
  color: #006d88;
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .5px;
  line-height: 24px;
  min-width: 50%;
  text-transform: uppercase;
}

.sdg-tooltip {
  background: #006d88;
}

.sdg-info {
  color: aliceblue;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* Added text-shadow */

  font-family: Montserrat, sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .5px;
  /* line-height: 24px; */
  /* min-width: 50%; */
  /* text-transform: uppercase; */

  p {
    margin-bottom: 1em;
  }
}

.sdg-info strong {
  display: inline-block;
  width: 100px;
  font-weight: bold;
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
</style>