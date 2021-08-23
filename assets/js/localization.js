class Localization{

    // Valid languages
    static validLanguage = [ "en", "es", "es-cl"];
    static allowedCompoundLanguage = [ "es-cl" ];

    static strings = {
        main:{
            en:{
                
            },
            es:{

            },
            "es-cl":{

            }
        }
    };

    // Get the translated string
    static GetTranslate( page, key, element, values ){
        
        let language = navigator.language.toLowerCase();

        // Some languages can be compund
        if( Localization.allowedCompoundLanguage.indexOf(language) == -1 ) language = language.split("-")[0];
        if( Localization.validLanguage.indexOf(language) == -1 ) language = Localization.validLanguage[0]; 
        
        let string = "";
        values = values? values.split(",") : [];
        const withArguments = values.length > 0;

        if( !this.strings[ page ] ) return;

        string = this.strings[ page ][ key ];

        // Replace arguments
        if(withArguments){

            for(let i = 0; i < values.length; i++){
                string = string.replace(`{${i}}`, values[i]);
            }

        }
        
        if(string) element.innerHTML = string;

    }

}

// Process all the text with localization attr
const needLocalization = Array.from( document.querySelectorAll( "[data-localization-key]" ) );
for( const e of needLocalization ){
    Localization.GetTranslate(e.dataset.localizationPage, e.dataset.localizationKey, e, e.dataset.localizationArguments);
}