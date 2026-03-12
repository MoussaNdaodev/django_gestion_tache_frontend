import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfilComponent } from './page-profil-component';

describe('PageProfilComponent', () => {
  let component: PageProfilComponent;
  let fixture: ComponentFixture<PageProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageProfilComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
