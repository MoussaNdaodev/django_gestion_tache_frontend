import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalProjetCardComponent } from './minimal-projet-card-component';

describe('MinimalProjetCardComponent', () => {
  let component: MinimalProjetCardComponent;
  let fixture: ComponentFixture<MinimalProjetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalProjetCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalProjetCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
