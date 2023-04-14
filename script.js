document.addEventListener('DOMContentLoaded', function () {

    const legendItems = document.querySelectorAll('.legend__item');
    var type = document.querySelector('.dropdown__category-active');
    const dropDownCategories = document.querySelectorAll('.dropdown__category');

    legendItems.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        })
    });

    dropDownCategories.forEach((item) => {
        item.addEventListener('click', function () {
            type.textContent = item.textContent;
            type.classList.remove('opened');
        });
    });


    type.addEventListener('click', () => {
        type.classList.toggle('opened');
    });




});







var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").



    var LAYER_NAME = 'user#layer',
        MAP_TYPE_NAME = 'user#customMap',
        TILES_PATH = 'layout5';

    var Layer = function () {
        var layer = new ymaps.Layer(TILES_PATH + '/%z/tile-%x-%y.jpg', {
            // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
            // раскомментируйте эту строчку и укажите ссылку на изображение.
            notFoundTile: 'not_founded_images.png'
        });
        // Указываем доступный диапазон масштабов для данного слоя.
        layer.getZoomRange = function () {
            return ymaps.vow.resolve([0, 14]);
        };
        // Добавляем свои копирайты.
        layer.getCopyrights = function () {
            return ymaps.vow.resolve('©');
        };
        return layer;
    };// backgroundMapType: YMaps.MapType.SATELLITE,

    ymaps.layer.storage.add(LAYER_NAME, Layer);

    var mapType = new ymaps.MapType('MQ + Ya', ['yandex#map', LAYER_NAME]);

    ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);



    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.695483, 37.477554], // Москва
        zoom: 16,
        type: MAP_TYPE_NAME,
        controls: []
    }, {
        minZoom: 15,
        maxZoom: 18,
        restrictMapArea: [
            [55.71, 37.452668],
            [55.66, 37.524235]
        ]
    });

    clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedBrownClusterIcons',
        clusterIconColor: '#DB162B',
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        //    clusterBalloonContentLayout: customBalloonContentLayout
    });

    var geoObjects = [];

    createPlacemarks();

    clusterer.add(geoObjects);


    myMap.geoObjects.add(clusterer);


    function createPlacemarks() {

        var j = 0;
        for (var i in objects) {


            // if (types.indexOf(objects[i].type) != -1 || types[0] == 'all') {
            obj = {
                iconContent: `<div class='ymaps__map-icon'><div class='ymaps__map-icon-container' style='mask-image:url(${objects[i].icon});-webkit-mask-image:url(${objects[i].icon})'></div></div>`,
                balloonContentHeader: `<div class='ymaps__map-content-header'>${objects[i].queue}</div>`,
            };

            geoObjects[j] = new ymaps.Placemark(objects[i].coords, obj, {
                iconLayout: 'default#imageWithContent',
                //  iconImageHref: '/bitrix/templates/domreka/images/map_icon.png',
                // iconImageHref: objects[i].icon,
                iconImageSize: objects[i].icon_size,
                iconImageOffset: objects[i].icon_offset,
                //      iconContentLayout: contLayout,
                iconColor: '#35b8fc',
                iconNumber: parseInt(i) + 1,
                type: objects[i].type,
            });
            j++;
            //    }

        }
    }

}


var objects = [
    {
        object: "Событие",
        queue: "Событие-4.1",
        housing: "Корпус 2",
        property: "30.04.02.001Н",
        floor: "1",
        square: 190.6,
        icon: 'images/icons/coffeehouse.svg',
        purpose: "Кафетерий",
        coords: [55.693384, 37.478865],
        icon_size: [48, 48],
        icon_offset: [-48, -48],
    },
    {
        object: "Событие",
        queue: "Событие-4.1",
        housing: "Корпус 2",
        property: "30.04.02.002Н",
        floor: "1",
        square: 62.8,
        icon: 'images/icons/shop.svg',
        purpose: "Магазин непродовольственных товаров",
        coords: [55.696423, 37.473770],
        icon_size: [48, 48],
        icon_offset: [-48, -48],
        has_page: '1',
    },
    // {
    //     object: "Событие",
    //     queue: "Событие-4.1",
    //     housing: "Корпус 2",
    //     property: "30.04.02.003Н",
    //     floor: "1",
    //     square: 130.8,
    //     purpose: "Магазин непродовольственных товаров"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-4.1",
    //     housing: "Корпус 3",
    //     property: "30.04.03.004Н",
    //     floor: "1",
    //     square: 215,
    //     purpose: "Кафетерий"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-4.1",
    //     housing: "Корпус 3",
    //     property: "30.04.03.005Н",
    //     floor: "1",
    //     square: 275.4,
    //     purpose: "Магазин непродовольственных товаров"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-4.1",
    //     housing: "Корпус 4",
    //     property: "30.04.04.006Н",
    //     floor: "1",
    //     square: 471.7,
    //     purpose: "Кафе "
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.001Н",
    //     floor: "-2, -1, 1",
    //     square: 453.3,
    //     purpose: "Ресторан"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.002Н",
    //     floor: "1",
    //     square: 150,
    //     purpose: "Кафе"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.003Н",
    //     floor: "1",
    //     square: 52,
    //     purpose: "Офисное помещение"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.004Н",
    //     floor: "1",
    //     square: 93.1,
    //     purpose: "Офисное помещение"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.005Н",
    //     floor: "1",
    //     square: 92.3,
    //     purpose: "Офисное помещение"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.006Н",
    //     floor: "1",
    //     square: 92.3,
    //     purpose: "Офисное помещение"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.007Н",
    //     floor: "1",
    //     square: 93.1,
    //     purpose: "Офисное помещение"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Корпус 1",
    //     property: "30.05.01.008Н",
    //     floor: "-2",
    //     purpose: "Мойка"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Торговый павильон-1",
    //     property: "30.05.01.009Н",
    //     floor: "1",
    //     square: 62.9,
    //     purpose: "Магазин"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-5",
    //     housing: "Торговый павильон-2",
    //     property: "30.05.01.010Н",
    //     floor: "1",
    //     square: 62.9,
    //     purpose: "Магазин"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-4.2",
    //     housing: "Корпус 1",
    //     property: "30.04.01.001Н",
    //     floor: "1, 2",
    //     square: 1110.9,
    //     purpose: "ДОО"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-4.2",
    //     housing: "Корпус 1",
    //     property: "30.04.01.002Н",
    //     floor: "1",
    //     square: 91.9,
    //     purpose: "Магазин непродовольственных товаров"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.007Н",
    //     floor: "1",
    //     square: 88.9,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 2",
    //     housing: "1",
    //     property: "30.09.01.006Н",
    //     floor: "1,2,3",
    //     square: 920,
    //     purpose: "ДОО на 100 мест"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.004Н",
    //     floor: "1",
    //     square: 101.7,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.006Н",
    //     floor: "1",
    //     square: 88,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 2",
    //     housing: "1",
    //     property: "30.09.01.004Н",
    //     floor: "1",
    //     square: 175.6,
    //     purpose: "БКФН"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.011Н",
    //     floor: "1",
    //     square: 231,
    //     purpose: "Кафе"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.013Н",
    //     floor: "1",
    //     square: 687.9,
    //     purpose: "Супермаркет"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.015Н",
    //     floor: "-2",
    //     square: 191.4,
    //     purpose: "Автомойка"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.002Н",
    //     floor: "1, антресоль 1",
    //     square: 106.9,
    //     purpose: "офис",
    //     interests: "Общественное питание",
    //     "Бренд": "Winners coffee"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.009Н",
    //     floor: "1, антресоль 1",
    //     square: 212.5,
    //     purpose: "Пищеблок ДОО"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.008Н",
    //     floor: "1, антресоль 1",
    //     square: 262.9,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.012Н",
    //     floor: "1",
    //     square: 101.5,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.001Н",
    //     floor: "1, антресоль 1",
    //     square: 683.4,
    //     purpose: "супермаркет",
    //     interests: "Супермаркет"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.003Н",
    //     floor: "1, антресоль 1",
    //     square: 255.4,
    //     purpose: "кафе"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.007Н",
    //     floor: "1",
    //     square: 135.9,
    //     purpose: "офис",
    //     interests: "Общественное питание;Супермаркет;Мобильная связь и электроника"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.009Н",
    //     floor: "1",
    //     square: 46.7,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.004Н",
    //     floor: "1, антресоль 1",
    //     square: 298.4,
    //     purpose: "кафе",
    //     interests: "Супермаркет"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.014Н",
    //     floor: "1",
    //     square: 49.1,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.002Н",
    //     floor: "1",
    //     square: 45.2,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.001Н",
    //     floor: "1",
    //     square: 114.2,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.005Н",
    //     floor: "1",
    //     square: 79.3,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 2",
    //     housing: "1",
    //     property: "30.09.01.005Н",
    //     floor: "1",
    //     square: 137.7,
    //     purpose: "Кафе 2"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.004Н",
    //     floor: "1, антресоль 1",
    //     square: 250.2,
    //     purpose: "кафе"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.010Н",
    //     floor: "1",
    //     square: 81.4,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.006Н",
    //     floor: "1, антресоль 1",
    //     square: 120.2,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 2",
    //     housing: "1",
    //     property: "30.09.01.001Н",
    //     floor: "1",
    //     square: 198.8,
    //     purpose: "Кафе 1"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.003Н",
    //     floor: "1",
    //     square: 91.4,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.003Н",
    //     floor: "1",
    //     square: 51.1,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.010Н",
    //     floor: "1",
    //     square: 84.7,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 2",
    //     housing: "1",
    //     property: "30.09.01.002Н",
    //     floor: "1",
    //     square: 97.7,
    //     purpose: "БКФН"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.006Н",
    //     floor: "1",
    //     square: 95.8,
    //     purpose: "офис",
    //     interests: "Общественное питание"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.008Н",
    //     floor: "-1",
    //     square: 334.1,
    //     purpose: "автомойка"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.006Н",
    //     floor: "1",
    //     square: 57.5,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.001Н",
    //     floor: "1",
    //     square: 114.3,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.005Н",
    //     floor: "1",
    //     square: 83.5,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.010Н",
    //     floor: "1, 1а",
    //     square: 1339.5,
    //     purpose: "ДОО"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.004Н",
    //     floor: "1",
    //     square: 164.2,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.014Н",
    //     floor: "1",
    //     square: 35.7,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.001Н",
    //     floor: "1",
    //     square: 130.6,
    //     purpose: "Кафе"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.002Н",
    //     floor: "1",
    //     square: 42.3,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.013Н",
    //     floor: "1",
    //     square: 110.3,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.003Н",
    //     floor: "1, антресоль 1",
    //     square: 89.5,
    //     purpose: "офис",
    //     interests: "Здоровье и красота",
    //     "Бренд": "Аптека 36,6"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.007Н",
    //     floor: "1, антресоль 1",
    //     square: 123.1,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.002Н",
    //     floor: "1",
    //     square: 76.7,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.008Н",
    //     floor: "1",
    //     square: 94.6,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.001Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.002Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.003Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.004Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.005Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.006Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.007Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.008Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.009Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.010Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.1",
    //     housing: "Корпус 1",
    //     property: "30.06.01.011Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.012Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.013Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.014Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.015Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.016Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.017Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.018Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.019Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.020Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.021Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.022Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.023Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.024Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.025Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.026Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.027Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.028Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.029Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие-6.2",
    //     housing: "Корпус 2",
    //     property: "30.06.02.030Н"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.009Н",
    //     floor: "1, антресоль 1",
    //     square: 293,
    //     purpose: "кафе"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.005Н",
    //     floor: "1",
    //     square: 107.1,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "1",
    //     property: "30.03.01.005Н",
    //     floor: "1, антресоль 1",
    //     square: 274.3,
    //     purpose: "кафе",
    //     interests: "Общественное питание"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "3",
    //     property: "30.03.03.008Н",
    //     floor: "1",
    //     square: 89.1,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 3",
    //     housing: "1",
    //     property: "30.09.02.007Н",
    //     floor: "1",
    //     square: 63.2,
    //     purpose: "БКТ"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.012Н",
    //     floor: "1, антресоль 1",
    //     square: 131.1,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 1",
    //     housing: "2",
    //     property: "30.03.02.011Н",
    //     floor: "1",
    //     square: 71.1,
    //     purpose: "офис"
    // },
    // {
    //     object: "Событие",
    //     queue: "Событие 2",
    //     housing: "1",
    //     property: "30.09.01.003Н",
    //     floor: "1",
    //     square: 98.5,
    //     purpose: "БКФН"
    // }
]