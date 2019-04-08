<template>
  <div id="root-container">
    <Header id="header"/>
    <Sidebar id="sidebar"/>
    <nuxt id="main"/>
  </div>
</template>
<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default {
  components: { Header, Sidebar },
  methods: {
    checkLogin() {
      if (!window.sessionStorage["session"]) {
        this.$router.push("/login");
      } else {
        const payload = this.$store.commit(
          "login",
          JSON.parse(window.sessionStorage["session"])
        );
        this.$router.push("/recordsList");
      }
    }
  },
  beforeMount: function() {
    this.checkLogin();
  }
};
</script>
<style lang="scss" scoped>
#root-container {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  #header {
    width: calc(100vw - 200px);
    position: absolute;
    z-index: 1;
    top: 0;
    left: 200px;
  }
  #sidebar {
    width: 200px;
    height: 100vh;
    overflow: auto;
    background: #207a94;
  }
  #main {
    flex-grow: 1;
    overflow: auto;
    margin-top: 56px;
    padding: 16px;
  }
}
</style>

