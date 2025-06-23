<script setup>

import { onBeforeMount } from 'vue';
import VueTypewriterEffect from "vue-typewriter-effect";

const bgS1 = ref('')
const bgS2 = ref('')
const bgS3 = ref('')
const bgM = ref('')
const bgM1 = ref('')
const bgM2 = ref('')

const authStore = useAuthStore()
const router = useRouter()

const isLoaded = ref(false);

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
  // bgM1.value = '/img/bg-pergamon-4k.jpeg'
  bgM1.value = '/img/bg-scifac-1.webp'

  const img = new Image();
  img.onload = () => {
    isLoaded.value = true;
  };
  img.src = bgM.value;
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

import SearchBarHome from '~/components/ui/SearchBarHome.vue';

</script>


<template>

  <div v-if="!isLoaded" class="loading-container nav-offset">
    <span class="loader"></span>
  </div>
  <div v-else>
    <header id="carouselExampleAutoplaying" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="overlay"></div>
      <div class="carousel-inner" style="width: 100vw;">
        <div class="carousel-item active" data-bs-interval="5000">
          <div class="overlay"></div> <!-- Add this line -->
          <img :src="bgM" class="d-block w-100 carousel-height" alt="background1">
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <div class="overlay"></div> <!-- Add this line -->
          <img :src="bgM1" class="d-block w-100 carousel-height" alt="background2">
        </div>
      </div>
      <div class="carousel-overlay"></div> <!-- Add this line -->

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
            <div class="col-xl-11 mx-auto position-relative">
              <!-- <h1 class="mb-5 bold-elegant-title">Find an Expert at Hong Kong Baptist University</h1> -->
              <h1 class="mb-5 bold-elegant-title">
                <span class="">Find an </span>
                <!-- <span class="title-typed">Expert </span> -->
                <span> <vue-typewriter-effect :strings="['Expert']" :delay="200" :pauseFor="5000" style="color: blueviolet;" /></span>
                <span class=""> at the Faculty of Science <br> Hong Kong Baptist University</span>
              </h1>
              <h3 class="mb-5 bold-elegant-sub">Your search starts here, whether you are looking for a supervisor to
                undertake a research degree, an industry expert for a specific project, or a potential partner or
                collaborator.</h3>
            </div>

            <div class="col-8 col-md-9 col-lg-9 col-xl-9 mx-auto position-relative">
              <form>
                <div class="row">
                  <div class="mb-2 mb-md-0">
                    <!-- <input class="form-control form-control-lg" type="email"
                      placeholder="Search By Name or Keyword" /> -->

                    <SearchBarHome />

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>

    <footer class="text-white bg-blue-subtle" data-v-2ddf58e4=""
      style="background-image: url(&quot;/img/bottom.8ea92c85.jpg&quot;); background-size: cover; background-repeat: no-repeat;">
      <!-- Grid container -->
      <div class="container p-4" data-v-2ddf58e4=""><!-- Section: Social media -->
        <section class="mb-4 text-center" data-v-2ddf58e4=""><a class="btn btn-outline-light btn-floating m-1"
            href="https://www.facebook.com/pages/Faculty-of-Science-HKBU/190697024296041" role="button" target="_blank"
            data-v-2ddf58e4=""><i class="fab fa-facebook-f" data-v-2ddf58e4=""></i></a><a
            class="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/hkbusci/" role="button"
            target="_blank" data-v-2ddf58e4=""><i class="fab fa-instagram" data-v-2ddf58e4=""></i></a><a
            class="btn btn-outline-light btn-floating m-1" href="https://www.twitter.com/hkbu_science" role="button"
            target="_blank" data-v-2ddf58e4=""><i class="fab fa-x-twitter" data-v-2ddf58e4=""></i></a><a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/hkbu-faculty-of-science-0039461b9" role="button" target="_blank"
            data-v-2ddf58e4=""><i class="fab fa-linkedin-in" data-v-2ddf58e4=""></i></a><a
            class="btn btn-outline-light btn-floating m-1" href="https://weibo.com/hkbuscience" role="button"
            target="_blank" data-v-2ddf58e4=""><i class="fab fa-weibo" data-v-2ddf58e4=""></i></a><a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.youtube.com/channel/UCKjUBhV5SiJ-FvLAhVVCvyQ" role="button" target="_blank"
            data-v-2ddf58e4=""><i class="fab fa-youtube" data-v-2ddf58e4=""></i></a></section>
        <!-- Section: Social media --><!-- Section: Text --><!-- <section class="mb-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
        repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
        eum harum corrupti dicta, aliquam sequi voluptate quas.
      </p>
    </section> --><!-- Section: Text --><!-- Section: Links -->
        <section class="" data-v-2ddf58e4=""><!--Grid row-->
          <div class="row" data-v-2ddf58e4=""><!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0" data-v-2ddf58e4="">
              <h5 class="text-uppercase" data-v-2ddf58e4="">About</h5>
              <ul class="list-unstyled mb-0" data-v-2ddf58e4="">
                <li data-v-2ddf58e4=""><a href="/vision-mission?lang=en" class="text-white" data-v-2ddf58e4="">Vision
                    &amp; Mission</a></li>
                <li data-v-2ddf58e4=""><a href="/deans-message?lang=en" class="text-white" data-v-2ddf58e4="">Dean's
                    Message</a></li>
                <li data-v-2ddf58e4=""><a href="/faculty-advisory-committee?lang=en" class="text-white"
                    data-v-2ddf58e4="">Faculty Advisory Committee</a></li>
                <li data-v-2ddf58e4=""><a href="/distinguished-professorship?lang=en" class="text-white"
                    data-v-2ddf58e4="">Distinguished Professorship</a></li>
                <li data-v-2ddf58e4=""><a href="/faculty-administration?lang=en" class="text-white"
                    data-v-2ddf58e4="">Faculty Administration</a></li>
                <li data-v-2ddf58e4=""><a href="/dean_office?lang=en" class="text-white" data-v-2ddf58e4="">Staff
                    List</a></li>
                <li data-v-2ddf58e4=""><a href="/pages/contact-us?lang=en" class="text-white" data-v-2ddf58e4="">Contact
                    Us</a></li>
                <li data-v-2ddf58e4="">&nbsp;</li>
              </ul>
            </div><!--Grid column--><!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0" data-v-2ddf58e4="">
              <h5 class="text-uppercase" data-v-2ddf58e4="">Department</h5>
              <ul class="list-unstyled mb-0" data-v-2ddf58e4="">
                <li data-v-2ddf58e4=""><a href="http://biol.hkbu.edu.hk/" target="_blank" class="text-white"
                    data-v-2ddf58e4="">Biology</a></li>
                <li data-v-2ddf58e4=""><a href="http://chem.hkbu.edu.hk/" target="_blank" class="text-white"
                    data-v-2ddf58e4="">Chemistry</a></li>
                <li data-v-2ddf58e4=""><a href="http://www.comp.hkbu.edu.hk/v1/?lang=en" target="_blank"
                    class="text-white" data-v-2ddf58e4="">Computer Science</a></li>
                <li data-v-2ddf58e4=""><a href="http://www.math.hkbu.edu.hk/" target="_blank" class="text-white"
                    data-v-2ddf58e4="">Mathematics</a></li>
                <li data-v-2ddf58e4=""><a href="http://physics.hkbu.edu.hk/" target="_blank" class="text-white"
                    data-v-2ddf58e4="">Physics</a></li>
                <li data-v-2ddf58e4="">&nbsp;</li>
              </ul>
            </div><!--Grid column--><!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0" data-v-2ddf58e4="">
              <h5 class="text-uppercase" data-v-2ddf58e4="">Programme</h5>
              <ul class="list-unstyled mb-0" data-v-2ddf58e4="">
                <li data-v-2ddf58e4=""><a href="/ug-programmes?lang=en" class="text-white"
                    data-v-2ddf58e4="">Undergraduate Programmes</a></li>
                <li data-v-2ddf58e4=""><a href="/taught-postgraduate-programmes?lang=en" class="text-white"
                    data-v-2ddf58e4="">Taught Postgraduate Programmes</a></li>
                <li data-v-2ddf58e4=""><a href="/research-postgraduate-programmes?lang=en" class="text-white"
                    data-v-2ddf58e4="">Research Postgraduate Programmes</a></li>
                <li data-v-2ddf58e4="">&nbsp;</li>
              </ul>
            </div><!--Grid column--><!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0" data-v-2ddf58e4="">
              <h5 class="text-uppercase" data-v-2ddf58e4="">Research</h5>
              <ul class="list-unstyled mb-0" data-v-2ddf58e4="">
                <li data-v-2ddf58e4=""><a href="/faculty-niche-research-area?lang=en" class="text-white"
                    data-v-2ddf58e4="">Faculty Niche Research Areas</a></li>
                <li data-v-2ddf58e4=""><a href="/research-impact?lang=en" class="text-white" data-v-2ddf58e4="">Research
                    Impact</a></li>
                <li data-v-2ddf58e4=""><a href="/research-spotlight?lang=en" class="text-white"
                    data-v-2ddf58e4="">Research Spotlights</a></li>
                <li data-v-2ddf58e4=""><a href="/science-insights?lang=en" class="text-white" data-v-2ddf58e4="">SCIENCE
                    Insights</a></li>
                <li data-v-2ddf58e4=""><a href="/key-research-units?lang=en" class="text-white" data-v-2ddf58e4="">Key
                    Research Units</a></li>
                <li data-v-2ddf58e4="">&nbsp;</li>
              </ul>
            </div><!--Grid column--><!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0" data-v-2ddf58e4="">
              <h5 class="text-uppercase" data-v-2ddf58e4="">News</h5>
              <ul class="list-unstyled mb-0" data-v-2ddf58e4="">
                <li data-v-2ddf58e4=""><a href="/press-releases?lang=en" class="text-white" data-v-2ddf58e4="">News</a>
                </li>
                <li data-v-2ddf58e4=""><a href="/events?lang=en" class="text-white" data-v-2ddf58e4="">Events</a></li>
                <li data-v-2ddf58e4=""><a href="/science-in-the-media?lang=en" class="text-white"
                    data-v-2ddf58e4="">HKBU SCIENCE in the Media</a></li>
                <li data-v-2ddf58e4=""><a href="/awards-achievements?lang=en" class="text-white"
                    data-v-2ddf58e4="">Awards &amp; Achievements</a></li>
                <li data-v-2ddf58e4=""><a href="/newsletters?lang=en" class="text-white"
                    data-v-2ddf58e4="">Newsletters</a></li>
                <li data-v-2ddf58e4="">&nbsp;</li>
              </ul>
            </div><!--Grid column--><!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0" data-v-2ddf58e4="">
              <h5 class="text-uppercase" data-v-2ddf58e4="">Other</h5>
              <ul class="list-unstyled mb-0" data-v-2ddf58e4="">
                <li data-v-2ddf58e4=""><a href="https://60anni.sci.hkbu.edu.hk/" target="_blank" class="text-white"
                    data-v-2ddf58e4="">60th Anniversary</a></li>
                <li data-v-2ddf58e4=""><a href="https://alumni.sci.hkbu.edu.hk/" target="_blank" class="text-white"
                    data-v-2ddf58e4="">Alumni</a></li>
                <li data-v-2ddf58e4=""><a href="https://intranet.sci.hkbu.edu.hk/index.php" target="_blank"
                    class="text-white" data-v-2ddf58e4="">Intranet</a></li>
                <li data-v-2ddf58e4="">&nbsp;</li>
              </ul>
            </div><!--Grid column-->
          </div><!--Grid row-->
        </section><!-- Section: Links -->
      </div><!-- Grid container --><!-- Copyright -->
      <div class="text-center p-3" data-v-2ddf58e4="" style="background-color: rgba(0, 0, 0, 0.4);">
        <div data-v-2ddf58e4=""><a class="text-white" href="/pages/contact-us?lang=en"
            data-v-2ddf58e4="">Enquiry</a>&nbsp;| <a class="text-white" href="/nav/sitemap?lang=en"
            data-v-2ddf58e4="">Sitemap</a>&nbsp;| <a class="text-white" href="/nav/disclaimer?lang=en"
            data-v-2ddf58e4="">Disclaimer</a>&nbsp;| <a class="text-white"
            href="https://www.hkbu.edu.hk/eng/about/privacy.jsp" target="_blank" data-v-2ddf58e4="">Privacy Policy</a>
        </div> All rights reserved © 2024 Faculty of Science, HKBU
      </div><!-- Copyright -->
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

.overlay {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
  /* Darker gradient */
}

.bold-elegant-title {
  font-size: 43px;
  font-weight: bold;
  font-family: 'Arial Black', Gadget, sans-serif;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .title-typed {
    color: blueviolet;
  }

}

.cursor {
  color: white;
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
  width: 100vw;

  object-fit: cover;
  object-position: top;
}

.carousel-text {
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 100vw;
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

#my-search-input,
svg {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  transition: background-position 5s ease;
  /* Adjust the duration (0.5s) to change the transition time */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.loader {
  width: 100px;
  height: 100px;
  border: 10px solid #FFF;
  border-bottom-color: #FF3D00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>