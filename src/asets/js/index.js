import 'swiper/css';
import '../styles/rest.scss';
import '../styles/mixins.scss';
import '../styles/styles.scss';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { languages } from './languages';
Swiper.use([Navigation])

// clase de care ne folosim
const classes = {
    opened: 'opened',
    hidden: 'hidden',
    active: 'active',
}

// open menu
const header = document.querySelector('.header')
const menuButton = document.querySelector('.header-menu__button');
const toggleMenu = () =>{
    header.classList.toggle(classes.opened);
}
menuButton.addEventListener('click', toggleMenu);
// ------------------------------------------------------------------------

// scroll 
const menuLink = document.querySelectorAll('.menu-link');
const scrollToSection = (e) =>{
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    if(!href && !href.stratsWith('#')) return;

    const section = href.slice(1);
    const top = document.getElementById(section)?.offsetTop || 0;
    window.scrollTo({top, behavior:'smooth'})
}
// daca avem o lista un array folosim foreach
menuLink.forEach ((link)=> link.addEventListener('click', scrollToSection))
// -------------------------------------------------------------------------

// timer

// formatarea datelor
const formatValue = (value) => value < 10 ? `0${value}` : value;

const  getTimerValues = (diff) =>({
        seconds: (diff / 1000) % 60,
        minutes: (diff / (1000 * 60)) % 60,
        hours: (diff / (1000 * 60 * 60)) % 24, 
        days: (diff / (1000 * 3600 * 24)) % 30,
    });

const setTimerValues = (values) =>{
    Object.entries(values).forEach(([key, value])=>{
        const timerValue = document.getElementById(key);
        timerValue.innerText = formatValue(Math.floor(value));
    })
}

const startTimer = (data) =>{
  const id =   setInterval(()=>{
        const diff = new Date(data).getTime() - new Date().getTime();

        if(diff<0){
            clearInterval(id)
            return;
        }

        setTimerValues(getTimerValues(diff))
       
    }, 1000)
}
startTimer("December 31, 2024, 00:00:00");
// --------------------------------------------------------------------

// video
let isPlay = false;

const video = document.getElementById('video');
const videoButtons = document.querySelectorAll('.video-btn'); // NodeList

const handleVideo = ({ target }) => {
    const info = target.parentElement;

    isPlay = !isPlay;
    info.classList.toggle('hidden', isPlay); // asigură-te că 'hidden' este o clasă CSS validă
    target.innerText = isPlay  ? 'Pause' : "Play"

    isPlay ? video.play() : video.pause();
};

// Iterăm prin fiecare element din NodeList și adăugăm un event listener
videoButtons.forEach((button) => {
    button.addEventListener('click', handleVideo);
});


// --------------------------------------------------------------

// switch content throufgh checkbox
const checkboxes = {
    requirements: ["minimum", "recommended"],
    versions: ["standard", "limited"],
};

const checkbox = document.querySelectorAll(".checkbox");

const handleCheckbox = ({ currentTarget: { checked, name } }) => {
    const { active } = classes;
    const value = checkboxes[name][Number(checked)];
    const list = document.getElementById(value);
    const tabs = document.querySelectorAll(`[data-${name}]`);
    const siblings = list.parentElement.children;
  
    for (const item of siblings) item.classList.remove(active);
    for (const tab of tabs) {
      tab.classList.remove(active);
      tab.dataset[name] === value && tab.classList.add(active);
    }
  
    list.classList.add(active);
  };
  

checkbox.forEach((box)=> box.addEventListener('click', handleCheckbox))
// -----------------------------------------------------------------------

// swiper slider
const initSlider = () =>{
    new Swiper(".swiper",{
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        initialSlide: 2,
        navigation:{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    })
}

initSlider();

// ------------------------------------------------------------------------
// section faq

const faqItm = document.querySelectorAll('.faq-item');

const handleFaqItem = ({currentTarget: target}) =>{
    target.classList.toggle(classes.opened)
    const isOpened = target.classList.contains(classes.opened);
    const height = target.querySelector('p').clientHeight;
    const content = target.querySelector('.faq-item__content')

    content.style.height = `${isOpened ? height : 0}px`
}

faqItm.forEach((item)=> item.addEventListener('click', handleFaqItem))

// ----------------------------------------------------
// hidden section
const sections = document.querySelectorAll('.section');

const handleScroll = () =>{
    const {scrollY: y, innerHeight: h} = window
    sections.forEach((section)=>{
        if(y > section.offsetTop - h/1.5) section.classList.remove(classes.hidden);
    })
}

window.addEventListener('scroll', handleScroll)
// -----------------------------------------------------

//switch language

const language = document.querySelectorAll(".language")

const setTexts = () => {
    const lang  = localStorage.getItem('lang') || 'en';
    const content = languages[lang];

    Object.entries(content).forEach(([key, value])=>{
        const items = document.querySelectorAll(`[data-text=${key}]`)
        items.forEach((item)=> (item.innerText = value));
    })
}

const toogleLanguage = ({target}) =>{
    const { lang } = target.dataset;

    if(!lang) return;

    localStorage.setItem('lang', lang);
    setTexts();
}

language.forEach((lang)=> lang.addEventListener('click', toogleLanguage))

setTexts();

// -------------------------------------------------------------------------

// modal open , buy now

const values = [
    {
      price: 19.99,
      title: "Standard Edition",
    },
    {
      price: 18.99,
      title: "Standard Edition",
    },
    {
      price: 29.99,
      title: "Deluxe Edition",
    },
  ];

const buyButton = document.querySelectorAll('.buy-button');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal-version');
const modalPrice = document.querySelector('.modal-total__price');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');

const handleBuyButton = ({currentTarget: target}) =>{
    const {value} = target.dataset;

    if(!value) return;

    const { price, title } = values[value];

    modalTitle.innerText = title;
    modalPrice.innerText = `${price}$`;
    modal.classList.add(classes.opened);
    overlay.classList.add(classes.opened);
}

const closeModal = () =>{ 
    modal.classList.remove(classes.opened)
    overlay.classList.remove(classes.opened)
}

buyButton.forEach((btn)=> btn.addEventListener('click', handleBuyButton))
modalClose.addEventListener('click', closeModal)
