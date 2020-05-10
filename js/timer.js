class Timer {
    constructor(durationInput, startBtn, pauseBtn, callbacks){
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);

        // check if callbacks were provided
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
    }

    start = () => {
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 20);
        clearInterval(timer);
    }

    tick = () => {
        // console.log(this.timeRemaining);
        if(this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        }else{
            this.timeRemaining = this.timeRemaining - .02;
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }
    }
    
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2);
    }

    pause = () => {
        clearInterval(this.interval);
    }
}