import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  @Input() title = '';
  @Input() timezone = 'Europe/Berlin';
  secondsDegrees = 0;
  minsDegrees = 0;
  hourDegrees = 0;

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.setDate();
    }, 1000);
  }

  setDate() {
    const dateTime = new Date().toLocaleString('en-US', {
      timeZone: this.timezone,
    });

    const now = new Date(dateTime);

    const seconds = now.getSeconds();
    this.secondsDegrees = (seconds / 60) * 360 + 90;

    const mins = now.getMinutes();
    this.minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;

    const hour = now.getHours();
    this.hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
  }
}
