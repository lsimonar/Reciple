import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { selectSettings } from '../../store';
import { RecipleSettings } from 'src/app/store/reciple.reducer';
import * as actions from 'src/app/store/reciple.actions'

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  isDarkMode: boolean = false;
  isHighContrast: boolean = false;

  constructor(
    private store : Store,
    private service : AppService,
  ) { 
    this.store.select(selectSettings).subscribe((settings: RecipleSettings) => {
      this.isDarkMode = settings.isDarkMode;
      this.isHighContrast = settings.isHighContrast;
    })
  }

  ngOnInit(): void {
  }

  darkModeChange() {
    this.isDarkMode = !this.isDarkMode;
    this.service.setIsDarkMode(this.isDarkMode);
    this.store.dispatch(actions.setIsDarkMode({isDarkMode: this.isDarkMode}));
  }

  highContrastChange() {
    this.isHighContrast = !this.isHighContrast;
    this.service.setIsHighContrast(this.isHighContrast);
    this.store.dispatch(actions.setIsHighContrast({isHighContrast: this.isHighContrast}));
  }

}
