<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="8" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>网站大纲</span>
          </div>
          <div class="card-content">
            <router-link to="/games/index">
              <el-tag>玩游戏</el-tag>
            </router-link>
            <router-link to="/activity/document">
              <el-tag type="warning">开发资料</el-tag>
            </router-link>
            <router-link to="/activity/api">
              <el-tag type="success">查文档</el-tag>
            </router-link>
            <router-link to="/activity/config">
              <el-tag type="info">看活动配置</el-tag>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>更新网站内容</span>
            <el-button style="float: right; padding: 3px 0" type="text"><a href="http://appff.meizu.com:3333/git/pull" target="pulltarget">拉取新内容</a></el-button>
          </div>
          <iframe src="javascript:void(0)" frameborder="0" name="pulltarget"></iframe>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
iframe{
  width: 100%;
  height: 100%;
}
</style>
