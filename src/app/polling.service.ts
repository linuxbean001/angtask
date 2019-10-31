import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PollingService {
  isUserLoggedIn$: Observable<boolean> = merge(
    of(navigator.onLine),
    fromEvent(window, 'online').pipe(mapTo(true)),
    fromEvent(window, 'offline').pipe(mapTo(false))
  );
  myNumber$ = new Subject<number>();

  constructor() { }

  getOnlineStatus(): Observable<boolean> {
    return this.isUserLoggedIn$;
  }

  getNumber(): Observable<number> {
    setInterval(() => {
      this.myNumber$.next(Math.floor(Math.random() * 10));
    }, 500);
    return this.myNumber$;
  }
}
