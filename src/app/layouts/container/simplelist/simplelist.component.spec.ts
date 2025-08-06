import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplelistComponent } from './simplelist.component';

describe('SimplelistComponent', () => {
  let component: SimplelistComponent;
  let fixture: ComponentFixture<SimplelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});