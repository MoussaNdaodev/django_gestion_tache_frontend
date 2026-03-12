import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationEquipeProjetComponent } from './page-creation-equipe-projet-component';

describe('PageCreationEquipeProjetComponent', () => {
  let component: PageCreationEquipeProjetComponent;
  let fixture: ComponentFixture<PageCreationEquipeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreationEquipeProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreationEquipeProjetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
