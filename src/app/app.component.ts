import { Component } from '@angular/core';
import { PeriodicUpdatesService } from './services/periodic-updates/periodic-updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'NutriCampus';

  constructor(private periodicUpdates: PeriodicUpdatesService) { }

  ngOnInit() {
    this.periodicUpdates.startPeriodicUpdates();
  }
}
