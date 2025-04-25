import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ItemSelectorComponent } from './components/item-selector/item-selector.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    ItemSelectorComponent,
    AppComponent
  ],
  providers: [],
})
export class AppModule { }
