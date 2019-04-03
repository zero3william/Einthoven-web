<template>
  <el-form class="login-form-container text-center" :model="ruleForm" :rules="rules" ref="ruleForm">
    <h2 class="primary-text">SIGN IN TO EINTHOVEN</h2>
    <AutoCompleteBlocker/>
    <el-form-item prop="email">
      <el-input
        placeholder="Email"
        prefix-icon="el-icon-search"
        v-model="ruleForm.email"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        placeholder="Password"
        prefix-icon="el-icon-search"
        v-model="ruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-row type="flex" justify="space-between" align="middle">
      <nuxt-link to="/login/recovery">Forget Password ?</nuxt-link>
      <el-button round type="primary" @click="submitForm('ruleForm')">SIGN IN</el-button>
    </el-row>
  </el-form>
</template>

<script>
import { mapMutations } from "vuex";
import AutoCompleteBlocker from "./AutoCompleteBlocker";

export default {
  name: "LoginForm",
  components: {
    AutoCompleteBlocker
  },
  data() {
    return {
      ruleForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, message: "Please Enter the Email", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "Please Enter the Password",
            trigger: "change"
          },
          {
            min: 8,
            max: 16,
            message: "Should be 8 - 16 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const payload = this.$store.commit("login", this.payload);
          this.$router.push({ path: "recordsList", query: { test: "hello" } });
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    payload() {
      return this.ruleForm;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form-container {
  width: 70vw;
  padding: 20px 16vw 80px;
}
</style>

