import { InventoryHandlerService } from './inventory-handler.service';
describe('InventoryHandler', () => {
  it('should create an instance', () => {
    expect(new InventoryHandlerService(null)).toBeTruthy();
  });
});
