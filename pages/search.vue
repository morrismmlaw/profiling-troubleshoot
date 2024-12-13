<template>
  <div class="container-fluid nav-offset">

    <div class="row">
      <div class="centered-heading shadow">
        <h1 class="heading-text-style m-1" aria-describedby="headingDescription">EXPERTS SEARCH<span
            id="headingDescription" hidden="">Find researchers at Hong kong Baptist University.</span></h1>
      </div>
    </div>

    <div class="row"
      style="background-image: url(&quot;/img/bottom.8ea92c85.jpg&quot;); background-size: cover; background-repeat: repeat; background-position: top;">
      <div class="col-md-11 col-lg-10 col-xl-9 mx-auto position-relative">
        <div class="container-fluid p-3 m-3">
            <SearchBar />
        </div>
      </div>
    </div>

    <div class="container-fluid m-1 p-1">
      <h1>Search Results</h1>
      <p>You searched for: {{ $route.query.q }}</p>
    </div>

  </div>
</template>

<script lang="ts" setup>
const searchInput = ref('')
const router = useRouter()

import SearchBar from '~/components/ui/SearchBar.vue';

</script>

<style scoped>
.centered-heading {
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-shrink: 0;

}

.heading-text-style {
  font-size: 16px;
  font-weight: 400;
  height: 42px;
  line-height: 45px;

  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
}
</style>