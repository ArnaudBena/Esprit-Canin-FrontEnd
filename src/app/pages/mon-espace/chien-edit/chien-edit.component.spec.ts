import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChienEditComponent } from './chien-edit.component';

describe('ChienEditComponent', () => {
  let component: ChienEditComponent;
  let fixture: ComponentFixture<ChienEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChienEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChienEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
