import { TestBed } from '@angular/core/testing';
import { LevelHandlerService } from './level-handler.service';
describe('LevelHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: LevelHandlerService = TestBed.get(LevelHandlerService);
    expect(service).toBeTruthy();
  });
});
