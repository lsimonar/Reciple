import { Renderer2, RendererFactory2 } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private settingsStorageKey = 'reciple_settings';
  private renderer : Renderer2;

  constructor(
    private router: Router,
    rendererFactory: RendererFactory2
    ) { 
      this.renderer = rendererFactory.createRenderer(null, null);
  }
  
  
  //Store functions

  getLocalSettings() {
    const strLocalSettings = localStorage.getItem(this.settingsStorageKey);
    return strLocalSettings == null ? null : JSON.parse(strLocalSettings);
  }

  setLocalSettings(localSettings: any) {
    localStorage.setItem(this.settingsStorageKey, JSON.stringify(localSettings));
  }

  setIsDarkMode(isDarkMode: boolean) {
    if(isDarkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    } else {
      this.renderer.removeClass(document.body, 'darkMode');
    }
    let localSettings = this.getLocalSettings();
    if(localSettings == null) {
      localSettings = {};
    }
    localSettings.isDarkMode = isDarkMode;
    this.setLocalSettings(localSettings);
  }

  isDarkMode(): boolean {
    const localSettings = this.getLocalSettings();
    if(localSettings != null && localSettings.isDarkMode != null && localSettings.isDarkMode != undefined) {
      return this.isTrue(localSettings.isDarkMode);
    } else {
      return false;
    }
  }
  
  private isTrue(checkVar: any) {
    return checkVar == true || checkVar == 'true' || checkVar == 'True';
  }
  
}

