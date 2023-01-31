import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from 'src/app/Topic';

@Component({
  selector: 'app-topic-holder',
  templateUrl: './topic-holder.component.html',
  styleUrls: ['./topic-holder.component.css']
})
export class TopicHolderComponent {
  @Input()
  topics!: Topic[];
    
  @Output() 
  topicChosen = new EventEmitter();

  onTopicChosen(topic: Topic): void {
    this.topicChosen.emit(topic);
  }
}
