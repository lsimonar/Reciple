import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSquaresComponent } from './game-squares.component';

describe('GameSquaresComponent', () => {
  let component: GameSquaresComponent;
  let fixture: ComponentFixture<GameSquaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSquaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
