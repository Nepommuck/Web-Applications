import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicHolderComponent } from './components/topic-holder/topic-holder.component';
import { TopicComponent } from './components/topic/topic.component';
import { ButtonComponent } from './components/button/button.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicHolderComponent,
    TopicComponent,
    ButtonComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
