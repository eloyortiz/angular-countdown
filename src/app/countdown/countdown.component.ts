import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  ngOnInit():void{
    this.startCountDown();
  }

  ngOnDestroy():void{
    this.clearTimeout();
  }

  ngOnChanges(changes):void{
    console.log("init value updated to: ", changes.init.currentValue);
    this.startCountDown();
    
  }

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init:number = null;
  public counter:number = 0;
  private countdownTimerRef:any = null;

  constructor() { }

  startCountDown(){
    if(this.init && this.init>0){
      this.clearTimeout();
      this.counter = this.init;
      this.doCountDown();
    }
  }

  doCountDown(){
    this.countdownTimerRef =  setTimeout( () => {
      this.counter = this.counter -1;
      this.processCountDown();
    }, 1000);
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCountDown(){
    this.onDecrease.emit(this.counter);
    console.log("count is", this.counter);

    if(this.counter==0){
      this.onComplete.emit();
      console.log("--counter end--");
    }
    else{
      this.doCountDown();
    }
    
  }

}
