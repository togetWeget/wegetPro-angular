import { CustomMeterialModule } from './custom-meterial.module';

describe('CustomMeterialModule', () => {
  let customMeterialModule: CustomMeterialModule;

  beforeEach(() => {
    customMeterialModule = new CustomMeterialModule();
  });

  it('should create an instance', () => {
    expect(customMeterialModule).toBeTruthy();
  });
});
