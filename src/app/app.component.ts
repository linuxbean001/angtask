import { Component } from '@angular/core';
import { PollingService } from './polling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taskOct';
  numUnsubscribe;

  constructor(private pollService: PollingService) { }

  ngOnInit() {
    this.onlineStatus();
    this.generateNumber();
  }

  generateNumber() {
    this.numUnsubscribe = this.pollService.getNumber().subscribe(res => { console.log('res', res); });
  }

  onlineStatus() {
    this.pollService.getOnlineStatus().subscribe(isOnline => {
      if (isOnline) {
        console.log(`User is online and logged in`);
      } else {
        console.error(`You are offline`);
      }
    });
  }
}
