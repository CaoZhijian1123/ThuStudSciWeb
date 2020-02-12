const selectedTagSwiper = new Swiper('#selected-tag', {
    autoplay: {
        delay: 2000
    },
    speed: 1000,
    autoplayDisableOnInteraction: false,
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    onInit: function (swiper) {
        swiper.slides[2].className = "swiper-slide swiper-slide-active";//第一次打开不要动画
    },
    breakpoints: {
        668: {
            slidesPerView: 1,
        }
    }
});