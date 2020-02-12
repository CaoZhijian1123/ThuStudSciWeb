function scrollFixedTop(id, topOffestHeight = 100, fixedClazz) {
    let topScroll = window.pageYOffset;//滚动的距离,距离顶部的距离
    let targetDom = document.getElementById(id);//获取到导航栏id
    if (targetDom) {
        let className = targetDom.className;
        if (topScroll > topOffestHeight) {
            if (className.indexOf('fixed') === -1) {
                targetDom.setAttribute('class', className + ' fixed');
            }
        } else {
            if (className.indexOf('fixed') !== -1) {
                let newClazz = className.replace('fixed', '');
                targetDom.setAttribute('class', newClazz);
            }
        }
    }
}

function initScrollFixedTopDom() {
    // 相关文章
    scrollFixedTop('related-posts', 827, 'fixed');
    scrollFixedTop('toc', 1070, 'fixed');
}

window.onscroll = initScrollFixedTopDom;