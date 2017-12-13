//загрузка страниц

function loadPage(pageName)
{

    delete(window.SlideShowIndex);
    delete(window.SlideShowActivation);
    delete(window.formActivation);

    if (pageName === null) {
        var request = location.search;
        if (request !== '')
        {
            if (request.substr(1,5) === "page=")
            {
                var pageNameBegin = request.indexOf("=")+1;

                pageName = request.substr(pageNameBegin);

            } else {
                pageName = "main";
            }
        } else {
            pageName = "main";
        }
    }

    var pageAdress = "siteJS/" + pageName + ".html";

    $.ajax({
        url: pageAdress,
        type: 'HEAD',
        error:
            function(){
                $('.mainBlock').load("siteJS/nopage.html");
                document.title = "No page";
            },
        success:
            function(){
                $('.mainBlock').load(pageAdress);

                var pageTitle;
                switch (pageName.replace(/[^a-z]/g, '')) {
                    case 'main':
                        pageTitle = "Main page";
                        break;
                    case 'catalog':
                        pageTitle = "Catalog";
                        break;
                    case 'order':
                        pageTitle = "Order";
                        break;
                    case 'meetus':
                        pageTitle = "Meet us";
                        break;
                    case 'sitemap':
                        pageTitle = "Site map";
                        break;
                    case 'model':
                        pageTitle = "Model";
                        break;
                    default:
                        pageTitle = "No page name";
                }
                document.title = pageTitle;
            }
    });

    var stateParameters = { foo: "bar" };
    history.pushState(stateParameters, "New page title", "indexJS.html?page=" + pageName);

    var buttonName;
    if (pageName.slice(0,5) === "model") {
        buttonName = "catalog";
        var button = document.querySelector("#catalog");
        button.innerHTML = "GET BACK";
        button.title = "Press to GET BACK to the list";
        button.style.pointerEvents = "auto";
    }
    else buttonName = pageName;

    if (pageName.slice(0,5) !== "model") {
        var button = document.querySelector("#catalog");
        if (button.innerHTML === "GET BACK") {
            button.innerHTML = "CATALOG";
            button.title = "Press to open the CATALOG";
            button.style.pointerEvents = "";
        }
    }

    var chooseOff = document.querySelector("li.chosen");
    if (chooseOff !== null) chooseOff.className = ("button");

    var chooseOn = document.querySelector("#" + buttonName);
    if (chooseOn !== null) chooseOn.className += " chosen";

    window.pageName = pageName.replace(/[^a-z]/g, '');

    if (window.pageName === "main" || window.pageName === "model") {
        activateSlideShowMobile();
    }

    document.querySelector('.mainBlock').ontouchstart = swipeStart;

    function addScript(src){
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    }
    addScript('js/picturefill.js');
}

//функция включения видимости скрытых по умолчанию объектов

function unblock() {
    var list = document.getElementsByClassName("unblock");
    for (var i = 0; i < list.length; i++)
    {
        list[i].style.visibility = "visible";
    }
}

//управление слайд шоу на страницах main.html и model.html
//начало

//активация слайд шоу

function activateSlideShow() {
    if (window.SlideShowActivation !== true)
    {
        window.SlideShowIndex = 0;
        window.SlideShowActivation = true;
        unblock();
    }
}

function activateSlideShowMobile() {
    if (parseInt(document.documentElement.clientWidth) < 650 && parseInt(document.documentElement.clientHeight) < 800) {
        activateSlideShow();
    }
}

//переход к следующему слайду

function nextSlide(point) {
    var slides = document.getElementsByClassName("slide");
    var points = document.getElementsByClassName(point);
    var k = window.SlideShowIndex;
    slides[k].style.display = "none";
    points[k].className = points[k].className.replace("active","");
    if (k < slides.length-1) k++; else k = 0;
    slides[k].style.display = "inline-block";
    points[k].className += " active";
    window.SlideShowIndex = k;
}

//переход к предыдущему слайду

function prevSlide(point) {
    var slides = document.getElementsByClassName("slide");
    var points = document.getElementsByClassName(point);
    var k = window.SlideShowIndex;
    slides[k].style.display = "none";
    points[k].className = points[k].className.replace("active","");
    if (k > 0) k--; else k = slides.length-1;
    slides[k].style.display = "inline-block";
    points[k].className += " active";
    window.SlideShowIndex = k;
}

//переход к выбранному слайду

function currentSlide(point, n) {
    var slides = document.getElementsByClassName("slide");
    var points = document.getElementsByClassName(point);
    var k = window.SlideShowIndex;
    slides[k].style.display = "none";
    points[k].className = points[k].className.replace("active","");
    slides[n].style.display = "inline-block";
    points[n].className += " active";
    k = n;
    window.SlideShowIndex = k;
}

//управление слайд шоу на страницах main.html и model.html
//конец

//управление слайд шоу на странице main.html
//начало

//функция отображения дополнительной информации

function readMore() {
        var list = document.getElementsByClassName("text");
        for (i = 0; i < list.length; i++) {
            list[i].style.display = "block";
            list[i].style.animation = "Appearance 1s linear forwards";
        }
        document.querySelector(".readMore").style.display = "none";
        document.querySelector(".readLess").style.display = "block";
}

//функция скрытия дополнительной информации

function readLess() {
        var list = document.getElementsByClassName("text");
        for (i = 0; i < list.length; i++) {
            list[i].style.animation = "Disappearance 1s linear forwards";
        }
        setTimeout(function () {
            for (i = 0; i < list.length; i++)
            {
                list[i].style.display = "none";
            }
        }, 1000);
        document.querySelector(".readLess").style.display = "none";
        document.querySelector(".readMore").style.display = "block";
}

//управление слайд шоу на странице main.html
//конец

//управление слайд шоу на странице model.html
//начало

//отображение превью-картинок

function previewsHide() {
    var previews = document.querySelector(".previews");
    previews.style.animation = "Disappearance 1s linear forwards";
    setTimeout(function () {
        previews.style.display = "none";
    }, 1000);
    document.querySelector(".previewsHide").style.display = "none";
    document.querySelector(".previewsShow").style.display = "block";
}

//скрытие превью-картинок

function previewsShow() {
    var previews = document.querySelector(".previews");
    previews.style.display = "block";
    previews.style.animation = "Appearance 1s linear forwards";
    document.querySelector(".previews").style.animation = "";
    document.querySelector(".previewsShow").style.display = "none";
    document.querySelector(".previewsHide").style.display = "block";
}

//управление слайд шоу на странице model.html
//конец

//управление слайд шоу на странице catalog.html
//начало

//следующая превью-картинка

function nextPreviewPhoto(n) {
    var images = document.getElementById(n).getElementsByTagName("img");
    var index = document.getElementById(n).querySelector(".previewIndex");
    var k = index.innerHTML;
    images[k].style.display = "none";
    if (k < images.length-1) k++; else k = 0;
    images[k].style.display = "inline-block";
    index.innerHTML = k;
}

//предыдущая превью-картинка

function prevPreviewPhoto(n) {
    var images = document.getElementById(n).getElementsByTagName("img");
    var index = document.getElementById(n).querySelector(".previewIndex");
    var k = index.innerHTML;
    images[k].style.display = "none";
    if (k > 0) k--; else k = images.length-1;
    images[k].style.display = "inline-block";
    index.innerHTML = k;
}

//управление слайд шоу на странице catalog.html
//конец

//управление формой для заказа
//начало

//активация формы при наведении мыши

function formActivate() {
    if (window.formActivation !== true) {
        var buttons = document.getElementsByClassName("button");
        for (var i = 0; i < buttons.length; i++ ) {
            if (buttons[i].type === "button") {
                buttons[i].disabled = true;
                break;
            }
        }
        var errors = document.getElementsByClassName("error");
        for (var j = 0; j < errors.length; j++)
        {
            errors[j].style.display = "inline-block";
        }
        window.formActivation = true;
    }
}

// валидация формы

function formCheck(type, field, value) {
    switch (type)
    {
        case "name":
            var regName = /^[a-zA-Z]+$/;
            if (!regName.test(value) || value.length < 3 || value.length > 20) {
                document.getElementById(field).style.display = "inline-block";
                document.getElementsByName(field)[0].style.borderColor = "red";
            }
            else {
                document.getElementById(field).style.display = "none";
                document.getElementsByName(field)[0].style.borderColor = "#cecece";
            }
            break;
        case "email":
            var regEmail = /^\w+@\w+\.\w{2,4}$/i;
            if (!regEmail.test(value)) {
                document.getElementById(field).style.display = "inline-block";
                document.getElementsByName(field)[0].style.borderColor = "red";
            }
            else {
                document.getElementById(field).style.display = "none";
                document.getElementsByName(field)[0].style.borderColor = "#cecece";
            }
            break;
        case "phone":
            var phoneNumber = parseInt(value);
            if (isNaN(phoneNumber) || value.length !== 13) {
                document.getElementById(field).style.display = "inline-block";
                document.getElementsByName(field)[0].style.borderColor = "red";
            }
            else {
                document.getElementById(field).style.display = "none";
                document.getElementsByName(field)[0].style.borderColor = "#cecece";
            }
            break;
        case "car":
            var regCar = /^[a-zA-Z0-9\s]+$/;
            if (!regCar.test(value) || value.length < 6 || value.length > 30) {
                document.getElementById(field).style.display = "inline-block";
                document.getElementsByName(field)[0].style.borderColor = "red";
            }
            else {
                document.getElementById(field).style.display = "none";
                document.getElementsByName(field)[0].style.borderColor = "#cecece";
            }
            break;
    }
    formSubmitAllow();
}

//разблокировка кнопки submit при условии, что вся форма заполнена верно (все ошибки скрыты)

function formSubmitAllow() {
    var error = false;
    var errors = document.getElementsByClassName("error");
    for (var k = 0; k < errors.length; k++) {
        if (errors[k].style.display === "inline-block") {
            error = true;
            break;
        }
    }
    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++ ) {
        if (buttons[i].type === "button")
        {
            if (error) buttons[i].disabled = true;
            else buttons[i].disabled = false;
            break;
        }
    }
}

//управление формой для заказа
//конец

//управление модальным окном
//начало

//активация модального окна

function activateModalWindow() {
    document.querySelector(".window").className += " active";
    document.querySelector(".background").className += " active";
}

//дизактивация модального окна

function disactivateModalWindow() {
    document.querySelector(".window").className = "window";
    document.querySelector(".background").className = "background";
    loadPage("main");
}

//управление модальным окном
//конец

//свайп

var start;
var elem;

function swipeStart(EO) {

    elem = document.querySelector('.mainBlock');

    if (elem.querySelector('.mainPhotoSlider') || elem.querySelector('.model .slider')) {

        start = EO.touches[0].pageX;

        elem.ontouchstart = null;
        elem.ontouchmove = swipeMove;
        elem.ontouchend = swipeEnd;

    }

}

function swipeMove(EO) {

    var bias = start - EO.touches[0].pageX;

    if (bias > 20) {
        if (elem.querySelector('.mainPhotoSlider')) {
            prevSlide('dot');
        } else {
            prevSlide('preview');
        }
        swipeEnd();
    }
    if (bias < -20) {
        if (elem.querySelector('.mainPhotoSlider')) {
            nextSlide('dot');
        } else {
            nextSlide('preview');
        }
        swipeEnd();
    }

}

function swipeEnd() {

    elem.ontouchmove = null;
    elem.ontouchend = null;
    elem.ontouchstart = swipeStart;

}