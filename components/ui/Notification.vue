<template>
  <div>

    <div class="odocs-spaced">
      <o-button label="Launch notification" size="medium" @click="simple" />
    </div>

  </div>
</template>

<script lang="ts" setup>

import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

function simple(): void {
  oruga.notification.open("Something happened");
}

function success(): void {
  oruga.notification.open({
    message: "Something happened correctly!",
    variant: "success",
    closable: true,
  });
}

function toast(): void {
  oruga.notification.open({
    message: "Something happened correctly!",
    rootClass: "toast toast-notification",
    position: "top",
  });
}

function queueToast(): void {
  oruga.notification.open({
    message: "Something happened correctly!",
    rootClass: "toast toast-notification",
    position: "top",
    queue: true,
  });
}

function danger(): void {
  oruga.notification.open({
    duration: 5000,
    message: `Something's not good, also I'm on <b>bottom</b>`,
    position: "bottom-right",
    variant: "danger",
    closable: true,
    onClose: () => {
      oruga.notification.open("Custom notification closed!");
    },
  });
}

</script>

<style lang="scss">
.toast-notification {
  margin: 0.5em 0;
  text-align: center;
  box-shadow:
    0 1px 4px rgb(0 0 0 / 12%),
    0 0 6px rgb(0 0 0 / 4%);
  border-radius: 2em;
  padding: 0.75em 1.5em;
  pointer-events: auto;
  color: rgba(0, 0, 0, 0.7);
  background: #ffdd57;
}
</style>