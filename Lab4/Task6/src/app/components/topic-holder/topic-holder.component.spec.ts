import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicHolderComponent } from './topic-holder.component';

describe('TopicHolderComponent', () => {
  let component: TopicHolderComponent;
  let fixture: ComponentFixture<TopicHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
