<template>
  <div class="landing-page">
    <!-- Animated background -->
    <div class="cosmic-background"></div>
    
    <!-- Main content -->
    <div class="content-wrapper d-flex align-items-center min-vh-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <!-- Logo -->
            <img 
              src="\img\bu-logo.d3e1d17a.png" 
              alt="University Logo" 
              class="mb-5 logo"
              :class="{ 'logo-small': isSearching }"
            />
            
            <!-- Heading -->
            <h1 
              class="display-3 text-white mb-4 fw-bold main-title"
              :class="{ 'title-small': isSearching }"
            >
              Find an Expert at Deakin University
            </h1>
            
            <!-- Subtitle -->
            <p 
              class="lead text-light mb-5 subtitle"
              :class="{ 'd-none': isSearching }"
            >
              Your search starts here, whether you are looking for a supervisor to undertake a 
              research degree, an industry expert for a specific project, or a potential partner or collaborator.
            </p>
            
            <!-- Search Form -->
            <div class="search-container" :class="{ 'search-top': isSearching }">
              <form @submit.prevent="handleSearch" class="search-form">
                <div class="input-group input-group-lg shadow">
                  <input 
                    v-model="searchQuery"
                    type="search" 
                    class="form-control border-0 py-3"
                    placeholder="Search by name, expertise, or research area"
                    :class="{ 'rounded-0': isSearching }"
                  />
                  <button 
                    class="btn btn-primary px-4 d-flex align-items-center gap-2"
                    type="submit"
                  >
                    <i class="bi bi-search"></i>
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Search Results -->
            <transition name="fade">
              <div v-if="isSearching" class="search-results mt-4">
                <div class="text-start">
                  <!-- Filters Row -->
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="dropdown">
                      <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Filter Results
                      </button>
                      <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" href="#">Research Area</a></li>
                        <li><a class="dropdown-item" href="#">Faculty</a></li>
                        <li><a class="dropdown-item" href="#">Expertise</a></li>
                      </ul>
                    </div>
                    <span class="text-light">Showing results for: "{{ searchQuery }}"</span>
                  </div>
                  
                  <!-- Results Grid -->
                  <div class="row g-4">
                    <!-- Example Result Card -->
                    <div class="col-md-6">
                      <div class="card bg-dark border-purple h-100">
                        <div class="card-body">
                          <div class="d-flex gap-3">
                            <div class="expert-image">
                              <img src="\img\bu-logo.d3e1d17a.png" alt="Expert" class="rounded-circle" width="80" height="80" />
                            </div>
                            <div>
                              <h5 class="card-title text-white mb-1">Dr. Sarah Johnson</h5>
                              <p class="text-purple mb-2">Professor of Computer Science</p>
                              <p class="card-text text-light small">Expert in Artificial Intelligence and Machine Learning</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Add more result cards here -->
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const isSearching = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    isSearching.value = true
  }
}
</script>

<style scoped>
/* Custom Variables */
:root {
  --purple-dark: #2d1b69;
  --purple-light: #6b4ce6;
}

/* Cosmic Background */
.cosmic-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom right, #1a1a2e, #2d1b69);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  z-index: -1;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Content Styling */
.content-wrapper {
  position: relative;
  padding: 2rem 0;
}

.logo {
  width: 200px;
  transition: all 0.5s ease;
}

.logo-small {
  width: 120px;
}

.main-title {
  transition: all 0.5s ease;
}

.title-small {
  font-size: 2rem !important;
  margin-bottom: 1rem !important;
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
  transition: all 0.5s ease;
}

.search-top {
  max-width: 100%;
}

.search-form {
  position: relative;
}

/* Custom Button Styling */
.btn-primary {
  background-color: var(--purple-light);
  border-color: var(--purple-light);
}

.btn-primary:hover {
  background-color: var(--purple-dark);
  border-color: var(--purple-dark);
}

/* Card Styling */
.border-purple {
  border-color: var(--purple-dark);
}

.text-purple {
  color: var(--purple-light);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Expert Image */
.expert-image img {
  object-fit: cover;
  border: 2px solid var(--purple-light);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style>