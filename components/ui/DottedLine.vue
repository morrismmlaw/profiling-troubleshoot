<template>
  <div>
    <div class="dotted"></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.dotted {
  background-image: linear-gradient(50deg, hsla(0, 0%, 100%, .65) 1px, transparent 0);
  background-position-y: center;
  background-repeat: repeat-x;
  background-size: 8px 2px;
  flex: none;
  height: 5px;
}
</style>