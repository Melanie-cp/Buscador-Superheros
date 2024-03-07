//eperar que cargue el dom
$(document).ready(function () {
    //Capturar los elementos del DOM
    const heroForm = $("#heroForm")
    const heroNumber = $("#heroNumber")
    const heroResult = $("#heroResult")
    const chartContainer = $("#chartContainer")

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
                // console.log("power stats", hero.powerstats)

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

                heroResult.html(`
                <div class="card mb-3" style="max-width: 750px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${myHero.image}"
                                class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${myHero.name}</h5>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Aliases: ${myHero.aliases}</li>
                                    <li class="list-group-item">Ocupación: ${myHero.occupation}</li>
                                    <li class="list-group-item">Publicado por: ${myHero.publisher}</li>
                                    <li class="list-group-item">Primera aparición: ${myHero.firstAppereance}</li>
                                    <li class="list-group-item">Conexiones: ${myHero.connections}</li>
                                    <li class="list-group-item">Altura: ${myHero.height}</li>
                                    <li class="list-group-item">Peso: ${myHero.weight}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                `)

                //Pintar el gráfico con CanvaJS
                const myHeroStats = {
                    intelligence: +(hero.powerstats.intelligence),
                    strength: +(hero.powerstats.strength),
                    speed: +(hero.powerstats.speed),
                    durability: +(hero.powerstats.durability),
                    power: +(hero.powerstats.power),
                    combat: +(hero.powerstats.combat)
                }
                console.log(myHeroStats)

                const options = {
                    title: {
                        text: `Estadísticas de poder para ${myHero.name}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString: "#,##0.#" % "",
                        dataPoints: [
                            { label: "intelligence", y: `${myHeroStats.intelligence}` },
                            { label: "strength", y: `${myHeroStats.strength}` },
                            { label: "speed", y: `${myHeroStats.speed}` },
                            { label: "durability", y: `${myHeroStats.durability}` },
                            { label: "power", y: `${myHeroStats.power}` },
                            { label: "combat", y: `${myHeroStats.combat}` }
                        ]
                    }]
                }

                chartContainer.CanvasJSChart(options);


            },
            error(e) {
                console.log(e)
            }
        })
    }


})