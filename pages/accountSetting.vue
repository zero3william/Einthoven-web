<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Basic Info" name="basic">
      <el-card>
        <el-form
          :model="basicInfoForm"
          :rules="basicInfoFormRules"
          ref="basicInfoForm"
          label-width="70px"
        >
          <el-form-item prop="name" label="Name">
            <el-input v-model="basicInfoForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="Email">
            <el-input v-model="basicInfoForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-button round type="primary" @click="submitForm('basicInfoForm')">SAVE</el-button>
        </el-form>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="Change Password" name="password">
      <el-form
        :model="changePasswordForm"
        :rules="changePasswordFormRules"
        ref="changePasswordForm"
        label-width="120px"
      >
        <el-form-item prop="old" label="Old Password">
          <el-input v-model="changePasswordForm.old" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="new" label="New Password">
          <el-input v-model="changePasswordForm.new" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="confirm" label="Confirm Password">
          <el-input v-model="changePasswordForm.confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-button round type="primary" @click="submitForm('changePasswordForm')">Change</el-button>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: "basic",
      basicInfoForm: {
        name: "",
        email: ""
      },
      basicInfoFormRules: {
        email: {
          required: true,
          message: "Please Enter the Email",
          trigger: "blur"
        }
      },
      changePasswordForm: {
        old: "",
        new: "",
        confirm: ""
      },
      changePasswordFormRules: {
        old: { required: true, message: "Required", trigger: "blur" },
        new: { required: true, message: "Required", trigger: "blur" },
        confirm: {
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请再次输入密码"));
            } else if (value !== this.changePasswordForm.new) {
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
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped>
</style>

