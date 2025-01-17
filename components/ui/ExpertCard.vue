<template>
  <div>

    <div>
      <div class="container">
        <div class="row shadow-sm mb-2 rounded" style="margin-top: 5px;">
          <div class="col-md-3 col-lg-3 col-xxl-3" style="padding-top: 29px;">
            <div style="padding: 30px;padding-top: 0px;margin-right: 0px;margin-top: 10px;margin-left: -20px;">

              <div class="profile-card">
                <NuxtImg :src="props.profile.photoURL" class="expert-card-image"></NuxtImg>
              </div>

              <!-- <svg
                  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                  style="font-size: 180px;border-radius: 80px;">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                    fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                    fill="currentColor"></path>
                </svg> -->

              <label class="form-label" style="padding-left: 35px;padding-top: 7px;"><svg class="bi bi-hdd-network"
                  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
                  style="font-size: 20px;margin-right: 5px;">
                  <path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"></path>
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5">
                  </path>
                </svg>
                <a href="#" style="padding: 4px;font-weight: bold;font-size: 12px;">View Network</a>
              </label>

            </div>
          </div>
          <div class="col-md-8">
            <div>
              <div class="row">
                <div class="col" style="margin-top: 5px">
                  <div>
                    <h1 style="font-size: 19px;line-height: 20px;"> {{ props.profile.name }} </h1>
                    <div class="row">
                      <div class="col-auto">
                        <label class="form-label" style="margin-right: 5px;"><svg class="bi bi-book"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                            viewBox="0 0 16 16"
                            style="font-size: 22px;margin: 0px;margin-right: 5px;width: 20px;height: 20px;">
                            <path
                              d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783">
                            </path>
                          </svg><sub
                            style="font-size: 13px;height: auto;padding: 0px;padding-top: 0px;padding-bottom: 0px;">
                            {{ props.profile.post }}</sub></label>
                      </div>
                      <div class="col">
                        <label class="form-label"><svg class="bi bi-star-fill" xmlns="http://www.w3.org/2000/svg"
                            width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
                            style="font-size: 22px;margin: 0px;margin-right: 5px;width: 20px;height: 20px;">
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                            </path>
                          </svg><sub
                            style="font-size: 13px;height: auto;padding: 0px;padding-top: 0px;padding-bottom: 0px;">
                            {{ props.profile.unit }}</sub></label>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <!-- <div>
                    <div style="padding-bottom: 5px;"><sub style="font-size: 11px;">Biography: {{
                      props.profile.biography }}</sub></div>
                  </div> -->
                  <div>
                    <div style="padding-bottom: 5px;"><sub style="font-size: 11px;">Biography:
                        {{ props.profile.biography }}</sub>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div>
                    <div class="row">
                      <div class="col"><label class="col-form-label" style="font-size: 12px;">
                          <b>Research Focus: </b>
                          <!-- {{ props.profile.research_foci }} -->
                          <span v-for="(focus, index) in props.profile.research_foci" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.research_foci.length - 1 ? ', ' : '' }} </span>
                        </label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col"><label class="col-form-label" style="font-size: 12px;">
                          <b> Strategic Research Centre: </b>
                          <!-- {{ props.profile.research_centres }} -->
                          <span v-for="(focus, index) in props.profile.research_centres" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.research_centres.length - 1 ? ', ' : '' }} </span>
                        </label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col"><label class="col-form-label" style="font-size: 12px;">
                          <b>Department: </b>
                          <!-- {{ props.profile.departments }} -->
                          <span v-for="(focus, index) in props.profile.departments" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.departments.length - 1 ? ', ' : '' }} </span>
                        </label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col"><label class="col-form-label" style="font-size: 12px;">
                          <b>Availiability for Supervision: </b>
                          <!-- {{ props.profile.available_supervisions }} -->
                          <span v-for="(focus, index) in props.profile.available_supervisions" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.available_supervisions.length - 1 ? ', ' : ''
                              }}</span>
                        </label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col"><label class="col-form-label" style="font-size: 12px">
                          <b>Faculty Collaborative Research Area: </b>
                          <!-- {{ props.profile.fcras }} -->
                          <span v-for="(focus, index) in props.profile.fcras" :key="focus.id">
                            {{ focus.name }}{{ index < props.profile.fcras.length - 1 ? ', ' : '' }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div style="margin-top: -5px;padding-top: 0px;"><label class="form-label"
                      style="padding: 0px;padding-top: 0px;margin-top: 5px;"><small class="form-text"
                        style="margin: 0px;margin-top: 0px;height: 0px;margin-right: 0px;margin-left: 0px;padding: 0px;padding-top: 0px;font-size: 12px;"><svg
                          xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none"
                          style="font-size: 24px;margin-left: -3px;">
                          <path
                            d="M4 4C4 2.89543 4.89543 2 6 2H10.5858C11.1162 2 11.6249 2.21071 12 2.58579L15.4142 6C15.7893 6.37507 16 6.88378 16 7.41421V16C16 17.1046 15.1046 18 14 18H12.4722C13.4223 16.9385 14 15.5367 14 14C14 10.6863 11.3137 8 8 8C6.46329 8 5.06151 8.57771 4 9.52779V4Z"
                            fill="currentColor"></path>
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8 10C5.79086 10 4 11.7909 4 14C4 14.7414 4.20229 15.4364 4.55397 16.0318L3.29289 17.2929C2.90237 17.6834 2.90237 18.3166 3.29289 18.7071C3.68342 19.0976 4.31658 19.0976 4.70711 18.7071L5.96818 17.446C6.56362 17.7977 7.25862 18 8 18C10.2091 18 12 16.2091 12 14C12 11.7909 10.2091 10 8 10ZM6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C7.44744 16 6.94881 15.7772 6.58579 15.4142C6.22276 15.0512 6 14.5526 6 14Z"
                            fill="currentColor"></path>
                        </svg>Your search matched against this person&#39;s publications.</small></label></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});

</script>

<style>
.expert-card-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;

  object-fit: cover;
}
</style>