<template>
  <div>
    <div class="dotted"></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.dotted {
  background-image: linear-gradient(90deg, hsla(0, 0%, 100%, .55) 1px, transparent 0);
  background-position-y: center;
  background-repeat: repeat-x;
  background-size: 6px 1px;
  flex: none;
  height: 1px;
}
</style>