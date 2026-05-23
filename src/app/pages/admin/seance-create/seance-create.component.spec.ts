import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceCreateComponent } from './seance-create.component';

describe('SeanceCreateComponent', () => {
  let component: SeanceCreateComponent;
  let fixture: ComponentFixture<SeanceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeanceCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeanceCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
