import { Component } from '@angular/core';
import { PeriodicUpdatesService } from './services/periodic-updates/periodic-updates.service';
import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'NutriCampus';

  constructor(
    private periodicUpdates: PeriodicUpdatesService,
    public globalService: GlobalService
  ) { }

  ngOnInit() {
    this.periodicUpdates.startPeriodicUpdates();
  }
}
