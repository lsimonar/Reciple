import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  @Input() nextDate: Date = new Date();
  @Input() screen: string = "homepage";

  private subscription?: Subscription;
  
  public dateNow = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference: number = 0;
  public secondsToNextDate: number = 0;
  public minutesToNextDate: number = 0;
  public hoursToNextDate: number = 0;
  public daysToNextDate: number = 0;

  private getTimeDifference () {
    this.timeDifference = this.nextDate.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToNextDate = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToNextDate = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToNextDate = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToNextDate = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnInit() {
    this.getTimeDifference();
    this.subscription = interval(1000).subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


}