$( document ).ready(function() {
    checkScrollHeader();
    $( 'input[type="datetime"]').datepicker({ dateFormat: "dd.mm.yy" });
    // add controls for aboute
    $('.about__slider_items .about__slider_item').each(i => {
        $('.about__controls_nav').append(
            `<div class="about__nav-btn ${ i == 0 ? 'active' : '' }" data-num="${ i + 1 }"></div>`);
    });
});

$(window).on('scroll', function() {
    checkScrollHeader();
});

/** ======================== User actions ========================== **/
// scrool bunner
$('.further__arrow, .banner__further span').on('click', _ => {
    $('body, html').animate({ 
        scrollTop: $('.about-us').offset().top - 75,
    }, 500, 'swing');
})
// + - people 
$('.minus, .plus').on('click', function() {
    var input = $(this).siblings('input');
    var isPlus = $(this).hasClass('plus');
    var val = parseInt(input.val() ? input.val() : 1, 10);
    if (isPlus) {
        input.val(val + 1);
    } else {
        val !== 1 ? input.val(val - 1) : input.val(val);
    }
});
// banner-slider click item
$('.banner__slider .slider__item').on('click', function() {
    lastSlide($(this).data('num'), this);
});
// banner-slider click control
$('.controls__item').on('click', function() {
    var num = parseInt($('.controls__info .current').text(), 10);
    if (num !== 5 && $(this).hasClass('right')) {
        num = num + 1;
    } else if ( num !== 1 && $(this).hasClass('left')) {
        num = num - 1;
    }
    lastSlide(num, $(`.banner__slider .slider__item:nth-child(${ num })`));
})
// open menu
$('.header__menu_open').on('click', function() {
    $('.header__top').addClass('orange');
    $('.header__menu').addClass('active');
});
// close menu
$('.close-btn').on('click', function() {
    $('.header__top').removeClass('orange');
    $('.header__menu').removeClass('active');
});
// click about nav-btn
$('body').on('click', '.about__nav-btn', function() {
    var num = $(this).data('num');
    aboutChangeSlide(num);
});
// click about controls
$('.about__controls').on('click', function() {
    var num = $('.about__nav-btn.active').data('num');
    var lastNum = $('.about__nav-btn:last-child').data('num');

    if ($(this).hasClass('top')) {
        if (num === 1) {
            return false;           
        } else { 
            num--;
        }
    } else {
        num = num === lastNum ? num : num + 1;
    }
    aboutChangeSlide(num);
});

// click stock control
$('.stocks__control').on('click', function() {
    mainChangeSlide('stocks', this);
});

// click stock control
$('.numbers__control').on('click', function() {
    mainChangeSlide('numbers', this);
});
/** ======================== END:User actions ========================== **/


/** ======================== Functions ========================== **/
// scrollHeader
function checkScrollHeader() {
    if ($(window).scrollTop() === 0) {
        $('.header-container').removeClass('scroll');
        $('.header__top').removeClass('scroll');
    } else {
        if ($('.header-container').hasClass('scroll')) {
            return;
        }
        $('.header-container').addClass('scroll');
        $('.header__top').addClass('scroll');
    }
}

// banner change slide
function lastSlide(num, current) {
    var currentNum = num - 1;
    var firtsImg = $('.banner__slider .slider__item:first-child');
    var width = firtsImg.width() + 26;
    var style = `background-image: url(./assets/banner-slider/banner-bg-${ num }.png);`;

    $('.banner__slider .slider__item').each(function() {
        $(this).removeClass('active');
    });
    $(current).addClass('active');
    $(firtsImg).animate({ marginLeft: `-${ currentNum * width }px`}, 300);
    $('.controls__info .current').text(`${ $(current).data('num') }`);
    $('header').attr( 'style', style);
}

// about change slide
function aboutChangeSlide(num) {
    var firtsSlide = $('.about__slider_item:first-child');
    var height = firtsSlide.height() + 40;

    $('.about__nav-btn').each((_,el) => {
        $(el).removeClass('active');
    });
    $(`.about__nav-btn:nth-child(${ num })`).addClass('active');
    $(firtsSlide).animate({ marginTop: `-${ (num - 1) * height }px`}, 300);
}

// main change slide
function mainChangeSlide(selector, current) {
    var firtsSlide = $(`.${ selector }__slider_item:first-child`);
    var num = $(`.${ selector }__slider_item.active`).data('num');
    var lastNum = $(`.${ selector }__slider_item:last-child`).data('num');
    var margin = 15;
    $(`.${ selector }__slider_item`).each((_,el) => {
        $(el).removeClass('active');
    });
    if ($(current).hasClass('left')) {
        num = num === 1 ? num : num - 1;
    } else {
        num = num === lastNum - 2 ? lastNum - 2 : num + 1;
    }
    var left = -margin;
    switch (num) {
        case 1:
            break;
        case 2:
            left = firtsSlide.width() + margin;
            break;
        default:
            left = firtsSlide.width() + margin + (num - 2) * (firtsSlide.width() + margin * 2);
            break;
    }

    $(`.${ selector }__slider_item:nth-child(${ num })`).addClass('active');
    $( firtsSlide ).animate({ marginLeft: `${ - left }px`}, 300);
}
/** ======================== END:Functions ========================== **/