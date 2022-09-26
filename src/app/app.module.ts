import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeScreenComponent, recipleAvailableLangs } from './home-screen/home-screen.component';
import { SettingsDialogComponent } from './dialogs/settings-dialog/settings-dialog.component';
import { StoreModule } from '@ngrx/store';
import { ContactPageComponent } from './screens/contact-page/contact-page.component';
import { recipleReducer } from './store/reciple.reducer';
import { AppService } from './app.service';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { StatisticsDialogComponent } from './dialogs/statistics-dialog/statistics-dialog.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CountdownComponent } from './components/countdown/countdown.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    SettingsDialogComponent,
    ContactPageComponent,
    KeyboardComponent,
    StatisticsDialogComponent,
    InfoDialogComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    MatDialogModule,
    FlexLayoutModule,
    HttpClientModule,
    ClipboardModule,
    MatSnackBarModule,
    StoreModule.forRoot({reciple: recipleReducer }),
    TranslateModule.forRoot({
      defaultLanguage: recipleAvailableLangs[0],
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
