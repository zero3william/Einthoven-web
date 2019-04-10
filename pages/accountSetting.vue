<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="$t('basicInfo')" name="basic">
      <el-card>
        <el-form
          :model="basicInfoForm"
          :rules="basicInfoFormRules"
          ref="basicInfoForm"
          label-width="70px"
        >
          <el-form-item prop="name" :label="$t('name')">
            <el-input v-model="basicInfoForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" :label="$t('email')">
            <el-input v-model="basicInfoForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-button
            style="margin:20px 70px"
            round
            type="primary"
            size="mini"
            @click="submitForm('basicInfoForm')"
          >{{$t('SAVE')}}</el-button>
        </el-form>
      </el-card>
    </el-tab-pane>
    <el-tab-pane :label="$t('changePassword')" name="password">
      <el-card>
        <el-form
          :model="changePasswordForm"
          :rules="changePasswordFormRules"
          ref="changePasswordForm"
          label-width="120px"
        >
          <el-form-item prop="old" :label="$t('oldPassword')">
            <el-input v-model="changePasswordForm.old" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="new" :label="$t('newPassword')">
            <el-input v-model="changePasswordForm.new" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="confirm" :label="$t('confirmPassword')">
            <el-input v-model="changePasswordForm.confirm" autocomplete="off"></el-input>
          </el-form-item>
          <el-button
            style="margin:20px 120px"
            round
            type="primary"
            size="mini"
            @click="submitForm('changePasswordForm')"
          >{{$t('CHANGE')}}</el-button>
        </el-form>
      </el-card>
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

