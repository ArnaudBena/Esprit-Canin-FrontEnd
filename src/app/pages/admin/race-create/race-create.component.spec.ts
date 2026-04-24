import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceCreateComponent } from './race-create.component';

describe('RaceCreateComponent', () => {
  let component: RaceCreateComponent;
  let fixture: ComponentFixture<RaceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RaceCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
