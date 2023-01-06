import { Component, EventEmitter, Output } from '@angular/core';
import data from './topics.json';
import { Topic } from './Topic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'zest4-zad6';

  topics: Topic[] = data.topics;
  displayedTopic: Topic = { title: "", description: "", content: "" };

  changeDisplayedTopic(topic: Topic): void {
    this.displayedTopic = topic;
  }
}
