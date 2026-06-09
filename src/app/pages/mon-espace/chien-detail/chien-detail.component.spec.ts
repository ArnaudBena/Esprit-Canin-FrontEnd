import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChienDetailComponent } from './chien-detail.component';

describe('ChienDetailComponent', () => {
  let component: ChienDetailComponent;
  let fixture: ComponentFixture<ChienDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChienDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChienDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
