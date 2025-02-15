import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryHomeComponent } from './try-home.component';

describe('TryHomeComponent', () => {
  let component: TryHomeComponent;
  let fixture: ComponentFixture<TryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
