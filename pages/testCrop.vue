<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12">
        <div class="card shadow rounded border-0">
          <div class="card-body py-5">
            <h4 class="card-title">Vue-advanced-cropper Issue</h4>
            <div class="custom-form mt-3">
              <form method="post" name="myForm">
                <div id="simple-msg"></div>
                <div class="row mb-2">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label" for="name">
                        Doesn't show by default. Resize the window, and the
                        cropper will show.
                      </label>
                      <div class="position-relative">
                        <div>
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#empty-cart"
                            class="btn btn-primary m-1">Open Modal</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <!--end custom-form-->
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
    <!--end row-->
    <!-- Wishlist Popup Start -->
    <div ref="modal" class="modal fade" id="empty-cart" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded shadow border-0">
          <div class="modal-body py-5">
            <div class="text-center">
              <div>
                <cropper ref="cropperRef" class="cropper" :src="img" :stencil-props="{ aspectRatio: 10 / 12 }"
                  @change="change" />
              </div>
              <div class="mt-4">
                <div class="mt-4">
                  <a href="javascript:void(0)" class="btn btn-primary">Start Shopping</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Wishlist Popup End -->
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const img = ref('https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80');

const cropperRef = ref(null);
const modal = ref(null);

const change = ({ coordinates, canvas }) => {
  console.log(coordinates, canvas);
};

onMounted(() => {
  const modalElement = modal.value;
  if (modalElement) {
    modalElement.addEventListener('shown.bs.modal', () => {
      const cropperInstance = cropperRef.value;
      if (cropperInstance) {
        cropperInstance.refresh();
      }
    });
  }
});
</script>

<style>
/* Add any custom styles here */
</style>


<!-- <script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      img:
        "https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
    };
  },
  validations() {
    return {
      venue: {},
    };
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas);
    },
  },
  computed: {},
  mounted() {
    const { cropper, modal } = this.$refs;
    modal.addEventListener("shown.bs.modal", () => {
      if (cropper) {
        cropper.refresh();
      }
    });
  },
};
</script> -->

<style>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>