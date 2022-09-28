import { Store } from '@ngrx/store';
import { Component, OnChanges, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { selectAvailableLanguages, selectSettings } from '../../store';
import { RecipleSettings } from 'src/app/store/reciple.reducer';
import * as actions from 'src/app/store/reciple.actions'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit, OnChanges {

  isDarkMode: boolean = false;
  isHighContrast: boolean = false;
  contentInitialized: boolean = false;
  availableLanguages: Array<string> = [];
  currentLanguage: string = '';
  lang = '';

  constructor(
    private store : Store,
    private service : AppService,
    private translate : TranslateService,
  ) { 
    this.store.select(selectAvailableLanguages).subscribe((availableLanguages: Array<string>) => {
      this.availableLanguages = availableLanguages;
    });
    this.store.select(selectSettings).subscribe((settings: RecipleSettings) => {
      this.isDarkMode = settings.isDarkMode;
      this.isHighContrast = settings.isHighContrast;
      this.lang = settings.language;
      this.currentLanguage = settings.language;
    });
  }

  ngOnInit(): void {
    this.lang = this.currentLanguage;
  }

  ngOnChanges(): void {
    this.lang = this.currentLanguage;
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

  changeLanguage(newLanguage: string) {
    this.service.setLanguage(newLanguage);
    this.translate.use(newLanguage);
    this.store.dispatch(actions.setLanguage({language: newLanguage}));
  }

}
