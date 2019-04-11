export const locales = ['en-us', 'zh-tw'];

const lang = {
  signIn: ['SignIn', '登入'],
  signUp: ['SignUp', '註冊'],
  account: ['Account', '帳號'],
  SAVE: ['SAVE', '儲存'],
  CHANGE: ['CHANGE', '修改'],
  logout: ['Logout', '登出'],
  tip: ['Tip', '提示'],
  yes: ['Yes', '是'],
  no: ['No', '否'],
  success: ['Success', '成功'],
  failed: ['Failed', '失敗'],
  pleaseLogin: ['Please Login', '請登入'],

  basicInfo: ['Basic Info', '基本資料'],
  name: ['Name', '姓名'],
  email: ['Email', '郵箱'],
  password: ['Password', '密碼'],
  changePassword: ['Change Password', '修改密碼'],
  oldPassword: ['Old Password', '輸入舊密碼'],
  newPassword: ['New Password', '輸入新密碼'],
  confirmPassword: ['Confirm Password', '確認密碼'],
  forgetPassword: ['Forget Password ?', '忘記密碼 ?'],

  monitoringHistory: ['Monitoring History', '測量記錄'],
  accountSetting: ['Account Setting', '狀號設定'],

  from: ['From', '開始日期'],
  to: ['To', '結束日期'],

  startTime: ['Start Time', '開始時間'],
  recordTime: ['Record Time', '記錄長度'],
  detail: ['Detail', '詳細內容'],
  delete: ['Delete', '刪除'],
  deleteMsg: ['Delete this record ?', '删除這條紀錄 ?'],

  entryNavTitle1: ["Hello, Friend!", "您好, 朋友!"],
  entryNavDesc1: [
    "Immidiately create one and enjoy the premium health management services",
    "三分鐘創建帳戶, 享受一輩子的頂級服務<br>愛多芬, 守護您與您愛的人"
  ],
  entryNavBtn1: ["SIGN UP", "註冊"],
  entryNavTitle2: ["Welcome Back!", "歡迎回來"],
  entryNavDesc2: [
    "Sign in and enjoy all services",
    "登入使用健康管理服務"
  ],
  entryNavBtn2: ["SIGN IN", "登入"],

  slogan: ["Leading new concept of health , advocating modern and healthy lifestyle , and improve life quality", "引領健康新理念，給您高品質的健康管理服務"],

  signInFormTitle: ['SIGN IN TO EINTHOVEN', '登入愛多芬健康管理系統'],
  signUpFormTitle: ['CREATE ACCOUNT', "創建帳戶"]
};

const output = {}
locales.forEach((locale, index) => {
  output[locale] = {};
  Object.keys(lang).forEach(key => {
    output[locale][key] = lang[key][index];
  });
});

export default output;
