$(window).on('load', (function () {
  const screenWidth = $(window).width();
  // Брейкпоинты для разрешений
  const media = {
    MD: 767,
    LG: 991,
    XL: 1199,
    XXL: 1439,
  };


  $('[data-bottom-desc]').each(function () {
    const block = $(this);
    const tabs = [];
    const tabsContent = [];
    const img = [];
    block.find('.right_tabs_seo > ul li').each(function () {
      tabs.push($(this).html());
    });
    block.find('.right_tabs_seo > div').each(function () {
      tabsContent.push($(this).html());
    });
    block.find('.left_img_seo > img').each(function () {
      img.push($(this)[0].currentSrc);
    });

    if (tabs.length > 0) {
      block.html(`
      <div class="container container--content pt-0">
          <div class="top">
            <div class="tabs-wrap">
              <ul class="tabs" data-tabs="tabs-bottom">
              ${tabs.map(function (el, i) {
                return `
                <li class="tabs__toggle" data-tabs-toggle="tab-${i+1}"><button aria-hidden="true">${el}</button>
                </li>`;
              }).join('')}
              </ul>
            </div>
          </div>

          <div class="tabs-cont" data-tabs-content="tabs-bottom">
          ${tabsContent.map(function (el, i) {
            return `
            <div class="tabs-cont__item" data-tabs-item="tab-${i+1}">
              <div class="row">
                <div class="col-12 col-md-4 mb-3">
                  <img alt="" src="${img[i]}">
                </div>
                <div class="col-12 col-lg-8">
                  ${el}
                </div>
              </div>
            </div>`;
          }).join('')}
          </div>
        </div>
      `);
    } else {
      block.addClass('bg--gray');
    }
  });

  // REVIEWS
  $('[data-review]').each(function () {
    const review = $(this);
    const text = review.find('[data-review-text]');

    if (text.text().length > 375) {
      review.addClass('long');
    }
  });



  // SCROLLING 
  $('.header').each(function () {
    const header = $(this);
    const onWindowScroll = function () {
      if ($(window).width() <= media.XL) {
        if ($(this).scrollTop() > 0) {
          $('main').css({
            'padding-top': header.height()
          });
          header.addClass('fixed');

        } else {
          header.removeClass('fixed');
          $('main').css({
            'padding-top': 0
          });
        }
      }
    };

    const onWindowResize = function () {
      if ($(window).width() <= media.XL) {
        onWindowScroll();
      } else {
        $('main').css({
          'padding-top': header.height()
        });
      }
    };


    $(window).on('scroll', onWindowScroll);
    $(window).on('resize', onWindowResize);

    if ($(window).width() > media.XL) {
      onWindowResize();
    }
  });


  $('[data-open-menu]').on('click', function () {
    $('[data-menu]').addClass('active');
    $('body').css({
      'overflow': 'hidden',
    });
  });
  $('[data-close-menu]').on('click', function () {
    $('[data-menu]').removeClass('active');
    $('body').css({
      'overflow': 'auto',
    });
    $('[data-menu-item]').removeClass('active')
  });


  $('[data-menu-item]').each(function () {
    const item = $(this);
    const toggle = item.find('[data-menu-item-toggle]');
    toggle.on('click', function (event) {
      if (screenWidth < media.XL) {
        event.preventDefault();
        item.toggleClass('active');
        $('[data-menu-item]').not(item).removeClass('active');
      }
    });
  });



  // TABS
  $('[data-tabs]').each(function () {
    const tabToggles = $(this).find('[data-tabs-toggle]');
    const content = $(`[data-tabs-content='${$(this).attr('data-tabs')}']`);

    let activeTab = 0;

    tabToggles.each(function (i) {
      if ($(this).hasClass('active')) {
        activeTab = i;
      }

      $(this).on('click', function (e) {
        e.preventDefault();

        const tabContent = $(content).find(`[data-tabs-item='${$(this).attr('data-tabs-toggle')}']`);

        // DEL ACTIVE CLASS
        tabToggles.not($(this)).removeClass('active');
        content.find('[data-tabs-item]').removeClass('active');

        // ADD ACTIVE CLASS
        $(this).addClass('active');
        $(tabContent).addClass('active');
      });
    });
    tabToggles[activeTab].click();
  });

  // ACCORDION
  $('[data-acc]').each(function () {
    const acc = $(this);
    const isOne = acc.attr('data-acc-one') === 'true';

    const items = acc.find('[data-acc-item]');
    const btns = acc.find('[data-acc-title]');
    const bodies = acc.find('[data-acc-body]');

    items.each(function () {
      const btn = $(this).find('[data-acc-title]');
      const body = $(this).find('[data-acc-body]');

      btn.on('click', function () {
        if (isOne) {
          btns.not($(this)).removeClass('active');
          bodies.not(body).slideUp(500, window.floating);
        }

        if ($(this).hasClass('active')) {
          $(this).trigger('blur');
        }

        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
          body.slideDown(500, window.floating);
        } else {
          body.slideUp(500, window.floating);
        }
      });
    });

    if (screenWidth <= media.XL) {
      btns.removeClass('active');
    }
  });
  $('[data-acc-title].active').next().slideDown(0);


  // SCROLL ANCHOR
  $("a[href^='#']").on("click", function (e) {
    var fixed_offset = $('.header').outerHeight() + 30;
    // if ($(window).width() <= 1199) {
    // fixed_offset = 35 + 65;
    // }
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
    return false;
  });

  // SCROLL TO TOP
  if (screenWidth > media.MD) {
    function scrollToTop() {
      let button = $('[data-scroll-top]');

      $(window).on('scroll', () => {
        if ($(this).scrollTop() >= 250) {
          button.fadeIn();
        } else {
          button.fadeOut();
        }
      });

      button.click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 800);
      })
    };
    scrollToTop();

  }



  //NUMBER_FORMAT
  function formatNumber(number) {
    let result = number.val();
    result = result.replace(/\s+/g, '');
    result = result.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
    result = result.replace(/^\s/g, '');

    return result;
  };

  // RANGE
  $('[data-range]').each(function () {
    const range = $(this);
    const nameOfInput = `${range.attr('data-range')}`;

    const minInput = $(`[data-range-min="${nameOfInput}"]`);
    const valueInput = $(`[data-range-value='${nameOfInput}']`);

    range.on('input', function () {

      valueInput.val(formatNumber(range))
    });
  });

  // RANK
  $('[data-rank]').each(function () {
    const value = $(this).attr('data-rank-value');
    const items = $(this).find('[data-rank-item]');

    items.each(function (i) {
      if (i < value) {
        $(this).addClass('active');
      }
    })
  });

  // RANK SELECT
  $('[data-rank-select]').each(function () {
    let selectedValue = '';

    const items = $(this).find('[data-rank-item]');
    const input = $($(this).attr('data-rank-input'));

    function onRankMouseover(rank) {
      items.removeClass('active');
      items.each(function (i) {
        if (i <= rank) {
          $(this).addClass('active');
        }
      });
    };

    function onRankMouseout() {
      items.removeClass('active');
    };

    function onRankClick() {
      items.removeClass('active');
      items.each(function (i) {
        if (i < selectedValue) {
          $(this).addClass('active');
        }
      });
      input.val(selectedValue);
    };


    items.each(function (i) {
      $(this).on('mouseover', function () {
        onRankMouseover(i);
      });
      $(this).on('mouseout', onRankMouseout);

      $(this).on('click', function () {
        selectedValue = $(this).attr('data-rank-value');

        // DEL EVENT LISTENERS
        items.each(function () {
          $(this).off('mouseover');
          $(this).off('mouseout');
        });
        $(this).addClass('active');

        onRankClick();
      });
    })
  });

  // INPUT COUNT
  $('[data-count]').each(function () {
    const input = $(this).find('input');
    const plus = $(this).find('[data-count-plus]');
    const minus = $(this).find('[data-count-minus]');


    minus.on('click', function () {
      if (input.val() > 1) {
        const current = parseInt(input.val());
        input.val(current - 1);
      }
    });
    plus.on('click', function () {
      if (input.val() < parseInt(input.attr('max'))) {
        const current = parseInt(input.val());
        input.val(current + 1);
      }
    });
  });


  // FLOATING BLOCK
  if (screenWidth > media.XL) {
    $('[data-floating-container]').each(function () {
      const container = $(this);
      const block = container.find('[data-floating]');

      window.floating = function () {
        let containerTop = container.offset().top - $('header').height() - 20;
        let containerBottom = containerTop + container.height();

        let top = $(window).scrollTop();
        if (top > containerTop) {
          if (top >= containerBottom - block.height()) {
            block.css({
              'top': `${container.height() - block.height()}px`,
            });
          } else {
            block.css({
              'top': `${top -  containerTop}px`,
            });
          }
        } else {
          block.css({
            'top': `0`,
          });
        }
      };

      container.addClass('floating-container');
      block.addClass('floating');

      $(window).on('scroll', $.debounce(100, function () {
        window.floating();
      }));

      window.floating();



      // if (top > containerTop) {
      //   block.addClass('floating');
      //   if (top >= containerBottom - block.height()) {
      //     block.css({
      //       'position': 'absolute',
      //       'top': `${container.height() - block.height()}px`,
      //     });
      //   } else {
      //     block.css({
      //       'position': 'fixed',
      //       'top': '20px'
      //     });
      //   }
      // } else {
      //   block.removeClass('floating');
      // }
    });
  }


  //BTNS
  $('[data-btn]').on('click', function () {
    $(this).toggleClass('active');
    $('[data-btn]').not($(this)).removeClass('active');
  });


  // MODAL TOGGLE
  $('[data-toggle-modal]').on('click', function (event) {
    event.stopPropagation();
    $('[data-toggle-modal]').not($(this)).removeClass('active');
    $('[data-modal]').not($(this).attr('data-toggle-modal')).removeClass('active');

    $($(this).attr('data-toggle-modal')).toggleClass('active');
    $(this).toggleClass('active');

    if (!$(this).hasClass('active')) {
      $(this).blur();
    }

    if ($($(this).attr('data-toggle-modal')).hasClass('active')) {
      document.addEventListener('click', closeAll);
    }
  });

  const closeModals = function () {
    $('[data-modal]').removeClass('active');
    $('[data-toggle-modal]').removeClass('active');
    $('[data-toggle-modal]').blur();
    $('[data-open-modal]').blur();
    $('[data-modal]').find('form').trigger("reset");
    $('[data-modal]').find('form .invalid').removeClass('invalid');
    $('body').css({
      'overflow': 'auto',
    });
    document.removeEventListener('click', closeAll);
  }

  const closeAll = function (evt) {
    if (!evt.target.hasAttribute('data-modal') && evt.target.closest('[data-modal]') === null) {
      closeModals();
    }
  };


  // OPEN
  $('[data-open]').each(function () {
    const btn = $(this);
    const btnText = btn.html();
    const elem = $(`[data-opened=${btn.attr('data-open')}]`);

    btn.on('click', function () {
      elem.toggleClass('active');

      if (elem.hasClass('active')) {
        $(this).html(`
      <svg width="12" height="10" fill="none">
        <use xlink:href="#icon-arrow-bottom-up"></use>
      </svg>
      <span>Свернуть</span>
    `)
      } else {
        $(this).html(`${btnText}`);
      }
    });
  });

  // TOGGLE
  $('[data-toggle]').on('click', function () {
    const elem = $(`[data-toggled=${$(this).attr('data-toggle')}]`);
    const otherBtns = $(`[data-toggle=${$(this).attr('data-toggle')}][data-toggle-hidden]`);
    elem.toggleClass('active');

    if (elem.hasClass('active')) {
      otherBtns.addClass('d-none');
    } else {
      otherBtns.removeClass('d-none');
    }
  });



  // MODAL OPENING
  $('[data-open-modal]').on('click', function () {
    const modal = $($(this).attr('data-open-modal'));
    closeModals();
    $(this).blur();
    modal.addClass('active');
  });

  // MODAL CLOSING
  const modals = $('[data-modal]');
  const closeModalsByEsc = (evt) => {
    if (evt.keyCode === 27) {
      closeModals();
    }
  };
  modals.each(function () {
    let modalClose = $(this).find('[data-modal-close]');

    const closeModal = () => {
      $(this).removeClass('active');
      $('[data-toggle-modal]').removeClass('active');
      $('[data-toggle-modal]').blur();

      const form = $(this).find('form');
      if (form) {
        // CLEAR FORM
        form.trigger("reset");
      }
      document.removeEventListener('click', closeAll);
    };

    $(this).on('click', function (e) {
      if ($(e.target).is($(this)) && $(this).find('[data-modal-container]').length) {
        closeModal();
      }
    });

    modalClose.on('click', closeModal);
  });
  $(document).on('keydown', closeModalsByEsc);

  $('[data-toggle-active]').each(function () {
    $(this).on('click', function () {
      $(this).toggleClass('active');
    });
  });

  // VALIDATION
  $('[required]').on("invalid", function (event) {
    $(this).addClass('invalid');
  });

  // RELOAD ON CLICK
  $('[data-reloader]').on('click', function () {
    setTimeout(function () {
      window.location.reload();
    }, 500);
  });
}));
