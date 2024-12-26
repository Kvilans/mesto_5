import '../pages/index.css';

import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';

// ------------------ Профиль ------------------

// Функция для обработки отправки формы редактирования профиля
function handleProfileFormSubmit(event) {
    event.preventDefault(); 

    // Обновляем данные профиля на странице, используя значения из полей ввода
    userName.textContent = profileNameInput.value;
    userText.textContent = profileTextInput.value;

    closeModal(profilePopup);
}

const userName = document.querySelector('.profile__title'); // Заголовок профиля
const userText = document.querySelector('.profile__description'); // Описание профиля

// Кнопка для открытия попапа редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');

// Попап для редактирования профиля
const profilePopup = document.querySelector('.popup_type_edit');

// Форма внутри попапа редактирования профиля
const profileFrom = profilePopup.querySelector('.popup__form');

const profileNameInput = profilePopup.querySelector('.popup__input_type_name'); // Поле ввода имени
const profileTextInput = profilePopup.querySelector('.popup__input_type_description'); // Поле ввода описания
const closeProfileButton = profilePopup.querySelector('.popup__close'); // Кнопка закрытия попапа

editProfileButton.addEventListener('click', () => {
    // Заполняем поля ввода текущими значениями из профиля
    profileNameInput.value = userName.textContent;
    profileTextInput.value = userText.textContent;

    openModal(profilePopup);
});

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));

profileFrom.addEventListener('submit', handleProfileFormSubmit);

// ------------------ Изображение ------------------

// Попап для отображения полноразмерного изображения
const imagePopup = document.querySelector('.popup_type_image');

// Элементы внутри попапа для отображения изображения
const imageImage = imagePopup.querySelector('.popup__image'); // Само изображение
const imageCaption = imagePopup.querySelector('.popup__caption'); // Подпись изображения
const closeImageButton = imagePopup.querySelector('.popup__close'); // Кнопка закрытия попапа

closeImageButton.addEventListener('click', () => closeModal(imagePopup));

// ------------------ Карточки ------------------

// Контейнер для карточек
const cardsList = document.querySelector('.places__list');

// Функция обработки формы добавления новой карточки
function handleCardFormSubmit(event) {
    event.preventDefault(); 

    // Создаем новую карточку и добавляем её в начало списка карточек
    cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));

    closeModal(cardPopup);
}

// Кнопка для открытия попапа добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('.popup_type_new-card');
const cardFrom = cardPopup.querySelector('.popup__form');

// Поля ввода для названия и ссылки на изображение карточки
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name'); // Поле названия карточки
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url'); // Поле ссылки на изображение
const closeCardButton = cardPopup.querySelector('.popup__close'); // Кнопка закрытия попапа

// Добавляем обработчик открытия попапа для добавления карточки
addCardButton.addEventListener('click', () => {
    // Очищаем поля ввода перед открытием попапа
    cardNameInput.value = '';
    cardLinkInput.value = '';

    openModal(cardPopup);
});

closeCardButton.addEventListener('click', () => closeModal(cardPopup));
cardFrom.addEventListener('submit', handleCardFormSubmit);

// Добавляем обработчик для открытия изображения в полноразмерном режиме
cardsList.addEventListener('click', (event) => {
    // Проверяем, что клик был на изображении карточки
    if (event.target.classList.contains('card__image')) {
        // Обновляем src и alt изображения в попапе
        imageImage.setAttribute('src', event.target.src);
        imageCaption.textContent = event.target.alt;

        openModal(imagePopup);
    }
});

// ------------------ Загрузка страницы ------------------

// Добавляем начальные карточки на страницу
initialCards.forEach((item) => cardsList.append(createCard(item.name, item.link)));

// Добавляем класс анимации для попапов
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const validationSettings = {
    formClass: '.popup__form', // Класс формы
    inputClass: '.popup__input', // Класс поля ввода
    inputErrorClass: 'popup__input_error', // Класс для выделения ошибок
    buttonClass: '.popup__button', // Класс кнопки отправки
    buttonInactiveClass: 'popup__button_inactive', // Класс для неактивной кнопки
    errorClass: 'popup__error-text_active' // Класс для активной ошибки
};

enableValidation(validationSettings);
