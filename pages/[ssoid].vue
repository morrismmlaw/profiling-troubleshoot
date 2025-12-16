<script setup>

const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()
const route = useRoute()
const hasChangedImage = ref(false);

const from = route.query.from
const ssoid = route.params.ssoid


const searchMode = () => {
  console.log('2', from); // undefined
  console.log('3', ssoid); // undefined
  return true;
}

const componentKey = ref(0);
// location.reload(0);
const isLoading = ref(true);

onMounted(async () => {
  console.log('[ssoid.vue] SSOID', ssoid)
  console.log('1', from); // undefined

  if (searchMode()) {
    console.log('IN Search MODE')
    const sucess = await authStore.setProfile(ssoid);
    //Wait data loading then load the form component.
    if (sucess) {
      isLoading.value = false;
    }
  } else if (UATMode()) {
    console.log('IN UAT MODE')
    const sucess = await authStore.setProfile(authStore.user.attributes.ssoid);
    //Wait data loading then load the form component.
    if (sucess) {
      isLoading.value = false;
    }
  } 

  authStore.initializeFromStorage()
});

const checkedForm = ref(false);

const handleCheck = () => {
  checkedForm.value = !checkedForm.value;
}

watch(checkedForm, (newVal) => {
  console.log('Form Changed', newVal);
})

</script>

<template>

  <div class="nav-offset">
    <div class="bg-light custom-background">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            <div>
              <div class="mt-3">
                <ProfileForm :key="componentKey" v-if="!isLoading" :profile="authStore.user"
                  :collections="authStore.collections" @save="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.custom-background {
  background-image: url('https://play.tailwindcss.com/img/beams.jpg');
  background-size: cover;
  /* background-position: center; */

  min-height: calc(100vh - var(--margin-offset));
}

.modal-title {
  font-family: var(--font-family);
  font-style: italic;
  font-size: 1.4rem;
  line-height: 1.8;
}

.profile-modal-message {
  font-family: var(--font-family);
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.5;
}
</style>
