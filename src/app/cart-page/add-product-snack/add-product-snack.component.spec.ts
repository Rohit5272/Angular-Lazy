import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSnackComponent } from './add-product-snack.component';

describe('AddProductSnackComponent', () => {
  let component: AddProductSnackComponent;
  let fixture: ComponentFixture<AddProductSnackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductSnackComponent]
    });
    fixture = TestBed.createComponent(AddProductSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
