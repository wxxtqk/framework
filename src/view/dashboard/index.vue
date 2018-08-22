<template>
 <div>
 	<!-- <img src="./home.png" alt=""> -->
	 <router-link to="/water/index" class="water"></router-link>
	 <router-link to="/file/index" class="file"></router-link>
	 <router-link to="/linkageunit/index" class="unit"></router-link>
	 <router-link to="/account/index" class="account"></router-link>
	 <router-link to="/Jurisdiction/index" class="jurisdiction"></router-link>
	 <router-link to="/single/index" class="single"></router-link>
	 <router-link to="/keyWord/index" class="keyword"></router-link>
	 <router-link to="/history/index" class="history"></router-link>
 </div> 
</template>
<style lang="stylus" scoped>
div
	width 100%
	height 100%
	background rgb(238,238,238)
	a
		display block
		float left
		width 31%
		height 30%
		margin 1.5% 1% 0% 1%
	.water
		background-image url(home01.png)
		background-size 100% 100%
		background-repeat no-repeat
	.file
		background-image url(home02.png)
		background-size 100% 100%
		background-repeat no-repeat
	.unit
		background-image url(home03.png)
		background-size 100% 100%
		background-repeat no-repeat
	.account
		background-image url(home04.png)
		background-size 100% 100%
		background-repeat no-repeat
	.jurisdiction
		background-image url(home05.png)
		background-size 100% 100%
		background-repeat no-repeat
	.single
		background-image url(home06.png)
		background-size 100% 100%
		background-repeat no-repeat
	.keyword
		background-image url(home07.png)
		background-size 100% 100%
		background-repeat no-repeat
	.history
		background-image url(home08.png)
		background-size 100% 100%
		background-repeat no-repeat
</style>