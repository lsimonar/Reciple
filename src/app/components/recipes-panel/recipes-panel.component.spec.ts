import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesPanelComponent } from './recipes-panel.component';

describe('RecipesPanelComponent', () => {
  let component: RecipesPanelComponent;
  let fixture: ComponentFixture<RecipesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
