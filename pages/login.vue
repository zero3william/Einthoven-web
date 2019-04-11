<template>
  <el-row type="flex" align="middle" class="entry-container" data-ease="easeOutElastic(.8, .8)">
    <SignInForm></SignInForm>
    <EntryNav
      :page="page"
      :title="entryNavProps.title"
      :desc="entryNavProps.desc"
      :btn="entryNavProps.btn"
      :click="animate"
    ></EntryNav>
    <SignUpForm></SignUpForm>
    <LocaleSelector
      id="locale-select-container"
      data-ease="easeOutElastic(.8, .8)"
      style="position:fixed;top:14px;left:60vw;"
    />
  </el-row>
</template>

<script>
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import EntryNav from "../components/EntryNav";
import LocaleSelector from "../components/LocaleSelector";
import anime from "animejs";

export default {
  layout: "login",
  components: { SignInForm, SignUpForm, EntryNav, LocaleSelector },
  data() {
    return {
      page: "signIn",
      entryNavProps: {
        title: "",
        desc: "",
        btn: ""
      },
      title: ["entryNavTitle1", "entryNavTitle2"],
      desc: ["entryNavDesc1", "entryNavDesc2"],
      btn: ["entryNavBtn1", "entryNavBtn2"]
    };
  },
  methods: {
    animate: function(event) {
      this.page = this.page === "signIn" ? "signUp" : "signIn";
      const num = this.page === "signIn" ? 0 : 1;
      this.entryNavProps = {
        title: this.title[num],
        desc: this.desc[num],
        btn: this.btn[num]
      };
      anime({
        targets: ".entry-container",
        left: num === 0 ? 0 : "-70vw",
        easing: function(el) {
          return el.getAttribute("data-ease");
        },
        duration: 1300
      });
      anime({
        targets: "#locale-select-container",
        left: num === 0 ? "60vw" : "35vw",
        easing: function(el) {
          return el.getAttribute("data-ease");
        },
        duration: 1300
      });
    }
  },
  mounted: function() {
    this.entryNavProps = {
      title: this.title[0],
      desc: this.desc[0],
      btn: this.btn[0]
    };
  }
};
</script>

<style lang="scss" scoped>
.entry-container {
  width: 170vw;
}
</style>

