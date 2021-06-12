//开启首页动画
startHls();
changeFocusWeb(
				"我藏好了哦~",
				"https://file.ajungle.cn/img/hashiqi.png",
				"被你发现了",
				"https://file.ajungle.cn/img/cry.png",
				"https://file.ajungle.cn/img/favicon.png",
				true,
				1000,
				5000
			)
/**
*
* 开启首页动画
*
**/
function startHls(){

		if (Hls.isSupported()) {

	    let headerId = document.getElementById('page-header');
	    let str = "<video id='video' onclick='muteControl()' controlslist='nodownload'  disablePictureInPicture preload muted loop autoplay style='height: 100%;width: 100%;object-fit: fill;''></video>";
	    headerId.innerHTML+=str;
	    let video = document.getElementById('video');
	    let videoSrc = "";
	    let randomNum = Math.floor(Math.random()*10) % 5;
	    if(randomNum === 0){
			videoSrc = 'https://file.ajungle.cn/img/index.m3u8';
	    }else if(randomNum === 1){
	    	videoSrc = 'https://file.ajungle.cn/img/addc.m3u8';
	    }else if(randomNum === 2){
	    	videoSrc = 'https://file.ajungle.cn/img/CanonRock.m3u8';
	    }else if(randomNum === 3){
	    	videoSrc = 'https://file.ajungle.cn/img/LemonTree.m3u8';
	    }else if(randomNum === 4){
	    	videoSrc = 'https://file.ajungle.cn/img/Maroon5.m3u8';
	    }
	    showMusicButton();
	    
	    let hls = new Hls();
	    hls.loadSource(videoSrc);
	    hls.attachMedia(video);
	    hls.on(Hls.Events.MANIFEST_PARSED, function() {
	        video.play();
	    });
	}
}

function showMusicButton(){

	let musicIcon;

	let video = document.getElementById('video');

	if(!video.muted){

		musicIcon = "https://file.ajungle.cn/img/buttle_%E5%BC%80%E5%90%AF%E5%A3%B0%E9%9F%B3.png";

	}else{

		musicIcon = "https://file.ajungle.cn/img/buttle_%E5%85%B3%E9%97%AD%E5%A3%B0%E9%9F%B3.png";
	}

	let musicButton = "<button onclick='muteControl()' id='musicButtonId'  style='float:right;margin-top:8px;margin-right:20px;width: 25px; height: 25px;; border-radius: 15px;cursor: pointer;background: url("+musicIcon+") no-repeat;background-size: contain;'></button>";

	let musicWrap = document.getElementById('blog_name');

	musicWrap.innerHTML+=musicButton;

}

function muteControl() {
	let video = document.getElementById('video');
	let musicButton = document.getElementById('musicButtonId');

	if(video.muted){

		video.muted=false;
		musicButton.style.backgroundImage="url(https://file.ajungle.cn/img/buttle_%E5%BC%80%E5%90%AF%E5%A3%B0%E9%9F%B3.png)";
	}else{

		video.muted=true;
		musicButton.style.backgroundImage="url(https://file.ajungle.cn/img/buttle_%E5%85%B3%E9%97%AD%E5%A3%B0%E9%9F%B3.png)";

	}
}

/**
 * @param {String} leaveWebTitle 离开页面展示的标题
 * @param {String} leaveWebIconURL 离开页面展示的图标
 * @param {String} returnWebTitle 返回页面展示的标题
 * @param {String} returnWebIconURL 返回网站展示的标题
 * @param {String} defaultWebIconURL 网页初始没有图标默认展示的图标(正常状态)
 * @param {boolean} isScrollText 文字是否滚动展示
 * @param {long} scrollTextAfterTime 多久时间后开始滚动展示
 * @param {long} backToOriginTime 返回页面后多久恢复正常展示状态
 */
function changeFocusWeb(
	leaveWebTitle,
	leaveWebIconURL,
	returnWebTitle,
	returnWebIconURL,
	defaultWebIconURL,
	isScrollText,
	scrollTextAfterTime,
	backToOriginTime
) {
	let iconOrigin = document.querySelector('link[rel="icon"]');
	let icon;
	let title;
	let OriginFavicon = iconOrigin == null ? defaultWebIconURL : iconOrigin.href;
	let OriginTitile = document.title;
	let titleTime;

	let text;
	let timerIdAug;
	let intervelArray = new Array();

	document.addEventListener('visibilitychange', function() {
		if (document.hidden) {

			title = leaveWebTitle;
			icon = leaveWebIconURL;

			document.title = title;
			changeFavicon(icon);

			clearTimeout(titleTime);
		} else {

			title = returnWebTitle;
			icon = returnWebIconURL;

			document.title = title;
			changeFavicon(icon);

			titleTime = setTimeout(function() {
				clearAllIntervel();
				document.title = OriginTitile;
				chanageFavicon(OriginFavicon);
			}, backToOriginTime);
		}
		if (isScrollText) {
			text = document.title;
			setTimeout(function() {

				newtext();

			}, scrollTextAfterTime);
		}
	});
	const changeFavicon = link => {
		let $favicon = document.querySelector('link[rel="icon"]');
		// If a <link rel="icon"> element already exists,
		// change its href to the given link.
		if ($favicon !== null) {
			$favicon.href = link;
			// Otherwise, create a new element and append it to <head>.
		} else {
			$favicon = document.createElement("link");
			$favicon.rel = "icon";
			$favicon.href = link;
			document.head.appendChild($favicon);
		}
	};
	function newtext() {
		if (timerIdAug != undefined) {
			clearTimeout(timerIdAug)
		}
		document.title = text.substring(1, text.length) + text.substring(0, 1)
		text = document.title.substring(0, text.length)
		timerIdAug = setTimeout(newtext, 1000);
		intervelArray.push(timerIdAug);
	}
	function clearAllIntervel() {

		for (let i = 0; i < intervelArray.length; i++) {

			clearTimeout(intervelArray[i]);

		}

	}
	function chanageFavicon(myData){
		let $favicon = document.querySelector('link[rel="icon"]');
		// If a <link rel="icon"> element already exists,
		// change its href to the given link.
		console.log(myData)
		if ($favicon !== null) {
			
			$favicon.href = myData;
			// Otherwise, create a new element and append it to <head>.
		} else {
			$favicon = document.createElement("link");
			$favicon.rel = "icon";
			$favicon.href = myData;
			document.head.appendChild($favicon);
		}
	}
}



