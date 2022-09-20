import { NgModule } from '@angular/core';
import { ModuleWithProviders } from "@angular/core";
import { AppModule } from "./app.module";
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SettingsDialogComponent } from './dialogs/settings-dialog/settings-dialog.component';
import { ContactPageComponent } from './screens/contact-page/contact-page.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'settings', component: SettingsDialogComponent},
  { path: 'contact', component: ContactPageComponent}

];

export const AppRoutingModule: ModuleWithProviders<AppModule> = RouterModule.forRoot(routes);
