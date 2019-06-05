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
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

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
        this.$router.push('/login');
        this.$message({
          type: 'warning',
          message: this.$t('pleaseLogin')
        });
      } else {
        this.$api
          .getUser(this.$store.state.userinfo.userId)
          .then(resp => {
            this.isLogin = true;
          })
          .catch(err => {
            this.$router.push('/login');
          });
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
$sidebarMinWidth: 240px;
$mainMinWidth: $screenMinWidth - $sidebarMinWidth;
$headerHeight: 5.2rem;

#root-container {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  #header {
    background: #fff;
    width: calc(100vw - #{$sidebarMinWidth});
    position: absolute;
    z-index: 1000;
    top: 0;
    left: $sidebarMinWidth;
    height: $headerHeight;
  }
  #sidebar {
    width: $sidebarMinWidth;
    min-width: $sidebarMinWidth;
    height: 100vh;
    overflow: auto;
    background: linear-gradient(#2e8da7 10%, #11a59c 70%);
  }
  #main {
    background: #fdfdfd;
    min-width: $mainMinWidth;
    margin-top: $headerHeight;
    height: calc(100vh - #{$headerHeight});
    padding: 16px;
  }
}
</style>

