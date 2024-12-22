<template>
  <div class="nav-offset">
    <div class="min-vh-100 bg-dark">
      <!-- Header -->
      <header class="bg-dark border-bottom border-secondary">
        <div class="container py-4">
          <h1 class="text-white mb-4">EXPERTS SEARCH</h1>
          <div class="input-group mb-3">
            <input v-model="searchQuery" type="search" class="form-control bg-dark text-white border-secondary"
              placeholder="Search experts..." aria-label="Search experts" />
            <span class="input-group-text bg-dark border-secondary">
              <i class="bi bi-search text-secondary"></i>
            </span>
          </div>
        </div>
      </header>

      <div class="container py-4">
        <div class="row">
          <!-- Filters -->
          <aside class="col-md-3 mb-4">
            <h2 class="text-white mb-3">Filter by</h2>
            <div class="accordion" id="filterAccordion">
              <div v-for="(filter, index) in filters" :key="index" class="accordion-item bg-dark border-secondary">
                <h2 class="accordion-header" :id="'heading' + index">
                  <button class="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#collapse' + index" :aria-expanded="filter.isOpen"
                    :aria-controls="'collapse' + index">
                    {{ filter.name }}
                  </button>
                </h2>
                <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index"
                  data-bs-parent="#filterAccordion">
                  <div class="accordion-body text-white">
                    <div v-for="option in filter.options" :key="option" class="form-check">
                      <input class="form-check-input" type="checkbox" :id="option">
                      <label class="form-check-label" :for="option">
                        {{ option }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- Results -->
          <main class="col-md-9">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <select v-model="sortBy" class="form-select bg-dark text-white border-secondary w-auto">
                <option value="relevance">Sort by: Relevance</option>
                <option value="name">Sort by: Name</option>
                <option value="department">Sort by: Department</option>
              </select>
              <p class="text-secondary mb-0">1-25 out of 816</p>
            </div>

            <div class="row g-4">
              <!-- Expert Card -->
              <div v-for="expert in experts" :key="expert.id" class="col-12">
                <div class="card bg-dark border-secondary">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-3 mb-3 mb-md-0">
                        <img :src="expert.avatar" :alt="expert.name" class="img-fluid rounded-circle" />
                      </div>
                      <div class="col-md-9">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h3 class="card-title text-white">{{ expert.name }}</h3>
                            <p class="text-purple mb-0">{{ expert.title }} • {{ expert.faculty }}</p>
                          </div>
                          <button class="btn btn-outline-secondary btn-sm">
                            <i class="bi bi-diagram-3 me-2"></i>
                            View network
                          </button>
                        </div>
                        <p class="card-text text-light">{{ expert.bio }}</p>
                        <div class="mt-3">
                          <p class="text-secondary mb-1">
                            <strong class="text-white">Fields of Research (2020):</strong>
                            {{ expert.fields.join(' • ') }}
                          </p>
                          <p class="text-secondary mb-0">
                            <strong class="text-white">Department/School/Institute:</strong>
                            {{ expert.department }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <nav aria-label="Expert search results pages" class="mt-4">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link bg-dark border-secondary text-white" href="#"
                    @click.prevent="currentPage--">Previous</a>
                </li>
                <li v-for="page in visiblePages" :key="page" class="page-item"
                  :class="{ active: currentPage === page }">
                  <a class="page-link bg-dark border-secondary text-white" href="#"
                    @click.prevent="currentPage = page">{{ page }}</a>
                </li>
                <li v-if="totalPages > maxVisiblePages" class="page-item disabled">
                  <span class="page-link bg-dark border-secondary text-white">...</span>
                </li>
                <li v-if="totalPages > maxVisiblePages" class="page-item">
                  <a class="page-link bg-dark border-secondary text-white" href="#"
                    @click.prevent="currentPage = totalPages">{{ totalPages }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link bg-dark border-secondary text-white" href="#"
                    @click.prevent="currentPage++">Next</a>
                </li>
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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
.text-purple {
  color: #8a2be2;
}

/* Custom styles for dark theme accordion */
.accordion-button:not(.collapsed) {
  color: #fff;
  background-color: #343a40;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, .125);
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-button::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}
</style>