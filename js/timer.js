const div = document.querySelector('div');

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
            this.onStart();
        }
        this.tick();
        this.interval = setInterval(this.tick, 1000);
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
            this.timeRemaining = this.timeRemaining - 1;
            if(this.onTick){
                this.onTick();
            }
        }
    }
    
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time){
        return this.durationInput.value = time;
    }

    pause = () => {
        clearInterval(this.interval);
    }
}

const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');

const timer = new Timer(durationInput, startBtn, pauseBtn, {
    onStart(){
        console.log('Timer started!');
    },
    onTick(){
        console.log("Timer just ticked down");
    },
    onComplete(){
        console.log("Timer is completed");
    }
});
// timer.start();
