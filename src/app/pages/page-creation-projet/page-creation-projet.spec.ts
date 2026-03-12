import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationProjet } from './page-creation-projet';

describe('PageCreationProjet', () => {
  let component: PageCreationProjet;
  let fixture: ComponentFixture<PageCreationProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreationProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreationProjet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
