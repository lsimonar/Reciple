import { NgModule } from '@angular/core';
import { ModuleWithProviders } from "@angular/core";
import { AppModule } from "./app.module";
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent },
];

export const AppRoutingModule: ModuleWithProviders<AppModule> = RouterModule.forRoot(routes);
