let productGallery = null;
let selectColor = null;

function initProductGallery(section) {
  const productGalleryElement = section.querySelector(".product-gallery");
  if (productGalleryElement) {
    if (productGallery) {
      productGallery.destroy(true, true);
      productGallery = null;
    }
    const settings = JSON.parse(productGalleryElement.dataset.swiperSettings);

    selectColor = $(document).find('input[name*="Color"]:checked').val();
    const allImages = [];
    $(".all-slider-images .temp-image").each((index, item) => {
      const img = $(item).attr("data-src");
      const alt = $(item).attr("data-alt");
      allImages.push({ img, alt });
    });

    const showImages = allImages.filter(
      (imageInfo) => imageInfo.alt == selectColor
    );
    let htmlImages = "";

    showImages.map((image) => {
      htmlImages += `<div class="swiper-slide"><img src="${image.img}" alt="${image.alt}"></div>`;
    });

    $(".product-gallery .swiper-wrapper").html(htmlImages);

    const swiperOptions = {
      slidesPerView: settings.slidesPerDesktop,
      spaceBetween: settings.spaceBetween,
      observer: true,
      observeParents: true,
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

$(function () {
  const productSection = document.querySelector(
    '[data-section-type="main-product"]'
  );
  if (productSection) {
    initProductGallery(productSection);
  }

  $(document).on("change", ".swatch-input__input", function () {
    initProductGallery(productSection);
  });
});

document.addEventListener("shopify:section:load", function (event) {
  const productSectionType = document.querySelector(
    '[data-section-type="main-product"]'
  );
  const productSectionId = productSectionType.dataset.sectionId;
  if (event.detail.sectionId === productSectionId) {
    initProductGallery(productSectionType);
  }
});

document.addEventListener("shopify:section:reloaded", function (event) {
  const productSectionType = document.querySelector(
    '[data-section-type="main-product"]'
  );
  const productSectionId = productSectionType.dataset.sectionId;
  if (event.detail.sectionId === productSectionId) {
    initProductGallery(productSectionType);
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
