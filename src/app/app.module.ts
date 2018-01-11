import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { EditButtonComponent } from './edit-button/edit-button.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StickyNoteComponent,
    EditButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
