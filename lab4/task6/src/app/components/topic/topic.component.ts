import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from 'src/app/Topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  @Input()
  topic!: Topic;
  
  @Output() 
  topicChosen = new EventEmitter();

  onTopicChosen(): void {
    this.topicChosen.emit(this.topic);
  }
}
