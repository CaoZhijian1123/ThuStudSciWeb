$(document).ready(() => {
    if (this.isVisited()) {
        let openDom = document.getElementById("open");
        if (openDom) {
            openDom.remove();
        }
        let bodyDom = document.querySelector('div.l_body');
        if (bodyDom) {
            bodyDom.style.opacity = 1;
        }
        console.log('当前已经访问过');
    } else {
        // 初始化开屏广告
        this.initOpenScreenVideo();
        // 保存访问者的ip
        this.storeVisitedUser();
        // 显示当前文案
        this.displayDescription();
        // 设置开屏按钮中的文案倒计时
        this.refreshOpenBtnText();
        // 立即开启按钮点击事件
        $('#open-btn').click(() => {
            this.removeOpenScreen();
        });
    }
});

/**
 * 显示当前开屏视频上的文案
 */
function displayDescription() {
    let title = document.getElementById('open-title');
    if (title) {
        title.style.opacity = 1;
    }
    let openBtn = document.getElementById('open-btn');
    if (openBtn) {
        openBtn.style.opacity = 1;
    }
}

/**
 * 刷险当前按钮文案
 * @returns {Promise<void>}
 */
async function refreshOpenBtnText() {
    for (let i = 5; i > 0; i--) {
        let openBtn = document.getElementById('open-btn');
        if (openBtn) {
            openBtn.innerText = `立即开启(${i}s)`
        }
    }
    // 超过默认的时间后，主动去除开屏动画
    this.removeOpenScreen();
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

function initOpenScreenVideo() {
    let openDom = document.getElementById("open");
    if (openDom) {
        openDom.style.width = `${window.screen.width}px`;
        openDom.style.height = `${window.screen.height}px`;
        openDom.style.opacity = 1;
    }
}

function removeOpenScreen() {
    let openDom = document.getElementById("open");
    if (!openDom) {
        return;
    }
    let className = openDom.className;
    if (className.indexOf('animated fadeOutUp faster') !== -1) {
        return;
    }
    openDom.className = openDom.className + ' animated fadeOutUp faster';
    openDom.addEventListener('animationend', function () {
        openDom.remove();
        let bodyDom = document.querySelector('div.l_body');
        if (bodyDom) {
            bodyDom.style.opacity = 1;
        }
    });
}


function storeVisitedUser() {
    this.setLocalStorage('codercc', true);
}

function isVisited() {
    return !!this.getLocalStorage('codercc');
}


function setLocalStorage(key, value) {
    var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
    var valueDate = JSON.stringify({
        val: value,
        timer: curtime
    });
    try {
        localStorage.setItem(key, valueDate);
    } catch (e) {
        // 兼容性写法
        if (isQuotaExceeded(e)) {
            console.log("Error: 本地存储超过限制");
            localStorage.clear();
        } else {
            console.log("Error: 保存到本地存储失败");
        }
    }
}


function getLocalStorage(key) {
    var exp = 24 * 60 * 60 * 1000; // 一天的秒数
    if (localStorage.getItem(key)) {
        var vals = localStorage.getItem(key); // 获取本地存储的值
        var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
        // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
        var isTimed = (new Date().getTime() - dataObj.timer) > exp;
        if (false) {
            console.log("存储已过期");
            localStorage.removeItem(key);
            return null;
        } else {
            var newValue = dataObj.val;
        }
        return newValue;
    } else {
        return null;
    }
}