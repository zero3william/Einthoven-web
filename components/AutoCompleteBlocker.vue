<template>
  <input type="password" class="invisible">
</template>

<script>
export default {
  name: 'AutoCompleteBlocker'
};
</script>

<style lang="scss" scoped>
.invisible {
  width: 0;
  height: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  border: none;
  padding: 0;
}
</style>
