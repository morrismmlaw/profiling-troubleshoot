<template>
  <div>
    <form @submit.prevent="handleSearch">
      <div id="myInputSearch"
        style="margin-left: 1px;background: var(--bs-light);border-radius: 41px;box-shadow: 0px 1px 10px 1px;margin-top: 2px;height: 53px;border-width: thin;border-style: solid;">
        <label class="form-label" style="width: 100%;margin-top: 0px;">
          <NuxtLink to="/search" @click="handleSearch">
            <svg class="text-black icon-hover" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
              viewBox="-1 -3 30 30" fill="none"
              style="margin-left: 14px;font-size: 30px;margin-top: -3px;color: var(--bs-secondary);">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                fill="currentColor"></path>
            </svg>
          </NuxtLink>

          <input @keyup.enter="handleSearchWithEnter" @input="handleSearch" v-model="searchInput" id="my-search-input"
            type="search"
            style="margin-left: 7px;margin-top: 4px;width: calc(100% - 100px);border-style: none;background: var(--bs-light);height: 45px;font-size: 20px;font-family: Abel, sans-serif;"
            placeholder="Search by name or keyword" />
          <!-- Dropdown for search options -->
          <!-- Search result dropdown with photo -->
          <div v-if="searchInput && profiles.length > 0" class="search-dropdown"
            style="position: absolute; z-index: 1000; background: white; width: 90%; left: 5%; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); max-height: 320px; overflow-y: auto;">
            <ul style="list-style: none; margin: 0; padding: 0;">
              <li v-for="profile in profiles" :key="profile.id"
                style="display: flex; align-items: center; padding: 10px 16px; border-bottom: 1px solid #eee; cursor: pointer;"
                @click="router.push({ path: profile.ssoid })">
                <img :src="profile.uploadPhoto ? 'https://profile-cms.sci.hkbu.edu.hk' + profile.uploadPhoto.url : profile.photoURL" alt="profile photo"
                  style="width: 36px; height: 36px; object-fit: cover; border-radius: 50%; margin-right: 12px;" />
                <div>
                  <span style="font-weight: bold;">{{ profile.name }}</span>
                  <span v-if="profile.departments && profile.departments.length" style="color: #888; font-size: 0.9em;">
                    - {{ profile.departments[0].name }}</span>
                </div>
              </li>
              <li v-if="profiles.length >= pageSize" style="text-align: center; padding: 8px;">
                <NuxtLink :to="{ path: '/search', query: { q: searchInput } }">See all results</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- <div class="dropdown"> -->
          <!-- <i class="bi bi-list dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                          </i> -->
          <!-- <div class="dropdown">
              <svg class="text-black icon-hover dropdown-toggle" type="button" data-bs-toggle="dropdown"
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-4 -2 30 30" fill="none"
                style="font-size: 30px;margin-top: -4px;color: var(--bs-secondary);margin-left: 8px;">
                <path
                  d="M2 5.99519C2 5.44556 2.44556 5 2.99519 5H11.0048C11.5544 5 12 5.44556 12 5.99519C12 6.54482 11.5544 6.99039 11.0048 6.99039H2.99519C2.44556 6.99039 2 6.54482 2 5.99519Z"
                  fill="currentColor"></path>
                <path
                  d="M2 11.9998C2 11.4501 2.44556 11.0046 2.99519 11.0046H21.0048C21.5544 11.0046 22 11.4501 22 11.9998C22 12.5494 21.5544 12.9949 21.0048 12.9949H2.99519C2.44556 12.9949 2 12.5494 2 11.9998Z"
                  fill="currentColor"></path>
                <path
                  d="M2.99519 17.0096C2.44556 17.0096 2 17.4552 2 18.0048C2 18.5544 2.44556 19 2.99519 19H15.0048C15.5544 19 16 18.5544 16 18.0048C16 17.4552 15.5544 17.0096 15.0048 17.0096H2.99519Z"
                  fill="currentColor"></path>
              </svg> -->
          <!-- <ul class="dropdown-menu">
                <li><a class="dropdown-item disabled" href="#">Search Option</a></li>
                <li><a class="dropdown-item" href="#">Free text search</a></li>
                <li><a class="dropdown-item" href="#">Tag based search</a></li>
              </ul> -->
          <!-- </div> -->
          <!-- </div> -->
        </label>
      </div>
    </form>

  </div>
</template>

<script lang="ts" setup>
import { MeiliSearch } from 'meilisearch';
import { useRuntimeConfig } from '#app';
import ExpertCard from '~/components/ui/ExpertCard.vue';

const emit = defineEmits(['update:modelValue', 'search']);
const router = useRouter()
const searchInput = ref('')
const route = useRoute()


const handleSearchWithEnter = () => {
  console.log("Clicked Search:", searchInput.value)
  // emit('search', searchInput.value); // Emit search event
  router.push({
    path: '/search',
    query: { q: searchInput.value }
  })
}
const handleSearch = () => {
  console.log("Clicked Search:", searchInput.value)
  //emit('search', searchInput.value); // Emit search event
  // router.push({
  //   path: '/search',
  //   query: { q: searchInput.value }
  // })
  fetchProfilesFromMeili(searchInput.value, currentPage.value, pageSize);
}
const config = useRuntimeConfig();
// Meilisearch client setup
const meiliClient = new MeiliSearch({
  host: config.public.meiliHost, // Use runtime config
  apiKey: config.public.meiliAdminApiKey, // Use runtime config
});
const meiliIndex = meiliClient.index('profile');

const profileStore = useProfileStore();
const authStore = useAuthStore();
const isLoading = ref(true);

const profiles = ref([]);
const totalProfiles = ref(0);
const pageSize = 5;
const currentPage = ref(Number(route.query.page) || 1);
const selectedFilters = ref([[], [], [], [], [], []]); // Add departments as 6th filter
const sortBy = ref('relevance'); // 'relevance', 'name', 'department'

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Last Name (A-Z)', value: 'lastname_asc' },
  { label: 'Last Name (Z-A)', value: 'lastname_desc' },
];

watch(
  selectedFilters,
  (newFilters) => {
    console.log('Selected filter attributes:', JSON.stringify(newFilters));
  },
  { deep: true }
);

const handleSortChange = (option) => {
  sortBy.value = option.value;
  fetchProfilesFromMeili(searchInput.value, currentPage.value, pageSize);
};

const filterFields = [
  'research_foci',
  'fcras',
  'research_centres',
  'available_supervisions',
  'tech_offers',
  'departments', // Add departments for filtering
  'name',
  // 'department',
  'biography', // Added biography for keyword search
  'research_interest', // Added research_interest for keyword search
  'research_rewards', // Added research_rewards for keyword search
];

const fetchProfilesFromMeili = async (query = '', page = 1, limit = pageSize) => {
  isLoading.value = true;
  try {
    const offset = (page - 1) * limit;
    let filters = [];
    selectedFilters.value.forEach((arr, idx) => {
      if (arr.length > 0) {
        const orFilter = arr.map(val => `${filterFields[idx]}.name = "${val}"`).join(' OR ');
        if (orFilter) filters.push(`(${orFilter})`);
      }
    });
    const filterString = filters.join(' AND ');
    const searchOptions = {
      offset,
      limit,
      attributesToHighlight: ['name', 'lastname', 'departments', 'biography', 'research_interest', 'research_rewards'], // highlight these fields
      // attributesToHighlight: ["*"], // highlight these fields
    };
    if (filterString) (searchOptions as any).filter = filterString;
    // Add sort option
    if (sortBy.value === 'name') {
      (searchOptions as any).sort = ['name:asc'];
    } else if (sortBy.value === 'lastname_asc') {
      (searchOptions as any).sort = ['lastname:asc'];
    } else if (sortBy.value === 'lastname_desc') {
      (searchOptions as any).sort = ['lastname:desc'];
    }
    // Debug logs
    console.log('Meilisearch filter string:', filterString);
    console.log('Meilisearch search options:', searchOptions);
    // Search by name, biography, and other fields (Meilisearch will search all searchable fields by default)
    const result = await meiliIndex.search(query, searchOptions);
    console.log('Meilisearch result:', result);
    profiles.value = result.hits;
    totalProfiles.value = result.estimatedTotalHits || 0;
    if (result.hits.length === 0) {
      console.warn('No profiles found for current filters:', filterString);
    }
  } catch (error) {
    console.error('Meilisearch fetch error:', error);
    profiles.value = [];
    totalProfiles.value = 0;
  } finally {
    isLoading.value = false;
  }
};

watch(
  [() => route.query.page, () => route.query.q, selectedFilters],
  async ([newPage, newQuery]) => {
    const pageNum = Number(newPage) || 1;
    currentPage.value = pageNum;
    // Use route.query.q as the source of truth for the keyword
    const keyword = typeof newQuery === 'string' ? newQuery : '';
    searchInput.value = keyword;
    await fetchProfilesFromMeili(keyword, pageNum, pageSize);
  },
  { immediate: true, deep: true }
);

const goToPage = (pageNum: number) => {
  if (pageNum < 1 || pageNum > totalPages.value) return;
  currentPage.value = pageNum;
  router.push({ query: { ...route.query, page: pageNum } });
};

const totalPages = computed(() => Math.ceil(totalProfiles.value / pageSize));
const hasLoadedProfiles = computed(() => profiles.value.length > 0);
const currentRangeStart = computed(() => (currentPage.value - 1) * pageSize + 1);
const currentRangeEnd = computed(() => {
  const end = currentPage.value * pageSize;
  return end > totalProfiles.value ? totalProfiles.value : end;
});

const accordionItems = computed(() => {
  return authStore.collections ? [
    authStore.collections['research-foci'] ?? [],
    authStore.collections['fcras'] ?? [],
    authStore.collections['research-centres'] ?? [],
    authStore.collections['available-supervisions'] ?? [],
    authStore.collections['tech-offers'] ?? [],
    authStore.collections['departments'] ?? [], // Add departments
  ] : [[], [], [], [], [], []];
});

const setupMeiliFilterableAttributes = async () => {
  try {
    await meiliIndex.updateFilterableAttributes(filterFields);
    await meiliIndex.updateSortableAttributes(['name', 'lastname']); // Ensure both are sortable
    await meiliIndex.updateSearchableAttributes(['name', 'lastname', 'department', 'biography', 'research_interest']); // Add research_interest as searchable
    console.log('Meilisearch filterable, sortable, and searchable attributes set.');
  } catch (error) {
    console.error('Failed to set filterable/sortable/searchable attributes:', error);
  }
};

</script>

<style scoped>
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  display: inline-block;
  width: 25px;
  height: 25px;
  /* margin-left: 10px; */
  background: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-x-circle-fill' viewBox='-7 -5 25 25'%3E%3Cpath d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z'/%3E%3C/svg%3E");
  cursor: pointer;
}

.icon-hover:hover {
  /* opacity: .5; */
  background-color: rgb(161, 161, 161, 0.3);
  border-radius: 100%;
  transform: scale(1.1);
  transition: transform 0.1s ease-in-out;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-background-clip: text;
  -webkit-text-fill-color: #000000;
  transition: background-color 5000s ease-in-out 0s;
  /* box-shadow: inset 0 0 20px 20px #23232329; */
}
</style>