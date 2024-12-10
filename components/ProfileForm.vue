<script setup>
import { reactive, watch, defineEmits } from 'vue';
import { useProfileStore } from '../composables/useProfile'; // replace with your actual path
import TiptapEditor from './TiptapEditor.vue' // path to your Tiptap editor component

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

const emit = defineEmits(['save']);
const profileStore = useProfileStore();

//Used for Reactive for ORUGA to Update..
const formData = reactive({
  documentId: props.profile?.attributes.documentId || '',

  research_interest: props.profile?.attributes.research_interest || '', //Remind, the profile's field is winout s.. 
  biography: props.profile?.attributes.biography || '',

  // SDG: props.profile?.attributes.SDG ? props.profile.attributes.SDG.split(',').map(Number) : [],
  // SDG // http://158.182.151.62:1337/uploads/E_WEB_Goal_04_1779e135aa.png.. Fix ?
  sdgs: props.profile?.attributes.sdgs ? props.profile.attributes.sdgs : [],
  // FCRA: props.profile?.attributes.FCRA || "", //String type

  fcras: props.profile?.attributes.fcras || [], //String type
  research_foci: props.profile?.attributes.research_foci || [],
  research_centres: props.profile?.attributes.research_centres || [],

  available_supervisions: props.profile?.attributes.available_supervisions || [],
  departments: props.profile?.attributes.departments || [],

  photoURL: props.profile?.attributes.photoURL || [],
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
    // departments: formData.departments,

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

const debugMsg = () => {

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
  {
    label: "Tina Gilbert",
    value: {
      id: 3,
      user: { first_name: "Tina", last_name: "Gilbert" },
      date: "2016/04/26 06:26:28",
      gender: "Female",
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

  // if (formData.departments) {
  //   DEPTags.value = formData.departments.map((rs) => {
  //     const matchingOption = ASOptionsOrugaNew.find((option) => {
  //       return option.label === rs.name
  //     });
  //     return matchingOption ? matchingOption.value : [];
  //   });
  // }

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


  //TBD
  // formData.departments = DEPTags.value;
}

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

  debugMsg();
})

// ORUGA SECTION

</script>

<template>

  <div class="container-fluid">
    <div class="row mt-4 mb-4">
      <div class="col-sm-1 col-md-2 col-lg-3">
        <div class="card ms-2" style="width: 22rem;">
          <img class="card-img-top"
            :src="`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s7`"
            alt="Card image cap" />

          <div class="card-body">
            <h5 class="card-title">User Image</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
          </div>
        </div>
      </div>

      <div class="col-sm-10 col-md-9 col-lg-9">
        <form @submit.prevent="handleSubmit" class="container-fluid">
          <div class="card mx-2">
            <div class="card-body">
              <h5 class="card-title">Personal Information</h5>
              <p class="card-text">Your academic profile information.</p>

              <div class="row">
                <div class="col">
                  <div class="row mb-3">
                    <label class="col-form-label">Name</label>
                    <div class="col-sm-10">
                      <p class="form-control-plaintext">{{ profile?.attributes.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <!-- <o-field label="Chinese Name">
                    <o-input v-model="profile.attributes.chiname" disabled/>
                  </o-field> -->
                  <div class="row mb-3">
                    <label class="col-form-label">Chinese Name</label>
                    <div class="col-sm-10">
                      <p class="form-control-plaintext">{{ profile?.attributes.chiname }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <p class="form-control-plaintext">{{ profile?.attributes.email }}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Department</label>
                    <div class="col-sm-9">
                      <p class="form-control-plaintext">{{ profile?.attributes.unit }}</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">HKBU Scholar Url</label>
                    <div class="col-sm-10">
                      <!-- <p class="form-control-plaintext">{{ profile?.attributes.url }}</p> -->
                      <a :href="profile?.attributes.url" target="_blank" class="form-control-plaintext">{{
                        profile?.attributes.url }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="row mb-3">
                <label class="col-sm-2 col-form-label">SSOID</label>
                <div class="col-sm-10">
                  <p class="form-control-plaintext">{{ profile?.attributes.ssoid }}</p>
                </div>
              </div> -->

              <div class="row mb-3">
                <label for="biography" class="col-sm-2 col-form-label">Biography</label>
                <div class="col-sm-10">
                  <tiptap-editor :formData="formData" field="biography" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="academicInterests" class="col-sm-2 col-form-label">Academic Interests</label>
                <div class="col-sm-10">
                  <tiptap-editor :formData="formData" field="research_interest" />
                </div>
              </div>

              <div class="row">
                <div class="col-2">
                  <h6 class="col-form-label">Sustainable Development Goals (SDG)</h6>
                </div>
                <div class="col">
                  <div class="columns is-multiline">
                    <div class="column is-one-fifth" v-for="sdg in sdgOptions" :key="sdg">
                      <o-field class="sdg-field">
                        <!-- <o-tooltip :label="`SDG: ${sdg.sdgid} \n\n Slogan: ${sdg.slogan}`" multiline> -->
                        <o-tooltip label="HTML Content" size="large" multiline>
                          <template #content>
                            <div class="sdg-info">
                              <!-- <p><strong>SDG:</strong> {{ sdg.sdgid }}</p> -->
                              <p><strong>Title</strong> <br> {{ sdg.title }}</p>
                              <p><strong>Description</strong> <br> {{ sdg.slogan }}</p>
                            </div>
                          </template>
                          <o-checkbox v-model="checkboxGroup" :native-value="`${sdg.sdgid}`" :label="sdg.sdgid">
                            <!-- <o-checkbox v-model="checkboxGroup" :native-value="sdg" :label="sdg.sdgid"> -->
                            SDG {{ sdg.sdgid }}
                            <nuxt-img
                              :src="`https://edu.unicef.org.hk/image/catalog/teaching%20resource/goal${sdg.sdgid}a.png`"
                              :alt="sdg.title" class="img-fluid" />
                            <!-- <br>
                            Title: {{ sdg.title }}
                            <br>
                            Slogan: {{ sdg.slogan }} -->
                          </o-checkbox>
                        </o-tooltip>
                      </o-field>
                    </div>
                  </div>
                  <!-- <p><b>Selection:</b></p>
                  <p v-for="(item, index) in checkboxGroup" :key="index">
                    SDG - {{ item }}
                  </p>
                  <h3>Form Data </h3>
                  <p v-for="(item, index) in formData.sdgs" :key="index">
                    SDG - {{ item }}
                  </p> -->
                </div>
              </div>

              <!-- <div class="row mb-3">
                <o-field label="FCRA">
                  <o-select v-model="formData.fcra" multiple :data="fcraOptions" />
                </o-field>
              </div> -->
              <section>
                <o-field class="col-form-label" label="Strategic Research Centre">
                  <o-taginput v-model="SRCTags" :options="SRCOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Add an item" expanded />
                </o-field>
                <!-- <p><b>FCRAS:</b> {{ fcraTags }}</p> -->
              </section>
              <section>
                <o-field class="col-form-label" label="Research focus">
                  <o-taginput v-model="RFTags" :options="RFOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Add an item" expanded />
                </o-field>
                <!-- <p><b>RESEARCH FOCUS:</b> {{ RSTags }}</p> -->
              </section>
              <section>
                <o-field class="col-form-label" label="Faculty Collaborative Research Area">
                  <o-taginput v-model="FCRATags" :options="FCRAOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Add an item" expanded />
                </o-field>
              </section>
              <section>
                <o-field class="col-form-label" label="Availability for Supervision">
                  <o-taginput v-model="ASTags" :options="ASOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Add an item" expanded />
                </o-field>
              </section>
              <section>
                <o-field class="col-form-label" label="Department">
                  <o-taginput v-model="DEPTags" :options="DEPOptionsOrugaNew" :allow-new="allowNew"
                    :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst"
                    icon="tag" placeholder="Add an item" expanded />
                </o-field>
              </section>


              <div class="d-flex justify-content-end">
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

.col-form-label {
  font-weight: bold;
  text-decoration: underline;
}

.sdg-info p {
  margin-bottom: 1em;
}

.sdg-info strong {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}

.sdg-field {
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1em;
  transition: box-shadow 0.2s ease;
  justify-content: space-between;

}

.sdg-field:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>