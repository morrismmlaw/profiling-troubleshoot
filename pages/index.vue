<script setup>

import { onBeforeMount } from 'vue';

//Background Image imports. - These CASUE SSR PROBLEM!!! - Either change it OR turn SSr = false.
import bgS1 from '~/assets/img/bg-showcase-1.jpg';
import bgS2 from '~/assets/img/bg-showcase-2.jpg';
import bgS3 from '~/assets/img/bg-showcase-3.jpg';
import bgM from '~/assets/img/bg-masthead.jpg';

const authStore = useAuthStore()
const router = useRouter()

// let bgS1, bgS2, bgS3, bgM;
// bgS1 = url('~@/assets/img/bg-showcase-1.jpg');
// bgS2 = url('~@/assets/img/bg-showcase-2.jpg');
// bgS3 = url('~@/assets/img/bg-showcase-3.jpg');
// bgM = url('~@/assets/img/bg-masthead.jpg');

onBeforeMount(() => {

  console.log("On before Mount")

  //Loading customized CSS from Bootstrap Studio
  // import('/assets/bootstrap/css/bootstrap.min.css');
  // import ('/assets/css/animate.min.css');
  // import ('/assets/css/Login-Form-Basic-icons.css');

  // import ('/assets/fonts/font-awesome.min.css'); // Use Either One for ICON. */
  // import ('@fortawesome/fontawesome-free/css/all.min.css'); 
})

onMounted(() => {
  authStore.initializeFromStorage()
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
    <!-- <h1> Hello World</h1> -->
    <!-- <a class="btn btn-info ms-auto me-2 shadow" role="button" href="/test">Test</a> -->

    <!-- <nav class="navbar navbar-expand bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">HKBU Science Faculty Academic Profile</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"></button>
        <div id="navcol-1" class="collapse navbar-collapse">
          <a class="btn btn-info ms-auto" role="button" href="/profile">Profiles</a>
        </div>
        <a class="btn btn-primary ms-auto" role="button" href="/login">Sign In</a>
      </div>
    </nav> -->

    <nav class="navbar navbar-expand bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">HKBU Science Faculty Academic Profile</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"></button>
        <div id="navcol-1" class="collapse navbar-collapse">
          <!-- <a class="btn btn-info ms-auto me-2 shadow" role="button" href="/test">Test</a> -->
          <a class="btn btn-info ms-auto me-2 shadow" role="button" href="/profile">Profile</a>
          <a class="btn btn-info me-2 shadow" role="button" href="/profileVueForm">Profile New</a>
          <a v-if="isLoggedIn" class="btn btn-danger shadow" role="button" @click="logout">Log Out</a>
          <a v-else class="btn btn-outline-primary shadow" role="button" href="/login">Sign In</a>
        </div>
      </div>
    </nav>


    <header class="text-center text-white masthead" style="no-repeat center center;background-size: cover;"
      :style="{ backgroundImage: `url(${bgM})` }">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto position-relative">
            <h1 class="mb-5">Build a landing page for your business or project and generate more leads!</h1>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
            <form>
              <div class="row">
                <div class="col-12 col-md-9 mb-2 mb-md-0"><input class="form-control form-control-lg" type="email"
                    placeholder="Enter your email..." /></div>
                <div class="col-12 col-md-3"><button class="btn btn-primary btn-lg" type="submit">Sign up!</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
    <section class="text-center bg-light features-icons">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
              <div class="d-flex features-icons-icon">
                <i class="fas fa-desktop m-auto text-primary"></i>
              </div>
              <h3>Fully Responsive</h3>
              <p class="icon-screen-desktop mb-0">This theme will look great on any device, no matter the size!</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
              <div class="d-flex features-icons-icon">
                <i class="fa-solid fa-layer-group m-auto text-primary"></i>
              </div>
              <h3>Bootstrap 5 Ready Test MSG</h3>
              <p class="lead mb-0">Featuring the latest build of the new Bootstrap 5 framework!</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
              <div class="d-flex features-icons-icon">
                <i class="fas fa-check m-auto text-primary"></i>
              </div>
              <h3>Easy to Use</h3>
              <p class="lead mb-0">Ready to use with your own content, or customize the source files!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="showcase">
      <div class="container-fluid p-0">
        <div class="row g-0">
          <div class="col-lg-6 text-white order-lg-2 showcase-img" :style="{ backgroundImage: `url(${bgS1})` }">
            <span></span>
          </div>
          <div class="col-lg-6 my-auto order-lg-1 showcase-text">
            <h2>Fully Responsive Design</h2>
            <p class="lead mb-0">When you use a theme created with Bootstrap, you know that the theme will look great
              on
              any device, whether it&#39;s a phone, tablet, or desktop the page will behave responsively!</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-lg-6 text-white showcase-img" :style="{ backgroundImage: `url(${bgS2})` }">
            <span></span>
          </div>
          <div class="col-lg-6 my-auto order-lg-1 showcase-text">
            <h2>Updated For Bootstrap 5</h2>
            <p class="lead mb-0">Newly improved, and full of great utility classes, Bootstrap 5 is leading the way in
              mobile responsive web development! All of the themes are now using Bootstrap 5!</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-lg-6 text-white order-lg-2 showcase-img" :style="{ backgroundImage: `url(${bgS3})` }">
            <span></span>
          </div>
          <div class="col-lg-6 my-auto order-lg-1 showcase-text">
            <h2>Easy to Use &amp; Customize</h2>
            <p class="lead mb-0">Landing Page is just HTML and CSS with a splash of SCSS for users who demand some
              deeper customization options. Out of the box, just add your content and images, and your new landing
              page
              will be ready to go!</p>
          </div>
        </div>
      </div>
    </section>
    <section class="text-center bg-light testimonials">
      <div class="container">
        <h2 class="mb-5">What people are saying...</h2>
        <div class="row">
          <div class="col-lg-4">
            <div class="mx-auto testimonial-item mb-5 mb-lg-0"><img class="rounded-circle img-fluid mb-3"
                src="/assets/img/testimonials-1.jpg" />
              <h5>Margaret E.</h5>
              <p class="fw-light mb-0">&quot;This is fantastic! Thanks so much guys!&quot;</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mx-auto testimonial-item mb-5 mb-lg-0"><img class="rounded-circle img-fluid mb-3"
                src="/assets/img/testimonials-2.jpg" />
              <h5>Fred S.</h5>
              <p class="fw-light mb-0">&quot;Bootstrap is amazing. I&#39;ve been using it to create lots of super nice
                landing pages.&quot;</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mx-auto testimonial-item mb-5 mb-lg-0"><img class="rounded-circle img-fluid mb-3"
                src="/assets/img/testimonials-3.jpg" />
              <h5>Sarah W.</h5>
              <p class="fw-light mb-0">&quot;Thanks so much for making these free resources available to us!&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="text-center text-white call-to-action" style="no-repeat center center;background-size: cover;"
      :style="{ backgroundImage: `url(${bgM})` }">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto position-relative">
            <h2 class="mb-4">Ready to get started? Sign up now!</h2>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
            <form>
              <div class="row">
                <div class="col-12 col-md-9 mb-2 mb-md-0"><input class="form-control form-control-lg" type="email"
                    placeholder="Enter your email..." /></div>
                <div class="col-12 col-md-3"><button class="btn btn-primary btn-lg" type="submit">Sign up!</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <footer class="bg-light footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 text-center text-lg-start my-auto h-100">
            <ul class="list-inline mb-2">
              <li class="list-inline-item"><a href="#">About</a></li>
              <li class="list-inline-item"><span>⋅</span></li>
              <li class="list-inline-item"><a href="#">Contact</a></li>
              <li class="list-inline-item"><span>⋅</span></li>
              <li class="list-inline-item"><a href="#">Terms of  Use</a></li>
              <li class="list-inline-item"><span>⋅</span></li>
              <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
            </ul>
            <p class="text-muted small mb-4 mb-lg-0">© HKBU Science Faculty 2024. All Rights Reserved.</p>
          </div>
          <div class="col-lg-6 text-center text-lg-end my-auto h-100">
            <ul class="list-inline mb-0">
              <li class="list-inline-item"><a href="#"><i class="fa fa-facebook fa-2x fa-fw"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-twitter fa-2x fa-fw"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-instagram fa-2x fa-fw"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    <!-- <div class="container-fluid bg-light min-vh-100">
    <div class="row justify-content-center py-6">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div v-if="!authStore.isAuthenticated">
          <h2 class="text-center mb-4">Login</h2>
          <LoginForm @success="handleLoginSuccess" @error="handleLoginError" />
        </div>
        <div v-else>
          <h2 class="text-center mb-4">Welcome, {{ authStore.user.attributes.name }}</h2>
          <div class="d-flex justify-content-center">
            <NuxtLink to="/profile" class="btn btn-primary mr-2">
              View Profile
            </NuxtLink>
            <button @click="handleLogout" class="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  </div>
</template>


<style>
/* @import url('/assets/bootstrap/css/bootstrap.min.css'); */
/* @import url('/assets/css/animate.min.css'); */
/* @import url('/assets/css/Login-Form-Basic-icons.css'); */

/* @import url('/assets/fonts/font-awesome.min.css'); // Use Either One for ICON. */
/* @import url('@fortawesome/fontawesome-free/css/all.min.css'); */

.shadow {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}
</style>