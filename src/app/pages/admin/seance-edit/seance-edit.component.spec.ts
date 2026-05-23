import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceEditComponent } from './seance-edit.component';

describe('SeanceEditComponent', () => {
  let component: SeanceEditComponent;
  let fixture: ComponentFixture<SeanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeanceEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeanceEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
