( _ => {

    // Mascot: Controls mascot's state and others
    class MascotController{

        // HTMLElement with the structure
        mascot;
        mascotMounth;
        dialogsContainer;

        // Status & Emotions
        statuses = {
            SLEEP: "sleep",
            SHAKE: "shake",
            AWAKE: "awake"
        };
        
        mounthStatuses = {
            TALK: "talk",
        };

        emotions = {
            NORMAL: "normal",
            ANGRY: "angry",
            SURPRISED: "surprised"
        }

        statusesValues = Object.values(this.statuses);
        currentStatus = this.statuses.SLEEP;

        // Dialog variables
        dialogTimePerLetter = 50;
        dialogTimePerDialog = 2000;
        isTalking = false;

        constructor(){

            // Find the mascot structure
            this.mascot = document.querySelector(".mascot");
            this.mascotMounth = this.mascot.querySelector(".mounth");

            // Find the dialog container
            this.dialogsContainer = document.querySelector(".mascot-dialog-container");

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
            
            switch(this.currentStatus){
                case this.statuses.SLEEP:
                    this.UpdateCurrentStatus(this.statuses.SHAKE);
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
                    this.Talk([
                        { string: "¡¿QUÉ PASO?!", emotion: this.emotions.ANGRY },
                        { string: "Ah! Estaba descansando los ojos.", emotion: this.emotions.SURPRISED },
                        { string: "Don Claudio me dejo a cargo de saludar a los visitantes.", emotion: this.emotions.NORMAL },
                    ]);
                    break;
            }

            this.mascot.dataset.status = this.currentStatus;

        }

        // Display one or more strings as a dialog
        // dialogs := JSONArray with 2 properties (string, emotion)
        async Talk( dialogs ){

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
                                dialogContainer.addEventListener( "animationend", _ => { dialogContainer.remove(); });
                                dialogContainer.classList.add("gone");
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
        }

    }

    new MascotController();

})();