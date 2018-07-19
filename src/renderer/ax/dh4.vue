<template>
  <div>
    <h1>{{name}}</h1>
    <p class="update" @click="_checkForUpdate">检查更新</p>
    <div>{{tips}}:{{downloadPercent}}</div>
    <div>
      <p>1.新增系统托盘</p>
    </div>
    <div v-html="content"></div>
  </div>
</template>

<script>
  const ipc = require('electron').ipcRenderer;  
  export default {
    data () {
      return {
        name:'更新检查,当前版本version：1.4.4',
        tips:'',
        downloadPercent:0,
        content: "<h4>实现效果</h4>\n<ol>\n<li>页面单元素垂直居中，作为一个垂直居中的最外层容器（需要对html和body有所设置）。</li>\n<li>子元素垂直居中的两种实现，效果叠加实现标签效果。</li>\n</ol>\n<pre class=\"hljs\"><code class=\"language\">&lt;style&gt;\n /* 垂直居中嵌套效果 */\n html, body {\n margin: 0; \n padding: 0; \n height: 100%;\n width: 100%;\n }\n .parent {\n height:500px; \n width: 500px;\n position: relative;\n background-color: #70c578;\n margin: 0 auto;\n top: 50%; \n /* 两种实现方式 */\n /* margin-top: -250px; */\n transform: translateY(-50%);\n }\n .middle {\n border-radius: 50% 50%;\n color: white;\n /* 标签内文本垂直居中显示 */\n text-align: center; \n line-height: 50px;\n\n height: 50px;\n width: 50px;\n background-color: #3ba9e0;\n position: absolute;\n }\n /* 这里两个middle只使用其一都会实现垂直居中效果，都不注释会出现左上角小标签效果 */\n .middle {\n top: 50%;\n left: 50%;\n margin-top: -25px!important; \n margin-left: -25px!important; \n margin: 0 auto;\n } \n .middle {\n top: 0;\n bottom: 0; \n left: 0; \n right: 0; \n margin: auto;\n } \n &lt;/style&gt; \n&lt;/head&gt;\n&lt;body&gt;\n &lt;div class=&quot;parent&quot;&gt;\n &lt;div class=&quot;middle&quot;&gt;123&lt;/div&gt;\n &lt;/div&gt;\n&lt;/body&gt;\n</code></pre>\n<h4>效果图</h4>\n<div class=\"hljs-center\">\n<p><img src=\"http://blog.img.chunibyo.org/%E6%A0%87%E7%AD%BE1.png\" alt=\"标签\" /><br />\n标签效果</p>\n<br>\n<p><img src=\"http://blog.img.chunibyo.org/%E5%B1%85%E4%B8%AD1.png\" alt=\"居中\" /><br />\n居中效果</p>\n</div>\n",
      }
    },
    created(){

      ipc.on("message", (event, text) => {
        console.log(event, text,'message');
        this.tips = text;
        if(text === 'isUpdateNow'){
          if (confirm('是否现在更新？')) {
            ipc.send("isUpdateNow");
          }
        }
      });
      //注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
      ipc.on("downloadProgress", (event, progressObj)=> {
        console.log(progressObj,'progressObj');
        this.downloadPercent = progressObj.percent || 0;
      });
      // ipc.on("isUpdateNow", () => {
      //   ipc.send("isUpdateNow");
      // });
    },
    methods: {
      _checkForUpdate () {
        ipc.send("checkForUpdate");
      }
    },
    beforeDestroy(){
      // ipc.removeAll(["message", "downloadProgress", "isUpdateNow"]);
    }
  }
</script>

<style>
  .update{
    cursor: pointer;
  }
</style>