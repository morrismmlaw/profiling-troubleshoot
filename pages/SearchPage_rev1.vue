<template>

  <div>

    <div class="min-h-screen bg-[#1a1a2e]">
      <!-- Header -->
      <header class="border-b border-purple-900/20 bg-[#1a1a2e]">
        <div class="container mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-white mb-8">EXPERTS SEARCH</h1>
          <div class="relative">
            <input v-model="searchQuery" type="search" placeholder="Search experts..."
              class="w-full bg-white/10 border-purple-900/20 text-white placeholder:text-gray-400 rounded-md px-4 py-2 pr-10" />
            <Search class="absolute right-4 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>

      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <!-- Filters -->
          <aside class="space-y-6">
            <h2 class="text-lg font-semibold text-white mb-4">Filter by</h2>
            <div class="space-y-2">
              <div v-for="(filter, index) in filters" :key="index" class="border-b border-purple-900/20">
                <button class="w-full py-4 flex justify-between items-center text-white hover:text-purple-400"
                  @click="toggleFilter(index)">
                  {{ filter.name }}
                  <ChevronDown class="h-4 w-4 transition-transform duration-200"
                    :class="{ 'transform rotate-180': filter.isOpen }" />
                </button>
                <div v-show="filter.isOpen" class="pb-4 text-gray-300">
                  <!-- Filter content would go here -->
                  <div class="pl-4 space-y-2">
                    <div v-for="option in filter.options" :key="option" class="flex items-center">
                      <input type="checkbox" :id="option"
                        class="form-checkbox text-purple-600 rounded border-gray-600" />
                      <label :for="option" class="ml-2">{{ option }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- Results -->
          <main>
            <div class="flex justify-between items-center mb-6">
              <select v-model="sortBy" class="bg-transparent text-white border-purple-900/20 rounded-md px-3 py-2">
                <option value="relevance">Sort by: Relevance</option>
                <option value="name">Sort by: Name</option>
                <option value="department">Sort by: Department</option>
              </select>
              <p class="text-gray-400">1-25 out of 816</p>
            </div>

            <div class="space-y-6">
              <!-- Expert Card -->
              <div v-for="expert in experts" :key="expert.id"
                class="bg-[#2a2a3e] border border-purple-900/20 rounded-lg">
                <div class="p-6">
                  <div class="flex gap-6">
                    <div class="h-24 w-24 rounded-full overflow-hidden bg-purple-900/20">
                      <img :src="expert.avatar" :alt="expert.name" class="h-full w-full object-cover" />
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="text-xl font-semibold text-white mb-1">{{ expert.name }}</h3>
                          <p class="text-purple-400 mb-2">{{ expert.title }} • {{ expert.faculty }}</p>
                        </div>
                        <button
                          class="inline-flex items-center px-3 py-1 text-sm border border-purple-900/20 rounded-md text-purple-400 hover:bg-purple-900/20">
                          <Network class="h-4 w-4 mr-2" />
                          View network
                        </button>
                      </div>
                      <p class="text-gray-300 mb-4">{{ expert.bio }}</p>
                      <div class="space-y-2">
                        <p class="text-sm text-gray-400">
                          <strong class="text-white">Fields of Research (2020):</strong>
                          {{ expert.fields.join(' • ') }}
                        </p>
                        <p class="text-sm text-gray-400">
                          <strong class="text-white">Department/School/Institute:</strong>
                          {{ expert.department }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center gap-2 mt-8">
              <button class="px-4 py-2 text-white border border-purple-900/20 rounded-md disabled:opacity-50"
                :disabled="currentPage === 1" @click="currentPage--">
                Previous
              </button>
              <button v-for="page in visiblePages" :key="page"
                class="px-4 py-2 text-white border border-purple-900/20 rounded-md"
                :class="{ 'bg-purple-900/20': currentPage === page }" @click="currentPage = page">
                {{ page }}
              </button>
              <span v-if="totalPages > maxVisiblePages" class="text-white self-center">...</span>
              <button v-if="totalPages > maxVisiblePages"
                class="px-4 py-2 text-white border border-purple-900/20 rounded-md" @click="currentPage = totalPages">
                {{ totalPages }}
              </button>
              <button class="px-4 py-2 text-white border border-purple-900/20 rounded-md disabled:opacity-50"
                :disabled="currentPage === totalPages" @click="currentPage++">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronDown, Network } from 'lucide-vue-next'

// Search
const searchQuery = ref('')

// Filters
const filters = ref([
  {
    name: 'Research Strengths',
    isOpen: false,
    options: ['AI & Machine Learning', 'Health & Medicine', 'Environmental Science']
  },
  {
    name: 'Fields of Research (2020)',
    isOpen: false,
    options: ['Computer Science', 'Medical Research', 'Psychology']
  },
  {
    name: 'Availability for Supervision',
    isOpen: false,
    options: ['PhD', 'Masters', 'Honours']
  },
  {
    name: 'Area/Faculty',
    isOpen: false,
    options: ['Science & Engineering', 'Health', 'Arts & Education']
  }
])

const toggleFilter = (index) => {
  filters.value[index].isOpen = !filters.value[index].isOpen
}

// Sorting
const sortBy = ref('relevance')

// Experts Data
const experts = ref([
  {
    id: 1,
    name: 'Dr. Jane Smith',
    title: 'Senior Lecturer',
    faculty: 'Faculty of Science',
    avatar: '/placeholder.svg',
    bio: 'Expert in artificial intelligence and machine learning with a focus on neural networks and deep learning applications.',
    fields: ['Computer Science', 'Artificial Intelligence'],
    department: 'School of Information Technology'
  },
  // Add more experts here
])

// Pagination
const currentPage = ref(1)
const totalPages = ref(33)
const maxVisiblePages = 3

const visiblePages = computed(() => {
  const pages = []
  for (let i = 1; i <= Math.min(maxVisiblePages, totalPages.value); i++) {
    pages.push(i)
  }
  return pages
})
</script>

<style scoped>
/* Add any additional custom styles here */
.form-checkbox {
  @apply rounded border-gray-600 text-purple-600 focus:ring-purple-500;
}

/* Transitions for filter accordion */
.filter-content-enter-active,
.filter-content-leave-active {
  transition: all 0.3s ease-out;
}

.filter-content-enter-from,
.filter-content-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>