export const locales = ['en-us', 'zh-tw'];

const lang = {
  signIn: ['SignIn', '登入'],
  signUp: ['SignUp', '註冊'],
  account: ['Account', '帳號'],
  SAVE: ['SAVE', '儲存'],
  CHANGE: ['CHANGE', '修改'],
  logout: ['Logout', '登出'],

  basicInfo: ['Basic Info', '基本資料'],
  name: ['Name', '姓名'],
  email: ['Email', '郵箱'],
  changePassword: ['Change Password', '修改密碼'],
  oldPassword: ['Old Password', '輸入舊密碼'],
  newPassword: ['New Password', '輸入新密碼'],
  confirmPassword: ['Confirm Password', '確認新密碼'],

  monitoringHistory: ['Monitoring History', '測量記錄'],
  accountSetting: ['Account Setting', '狀號設定'],

  from: ['From', '開始日期'],
  to: ['To', '結束日期'],

  startTime: ['Start Time', '開始時間'],
  recordTime: ['Record Time', '記錄長度'],
  detail: ['Detail', '詳細內容'],
  delete: ['Delete', '刪除']
};

const output = {}
locales.forEach((locale, index) => {
  output[locale] = {};
  Object.keys(lang).forEach(key => {
    output[locale][key] = lang[key][index];
  });
});

export default output;
