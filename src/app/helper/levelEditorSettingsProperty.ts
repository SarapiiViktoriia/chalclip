import 'reflect-metadata';
export function levelEditorSetting(): PropertyDecorator {
  return (target, key) => {
    const fields = Reflect.getOwnMetadata('levelEditorSetting', target) || [];
    if (!fields.includes(key)) {
      fields.push(key);
    }
    Reflect.defineMetadata('levelEditorSetting', fields, target);
  };
}
