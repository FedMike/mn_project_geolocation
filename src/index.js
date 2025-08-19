import {validateIp, getAddress} from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if(validateIp(ipInput.value)) {
        getAddress(ipInput.value)
            .then(setInfo);
    };
};

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    };
};

let mapCenter = [55.751619, 37.617891];
let myMap = null;
let myPlacemark = null;
const mapContainer = document.getElementById('map');

function setInfo(mapData) {
    const {lat, lng, country, region, timezone} = mapData.location;

    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;
    mapCenter = [lat, lng];
    init(mapCenter);
}

function init(center) {
    if (myMap) {
        myMap.destroy();
        myMap = null;
    }

    mapContainer.innerHTML = '';

    var myMap = new ymaps.Map("map", {
        center: mapCenter,
        zoom: 13
    });

    // Добавление метки
    var myPlacemark = new ymaps.Placemark(mapCenter, {}, {
        iconLayout: 'default#image',
        iconImageHref: icon,
        iconImageSize: [30, 40],
        iconImageOffset: [0, 0],
        hintContent: 'Кремль!',
    });
    myMap.geoObjects.add(myPlacemark);

    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}

ymaps.ready(init);