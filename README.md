# debug.js

在手机或电脑上调试网页
---

> 注意：如果是直接本地打开测试页面，而不是通过服务器打开或者跨域。所有的异常信息会显示为'script error'。

* DEMO: 用服务器打开index.html

* 开始使用。

		<script src="debug.js"></script>

* 主动调用

		console.log('msg');
		console.info('msg');
		console.error('msg');
		console.warn('msg')

* 默认会不做整个页面的所有错误信息(window.onerror)，然后打印
