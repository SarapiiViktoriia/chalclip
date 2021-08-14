import { TestBed } from '@angular/core/testing';
import { LevelSaverService } from './level-saver.service';
describe('LevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: LevelSaverService = TestBed.get(LevelSaverService);
    expect(service).toBeTruthy();
  });
});
