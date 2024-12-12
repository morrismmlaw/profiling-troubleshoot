<script setup>

import { onBeforeMount } from 'vue';

const bgS1 = ref('')
const bgS2 = ref('')
const bgS3 = ref('')
const bgM = ref('')
const bgM1 = ref('')
const bgM2 = ref('')

const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(async () => {
  console.log("On before Mount")
})

onMounted(async () => {
  authStore.initializeFromStorage()

  bgS1.value = '/img/bg-showcase-1.jpg'
  bgS2.value = '/img/bg-showcase-2.jpg'
  bgS3.value = '/img/bg-showcase-3.jpg'

  // bgM.value = '/img/bg-masthead.jpg' //Water Background
  // bgM.value = '/img/bg-scifac-1.webp'
  // bgM.value = '/img/bg-pergamon.jpg'

  // bgM.value = '/img/bg-inno.jpg'
  // bgM.value = '/img/bg-scifac-2.jpg'
  bgM.value = '/img/bg-scifac-2-4k.jpeg'
  bgM1.value = '/img/bg-pergamon-4k.jpeg'

})

const handleLoginSuccess = () => {
  router.push('/profile')
}

const handleLoginError = () => {
  alert('Invalid SSOID')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const isLoggedIn = computed(() => authStore.isAuthenticated);

const logout = () => {
  authStore.logout();
};

</script>


<template>

  <div id="app">
    <header id="carouselExampleAutoplaying" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="overlay"></div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="5000">
          <img :src="bgM" class="d-block w-100 carousel-height" alt="background1">
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img :src="bgM1" class="d-block w-100 carousel-height" alt="background2">
        </div>
      </div>
      <button class="carousel-control-prev z-2" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next z-2" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>

      <div class="carousel-text">
        <div class="container">
          <div class="row">
            <div class="col-xl-9 mx-auto position-relative">
              <h1 class="mb-5 bold-elegant-title">Find an Expert at Hong Kong Baptist University</h1>
              <h3 class="mb-5 bold-elegant-sub">Your search starts here, whether you are looking for a supervisor to
                undertake a research degree, an industry expert for a specific project, or a potential partner or
                collaborator.</h3>
            </div>

            <div class="col-md-11 col-lg-10 col-xl-9 mx-auto position-relative">
              <form>
                <div class="row">
                  <div class="col-12 mb-2 mb-md-0">
                    <!-- <input class="form-control form-control-lg" type="email"
                      placeholder="Search By Name or Keyword" /> -->

                    <div id="myInputSearch"
                      style="margin-left: 1px;background: var(--bs-secondary-bg);border-radius: 41px;"><label
                        class="form-label" style="width: 100%;"><svg class="bi bi-search"
                          xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                          viewBox="0 0 16 16" style="margin-left: 14px;font-size: 20px;margin-top: -6px;">
                          <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                          </path>
                        </svg><input id="my-search-input" type="search" placeholder="Search by name or keyword"
                          style="margin-left: 12px;margin-top: 10px;width: calc(100% - 95px);border-style: none;background: rgb(233,236,239);" /><svg
                          xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                          style="margin-left: 12px;font-size: 28px;">
                          <path
                            d="M2 5.99519C2 5.44556 2.44556 5 2.99519 5H11.0048C11.5544 5 12 5.44556 12 5.99519C12 6.54482 11.5544 6.99039 11.0048 6.99039H2.99519C2.44556 6.99039 2 6.54482 2 5.99519Z"
                            fill="currentColor"></path>
                          <path
                            d="M2 11.9998C2 11.4501 2.44556 11.0046 2.99519 11.0046H21.0048C21.5544 11.0046 22 11.4501 22 11.9998C22 12.5494 21.5544 12.9949 21.0048 12.9949H2.99519C2.44556 12.9949 2 12.5494 2 11.9998Z"
                            fill="currentColor"></path>
                          <path
                            d="M2.99519 17.0096C2.44556 17.0096 2 17.4552 2 18.0048C2 18.5544 2.44556 19 2.99519 19H15.0048C15.5544 19 16 18.5544 16 18.0048C16 17.4552 15.5544 17.0096 15.0048 17.0096H2.99519Z"
                            fill="currentColor"></path>
                        </svg></label>
                      </div>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>

    <footer>
      <div class="container py-4 py-lg-5">
        <div class="row justify-content-center">
          <div class="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
            <h3 class="fs-6 footer-title">CONTACT <br> Hong Kong Baptist University</h3>
            <ul class="list-unstyled">
              <li><nuxt-img src="/img/HKBU.jpg" alt="Uni Logo" /></li>
              <li><a class="link-secondary" href="#">0000 0000</a></li>
              <li><a class="link-secondary" href="#">enquire@hkbu.edu.hk</a></li>
              <li><a class="link-secondary" href="#">Locations</a></li>
            </ul>
          </div>
          <div class="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
            <h3 class="fs-6 footer-title">About</h3>
            <ul class="list-unstyled">
              <li><a class="link-secondary" href="#">Company</a></li>
              <li><a class="link-secondary" href="#">Team</a></li>
              <li><a class="link-secondary" href="#">Legacy</a></li>
            </ul>
          </div>
          <div class="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
            <h3 class="fs-6 footer-title">Careers</h3>
            <ul class="list-unstyled">
              <li><a class="link-secondary" href="#">Job openings</a></li>
              <li><a class="link-secondary" href="#">Employee success</a></li>
              <li><a class="link-secondary" href="#">Benefits</a></li>
            </ul>
          </div>
          <div
            class="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last item social">
            <div class="fw-bold d-flex align-items-center mb-2"><span
                class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2"><svg
                  class="bi bi-bezier" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                  viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z">
                  </path>
                  <path
                    d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z">
                  </path>
                </svg></span><span class="footer-title">Brand</span></div>
            <p class="text-muted copyright">Sem eleifend donec molestie, integer quisque orci aliquam.</p>
          </div>
        </div>
        <hr />
        <div class="d-flex justify-content-between align-items-center pt-3">
          <p class="text-muted mb-0">Copyright © 2024 Hong Kong Baptist University</p>
          <ul class="list-inline mb-0">
            <li class="list-inline-item"><svg class="bi bi-facebook" xmlns="http://www.w3.org/2000/svg" width="1em"
                height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path
                  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951">
                </path>
              </svg></li>
            <li class="list-inline-item"><svg class="bi bi-twitter" xmlns="http://www.w3.org/2000/svg" width="1em"
                height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path
                  d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15">
                </path>
              </svg></li>
            <li class="list-inline-item"><svg class="bi bi-instagram" xmlns="http://www.w3.org/2000/svg" width="1em"
                height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334">
                </path>
              </svg></li>
          </ul>
        </div>
      </div>
    </footer>

  </div>
</template>


<style scoped>
/* @import url('/assets/bootstrap/css/bootstrap.min.css'); */
/* @import url('/assets/css/animate.min.css'); */
/* @import url('/assets/css/Login-Form-Basic-icons.css'); */

/* // Use Either One for ICON. */
/* @import url('/assets/fonts/font-awesome.min.css');  */
/* @import url('@fortawesome/fontawesome-free/css/all.min.css'); */

.shadow {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.bold-elegant-title {
  font-size: 43px;
  font-weight: bold;
  font-family: 'Arial Black', Gadget, sans-serif;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bold-elegant-sub {
  font-size: 19px;
  font-weight: lighter;
  font-family: popins, sans-serif;
  line-height: 1.5;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.carousel-height {
  height: var(--height-offset);
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1;
}

.carousel-text .container {
  max-width: 1200px;
}

.carousel-text h1,
.carousel-text h3 {
  color: #fff;
  text-align: center;
}

.footer-title {
  font-size: 19px;
  font-weight: 400;
  letter-spacing: .76px;
  line-height: 23px;

  color: blueviolet;
}
</style>