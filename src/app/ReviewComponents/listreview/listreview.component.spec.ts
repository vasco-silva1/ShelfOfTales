import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreviewComponent } from './listreview.component';

describe('ListreviewComponent', () => {
  let component: ListreviewComponent;
  let fixture: ComponentFixture<ListreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
