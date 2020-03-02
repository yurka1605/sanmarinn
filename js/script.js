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
    $(window).scrollTop() > $('.main').offset().top ? 
        $('.fixed-form').addClass('show') : $('.fixed-form').removeClass('show');
});

/** ======================== User actions ========================== **/
// scrool bunner
$('.header .further__arrow, .header .banner__further span').on('click', _ => {
    $('body, html').animate({ 
        scrollTop: $('.main').offset().top - 75,
    }, 300, 'swing');
})
// scrool top
$('.footer .banner__further span,.footer .further__arrow').on('click', function(e) {
    e.preventDefault();
    $('body, html').animate({ 
        scrollTop: 0,
    }, 300, 'swing');
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
    lastSlide($(this).data('num'), $(this).data('img'), this);
});
// banner-slider click control
$('.controls__item').on('click', function() {
    var num = parseInt($('.controls__info .current').text(), 10);
    var max = parseInt($('.controls__info .total').text(), 10);
    if (num !== max && $(this).hasClass('right')) {
        num = num + 1;
    } else if ( num !== 1 && $(this).hasClass('left')) {
        num = num - 1;
    }
    const current = $(`.banner__slider .slider__item:nth-child(${ num })`);
    lastSlide(num, $(current).data('img'), current);
})
// open menu
$('.header__menu_open').on('click', function() {
    $('.header__top').addClass('orange');
    $('.header__menu').addClass('active');
    if ($(window).width() < 1200) {
        $('.header-container').addClass('fullfield');
    } 
});
// close menu
$('.close-btn').on('click', function() {
    $('.header__top').removeClass('orange');
    $('.header__menu').removeClass('active');
    if ($(window).width() < 1200) {
        $('.header-container').removeClass('fullfield');
    } 
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

// cards show all
$('.show-all').on('click', function() {
    $(this).prev().toggleClass('all');
    $(this).prev().removeClass('full');
    $(this).toggleClass('show');
    $('.card').each(function(_,item) {
        $(item).removeClass('full');
        $(item).children('a:last-child').removeClass('more');
    });
});

// card show full
$('.card__info a').on('click', function() {
    $(this).parent().parent().parent().toggleClass('full');
    $(this).parent().parent().toggleClass('full');
    $(this).toggleClass('more');
});

// left menu click
$('.sidebar-list__item').click(function() {
    $('.right-section').each((i, item) => {
        $(item).removeClass('active');
    });
    $('.sidebar-list__item').each((i, item) => {
        if($(this).data('id') === $(item).data('id')) {
            $(item).addClass('active');
            $(`#${ $(this).data('id') }`).addClass('active');
        } else {
            $(item).removeClass('active');
        }
    });
});
// click feedback 
$('.claim-btn').click(function() {
    $('.claim-btn').each(function(_,item) {
        $(item).toggleClass('active');
    });
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
function lastSlide(num, img, current) {
    var currentNum = num - 1;
    var firtsImg = $('.banner__slider .slider__item:first-child');
    var width = firtsImg.width() + 26;
    var style = `background-image: url(${ img });`;

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
    $(firtsSlide).animate({ marginTop: `-${ (num - 1) * height }px`}, 300, function() {
    });
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