import { MascotController } from "/assets/js/mascot.js";
import { LazyLoad } from "/assets/js/lazyLoad.js";

// KonamiCode
window.addEventListener( 'load', _ => {
        
    let completeKonami = false;

    new KonaCode({
            codes: [
                {
                    callback: _ =>{

                        // Reset
                        setTimeout( _ => {
                            completeKonami = false;
                        }, 1400 );

                    },
                    progress: (count, percent) => {

                        if( completeKonami ) return;
                        completeKonami = percent == 100;

                    }
                }
            ]
        }
    );

});

new MascotController( _ => {

    const mainLayer = new DOMParser().parseFromString(
        `
        <div data-layer="main">
            <div class="intro">
                <h1>${Localization.GetTranslate( "main", "introTitle" )}</h1>
                <p>${Localization.GetTranslate( "main", "introPOne" )}</p>
                <p>${Localization.GetTranslate( "main", "introPTwo" )}</p>
                <p>${Localization.GetTranslate( "main", "introPThree" )}</p>
                <p>${Localization.GetTranslate( "main", "introPFour" )}</p>
            </div>
            <div class="portfolio">
                <div class="title">${Localization.GetTranslate( "portfolio", "title" )}</div>
                <div class="projects">
                    <div class="project">
                        <div class="image" data-type="videogame" data-url="/assets/images/portfolio/jankenup.gif" data-lazy="true" data-lazy_type="background"></div>
                        <div class="title">JanKenUP!</div>
                        <div class="description">${Localization.GetTranslate( "portfolio", "janken" )}</div>
                    </div>
                    <div class="project">
                        <div class="image" data-type="website" data-url="/assets/images/portfolio/konacode.gif" data-lazy="true" data-lazy_type="background"></div>
                        <div class="title">KonamiCode</div>
                        <div class="description">${Localization.GetTranslate( "portfolio", "konacode" )}</div>
                    </div>
                    <div class="project">
                        <div class="image" data-type="web Application" data-url="/assets/images/portfolio/causa.gif" data-lazy="true" data-lazy_type="background"></div>
                        <div class="title">Causa: Voices of the Dusk</div>
                        <div class="description">${Localization.GetTranslate( "portfolio", "causa" )}</div>
                    </div>
                    <div class="project">
                        <div class="image" data-type="website" data-url="/assets/images/portfolio/niebla.gif" data-lazy="true" data-lazy_type="background"></div>
                        <div class="title">Niebla Games</div>
                        <div class="description">${Localization.GetTranslate( "portfolio", "niebla" )}</div>
                    </div>
                </div>
            </div>
            <div class="youtube">
                <div class="title">Youtube</div>
                <p>${Localization.GetTranslate( "youtube", "one" )}</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/g3ZMN37UwSg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>${Localization.GetTranslate( "youtube", "two" )}</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/0mqdJTMoOeM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="contact">
                <div class="title">${Localization.GetTranslate( "contact", "title" )}</div>
                <p>${Localization.GetTranslate( "contact", "one" )}</a></p>
            </div>
            <div class="footer">${Localization.GetTranslate( "footer", "one" )}</div>
        </div>
        `,
        "text/html" ).body.firstChild;

    document.body.append(mainLayer);

    // Add link
    mainLayer.querySelector(".footer > a").addEventListener( "click", _ => {
        window.open( "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be", "_blank" );
    });

    mainLayer.querySelectorAll("[data-email]").forEach(email => {
        email.addEventListener( "click", _ => {
            window.open( "mailto:claudioestebangonzalezrojas@gmail.com", "_blank" );
        }); 
    });

}, _ => {
    document.querySelector("[data-layer=main]").classList.add("ready");
},
    [
        "/assets/sounds/talk/talk_one.mp3",
        "/assets/sounds/talk/talk_two.mp3",
        "/assets/sounds/talk/talk_three.mp3",
        "/assets/sounds/talk/talk_four.mp3",
    ],
);

new LazyLoad();