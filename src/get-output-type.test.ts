import { describe, it, expect } from 'vitest';
import { GetOutputType } from './get-output-type';

describe('GetOutputType', () => {
  it('should return warning icon and text for warning type', () => {
    expect(GetOutputType('warning')).toBe('⚠️ Warning');
  });

  it('should return error icon and text for error type', () => {
    expect(GetOutputType('error')).toBe('❌ Error');
  });

  it('should return success icon and text for success type', () => {
    expect(GetOutputType('success')).toBe('✅ Success');
  });

  it('should return info icon and text for info type', () => {
    expect(GetOutputType('info')).toBe('ℹ️ Info');
  });

  it('should return user update icon and text for user_update type', () => {
    expect(GetOutputType('user_update')).toBe('👤 User Update');
  });

  it('should return recommendation icon and text for recommendation type', () => {
    expect(GetOutputType('recommendation')).toBe('💡 Recommendation');
  });

  it('should return snapshot icon and text for snapshot type', () => {
    expect(GetOutputType('snapshot')).toBe('📸 Snapshot');
  });

  it('should return undefined for unknown types', () => {
    expect(GetOutputType('unknown')).toBeUndefined();
  });
});
