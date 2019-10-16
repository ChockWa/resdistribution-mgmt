<template>
  <div :class="loginStyle" v-loading="loading">
    <div class="login-form">
      <div style="font-size:28px;margin-bottom:50px;text-align: center">
        <span>资源发放平台</span>
      </div>
      <el-form ref="dataForm" :model="model" size="small">
        <el-form-item>
          <el-input v-model="model.account" placeholder="账号" class="input-width"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="model.password" placeholder="密码" type="password" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary" size="small" @click="login()">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        account: "",
        password: ""
      },
      loading: false
    };
  },
  created() {
    this.authcheck();
  },
  methods: {
    login() {
      const _this = this;
      // if(_this.model.account === '' || _this.model.password === ''){
      //   _this.$message("error","账号密码不能不空")
      //   return
      // }
      // _this.loading = true;
      // _this.$api.user.loginMgmt(_this.model).then(resp => {
      //   if (resp && resp.code === 0) {
      //     _this.$store.dispatch("setToken", resp.data.token);
      //     _this.$store.dispatch("setRoles", resp.data.roles);
      //     _this.$store.dispatch("setAccount", resp.data.account);
      //     _this.$router.push({ path: "/home" });
      //   } else {
      //     _this.$message("error",resp.msg);
      //   }
      //   _this.loading = false;
      // });
      this.$store.dispatch("setToken", "resp.data.tokenaaaaaaaaaaaaaaaa");
      this.$store.dispatch("setRoles", ["admin"]);
      this.$store.dispatch("setAccount", "admin");
      this.$router.push({ path: "/home" });
    },
    // sendSmsCode() {
    //   const _this = this;
    //   if (_this.model.userPhone === "") {
    //     _this.$message.error("手机号不能为空");
    //     return;
    //   }
    //   _this.loading = true;
    //   _this.$api.user
    //     .sendSmsCode({ userPhone: _this.model.userPhone })
    //     .then(resp => {
    //       if (resp) {
    //         if (resp.code === 0) {
    //           _this.$message.success("发送成功");
    //         } else {
    //           _this.$message.error(resp.msg);
    //         }
    //       }
    //       _this.loading = false;
    //     });
    // },
    authcheck() {
      const _this = this;
      _this.loading = true;
      _this.$api.user
        .authcheck({ token: _this.$store.getters.getToken })
        .then(resp => {
          if (resp) {
            if (resp.code === 0) {
              if (resp.data) {
                _this.$store.dispatch("setToken", resp.data.token);
                _this.$store.dispatch("setRoles", resp.data.roles);
                _this.$store.dispatch("setAccount", resp.data.account);
                _this.$router.push({ path: "/home" });
              }
            } else {
              _this.$message.error(resp.msg);
            }
          }
          _this.loading = false;
        });
    },
    loginStyle() {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      return "width:" + width + "px;height:" + height + "px;";
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 400px;
  height: 50%;
  margin: auto;
}
.input-width {
  width: 250px;
}
</style>
