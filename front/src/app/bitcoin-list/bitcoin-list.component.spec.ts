import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinListComponent } from './bitcoin-list.component';

describe('BitcoinListComponent', () => {
  let component: BitcoinListComponent;
  let fixture: ComponentFixture<BitcoinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitcoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
