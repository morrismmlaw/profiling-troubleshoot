<template>
  <div class="container-fluid nav-offset">

    <div class="row">
      <div class="centered-heading shadow">
        <h1 class="heading-text-style m-1" aria-describedby="headingDescription">EXPERTS SEARCH<span
            id="headingDescription" hidden="">Find researchers at Hong kong Baptist University.</span></h1>
      </div>
    </div>

    <div class="row"
      style="background-image: url(&quot;/img/bottom.8ea92c85.jpg&quot;); background-size: cover; background-repeat: no-repeat;">
      <div class="col-md-11 col-lg-10 col-xl-9 mx-auto position-relative">

        <div class="container-fluid p-3 m-3">
          <form @submit.prevent="handleSearch">
            <div id="myInputSearch"
              style="margin-left: 1px;background: var(--bs-light);border-radius: 41px;/*box-shadow: inset 1px 1px 5px 1px;*/margin-top: 2px;height: 53px;border-width: thin;border-style: solid;">
              <label class="form-label" style="width: 100%;margin-top: 0px;">
                <NuxtLink to="/search" @click="handleSearch">
                  <svg class="text-black" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                    viewBox="0 0 24 24" fill="none"
                    style="margin-left: 14px;font-size: 30px;margin-top: -3px;color: var(--bs-secondary);">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                      fill="currentColor"></path>
                  </svg>
                </NuxtLink>
                <input @keyup.enter="handleSearch" v-model="searchInput" id="my-search-input" type="search"
                  style="margin-left: 7px;margin-top: 4px;width: calc(100% - 100px);border-style: none;background: var(--bs-light);height: 45px;font-size: 20px;font-family: Abel, sans-serif;"
                  placeholder="Search by name or keyword" />
                <div class="dropdown">
                  <!-- <i class="bi bi-list dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                          </i> -->
                  <svg class="text-black dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                    style="font-size: 30px;margin-top: -4px;color: var(--bs-secondary);margin-left: 8px;">
                    <path
                      d="M2 5.99519C2 5.44556 2.44556 5 2.99519 5H11.0048C11.5544 5 12 5.44556 12 5.99519C12 6.54482 11.5544 6.99039 11.0048 6.99039H2.99519C2.44556 6.99039 2 6.54482 2 5.99519Z"
                      fill="currentColor"></path>
                    <path
                      d="M2 11.9998C2 11.4501 2.44556 11.0046 2.99519 11.0046H21.0048C21.5544 11.0046 22 11.4501 22 11.9998C22 12.5494 21.5544 12.9949 21.0048 12.9949H2.99519C2.44556 12.9949 2 12.5494 2 11.9998Z"
                      fill="currentColor"></path>
                    <path
                      d="M2.99519 17.0096C2.44556 17.0096 2 17.4552 2 18.0048C2 18.5544 2.44556 19 2.99519 19H15.0048C15.5544 19 16 18.5544 16 18.0048C16 17.4552 15.5544 17.0096 15.0048 17.0096H2.99519Z"
                      fill="currentColor"></path>
                  </svg>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item disabled" href="#">Search Option</a></li>
                    <li><a class="dropdown-item" href="#">Free text search</a></li>
                    <li><a class="dropdown-item" href="#">Tag based search</a></li>
                  </ul>
                </div>
              </label>
            </div>
          </form>
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

const handleSearch = () => {
  console.log("Clicked Search:", searchInput.value)
  router.push({
    path: '/search',
    query: { q: searchInput.value }
  })
}


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