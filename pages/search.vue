<template>
  <div class="container-fluid nav-offset">

    <div class="row"
      style="background-image: url(&quot;/img/bottom.8ea92c85.jpg&quot;); background-size: cover; background-repeat: repeat; background-position: top;">
      <div class="col-md-11 col-lg-10 col-xl-9 mx-auto position-relative">
        <div class="container-fluid p-3 m-3">
          <SearchBar />
        </div>
      </div>
    </div>

    <div class="container-fluid m-0 p-0">
      {{ console.log(`You searched for: ${$route.query.q}`) }}

      <div class="row" style="margin-top: 27px;margin-bottom: 10px;">
        <div class="col"><small class="form-text"
            style="color: var(--bs-black);font-size: 20px;font-family: Lato, sans-serif;font-weight: bold;margin-top: 0px;padding: 15px;padding-top: 0px;height: 0px;">Filter
            by</small></div>
        <div class="col-xl-6">
          <div class="row">
            <div class="col">
              <div class="dropdown show" style="width: 15vw;"><button class="btn btn-primary dropdown-toggle"
                  aria-expanded="true" data-bs-toggle="dropdown" type="button"
                  style="background: rgb(59,119,184);border-radius: 2px;width: 15vw;">Sort by:</button>
                <div class="dropdown-menu" data-bs-popper="none"><a class="dropdown-item" href="#">Relevance</a><a
                    class="dropdown-item" href="#">Name</a><a class="dropdown-item" href="#">Department</a></div>
              </div>
            </div>
            <div class="col">
              <nav>
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" aria-label="Previous" href="#" @click.prevent="goToPage(currentPage - 1)"><span
                        aria-hidden="true">«</span></a>
                  </li>
                  <li v-for="pageNum in paginationNumbers" :key="pageNum + '-' + currentPage" class="page-item"
                    :class="{ active: currentPage === pageNum, disabled: pageNum === '...' }">
                    <span v-if="pageNum === '...'" class="page-link">...</span>
                    <a v-else class="page-link" href="#" @click.prevent="goToPage(pageNum)">{{ pageNum }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" aria-label="Next" href="#" @click.prevent="goToPage(currentPage + 1)"><span
                        aria-hidden="true">»</span></a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="col" style="text-align: right;"><small class="form-text"
            style="color: var(--bs-black);font-size: 20px;font-family: Lato, sans-serif;font-weight: bold;">
            {{ currentRangeStart }}-{{ currentRangeEnd }} out of {{ totalProfiles }}
          </small></div>
      </div>
      <div v-if="authStore" class="row" style="margin-top: 0;">
        <div class="col-md-6 col-xl-3 col-xxl-3" style="flex: 0 0 auto !important; width: 351.875px !important;">
          <div id="accordion-1" class="accordion" role="tablist" style="width: 281px;margin-left: 10px;">
            <div class="accordion-item" style="width: 324px;">
              <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-1" aria-expanded="false"
                  aria-controls="accordion-1 .item-1">Research Focus</button></h2>
              <div class="accordion-collapse collapse item-1" role="tabpanel" data-bs-parent="#accordion-1">
                <div class="accordion-body">

                  <!-- <div>
                    <div class="form-check"><input id="formCheck-1" class="form-check-input" type="checkbox" /><label
                        class="form-check-label" for="formCheck-1">Data Science and Statistics</label></div>
                    <div class="form-check"><input id="formCheck-7" class="form-check-input" type="checkbox" /><label
                        class="form-check-label" for="formCheck-7">Foundations in AI</label></div>
                  </div> -->

                  <div v-for="(focus, index) in accordionItems[0]" :key="index" class="form-check">
                    <input :id="'formCheck-' + (index + 5)" class="form-check-input" type="checkbox" />
                    <label :for="'formCheck-' + (index + 5)" class="form-check-label">{{ focus['name'] }}</label>
                  </div>

                  <!-- <p class="mb-0">Show All Options</p> -->
                </div>
              </div>
            </div>
            <div class="accordion-item" style="width: 324px;">
              <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-2" aria-expanded="false"
                  aria-controls="accordion-1 .item-2">Faculty Collaborative Research Area</button></h2>
              <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-1">
                <div class="accordion-body">
                  <div>
                    <!-- <div class="form-check"><input id="formCheck-2" class="form-check-input" type="checkbox" /><label
                        class="form-check-label" for="formCheck-2">Chemical Biology &amp; Molecular Modelling</label>
                    </div> -->
                    <div v-for="(focus, index) in accordionItems[1]" :key="index" class="form-check">
                      <input :id="'formCheck-' + (index + 5)" class="form-check-input" type="checkbox" />
                      <label :for="'formCheck-' + (index + 5)" class="form-check-label">{{ focus['name'] }}</label>
                    </div>

                    <!-- <p class="mb-0">Show All Options</p> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item" style="width: 324px;">
              <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-3" aria-expanded="false"
                  aria-controls="accordion-1 .item-3">Strategic Research Centre</button></h2>
              <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-1">
                <div class="accordion-body">
                  <div>
                    <!-- <div class="form-check"><input id="formCheck-3" class="form-check-input" type="checkbox" /><label
                        class="form-check-label" for="formCheck-3">HKBU-RCEES Joint Institute of Environmental
                        Sciences</label></div> -->

                    <div v-for="(focus, index) in accordionItems[2]" :key="index" class="form-check">
                      <input :id="'formCheck-' + (index + 5)" class="form-check-input" type="checkbox" />
                      <label :for="'formCheck-' + (index + 5)" class="form-check-label">{{ focus['name'] }}</label>
                    </div>
                    <!-- <p class="mb-0">Show All Options</p> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item" style="width: 324px;">
              <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-4" aria-expanded="false"
                  aria-controls="accordion-1 .item-4">Availability for Supervision</button></h2>
              <div class="accordion-collapse collapse item-4" role="tabpanel" data-bs-parent="#accordion-1">
                <div class="accordion-body">
                  <div>
                    <!-- <div class="form-check"><input id="formCheck-4" class="form-check-input" type="checkbox" /><label
                        class="form-check-label" for="formCheck-4">Summer Research Programme</label></div> -->
                    <div v-for="(focus, index) in accordionItems[3]" :key="index" class="form-check">
                      <input :id="'formCheck-' + (index + 5)" class="form-check-input" type="checkbox" />
                      <label :for="'formCheck-' + (index + 5)" class="form-check-label">{{ focus['name'] }}</label>
                    </div>
                    <!-- <p class="mb-0">Show All Options</p> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item" style="width: 324px;">
              <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-5" aria-expanded="false"
                  aria-controls="accordion-1 .item-5">Knowledge Transfer</button></h2>
              <div class="accordion-collapse collapse item-5" role="tabpanel" data-bs-parent="#accordion-1">
                <div class="accordion-body">
                  <div>
                    <!-- <div class="form-check"><input id="formCheck-5" class="form-check-input" type="checkbox" /><label
                        class="form-check-label" for="formCheck-5">Healthcare - Diagnostics</label></div> -->
                    <div v-for="(focus, index) in accordionItems[4]" :key="index" class="form-check">
                      <input :id="'formCheck-' + (index + 5)" class="form-check-input" type="checkbox" />
                      <label :for="'formCheck-' + (index + 5)" class="form-check-label">{{ focus['name'] }}</label>
                    </div>
                    <!-- <p class="mb-0">Show All Options</p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-xl-8">
          <div v-if="!hasLoadedProfiles">
            Loading ...
          </div>
          <div v-else>
            <div v-for="profile in profileStore.profiles" :key="profile">
              <ExpertCard :profile="profile" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script lang="ts" setup>
const searchInput = ref('')
const router = useRouter()
const route = useRoute()

import SearchBar from '~/components/ui/SearchBar.vue';
import ExpertCard from '~/components/ui/ExpertCard.vue';
import DottedLine from '~/components/ui/DottedLine.vue';

const profileStore = useProfileStore();
const authStore = useAuthStore();
const isLoading = ref(true);

const accordionItems = computed(() => {
  return authStore.collections ? [
    authStore.collections['research-foci'] ?? [],
    authStore.collections['fcras'] ?? [],
    authStore.collections['research-centres'] ?? [],
    authStore.collections['available-supervisions'] ?? [],
    authStore.collections['tech-offers'] ?? [],
  ] : [[], [], [], [], []];
});

const currentCnt = computed(() => {
  return profileStore && profileStore.profiles ? profileStore.profiles.length : 0;
});

const pageSize = 5;
const currentPage = ref(Number(route.query.page) || 1);
const totalProfiles = computed(() => profileStore && profileStore.totalProfiles ? profileStore.totalProfiles : 0);
const totalPages = computed(() => Math.ceil(totalProfiles.value / pageSize));

const goToPage = (pageNum: number) => {
  if (pageNum < 1 || pageNum > totalPages.value) return;
  currentPage.value = pageNum;
  router.push({ query: { ...route.query, page: pageNum } });
};

const hasLoadedProfiles = computed(() => {
  return profileStore && profileStore.profiles && profileStore.profiles.length > 0;
});

const paginationNumbers = computed(() => {
  const pages = [];
  if (totalPages.value <= 5) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  } else {
    // Always show first and last
    pages.push(1);
    let left = currentPage.value - 1;
    let right = currentPage.value + 1;
    if (left <= 2) {
      left = 2;
      right = 4;
    }
    if (right >= totalPages.value - 1) {
      right = totalPages.value - 1;
      left = totalPages.value - 3;
    }
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) {
      if (i > 1 && i < totalPages.value) pages.push(i);
    }
    if (right < totalPages.value - 1) pages.push('...');
    pages.push(totalPages.value);
  }
  return pages;
});

const currentRangeStart = computed(() => (currentPage.value - 1) * pageSize + 1);
const currentRangeEnd = computed(() => {
  const end = currentPage.value * pageSize;
  return end > totalProfiles.value ? totalProfiles.value : end;
});

watch(
  () => route.query.page,
  async (newPage) => {
    const pageNum = Number(newPage) || 1;
    currentPage.value = pageNum;
    await profileStore.fetchProfiles(pageNum, pageSize);
  },
  { immediate: true }
);

onMounted(async () => {
  try {
    // Initialize from storage first
    authStore.initializeFromStorage();

    // If collections are not loaded, try to initialize them
    if (!authStore.collections) {
      console.log('Collections not found in storage, fetching...');
      await authStore.setCollections();
    }

    await profileStore.fetchProfiles(currentPage.value, pageSize);

    console.log(authStore.collections, 'Loaded Collections from Auth');
    console.log(accordionItems.value, 'Loaded accordionItems from Auth');
  } catch (error) {
    console.error('Failed to initialize:', error);
  } finally {
    isLoading.value = false;
  }
})

</script>

<style scoped>
.centered-heading {
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-shrink: 0;

}

.heading-text-style {
  font-size: 16px;
  font-weight: 400;
  height: 42px;
  line-height: 45px;

  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
}
</style>