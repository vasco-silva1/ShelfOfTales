import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableBooksComponent } from './unavailable-books.component';

describe('UnavailableBooksComponent', () => {
  let component: UnavailableBooksComponent;
  let fixture: ComponentFixture<UnavailableBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnavailableBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnavailableBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
