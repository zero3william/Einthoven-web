<template>
  <header class="header-container">
    <el-row type="flex" justify="space-between" align="middle">
      {{new Date()}}
      <img src="/user32x32.png">
    </el-row>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
}
</style>
