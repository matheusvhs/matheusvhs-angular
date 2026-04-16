import { describe, it, expect } from 'vitest';
import { environment } from '../environments/environment';

describe('Environment config', () => {
  it('should have apiUrl defined', () => {
    expect(environment.apiUrl).toBeDefined();
  });

  it('should not be production in dev environment', () => {
    expect(environment.production).toBe(false);
  });
});
