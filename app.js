$(document).ready(function(){
  $('.example-slider').slick({
    arrows: false,
    dots: false, // Показывать точки для навигации
    draggable: false,
    waitForAnimate: false,
    variableWidth: true, // Разрешение на использование ширины, заданной в стилях
    infinite: true, // Бесконечная прокрутка
    speed: 500, // Скорость перехода в мс
    slidesToShow: 4, // Количество видимых слайдов
    slidesToScroll: 1 // Количество слайдов при скролле
  });


  $('.example-slider-prew').on('click', function (action) {
    action.preventDefault()
    $('.example-slider').slick('slickPrev')
  })

  $('.example-slider-next').on('click', function (action) {
    action.preventDefault()
    $('.example-slider').slick('slickNext')
  })

  $('.example-slider').on('afterChange', function(event, slick, currentSlide) {
    let totalSlides = slick.slideCount; // общее количество слайдов
    let current = currentSlide + 1; // текущий слайд (индекс начинается с 0)
    $('.example-slider-counter').text(current + ' из ' + totalSlides);
  });

  // Устанавливаем начальное значение счётчика при загрузке
  let initialTotal = $('.example-slider').slick('getSlick').slideCount;
  $('.example-slider-counter').text('1 из ' + initialTotal);
})