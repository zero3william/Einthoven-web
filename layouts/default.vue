<template>
  <div id="root-container" v-if="isLogin">
    <Header id="header"/>
    <Sidebar id="sidebar"/>
    <div style="flex-grow:1;overflow:auto;">
      <nuxt id="main"/>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default {
  components: { Header, Sidebar },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    checkLogin() {
      if (!this.$store.state.userinfo) {
        this.$router.push("/login");
        this.$message({
          type: "warning",
          message: this.$t("pleaseLogin")
        });
      } else {
        this.isLogin = true;
      }
    }
  },
  created: function() {
    this.checkLogin();
  }
};
</script>
<style lang="scss" scoped>
$screenMinWidth: 1080px;
$sidebarMinWidth: 200px;
$mainMinWidth: $screenMinWidth - $sidebarMinWidth;

#root-container {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  #header {
    width: calc(100vw - #{$sidebarMinWidth});
    position: absolute;
    z-index: 1;
    top: 0;
    left: $sidebarMinWidth;
  }
  #sidebar {
    width: $sidebarMinWidth;
    min-width: $sidebarMinWidth;
    height: 100vh;
    overflow: auto;
    background: linear-gradient(#2e8da7 10%, #11a59c 70%);
  }
  #main {
    min-width: $mainMinWidth;
    margin-top: 56px;
    padding: 16px;
  }
}
</style>

