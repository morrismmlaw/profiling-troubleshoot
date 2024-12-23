<template>
  <div class="card bg-dark border-purple h-100 expert-card">
    <div class="card-body p-4">
      <div class="row g-4">
        <!-- Expert Image Column -->
        <div class="col-auto">
          <div class="expert-image position-relative">
            <img :src="expert.avatar || '/placeholder.svg'" :alt="expert.name" class="rounded-circle expert-avatar"
              width="120" height="120" />
            <div v-if="expert.isAvailableForSupervision" class="supervision-badge">
              <i class="bi bi-mortarboard-fill"></i>
            </div>
          </div>
        </div>

        <!-- Expert Info Column -->
        <div class="col">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h3 class="card-title text-white mb-1">{{ expert.name }}</h3>
              <p class="text-purple mb-0">{{ expert.title }}</p>
              <p class="text-light-purple mb-2">{{ expert.faculty }}</p>
            </div>
            <button @click="$emit('view-network', expert.id)"
              class="btn btn-outline-purple btn-sm d-flex align-items-center gap-2">
              <i class="bi bi-diagram-3"></i>
              View network
            </button>
          </div>

          <!-- Expert Bio -->
          <p class="card-text text-light mb-4">{{ expert.bio }}</p>

          <!-- Research Fields -->
          <div class="mb-3">
            <h6 class="text-white mb-2">Fields of Research (2020):</h6>
            <div class="d-flex flex-wrap gap-2">
              <span v-for="field in expert.fields" :key="field" class="badge bg-purple-dark">
                {{ field }}
              </span>
            </div>
          </div>

          <!-- Department Info -->
          <div class="expert-footer">
            <div class="row align-items-center">
              <div class="col-md-8">
                <p class="text-light-purple mb-0">
                  <i class="bi bi-building me-2"></i>
                  {{ expert.department }}
                </p>
              </div>
              <div class="col-md-4 text-md-end mt-2 mt-md-0">
                <button @click="$emit('contact', expert.id)" class="btn btn-purple btn-sm">
                  Contact Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ResearchField {
  name: string;
  code?: string;
}

interface Expert {
  id: number;
  name: string;
  title: string;
  faculty: string;
  department: string;
  avatar?: string;
  bio: string;
  fields: string[];
  isAvailableForSupervision: boolean;
}

// Props definition
const props = defineProps<{
  expert: Expert
}>()

// Emits definition
defineEmits<{
  'view-network': [id: number]
  'contact': [id: number]
}>()
</script>

<style scoped>
/* Custom Variables */
:root {
  --purple-dark: #2d1b69;
  --purple-light: #6b4ce6;
  --purple-hover: #5a3fd1;
}

/* Card Styling */
.expert-card {
  transition: transform 0.2s ease-in-out;
  border-color: var(--purple-dark);
}

.expert-card:hover {
  transform: translateY(-2px);
}

/* Expert Avatar */
.expert-avatar {
  object-fit: cover;
  border: 3px solid var(--purple-light);
  transition: all 0.3s ease;
}

.expert-image {
  position: relative;
}

/* Supervision Badge */
.supervision-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--purple-light);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

/* Custom Colors */
.text-purple {
  color: var(--purple-light) !important;
}

.text-light-purple {
  color: #a594e0 !important;
}

.bg-purple-dark {
  background-color: var(--purple-dark) !important;
}

/* Custom Buttons */
.btn-purple {
  background-color: var(--purple-light);
  color: white;
  border: none;
}

.btn-purple:hover {
  background-color: var(--purple-hover);
  color: white;
}

.btn-outline-purple {
  border-color: var(--purple-light);
  color: var(--purple-light);
}

.btn-outline-purple:hover {
  background-color: var(--purple-light);
  color: white;
}

/* Badge Styling */
.badge {
  padding: 0.5em 1em;
  font-weight: 500;
}

/* Expert Footer */
.expert-footer {
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>