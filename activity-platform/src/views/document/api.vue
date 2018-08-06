<template>
<iframe src="static/doc/api-doc/index.html" frameborder="0" scrolling="no" @load="loadDoc" :style="iframeStyle" ref="apiFrame"></iframe>
</template>
<script>

export default {
  data() {
    return {
      iframeStyle: ''
    }
  },
  created() {

  },
  methods: {
    loadDoc(){
      this.iframeStyle = {height:this.$refs.apiFrame.contentDocument.body.offsetHeight + 'px'};

    }
  }
}
</script>
<style scoped>
  iframe{
    width: 100%;
    overflow: hidden;
  }
</style>