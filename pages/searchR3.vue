<template>

  <div class="nav-offset">
    <div class="container-fluid bg-gradient">

      <div class="search-page min-vh-100 ">
        <!-- Header -->
        <header class="py-4 border-bottom border-light/10">
          <div class="container">
            <div class="row align-items-center">
              <div class="col">
                <div class="search-container">
                  <div class="input-group">
                    <input v-model="searchQuery" type="search"
                      class="form-control form-control-lg bg-dark/50 text-white border-0"
                      placeholder="Search by name or keyword" @input="handleSearch" />
                    <span class="input-group-text bg-dark/50 border-0">
                      <i class="bi bi-search text-light"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="py-5">
          <div class="container">
            <div class="row g-4">
              <!-- Filters Sidebar -->
              <div class="col-lg-3">
                <div class="card bg-dark/30 border-0">
                  <div class="card-body">
                    <h5 class="text-white mb-4">Filter Results</h5>

                    <!-- Research Areas -->
                    <div class="mb-4">
                      <h6 class="text-purple mb-3">Research Areas</h6>
                      <div class="form-check mb-2" v-for="area in researchAreas" :key="area.id">
                        <input class="form-check-input" type="checkbox" :id="area.id" v-model="area.checked" />
                        <label class="form-check-label text-light" :for="area.id">
                          {{ area.name }}
                        </label>
                      </div>
                    </div>

                    <!-- Department -->
                    <div class="mb-4">
                      <h6 class="text-purple mb-3">Department</h6>
                      <select class="form-select bg-dark/50 text-white border-light/10">
                        <option value="">All Departments</option>
                        <option v-for="dept in departments" :key="dept" :value="dept">
                          {{ dept }}
                        </option>
                      </select>
                    </div>

                    <!-- Supervision -->
                    <div class="mb-4">
                      <h6 class="text-purple mb-3">Supervision</h6>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="phdSupervision"
                          v-model="filters.phdSupervision" />
                        <label class="form-check-label text-light" for="phdSupervision">
                          Available for PhD Supervision
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Results -->
              <div class="col-lg-9">
                <!-- Results Header -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h4 class="text-white m-0">
                    {{ filteredExperts.length }} Experts Found
                  </h4>
                  <div class="d-flex gap-3 align-items-center">
                    <label class="text-light">Sort by:</label>
                    <select class="form-select form-select-sm bg-dark/50 text-white border-light/10 w-auto">
                      <option value="relevance">Relevance</option>
                      <option value="name">Name</option>
                      <option value="department">Department</option>
                    </select>
                  </div>
                </div>

                <!-- Results Grid -->
                <div class="row g-4">
                  <div v-for="expert in filteredExperts" :key="expert.id" class="col-12">
                    <div class="card bg-dark/30 border-light/10 hover-card">
                      <div class="card-body p-4">
                        <div class="row g-4">
                          <div class="col-auto">
                            <div class="position-relative">
                              <img :src="expert.avatar" :alt="expert.name" class="rounded-circle expert-avatar"
                                width="100" height="100" />
                              <span v-if="expert.isSupervising" class="supervision-badge">
                                <i class="bi bi-mortarboard-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="d-flex justify-content-between">
                              <div>
                                <h5 class="text-white mb-1">{{ expert.name }}</h5>
                                <p class="text-purple mb-1">{{ expert.title }}</p>
                                <p class="text-light-purple mb-3">{{ expert.department }}</p>
                              </div>
                              <button class="btn btn-outline-purple btn-sm">
                                <i class="bi bi-diagram-3 me-2"></i>
                                View Network
                              </button>
                            </div>
                            <p class="text-light mb-3">{{ expert.bio }}</p>
                            <div class="d-flex flex-wrap gap-2">
                              <span v-for="area in expert.researchAreas" :key="area" class="badge bg-purple-dark">
                                {{ area }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pagination -->
                <nav class="mt-5">
                  <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                      <a class="page-link bg-dark/30 border-light/10 text-light" href="#">Previous</a>
                    </li>
                    <li class="page-item active">
                      <a class="page-link bg-purple border-purple text-white" href="#">1</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link bg-dark/30 border-light/10 text-light" href="#">2</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link bg-dark/30 border-light/10 text-light" href="#">3</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link bg-dark/30 border-light/10 text-light" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filters = ref({
  phdSupervision: false
})

const researchAreas = ref([
  { id: 'ai', name: 'Artificial Intelligence', checked: false },
  { id: 'biotech', name: 'Biotechnology', checked: false },
  { id: 'chemistry', name: 'Chemistry', checked: false },
  { id: 'physics', name: 'Physics', checked: false }
])

const departments = [
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics'
]

const experts = ref([
  {
    id: 1,
    name: 'Dr. John Smith',
    title: 'Associate Professor',
    department: 'Department of Computer Science',
    avatar: '/placeholder.svg',
    bio: 'Specializing in artificial intelligence and machine learning with a focus on neural networks.',
    researchAreas: ['Artificial Intelligence', 'Machine Learning'],
    isSupervising: true
  },
  // Add more experts as needed
])

const filteredExperts = computed(() => {
  return experts.value.filter(expert => {
    if (filters.value.phdSupervision && !expert.isSupervising) return false
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return (
        expert.name.toLowerCase().includes(query) ||
        expert.bio.toLowerCase().includes(query) ||
        expert.researchAreas.some(area => area.toLowerCase().includes(query))
      )
    }
    return true
  })
})

const handleSearch = () => {
  // Implement search logic
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%);
}

.bg-dark\/30 {
  background-color: rgba(33, 37, 41, 0.3);
}

.bg-dark\/50 {
  background-color: rgba(33, 37, 41, 0.5);
}

.border-light\/10 {
  border-color: rgba(255, 255, 255, 0.1);
}

.text-purple {
  color: #6b4ce6;
}

.text-light-purple {
  color: #a594e0;
}

.bg-purple {
  background-color: #6b4ce6;
}

.bg-purple-dark {
  background-color: #2d1b69;
}

.border-purple {
  border-color: #6b4ce6;
}

.btn-outline-purple {
  border-color: #6b4ce6;
  color: #6b4ce6;
}

.btn-outline-purple:hover {
  background-color: #6b4ce6;
  color: white;
}

.expert-avatar {
  object-fit: cover;
  border: 2px solid #6b4ce6;
}

.supervision-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #6b4ce6;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border: 2px solid #fff;
}

.hover-card {
  transition: transform 0.2s ease-in-out;
}

.hover-card:hover {
  transform: translateY(-2px);
}

.form-check-input:checked {
  background-color: #6b4ce6;
  border-color: #6b4ce6;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: #6b4ce6;
  border-radius: 4px;
}
</style>