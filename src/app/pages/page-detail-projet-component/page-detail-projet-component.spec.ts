import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetailProjetComponent } from './page-detail-projet-component';

describe('PageDetailProjetComponent', () => {
  let component: PageDetailProjetComponent;
  let fixture: ComponentFixture<PageDetailProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDetailProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDetailProjetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
