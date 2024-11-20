$(document).ready(function(){
  /* slick slider ======================================================================================================= */
  
  // Инициализация слайдера
  $('.example-slider').slick({
    arrows: false, // Включаем стрелки
    dots: false, // Показывать точки для навигации
    draggable: false,
    waitForAnimate: false,
    variableWidth: true, // Разрешение на использование ширины, заданной в стилях
    infinite: false, // Бесконечная прокрутка
    speed: 500, // Скорость перехода в мс
    slidesToShow: 4, // Количество видимых слайдов
    slidesToScroll: 1 // Количество слайдов при скролле
  });

  // Функция для обновления состояния стрелок
  function updateArrowState(slick) {
    if (slick.currentSlide === 0) {
      // Если текущий слайд - первый, делаем стрелку "предыдущий" неактивной
      $('.example-slider-prew').attr('disabled', true);
    } else {
      // Если не первый, делаем стрелку активной
      $('.example-slider-prew').attr('disabled', false);
    }

    if (slick.currentSlide === (slick.slideCount/2) - 1) {
      // Если текущий слайд - последний, делаем стрелку "следующий" неактивной
      $('.example-slider-next').attr('disabled', true);
    } else {
      // Если не последний, делаем стрелку активной
      $('.example-slider-next').attr('disabled', false);
    }
  }

  // Обработчик кликов на стрелки
  $('.example-slider-prew').on('click', function(action) {
    action.preventDefault();
    $('.example-slider').slick('slickPrev');
  });

  $('.example-slider-next').on('click', function(action) {
    action.preventDefault();
    $('.example-slider').slick('slickNext');
  });

  // Обработчик изменения слайда
  $('.example-slider').on('afterChange', function(event, slick, currentSlide) {
    let totalSlides = slick.slideCount / 2; // общее количество слайдов
    let current = currentSlide + 1; // текущий слайд (индекс начинается с 0)
    $('.example-slider-counter').text(current + ' из ' + totalSlides);
    updateArrowState(slick); // Обновление состояния стрелок
  });

  // Устанавливаем начальное значение счётчика и проверяем состояние стрелок при загрузке
  let initialTotal = $('.example-slider').slick('getSlick').slideCount;
  $('.example-slider-counter').text('1 из ' + initialTotal / 2);
  updateArrowState($('.example-slider').slick('getSlick')); // Изначально проверяем состояние стрелок
});

  /* smooth navigation movement ======================================================================================================= */

document.querySelectorAll('.header-nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Отключаем стандартное поведение
    const targetId = this.getAttribute('href'); // Получаем ID раздела
    const targetElement = document.querySelector(targetId);

    // Прокрутка к элементу
    window.scrollTo({
      top: targetElement.offsetTop, // Позиция элемента от начала страницы
      behavior: 'smooth' // Плавная прокрутка
    });
  });
});

  /* correct variables checking ======================================================================================================= */

document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault(); // Останавливаем стандартное действие формы

  // Получаем элементы ввода
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('e-mail');

  // Удаляем предыдущие ошибки
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');

  // Флаг для проверки
  let hasError = false;

  // Проверка имени (минимум 2 символа)
  if (nameInput.value.trim().length < 2) {
    displayError(nameInput, 'Имя должно содержать минимум 2 символа.');
    hasError = true;
  }

  // Проверка email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    displayError(emailInput, 'Недопустимый формат');
    hasError = true;
  }

  // Если ошибок нет, отправляем форму
  if (!hasError) {
    alert('Форма отправлена!');
    this.submit();
  }
});

// Функция отображения ошибки
function displayError(input, message) {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;

  input.classList.add('error');
  input.parentElement.appendChild(errorMessage);
}
