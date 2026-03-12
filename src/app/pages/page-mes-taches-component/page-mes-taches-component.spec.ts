import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMesTachesComponent } from './page-mes-taches-component';

describe('PageMesTachesComponent', () => {
  let component: PageMesTachesComponent;
  let fixture: ComponentFixture<PageMesTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMesTachesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMesTachesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
