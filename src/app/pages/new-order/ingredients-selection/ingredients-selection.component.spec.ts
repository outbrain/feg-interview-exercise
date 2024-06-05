import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsSelectionComponent } from './ingredients-selection.component';

describe('IngredientsSelectionComponent', () => {
  let component: IngredientsSelectionComponent;
  let fixture: ComponentFixture<IngredientsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
