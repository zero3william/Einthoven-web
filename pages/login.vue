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
  </el-row>
</template>

<script>
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import EntryNav from "../components/EntryNav";
import anime from "animejs";

export default {
  layout: "login",
  components: { SignInForm, SignUpForm, EntryNav },
  data() {
    return {
      page: "signIn",
      entryNavProps: {
        title: "",
        desc: "",
        btn: ""
      },
      title: ["Hello, Friend!", "Welcome Back!"],
      desc: [
        "Immidiately create one and start your journey with us",
        "Sign in and enjoy all services"
      ],
      btn: ["SIGN UP", "SIGN IN"]
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

