import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const STORAGE_KEY = 'levels';
@Injectable({
  providedIn: 'root'
})
export class LevelSaverService {
  constructor(public storage: Storage) { }
  public async isSaved(levelName: string) {
    const result1 = await this.getAllSavedLevels();
    return result1 && result1.indexOf(levelName) !== -1;
  }
  public async saveLevel(levelName: string) {
    const result1 = await this.getAllSavedLevels();
    if (result1) {
      result1.push(levelName);
      return this.storage.set(STORAGE_KEY, result1);
    } else {
      return this.storage.set(STORAGE_KEY, [levelName]);
    }
  }
  public async deleteLevel(levelName: string) {
    const result1 = await this.getAllSavedLevels();
    if (result1) {
      const index = result1.indexOf(levelName);
      result1.splice(index, 1);
      return this.storage.set(STORAGE_KEY, result1);
    }
  }
  public getAllSavedLevels() {
    return this.storage.get(STORAGE_KEY);
  }
}
