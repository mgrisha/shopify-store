document.addEventListener("DOMContentLoaded", function () {
  const productGallerySwiper = document.querySelector(".product-gallery");

  if (productGallerySwiper) {
    const settings = JSON.parse(productGallerySwiper.dataset.swiperSettings);

    console.log(settings);

    const swiperOptions = {
      slidesPerView: settings.slidesPerDesktop,
      spaceBetween: settings.spaceBetween,
      loop: true,
      pagination: settings.showPagination
        ? {
            el: ".swiper-pagination",
            clickable: true,
          }
        : false,
      navigation: settings.showNavigation
        ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }
        : false,
      breakpoints: {
        0: {
          slidesPerView: settings.slidesPerMobile,
        },
        768: {
          slidesPerView: settings.slidesPerTablet,
        },
        1024: {
          slidesPerView: settings.slides_per_view_desktop,
        },
      },
    };

    new Swiper(productGallerySwiper, swiperOptions);
  }
});
