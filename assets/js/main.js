// Mascot: Controls mascot's state and others
class MascotController{

    // HTMLElement with the structure
    mascot;
    mascotMounth;
    mascotLayer;
    dialogsContainer;

    // Functions
    siteConstructorFunction;
    postGoneFunction;

    // Status & Emotions
    statuses = {
        SLEEP   : "sleep",
        SHAKE   : "shake",
        AWAKE   : "awake",
        BYEBYE  : "byebye",
        GONE    : "gone",
    };
    
    mounthStatuses = {
        TALK    : "talk",
    };

    emotions = {
        NORMAL      : "normal",
        ANGRY       : "angry",
        SURPRISED   : "surprised",
        WORKING     : "working"
    }

    statusesValues = Object.values(this.statuses);
    currentStatus = this.statuses.SLEEP;

    // Sleep variables
    sleepCycle = 0;
    sleepCycleLimit = 4;

    // Dialog variables
    dialogTimePerLetter = 50;
    dialogTimePerDialog = 1250;
    isTalking = false;

    // Audios
    audioOnTalk;

    // siteConstructorFunction: After mascot talk with the user, call the function to "construct" the website
    constructor(siteConstructorFunction, postGoneFunction, audioOnTalk){

        // Find the mascot structure
        this.mascotLayer = document.querySelector("[data-layer=mascot]");
        this.mascot = document.querySelector(".mascot");
        this.mascotMounth = this.mascot.querySelector(".mounth");

        // Find the dialog container
        this.dialogsContainer = this.mascot.querySelector(".mascot-dialog-container");

        // Others
        this.siteConstructorFunction = typeof siteConstructorFunction == "function"? siteConstructorFunction : null;
        this.postGoneFunction = typeof postGoneFunction == "function"? postGoneFunction : null;
        this.audioOnTalk = Array.isArray( audioOnTalk )? audioOnTalk : [];

        this.Events();

        // Obtain current status
        this.FetchCurrentStatus();

    }

    // Add events to the mascot
    Events(){

        if(!this.mascot) return;

        // Click
        this.mascot.addEventListener("click", e => { this.OnClick(e); });

    }

    // What happend when you click depends on the status
    OnClick(event){

        if(this.isTalking) return;
        
        switch(this.currentStatus){
            case this.statuses.SLEEP:
                if(this.sleepCycle == 0) this.UpdateCurrentStatus(this.statuses.SHAKE);
                else if(this.sleepCycle == this.sleepCycleLimit) this.UpdateCurrentStatus(this.statuses.BYEBYE);
                else{
                    this.Talk([{ string: Localization.GetTranslate( "dontDisturb", Math.floor( Math.random() * 3 ) ), emotion: this.emotions.ANGRY }]);
                    this.sleepCycle++;
                }
                break;
        }

    }

    // Grab current status from HTMLElement
    FetchCurrentStatus(){
        this.currentStatus = this.mascot.dataset.status;
    }

    // Update current status. Add more events to mascot
    UpdateCurrentStatus(status){

        if( !this.statusesValues.find( s => s == status)) return;

        // Update
        this.currentStatus = status;

        switch(this.currentStatus){

            case this.statuses.SHAKE:
                const afterShake = e => {
                    this.mascot.removeEventListener("animationend", afterShake);
                    this.UpdateCurrentStatus(this.statuses.AWAKE);
                };
                this.mascot.addEventListener("animationend", afterShake);
                break;

            case this.statuses.AWAKE:

                if(this.sleepCycle == 0){
                    this.Talk([
                        { string: Localization.GetTranslate( "grettings", "one" ), emotion: this.emotions.ANGRY },
                        { string: Localization.GetTranslate( "grettings", "two" ), emotion: this.emotions.SURPRISED },
                        { string: Localization.GetTranslate( "grettings", "three" )},
                        { string: Localization.GetTranslate( "grettings", "four" )},
                        { string: Localization.GetTranslate( "grettings", "five" ), emotion: this.emotions.WORKING, postFunction: _ => { this.WebReady(); }},
                        { string: Localization.GetTranslate( "grettings", "six" )},
                        { string: Localization.GetTranslate( "grettings", "seven" ), emotion: this.emotions.SURPRISED },
                        { string: Localization.GetTranslate( "grettings", "eight" )},
                    ], this.statuses.SLEEP);
                }
                this.sleepCycle++;
                
                break;

            case this.statuses.BYEBYE:

                this.Talk([
                    { string: Localization.GetTranslate( "byebye", "one" ), emotion: this.emotions.ANGRY },
                    { string: Localization.GetTranslate( "byebye", "two" ), emotion: this.emotions.ANGRY },
                    { string: Localization.GetTranslate( "byebye", "three" ), emotion: this.emotions.ANGRY }
                ], this.statuses.GONE);

                break;

            case this.statuses.GONE:

                const afterGone = e => {
                    this.mascot.removeEventListener("animationend", afterGone);
                    this.mascot.remove();
                    if(this.postGoneFunction) this.postGoneFunction();
                };
                this.mascot.addEventListener("animationend", afterGone);

                break;
        }

        this.mascot.dataset.status = this.currentStatus;

    }

    // Display one or more strings as a dialog
    // dialogs := JSONArray with 3 properties (string, emotion, postFunction)
    async Talk( dialogs, postStatus ){

        if( this.isTalking || !this.dialogsContainer || !dialogs || !Array.isArray(dialogs) && dialogs.length == 0 ) return;
        this.isTalking = true;
        
        const domParser = new DOMParser();

        let promise = new Promise( (resolve, reject) => {

            let stringIndex = 0;
            let lastStringIndex = -1;
            let letterIndex = 0;
            let dialogContainer;

            const talkFunction = _ => {

                if(stringIndex < dialogs.length){
                    
                    if( stringIndex != lastStringIndex ){
                        dialogContainer = domParser.parseFromString( "<div class='mascot-dialog'></div>", "text/html" ).body.firstChild;
                        this.dialogsContainer.append(dialogContainer);
                        lastStringIndex = stringIndex;
                        this.mascotMounth.dataset.status = this.mounthStatuses.TALK;
                        this.mascot.dataset.mod = dialogs[ stringIndex ].emotion;
                        
                        if( this.audioOnTalk.length ) new Audio( this.audioOnTalk[ Math.floor(Math.random() * this.audioOnTalk.length)] ).play();

                    }

                    let currentString = dialogs[ stringIndex ].string;
                    if(letterIndex < currentString.length){
                        dialogContainer.innerHTML += currentString[letterIndex++];
                    }
                    else{
                        stringIndex++
                        letterIndex = 0;

                        delete this.mascotMounth.dataset.status;

                        setTimeout( _ => {
                            const preDialogContainer = dialogContainer;
                            preDialogContainer.addEventListener( "animationend", _ => {
                                preDialogContainer.remove();
                                if(typeof dialogs[ stringIndex - 1 ].postFunction == "function") dialogs[ stringIndex - 1 ].postFunction();
                            });
                            preDialogContainer.classList.add("gone");
                        }, this.dialogTimePerDialog * 0.8 );

                    };


                    setTimeout( _ => { talkFunction(); }, stringIndex != lastStringIndex? this.dialogTimePerDialog : this.dialogTimePerLetter);

                }
                else{
                    resolve(true);
                }

            };

            talkFunction();

        });

        await promise;

        // Reset
        delete this.mascot.dataset.mod;
        this.isTalking = false;

        if(postStatus) this.UpdateCurrentStatus(postStatus);
    }

    // Enable webpage navigation
    WebReady(){

        this.mascotLayer.classList.add( "ready" );
        if(this.siteConstructorFunction) this.siteConstructorFunction();

    }

}

// KonamiCode
window.addEventListener( 'load', _ => {
        
    let completeKonami = false;

    c = new KonaCode({
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
                        <div class="image" data-type="videogame"></div>
                        <div class="title">JanKenUP!</div>
                        <div class="description">${Localization.GetTranslate( "portfolio", "janken" )}</div>
                    </div>
                    <div class="project">
                        <div class="image" data-type="website"></div>
                        <div class="title">KonamiCode</div>
                        <div class="description">${Localization.GetTranslate( "portfolio", "konacode" )}</div>
                    </div>
                    <div class="project">
                        <div class="image" data-type="web Application"></div>
                        <div class="title">Causa: Voices of the Dusk</div>
                        <div class="description">${Localization.GetTranslate( "portfolio", "causa" )}</div>
                    </div>
                    <div class="project">
                        <div class="image" data-type="website"></div>
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
    ["/assets/sounds/talk/talk_one.mp3"],
    ["/assets/sounds/talk/talk_two.mp3"],
    ["/assets/sounds/talk/talk_three.mp3"],
    ["/assets/sounds/talk/talk_four.mp3"]
);