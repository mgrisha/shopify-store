let productGallery = null;

function initProductGallery(section) {
  const productGalleryElement = section.querySelector(".product-gallery");
  if (productGalleryElement) {
    if (productGallery) {
      productGallery.destroy(true, true);
      productGallery = null;
    }
    const settings = JSON.parse(productGalleryElement.dataset.swiperSettings);

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

    productGallery = new Swiper(productGalleryElement, swiperOptions);

    productGallery.update();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const productSection = document.querySelector(
    '[data-section-type="main-product"]'
  );
  if (productSection) {
    initProductGallery(productSection);
  }
});

document.addEventListener("shopify:section:load", function (event) {
  const productSectionId = document.querySelector(
    '[data-section-type="main-product"]'
  ).dataset.sectionId;
  if (event.detail.sectionId === productSectionId) {
    initProductGallery(event.detail.section);
  }
});

document.addEventListener("shopify:section:reloaded", function (event) {
  const productSectionId = document.querySelector(
    '[data-section-type="main-product"]'
  ).dataset.sectionId;
  if (event.detail.sectionId === productSectionId) {
    initProductGallery(event.detail.section);
  }
});

document.addEventListener("shopify:section:unload", function (event) {
  const productSectionId = document.querySelector(
    '[data-section-type="main-product"]'
  ).dataset.sectionId;
  if (event.detail.sectionId === productSectionId) {
    if (productGallery) {
      productGallery.destroy(true, true);
      productGallery = null;
    }
  }
});
