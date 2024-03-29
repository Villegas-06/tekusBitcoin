import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinDetailsComponent } from './bitcoin-details.component';

describe('BitcoinDetailsComponent', () => {
  let component: BitcoinDetailsComponent;
  let fixture: ComponentFixture<BitcoinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitcoinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
