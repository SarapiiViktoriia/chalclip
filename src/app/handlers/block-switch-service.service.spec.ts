import { TestBed } from '@angular/core/testing';
import { BlockSwitchServiceService } from './block-switch-service.service';
describe('SwitchServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BlockSwitchServiceService = TestBed.get(BlockSwitchServiceService);
    expect(service).toBeTruthy();
  });
});
