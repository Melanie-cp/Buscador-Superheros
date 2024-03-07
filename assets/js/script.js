//eperar que cargue el dom
$(document).ready(function () {
    //Capturar los elementos del DOM
    const heroForm = $("#heroForm")
    const heroNumber = $("#heroNumber")
    const heroResult = $("#heroResult")

    // Procesar el formulario
    heroForm.on("submit", function (event) {
        event.preventDefault()

        //rremover clases is-valid is-invalid
        heroNumber.removeClass("is-valid is-invalid")

        //capturar lo que escribió usuario en input
        const heroNumberInput = +heroNumber.val()

        //validaciones
        if (heroNumberInput > 0 && heroNumberInput <= 731) {
            heroNumber.addClass("is-valid")
            getHero(heroNumberInput)
        } else {
            heroNumber.addClass("is-invalid")
        }
    })

    // consumir la API
    // url: https://www.superheroapi.com/api.php/4905856019427443/100
    const getHero = (heroNumberFn) => {

        $.ajax({
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + heroNumberFn,
            method: "GET",
            success(data) {
                console.log(data)
            },
            error(e) {
                console.log(e)
            }
        })
    }


})