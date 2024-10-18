import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PeriodicUpdatesService implements OnDestroy {

  private intervalId: any;
  private readonly intervalTime = 10000;

  constructor(private authService: AuthService) { }

  startPeriodicUpdates() {
    this.intervalId = setInterval(() => {
      this.updates();
    }, this.intervalTime);
  }

  updates() {
    this.authService.me();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}