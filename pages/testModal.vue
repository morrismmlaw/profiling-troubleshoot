<template>
  <div class="container p-2 mt-5">

    <div>

      <section>
        <o-collapse v-for="(collapse, index) of collapses" :key="index" class="card" animation="slide"
          trigger-class="trigger-fullwidth" :open="isOpen == index" @open="isOpen = index">
          <template #trigger="props">
            <div class="card-header" role="button">
              <span class="card-header-title">
                {{ collapse.title }}
              </span>

              <a class="card-header-icon">
                <o-icon :icon="props.open ? 'caret-up' : 'caret-down'">
                </o-icon>
              </a>
            </div>
          </template>

          <div class="card-content">
            <p class="content" v-html="collapse.text" />
          </div>
        </o-collapse>
      </section>

      <br />

      <section>
        <article v-for="(collapse, index) of collapses" :key="index">
          <o-collapse animation="slide" :open="isOpenAgain == index" @update:open="isOpenAgain = index">
            <template #trigger>
              <o-button variant="success" :label="collapse.title" />
            </template>

            <div class="card">
              <p class="card-content" v-html="collapse.text" />
            </div>
          </o-collapse>
        </article>
      </section>

    </div>

    <section class="odocs-spaced mt-5">
      <o-button label="Open modal" size="medium" variant="primary" @click="isImageModalActive = true" />

      <o-button label="Open modal (clip scroll)" size="medium" variant="primary" @click="isCardModalActive = true" />

      <o-modal v-model:active="isImageModalActive">
        <p style="text-align: center">
          <img style="background-color: white" src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
        </p>
      </o-modal>

      <o-modal v-model:active="isCardModalActive" :width="640" scroll="clip">
        <div style="padding: 10px; background-color: white">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam sodales leo nec convallis rutrum. Vivamus pharetra
            molestie arcu at dictum. Nulla faucibus leo eget enim
            egestas, in tempus justo venenatis. Duis dictum suscipit
            erat, a dapibus eros lobortis ac. Praesent tempor rhoncus
            convallis. Nullam in ipsum convallis, rutrum elit eget,
            dictum ipsum. Nunc sagittis aliquet massa. Etiam lacus
            sapien, eleifend non eros quis, finibus ornare nisl. Ut
            laoreet sit amet lacus non dignissim. Sed convallis mattis
            enim, sed interdum risus molestie ut. Praesent vel ex
            hendrerit, cursus lectus a, blandit felis. Nam luctus orci
            nec varius commodo.
          </p>
          <p>
            Sed vulputate metus purus, ut egestas erat congue et. Donec
            tellus orci, malesuada eget dolor sed, pellentesque bibendum
            nunc. In eu egestas diam. Integer sed congue massa. Sed a
            urna quam. Morbi vulputate dolor eleifend ligula lobortis
            venenatis. Aenean pellentesque risus sit amet faucibus
            molestie. Aliquam eu lorem aliquet, aliquam nulla in,
            vestibulum lorem. Donec mollis mi at sollicitudin tristique.
            Nullam id nibh pulvinar, dignissim nisl id, gravida risus.
            Nulla arcu elit, scelerisque in sollicitudin et, laoreet et
            metus. Aenean placerat turpis nec tincidunt tempus.
          </p>
        </div>
      </o-modal>
    </section>

  </div>
</template>

<script lang="ts" setup>

import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

import { Modal } from '@oruga-ui/oruga-next';

const isImageModalActive = ref(false);
const isCardModalActive = ref(false);


//

const isOpen = ref(0);
const isOpenAgain = ref(0);

const collapses = ref([
  {
    title: "Open to read something intersting written for you!",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.  <br />
          Nulla accumsan, metus ultrices eleifend gravida,   <br />
          nulla nunc varius lectus, nec rutrum justo nibh eu lectus.  <br />
          Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.`,
  },
  {
    title: "What the different between Oruga and Buefy?",
    text: "Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />",
  },
  {
    title: "Nothing special, ignore it!",
    text: "Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.",
  },
]);


</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background-color: #fff;
  box-shadow:
    0 2px 3px hsla(0, 0%, 4%, 0.1),
    0 0 0 1px hsla(0, 0%, 4%, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px hsla(0, 0%, 4%, 0.1);
}

.card-header-title {
  flex-grow: 1;
  font-weight: 700;
  padding: 0.75rem;
}

.card-header-icon {
  cursor: pointer;
  padding: 0.75rem;
}

.card-content {
  padding: 1.5rem;
}

.trigger-fullwidth {
  width: 100%;
}
</style>