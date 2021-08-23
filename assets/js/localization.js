class Localization{

    // Valid languages
    static validLanguage = [ "en", "es", "es-cl"];
    static allowedCompoundLanguage = [ "es-cl" ];

    static strings = {
        grettings:{
            en:{
                one     : "WHAT?!",
                two     : "Ah! ... I'm just resting my eyes.",
                three   : "Don Claudio left me in charge.",
                four    : "I will enable the web for you in a moment.",
                five    : "...",
                six     : "Ready, I'm going to sleep... I mean, to fix some bugs.",
                seven   : "Have a great day!"
            },
            es:{
                one     : "¡¿QUÉ PASO?!",
                two     : "Ah! ... Solo estaba descansando.",
                three   : "Don Claudio me dejo a cargo.",
                four    : "Le habilitaré la web en un momento.",
                five    : "...",
                six     : "Listo, me voy a dormir... Digo, a corregir unos errores.",
                seven   : "¡Que tenga un buen día!"
            },
            "es-cl":{
                one     : "¡¿QUÉ PASO?!",
                two     : "Ah! ... Estaba descansando los ojos.",
                three   : "Don Claudio me dejo a cargo.",
                four    : "Te habilitaré la página al toque...",
                five    : "...",
                six     : "Listo, me voy al tuto... Digo, a corregir unos errores.",
                seven   : "¡Que te vaiga bien!"
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
        language = "es-cl";
        
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