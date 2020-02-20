$( document ).ready(function() {
    $( 'input[type="datetime"]').datepicker({
        dateFormat: "dd.mm.yy"
    });
});

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

// banner-slider
$('.banner__slider .slider__item').on('click', function() {
    lastSlide($(this).data('num'), this);
});

$('.controls__item.right, .controls__item.left').on('click', function() {
    var num = parseInt($('.controls__info .current').text(), 10);
    if (num !== 5 && $(this).hasClass('right')) {
        num = num + 1;
    } else if ( num !== 1 && $(this).hasClass('left')) {
        num = num - 1;
    }
    lastSlide(num, $(`.banner__slider .slider__item:nth-child(${ num })`));
})

function lastSlide(num, current) {
    var currentNum = num - 1;
    var firtsImg = $('.banner__slider .slider__item:first-child');
    var width = firtsImg.width() + 26;
    $('.banner__slider .slider__item').each(function() {
        $(this).removeClass('active');
    });
    $(current).addClass('active');
    $(firtsImg).animate({ marginLeft: `-${ currentNum * width }px`}, 300);
    $('.controls__info .current').text(`${ $(current).data('num') }`);
    var style = `background-image: url(./assets/header/banner-bg-${ num }.png);`
    $('header').attr( 'style', style);
}

$('.header__menu_open').on('click', function() {
    $('.header__top').addClass('orange');
    $('.header__menu').addClass('active');
});

$('.close-btn').on('click', function() {
    $('.header__top').removeClass('orange');
    $('.header__menu').removeClass('active');
});