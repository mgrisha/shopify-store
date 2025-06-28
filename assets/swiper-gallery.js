document.addEventListener("DOMContentLoaded", function () {
  const productGallerySwiper = document.querySelector(".product-gallery");

  if (productGallerySwiper) {
    const settings = JSON.parse(productGallerySwiper.dataset.swiperSettings);

    const swiperOptions = {
      slidesPerView: settings.slidesPerDesktop,
      spaceBetween: settings.spaceBetween,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        enabled: settings.showNavigation,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        enabled: settings.showPagination,
      },
      breakpoints: {
        0: {
          slidesPerView: settings.slidesPerMobile,
        },
        768: {
          slidesPerView: settings.slidesPerTablet,
        },
        1024: {
          slidesPerView: settings.slidesPerDesktop,
        },
      },
    };

    const productGallery = new Swiper(productGallerySwiper, swiperOptions);

    productGallery.update();
  }
});
