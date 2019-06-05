<template>
  <el-tabs v-model="activeName" style="padding:16px 30px;" class="account-setting-container">
    <el-tab-pane :label="$t('basicInfo')" name="basic">
      <el-card style="width:calc(380px + 12vw);padding-right:30px;">
        <div @click="launchFilePicker()" class="avatar-container" v-loading="isLoading">
          <div
            id="avatar"
            class="avatar"
            :style="`background-image:url(${$store.state.userinfo ? $store.state.userinfo.avatar : ''});`"
          ></div>
          <img
            id="forEXIF"
            :src="$store.state.userinfo ? $store.state.userinfo.avatar : ''"
            style="display:none;"
          >
        </div>
        <el-dialog
          title="建立頭像"
          custom-class="avatar-dialog"
          :visible.sync="isVisible"
          width="700px"
          top="10vh"
          v-if="isVisible"
        >
          <croppa
            v-model="myCroppa"
            :width="400"
            :height="400"
            :quality="pixelRatio"
            :zoom-speed="10"
            :initial-image="croppaImg"
            :show-remove-button="false"
            :prevent-white-space="true"
            canvas-color="transparent"
          ></croppa>
          <div style="margin-top:30px;">
            <el-button @click="handleSaveCrop">{{$t('SAVE')}}</el-button>
          </div>
        </el-dialog>
        <br>
        <br>
        <el-form :model="basicInfoForm" ref="basicInfoForm" label-width="80px">
          <input type="file" ref="file" name="avatar" @change="onFileChange" style="display:none">
          <el-form-item prop="name" :label="`${$t('name')}：`" class="editable">
            <el-input v-model="basicInfoForm.nickname" autocomplete="off" :maxlength="16"></el-input>
            <el-button
              style="position:absolute;top:10px;right:0;"
              round
              type="primary"
              size="mini"
              @click="submitBasic('basicInfoForm')"
            >{{$t('SAVE')}}</el-button>
          </el-form-item>
          <el-form-item
            :label="`${$t('email')}：`"
          >{{$store.state.userinfo ? $store.state.userinfo.email : ''}}</el-form-item>
        </el-form>
      </el-card>
    </el-tab-pane>
    <el-tab-pane :label="$t('changePassword')" name="password">
      <el-card style="width:calc(380px + 12vw);padding-right:30px;">
        <el-form :model="changePasswordForm" ref="changePasswordForm" label-width="12vw">
          <el-form-item
            prop="old"
            :label="$t('oldPassword')"
            :rules="[{ required: true, message: $t('required'), trigger: 'submit' }]"
            class="editable"
          >
            <el-input type="password" v-model="changePasswordForm.old" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="new"
            :label="$t('newPassword')"
            :rules="[
               { required:true, message:$t('required'), trigger: 'submit' } , 
               { min:4, max:16, message:$t('wrongPasswordFormat'), trigger:'blur'}
            ]"
            class="editable"
          >
            <el-input
              :maxlength="16"
              type="password"
              v-model="changePasswordForm.new"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="confirm"
            :label="$t('confirmPassword')"
            :rules="[{
                required: true,
                validator: passwordValidator,
                trigger: 'blur',
              }]"
            class="editable"
          >
            <el-input
              :maxlength="16"
              type="password"
              v-model="changePasswordForm.confirm"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-button
            style="margin:20px 12vw"
            round
            type="primary"
            size="mini"
            @click="submitPassword('changePasswordForm')"
          >{{$t('CHANGE')}}</el-button>
        </el-form>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      pixelRatio: 1,
      isLoading: false,
      isVisible: false,
      activeName: 'basic',
      basicInfoForm: {
        nickname: ''
      },
      changePasswordForm: {
        old: '',
        new: '',
        confirm: ''
      },
      myCroppa: {},
      croppaImg: '',
      dataUrl: ''
    };
  },
  methods: {
    handleSaveCrop() {
      this.dataUrl = this.myCroppa.generateDataUrl('image/jpeg', 0.1);
      this.$api
        .modifyInfo(this.$store.state.userinfo.userId, {
          avatar: this.dataUrl
        })
        .then(resp => {
          this.$store.commit('MODIFY_SUCCESS', resp);
        });
      this.isVisible = false;
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(event) {
      if (event.target.files.length > 0) {
        const maxKB = 1024 * 4;
        const imageFile = event.target.files[0];
        const imageFileSizeKB = imageFile.size / 1024;
        if (!imageFile.type.match('image.*')) {
          this.$message.error({ message: 'Please choose an image file' });
        } else if (imageFileSizeKB > maxKB) {
          this.$message.error({
            message: 'Your file is too big! Please select an image under 4MB'
          });
        } else {
          this.isLoading = true;
          let vue = this;
          let reader = new FileReader();
          let img = new Image();
          reader.onload = function(e) {
            img.src = reader.result;
          };
          img.onload = function() {
            vue.croppaImg = this;
            vue.isVisible = true;
            vue.isLoading = false;
          };
          reader.readAsDataURL(imageFile);
        }
      }
      event.srcElement.value = '';
    },
    passwordValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('required')));
      } else if (value !== this.changePasswordForm.new) {
        callback(new Error(this.$t('differentPassword')));
      } else {
        callback();
      }
    },
    submitBasic(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .modifyInfo(this.$store.state.userinfo.userId, this.basicInfoForm)
            .then(resp => {
              this.$store.commit('MODIFY_SUCCESS', resp);
            });
        } else {
          return false;
        }
      });
    },
    submitPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .modifyPassword(this.$store.state.userinfo.userId, {
              oldpass: this.changePasswordForm.old,
              newpass: this.changePasswordForm.new
            })
            .then(resp => {
              this.$message({
                message: this.$t('changePasswordSuccess'),
                type: 'success'
              });
              this.$router.push('/login');
            });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    // run after everything is in-place
    this.basicInfoForm.nickname = this.$store.state.userinfo
      ? this.$store.state.userinfo.nickname
      : '';
    this.pixelRatio = window.devicePixelRatio;

    const img = document.getElementById('forEXIF');

    img.onload = function() {
      EXIF.getData(this, function() {
        let dom = document.getElementById('avatar');
        switch (EXIF.getTag(this, 'Orientation')) {
          case 1: // 水平(一般)
            break;
          case 2: // 水平鏡像
            break;
          case 3: // 翻轉180度
            dom.style.transform = 'rotate(-180deg)';
            break;
          case 4: // 垂直鏡像
            break;
          case 5: // 水平鏡像後，順時鐘翻轉270度
            break;
          case 6: // 順時鐘翻轉270度
            dom.style.transform = 'rotate(-270deg)';
            break;
          case 7: // 水平鏡像後，順時鐘翻轉90度
            break;
          case 8: // 順時鐘翻轉90度
            dom.style.transform = 'rotate(-90deg)';
            break;
          default:
            // 讀取 EXIF Orientation 錯誤
            break;
        }
        dom.style.opacity = 1;
      });
    };
  }
};
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  $border: 1px solid rgba(30, 26, 221, 0.4);
  margin: 0 auto;
  display: table;
  border: $border;
  padding: 4px;
  border-radius: 50%;
  transition: 0.3s all;
  top: 0;
  cursor: pointer;
  &:hover {
    top: -5px;
  }
  .avatar {
    border: $border;
    width: 160px;
    height: 160px;
    opacity: 0;
    transition: all 0.7s;
    border-radius: 50%;
    background-size: cover;
  }
}
</style>

<style lang="scss">
.account-setting-container {
  .avatar-dialog {
    .el-dialog__header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 16px 20px;
    }
    .el-dialog__body {
      background: #f2f2f2;
      text-align: center;
      padding: 40px;
    }
  }
  .el-form-item__label {
    font-size: 1.4rem;
  }
  .el-form-item__content {
    font-size: 1.4rem;
  }
}
</style>


