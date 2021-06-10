import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import listElement from './templetes/country-list.hbs';
import countryCard from './templetes/country.hbs';
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
const debounce = require('lodash.debounce');



const refs = {
    input: document.querySelector('.input'),
    ulCountries: document.querySelector('.country-list'),
    divCountryCard: document.querySelector('.card-country'),
}
refs.input.addEventListener('input', debounce(onChangeInput,500))

function onChangeInput() {
     clearCountruList()
    if (refs.input.value === '') {
        return
    }

   searchCountries().then(countries => {
   
      
         if (countries.length === 1) {
            appendCountryCard(countries)
       }
         else if (countries.length > 10) {
             showError()
            
       }
         else if (countries.length >= 2 && countries.length <= 10) {
             appendCountriesMarkup(countries)
       }
    })
    

 
}

 function searchCountries() {
     const searchCountries = fetchCountries(refs.input.value);
    return searchCountries
}

function appendCountriesMarkup(countries) {
    refs.ulCountries.insertAdjacentHTML('beforeend',listElement(countries))
}

function appendCountryCard(country) {
    refs.divCountryCard.insertAdjacentHTML('beforeend',  countryCard(country))
}

function clearCountruList() {
    refs.ulCountries.innerHTML = ''
    refs.divCountryCard.innerHTML =''
}

function showError() {
  info({
    title: "Error!!!!",
    text:
        
    "Too many maches found. Please enter a more specific query",

  });
}
