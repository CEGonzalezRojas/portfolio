( _ => {

    // Mascot: Controls mascot's state and others
    class MascotController{

        // HTMLElement with the structure
        mascot;

        // Status
        statuses = {
            SLEEP: "sleep",
            SHAKE: "shake",
            AWAKE: "awake"
        };
        
        mounthStatuses = {
            TALK: "talk",
        };

        statusesValues = Object.values(this.statuses);
        currentStatus = this.statuses.SLEEP;

        constructor(){
            this.mascot = document.querySelector(".mascot");
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
            }

            this.mascot.dataset.status = this.currentStatus;

        }

    }

    new MascotController();

})();