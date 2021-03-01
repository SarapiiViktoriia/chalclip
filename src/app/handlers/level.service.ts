import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const STORAGE_KEY = 'levels';
@Injectable({
  providedIn: 'root'
})
export class LevelService {
  constructor(public storage: Storage) { }
  isSaved(levelId) {
    return this.getAllSavedLevels().then(result => {
      return result && result.indexOf(levelId) !== -1;
    });
  }
  saveLevel(levelId) {
    return this.getAllSavedLevels().then(result => {
      if (result) {
        result.push(levelId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [levelId]);
      }
    });
  }
  deleteLevel(levelId) {
    return this.getAllSavedLevels().then(result => {
      if (result) {
        const index = result.indexOf(levelId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
  getAllSavedLevels() {
    return this.storage.get(STORAGE_KEY);
  }
}
