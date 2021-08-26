class Localization{

    // Valid languages
    static validLanguage = [ "en", "es", "es-cl"];
    static allowedCompoundLanguage = [ "es-cl" ];

    static strings = {

        grettings:{
            en:{
                one     : "WHAT?!",
                two     : "Oh! ... I'm just resting my eyes.",
                three   : "Don Claudio put me in charge.",
                four    : "I will enable the web for you in a moment.",
                five    : "...",
                six     : "Ready, I'm going to sleep.",
                seven   : "I mean... to fix some bugs.",
                eight   : "Have a great day!"
            },
            es:{
                one     : "¡¿QUÉ PASO?!",
                two     : "Ah! ... Solo estaba descansando.",
                three   : "Don Claudio me dejo a cargo.",
                four    : "Le habilitaré la web en un momento.",
                five    : "...",
                six     : "Listo, me voy a dormir.",
                seven   : "Digo... a corregir unos errores.",
                eight   : "¡Que tenga un buen día!"
            },
            "es-cl":{
                one     : "¡¿QUÉ PASO?!",
                two     : "Ah! ... Estaba descansando los ojos.",
                three   : "Don Claudio me dejo a cargo.",
                four    : "Te habilitaré la página al toque...",
                five    : "...",
                six     : "Listo, me voy al tuto.",
                seven   : "Digo... a corregir unos errores.",
                eight   : "¡Que te vaiga bien!"
            }
        },

        dontDisturb:{
            en:{
                0: "zzzzz...",
                1: "... please... come on...",
                2: "I'm sleeping..."
            },
            es:{
                0: "zzzzz...",
                1: "... por favor... detente...",
                2: "Estoy durmiendo..."
            },
            "es-cl":{
                0: "zzzzz...",
                1: "... ya pueh' ...",
                2: "Estoy raja..."
            }
        },

        byebye:{
            en:{
                one     : "ENOUGH!!",
                two     : "I have to go...",
                three   : "See you!"
            },
            es:{
                one     : "¡¿BASTA?!",
                two     : "Me tengo que ir...",
                three   : "¡Adiós!"
            },
            "es-cl":{
                one     : "¡¿QUÉ WEA?!",
                two     : "Me aburrí...",
                three   : "¡Chaucha!"
            }
        },

        main:{
            en:{
                introTitle      : "Hi!",
                introPOne       : `My name is Claudio Esteban González Rojas and I have ~${new Date().getFullYear() - 2011} years of experience developing software.`,
                introPTwo       : "Throughout these years, I have developed mobile applications, web applications and video games.",
                introPThree     : "Here are some examples of my work (If you need my resume, don't hesitate to <a data-email>contact me</a>)",
                introPFour      : "Thanks for coming.",
            },
            es:{
                introTitle  : "¡Hola!",
                introPOne   : `Mi nombre es Claudio Esteban González Rojas y tengo ~${new Date().getFullYear() - 2011} años de experiencia desarrollando software.`,
                introPTwo   : "A lo largo de estos años, he desarrollado aplicaciones móviles, aplicaciones web y videojuegos.",
                introPThree : "Aquí hay unos ejemplos de mi trabajo (Si necesitas mi curriculum, no dudes en <a data-email>contactarme</a>).",
                introPFour  : "Gracias por venir."
            },
            "es-cl":{
                introTitle  : "¡Hola!",
                introPOne   : `Mi nombre es Claudio Esteban González Rojas y tengo ~${new Date().getFullYear() - 2011} años de experiencia desarrollando software.`,
                introPTwo   : "A lo largo de estos años, he desarrollado aplicaciones móviles, aplicaciones web y videojuegos.",
                introPThree : "Aquí hay unos ejemplos de lo que hago (Si necesitas mi curriculum, no dudes en <a data-email>contactarme</a>).",
                introPFour  : "Gracias por venir."
            }
        },

        portfolio:{
            en:{
                title       : "Portfolio",
                janken      : "Game designer and programmer of a high-octane rock-paper-scissors video game.",
                konacode    : "JS / CSS implementation of the classic Konami code.",
                causa       : "Web developer of the video game Causa, Voices of the Dusk.",
                niebla      : "Website for an indie game developer.",
            },
            es:{
                title       : "Portafolio",
                janken      : "Game designer y programador de un videojuego de piedra, papel y tijeras de alto octanaje.",
                konacode    : "Implementacion JS/CSS del clásico código de Konami.",
                causa       : "Desarrollador de la web del videojuego Causa, Voices of the Dusk.",
                niebla      : "Sitio web para una desarrolladora de videojuegos indie.",
            },
            "es-cl":{
                title       : "Portafolio",
                janken      : "Game designer y programador de un videojuego de cachipun de alto octanaje.",
                konacode    : "Implementacion JS/CSS del clásico código de Konami.",
                causa       : "Desarrollador de la web del videojuego Causa, Voices of the Dusk.",
                niebla      : "Sitio web para una desarrolladora de videojuegos indie.",
            }
        },

        youtube:{
            en:{
                one         : "I always had the intention of creating a YouTube channel, but I never did. Well.. I uploaded things to my personal channel but nothing special.",
                two         : "Now I have a channel where I upload videos related to game development, but there could also be more content in the future.",
            },
            es:{
                one         : "Siempre tuve la intención de crear un canal de Youtube, pero nunca lo hice. Bueno si, subía cosas a mi canal personal pero nada del otro mundo.",
                two         : "Ahora tengo un canal donde subo videos relacionados al desarrollo de videojuegos, pero también podría haber más contenido a futuro.",
            },
            "es-cl":{
                one         : "Siempre tuve la intención de crear un canal de Youtube, pero nunca lo hice. Bueno si, subía cosas a mi canal personal pero nada del otro mundo.",
                two         : "Ahora tengo un canal donde subo videos relacionados al desarrollo de videojuegos, pero también podría haber más contenido a futuro.",
            }
        },

        contact:{
            en:{
                title       : "Contact",
                one         : "If you need to contact me for any reason, <a data-email> you can send me an email.</a>",
            },
            es:{
                title       : "Contacto",
                one         : "Si necesitas contactarme por algún motivo, <a data-email>puedes enviarme un email.</a>",
            },
            "es-cl":{
                title       : "Contacto",
                one         : "Si necesitas contactarme por algún motivo, <a data-email>puedes enviarme un email.</a>",
            }
        },

        footer:{
            en:{
                one         : "Made with love with <a>Easy Landing</a>",
            },
            es:{
                one         : "Hecho con amor con <a>Easy Landing</a>",
            },
            "es-cl":{
                one         : "Hecho con amor con <a>Easy Landing</a>",
            }
        }
    };

    // Get the translated string
    static GetTranslate( page, key, element, values ){
        
        let language = navigator.language.toLowerCase();

        // Some languages can be compund
        if( Localization.allowedCompoundLanguage.indexOf(language) == -1 ) language = language.split("-")[0];
        if( Localization.validLanguage.indexOf(language) == -1 ) language = Localization.validLanguage[0]; 
        else language = "en";
        
        let string = "";
        values = values? values.split(",") : [];
        const withArguments = values.length > 0;

        if( !this.strings[ page ] ) return;

        string = this.strings[ page ][ language ][ key ];

        // Replace arguments
        if(withArguments){

            for(let i = 0; i < values.length; i++){
                string = string.replace(`{${i}}`, values[i]);
            }

        }
        
        if(element) element.innerHTML = string? string : "";
        else return string;
    }

}

// Process all the text with localization attr
const needLocalization = Array.from( document.querySelectorAll( "[data-localization-key]" ) );
for( const e of needLocalization ){
    Localization.GetTranslate(e.dataset.localizationPage, e.dataset.localizationKey, e, e.dataset.localizationArguments);
}

window.Localization = Localization;