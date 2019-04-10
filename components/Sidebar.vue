<template>
  <aside class="aside-container">
    <h3>Einthoven Brand</h3>
    <el-menu default-active="1" :router="true">
      <el-menu-item index="1" :route="{ path:'recordsList'}">
        <i class="iconfont icon-monitoring"></i>
        <span slot="title">{{$t('monitoringHistory')}}</span>
      </el-menu-item>
      <el-menu-item index="2" :route="{path:'accountSetting'}">
        <i class="iconfont icon-setting"></i>
        <span slot="title">{{$t('accountSetting')}}</span>
      </el-menu-item>
    </el-menu>
    <el-button id="logout" type="text" @click="handleLogout">
      <i class="iconfont icon-logout" style="margin-right:6px;"></i>
      {{$t('logout')}}
    </el-button>
  </aside>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Sidebar",
  methods: {
    handleLogout() {
      this.$store.commit("LOGOUT");
      this.$router.push({ path: "login", query: { test: "hello" } });
    }
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
    padding-left: 17px;
    font-size: 14px;
    bottom: -40px;
    color: #fff;
    span {
      margin-left: 10px !important;
    }
  }
}
</style>
