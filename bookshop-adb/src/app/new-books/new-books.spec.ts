import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBooks } from './new-books';

describe('NewBooks', () => {
  let component: NewBooks;
  let fixture: ComponentFixture<NewBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBooks],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
