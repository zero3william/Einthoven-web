<template>
  <aside class="aside-container">
    <h3>Einthoven Brand</h3>
    <el-menu default-active="1" :router="true">
      <el-menu-item index="1" :route="{ path:'recordsList'}">
        <i class="el-icon-menu"></i>
        <span slot="title">Monitoring History</span>
      </el-menu-item>
      <el-menu-item index="2" :route="{path:'accountSetting'}">
        <i class="el-icon-document"></i>
        <span slot="title">Account Setting</span>
      </el-menu-item>
    </el-menu>
    <el-button id="logout" type="text" icon="el-icon-search" @click="handleLogout">Logout</el-button>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    handleLogout() {}
  }
};
</script>

<style lang="scss" scoped>
.aside-container {
  color: #fff;
  .el-menu {
    background: transparent;
    border: 0;
    .el-menu-item {
      color: #fff;
      i {
        color: inherit;
      }
      &:hover {
        background: rgba(135, 204, 194, 0.5) !important;
      }
      &:focus {
        background: none;
      }
    }
    .el-menu-item.is-active {
      color: #fff;
    }
  }
  #logout {
    position: relative;
    padding-left: 20px;
    font-size: 0.9rem;
    bottom: -40px;
    color: #fff;
    span {
      margin-left: 10px !important;
    }
  }
}
</style>
