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
            success(hero) {
                const aliasesArray = hero.biography.aliases;
                const aliasesString = aliasesArray.join(', ');

                // console.log("img:", hero.image.url)
                // console.log("Nombre:", hero.name)
                // console.log("Aliases:", aliasesString)
                // console.log("Ocupación:", hero.work.occupation)
                // console.log("Publicado por:", hero.biography.publisher)
                // console.log("Primera aparición:", hero.biography['first-appearance'])
                // console.log("Conexiones:", hero.connections['group-affiliation'])
                // console.log("Altura:", hero.appearance.height[1])
                // console.log("Peso:", hero.appearance.weight[1])

                //construir un objeto
                const myHero = {
                    image: hero.image.url,
                    name: hero.name,
                    aliases: aliasesString,
                    occupation: hero.work.occupation,
                    publisher: hero.biography.publisher,
                    firstAppereance: hero.biography['first-appearance'],
                    connections: hero.connections['group-affiliation'],
                    height: hero.appearance.height[1],
                    weight: hero.appearance.weight[1]
                }
                console.log(myHero)
            },
            error(e) {
                console.log(e)
            }
        })
    }


})