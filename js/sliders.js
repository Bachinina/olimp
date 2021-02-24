$(document).ready(function () {
  $.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
  };

  // SLIDERS
  const screenWidth = $(document).width();
  const prevArrow = `
  <button type="button" class="slick-prev" aria-hidden="true">
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <use xlink:href="#icon-arrow-prev"></use>
    </svg>
  </button>`;
  const nextArrow = `
  <button type="button" class="slick-next" aria-hidden="true">
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <use xlink:href="#icon-arrow-next"></use>
    </svg>
  </button>`;

  // Брейкпоинты для разрешений
  const media = {
    MD: 767,
    LG: 991,
    XL: 1199,
    XXL: 1439,
  };

  $('[data-main-slider]').each(function () {
    $(this).slick({
      fade: true,
      accessibility: false,
      speed: 200,
      draggable: false,
      // waitForAnimate: true,
      dots: false,
      arrows: false,
      autoplay: false,
      responsive: [{
        breakpoint: 1199,
        settings: {
          draggable: true,
        }
      }]
    });
  });

  $('[data-prod-slider]').each(function () {
    $(this).slick({
      fade: true,
      accessibility: false,
      speed: 800,
      draggable: false,
      waitForAnimate: true,
      dots: true,
      arrows: true,
      prevArrow: prevArrow,
      swipeToSlide: true,
      nextArrow: nextArrow,
      autoplay: false,
      autoplaySpeed: 5000,
      responsive: [{
        breakpoint: 1199,
        settings: {
          draggable: true,
          speed: 150,
          fade: false,
        }
      }]
    });
  });


  $('[data-slider]').each(function () {
    const slider = $(this);

    // Общие настройки атрибутов для всех слайдеров: количество слайдов на разрешениях, зацикленность
    // _____________________________________
    const isLooped = slider.hasAttr('data-loop') ? slider.attr('data-loop') === "true" : true;
    const isFaded = slider.hasAttr('data-fade') ? slider.attr('data-fade') === "true" : false;
    const isVariableWidth = slider.attr('data-variable') === 'true';
    // _____________________________________


    // _____________________________________
    // Количество слайдов на разрешениях
    // slideCount - количество слайдов, отображаемое в мобилке
    let slideCount = slider.attr('data-slide-count');
    const slideCountMD = slider.attr('data-slide-md-count');
    const slideCountLG = slider.attr('data-slide-lg-count');
    const slideCountXL = slider.attr('data-slide-xl-count');
    const slideCountXXL = slider.attr('data-slide-xxl-count');

    const setCount = function () {
      if (screenWidth > media.XXL) {
        if (slideCountXL !== undefined) {
          slideCount = slideCountXL;
        } else if (slideCountLG !== undefined) {
          slideCount = slideCountLG;
        } else if (slideCountMD !== undefined) {
          slideCount = slideCountMD;
        }
      } else if (screenWidth <= media.XXL && screenWidth > media.XL) {
        if (slideCountLG !== undefined) {
          slideCount = slideCountLG;
        } else if (slideCountMD !== undefined) {
          slideCount = slideCountMD;
        }
      } else if (screenWidth <= media.XL && screenWidth > media.LG) {
        if (slideCountMD !== undefined) {
          slideCount = slideCountMD;
        }
      } else if (screenWidth <= media.LG && screenWidth > media.MD) {
        slideCount = slideCount;
      }
    };


    if (screenWidth > media.XXL) {
      if (slideCountXXL !== undefined) {
        slideCount = slideCountXXL;
      } else {
        setCount();
      }
    } else if (screenWidth <= media.XXL && screenWidth > media.XL) {
      if (slideCountXL !== undefined) {
        slideCount = slideCountXL;
      } else {
        setCount();
      }
    } else if (screenWidth <= media.XL && screenWidth > media.LG) {
      if (slideCountLG !== undefined) {
        slideCount = slideCountLG;
      } else {
        setCount();
      }
    } else if (screenWidth <= media.LG && screenWidth > media.MD) {
      if (slideCountMD !== undefined) {
        slideCount = slideCountMD;
      } else {
        setCount();
      }
    } else if (screenWidth <= media.MD) {
      slideCount = slideCount;
    }
    // _____________________________________

    // Если слайдер в табах - вынос кнопок за пределы
    // Все кнопки вынесены за пределы слайдера. Контейнер для кнопок
    let buttonContainer = $(this).closest('[data-slider-container]').find('[data-slider-btns]');

    // Если слайдер в табах, задаем обертки для кнопок. Они будут скрываться и открывать по очереди
    const isInTab = $(this).closest('[data-tabs-item]').length > 0;
    if (isInTab) {
      var tabNumber = $(this).closest('[data-tabs-item]').attr('data-tabs-item');
      var wrapForBtns = $(`<div data-tabs-item='${tabNumber}'></div>`);
      buttonContainer = buttonContainer.append(wrapForBtns);
    }
    // _____________________________________

    slider.settings = {};
    slider.settings.slideCount = slideCount;
    slider.settings.isLooped = isLooped;
    slider.settings.isFaded = isFaded;
    slider.settings.isVariableWidth = isVariableWidth;
    slider.settings.buttonContainer = isInTab ? buttonContainer.find(`[data-tabs-item ='${tabNumber}']`) : buttonContainer.length > 0 ? buttonContainer : slider;

    // _____________________________________
    // Индивидуальные настройки слайдеров
    if (slider.hasAttr('data-simple-slider')) {
      $(this).slick({
        accessibility: false,
        speed: slider.settings.isFaded ? 900 : 600,
        draggable: false,
        fade: isFaded,
        slidesToShow: slider.settings.slideCount,
        dots: false,
        arrows: true,
        prevArrow: prevArrow,
        swipeToSlide: true,
        nextArrow: nextArrow,
        variableWidth: !!slider.settings.isVariableWidth,
        infinite: !!slider.settings.isLooped,
        appendArrows: slider.settings.buttonContainer,
        responsive: [{
          breakpoint: 1199,
          settings: {
            draggable: true,
            speed: 150,
          }
        }]
      });
    }
  });


  $('[data-double-slider]').each(function () {
    const wrap = $(this);
    const first = wrap.find('[data-double-first]');
    const second = wrap.find('[data-double-second]');
    first.slick({
      asNavFor: second,
      slidesToShow: 3,
      arrows: false,
      speed: 500,
      accessibility: false,
      draggable: false,
      swipeToSlide: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          draggable: true,
          speed: 150,
          slidesToShow: 2,
        }
      }]
    });
    second.slick({
      asNavFor: first,
      slidesToShow: 3,
      speed: 500,
      arrows: true,
      prevArrow: prevArrow,
      swipeToSlide: true,
      nextArrow: nextArrow,
      appendArrows: wrap.find('[data-slider-btns]'),
      accessibility: false,
      draggable: false,
      responsive: [{
        breakpoint: 1200,
        settings: {
          draggable: true,
          speed: 150,
          slidesToShow: 2,
        }
      }]
    });

  })


});
