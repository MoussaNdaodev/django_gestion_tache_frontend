import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationTacheProjetComponent } from './page-creation-tache-projet-component';

describe('PageCreationTacheProjetComponent', () => {
  let component: PageCreationTacheProjetComponent;
  let fixture: ComponentFixture<PageCreationTacheProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreationTacheProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreationTacheProjetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
