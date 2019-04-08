<template>
  <el-form
    class="sign-up-form-container text-center"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
  >
    <h2 class="primary-text">CREATE ACCOUNT</h2>
    <AutoCompleteBlocker/>
    <el-form-item prop="name">
      <el-input
        placeholder="Name"
        prefix-icon="el-icon-search"
        v-model="ruleForm.name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
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
    <el-form-item prop="password2">
      <el-input
        type="password"
        placeholder="Confirm Password"
        prefix-icon="el-icon-search"
        v-model="ruleForm.password2"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-button round type="primary" @click="submitForm('ruleForm')">SIGN UP</el-button>
  </el-form>
</template>

<script>
import AutoCompleteBlocker from "./AutoCompleteBlocker";

export default {
  name: "SignUpForm",
  components: {
    AutoCompleteBlocker
  },
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
        password2: ""
      },
      rules: {
        email: {
          required: true,
          message: "Please Enter the Email",
          trigger: "blur"
        },
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
        ],
        password2: {
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.password) {
              callback(new Error("两次输入密码不一致!"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-up-form-container {
  width: 70vw;
  padding: 20px 16vw 80px;
}
</style>

