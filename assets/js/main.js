( _ => {

    // Mascot: Controls mascot's state and others
    class MascotController{

        // HTMLElement with the structure
        mascot;
        mascotMounth;
        dialogsContainer;

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

        constructor(){

            // Find the mascot structure
            this.mascot = document.querySelector(".mascot");
            this.mascotMounth = this.mascot.querySelector(".mounth");

            // Find the dialog container
            this.dialogsContainer = this.mascot.querySelector(".mascot-dialog-container");

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
                            { string: Localization.GetTranslate( "grettings", "five" ), emotion: this.emotions.WORKING },
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
                    };
                    this.mascot.addEventListener("animationend", afterGone);

                    break;
            }

            this.mascot.dataset.status = this.currentStatus;

        }

        // Display one or more strings as a dialog
        // dialogs := JSONArray with 2 properties (string, emotion)
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
                                preDialogContainer.addEventListener( "animationend", _ => { preDialogContainer.remove(); });
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

    }

    new MascotController();

})();