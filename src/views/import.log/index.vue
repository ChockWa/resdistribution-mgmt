<template>
  <div class="r-import-log">
    <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="文件名"
      ></el-table-column>
      <el-table-column prop="successWechatCount" header-align="center" align="center" label="成功微信号数量"></el-table-column>
      <el-table-column prop="duplicateWechatCount" header-align="center" align="center" label="重复微信号数量"></el-table-column>
      <el-table-column prop="invalidWechatCount" header-align="center" align="center" label="无效微信数量"></el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="导入时间"
        :formatter="createTimeFormat"
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
  </div>
</template>

<script>
import * as dateUtils from "./../../util/dateUtil";
import { messages } from './../../assets/js/common.js'
export default {
  name: "ImportLog",
  data() {
    return {
      dataListLoading: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      dataList: []
    };
  },
  methods: {
    getDataList() {
      const _this = this
      _this.dataListLoading = true
      _this.$api.wechat.getImportLogs(_this.query).then(resp => {
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
    createTimeFormat(row) {
      return dateUtils.formartDate(row.createTime);
    }
  }
};
</script>

<style lang="scss" scoped>
.r-import-log {
}
</style>