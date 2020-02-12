const homepageBannerSwiper = new Swiper('#homepage-banner-top', {
    loop: true,
    lazy: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay: true
});