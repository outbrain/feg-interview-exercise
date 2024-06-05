import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNavigateComponent } from './site-navigate.component';

describe('SiteNavigateComponent', () => {
  let component: SiteNavigateComponent;
  let fixture: ComponentFixture<SiteNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteNavigateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
