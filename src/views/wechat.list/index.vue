<template>
  <div class="r-wechat-list">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="uploadHandle">上传微信号</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
      <el-table-column
        prop="area"
        header-align="center"
        align="center"
        :formatter="wechatTypeFormat"
        label="类型"
      ></el-table-column>
      <el-table-column prop="wechat" header-align="center" align="center" label="微信号"></el-table-column>
      <el-table-column prop="groupName" header-align="center" align="center" label="所属群名称"></el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态"
        :formatter="statusFormat"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="导入时间"
        :formatter="createTimeFormat"
      ></el-table-column>
      <el-table-column prop="userPhone" header-align="center" align="center" label="领取人手机号"></el-table-column>
      <el-table-column
        prop="receiveTime"
        header-align="center"
        align="center"
        label="领取时间"
        :formatter="receiveTimeFormat"
      ></el-table-column>
      <!-- <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="query.pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="query.pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog title="上传微信号" v-loading="uploadLoading" :visible.sync="dialogVisible" width="500">
      <el-upload
        class="upload-demo"
        action="a"
        :on-remove="handleRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传json/txt文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as dateUtils from "./../../util/dateUtil";
import { messages } from './../../assets/js/common.js'
import {post} from "./../../api/request"
export default {
  name: "WechatList",
  data() {
    return {
      dataListLoading: false,
      uploadLoading: false,
      dataList: [],
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      fileList: [],
      dialogVisible: false,
      uploadConfig: {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    };
  },
  methods: {
    getDataList() {
      const _this = this
      _this.dataListLoading = true
      _this.$api.wechat.list(_this.query).then(resp => {
        if(resp){
          if(resp.code === 0){
            _this.dataList = resp.data.records
            _this.total = resp.data.total
          }else{
            messages("error", resp.msg)
          }
          _this.dataListLoading = false
        }
      })
    },
    sizeChangeHandle(pageSize) {
      this.query.pageSize = pageSize;
      this.query.pageIndex = 1;
      this.getDataList();
    },
    currentChangeHandle(pageIndex) {
      this.query.pageIndex = pageIndex;
      this.getDataList();
    },
    wechatTypeFormat(row) {
      return row.type === 1 ? "普通微信" : "新手任务微信";
    },
    statusFormat(row) {
      if (row.status === 0) {
        return "未发放";
      } else if (row.status === 1) {
        return "已发放";
      } else {
        return "已领取";
      }
    },
    createTimeFormat(row) {
      return dateUtils.formartDate(row.createTime);
    },
    receiveTimeFormat(row) {
      return dateUtils.formartDate(row.receiveTime);
    },
    uploadHandle() {
      this.fileList = []
      this.dialogVisible = true
    },
    upload() {
      const _this = this
      if(_this.fileList.length < 1){
        messages("error", "请选择文件")
        return
      }
      let fileName = _this.fileList[0].name
      if(fileName.indexOf(".json") < 0 || fileName.indexOf(".txt") < 0){
        messages("error", "只能上传json或txt文件")
        return
      }
      let param = new FormData();
      param.append("file", _this.fileList[0].raw);
      _this.uploadLoading = true
      post("/wechat/upload", param, _this.uploadConfig).then(resp => {
        if (resp) {
          if(resp.code === 0){
            messages("success", "上传成功")
            _this.getDataList()
            _this.dialogVisible = false
          }else{
            messages("error", resp.msg)
          }
        }
        _this.uploadLoading = false
      });
    },
    handleExceed(files, fileList) {
      messages("error", "只能上传一个文件")
    },
    handleRemove(file, fileList) {
      this.fileList = []
    }
  }
};
</script>

<style lang="scss" scoped>
.r-wechat-list {
}
</style>