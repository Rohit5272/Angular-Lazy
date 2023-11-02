import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedProductComponent } from './added-product.component';

describe('AddedProductComponent', () => {
  let component: AddedProductComponent;
  let fixture: ComponentFixture<AddedProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddedProductComponent]
    });
    fixture = TestBed.createComponent(AddedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
