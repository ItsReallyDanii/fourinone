/**
 * Tests for function contracts
 * Validates that stub functions follow their defined contracts
 */

const { cron_check_targets } = require('../src/cron_check_targets');
const { evaluate_incident_state } = require('../src/evaluate_incident_state');
const { dispatch_alerts } = require('../src/dispatch_alerts');

describe('Function Contracts', () => {
  describe('cron_check_targets', () => {
    test('should return expected contract structure', async () => {
      const result = await cron_check_targets();
      
      expect(result).toHaveProperty('targetsChecked');
      expect(result).toHaveProperty('successful');
      expect(result).toHaveProperty('failed');
      expect(result).toHaveProperty('errors');
      
      expect(typeof result.targetsChecked).toBe('number');
      expect(typeof result.successful).toBe('number');
      expect(typeof result.failed).toBe('number');
      expect(Array.isArray(result.errors)).toBe(true);
    });
    
    test('should return valid numbers', async () => {
      const result = await cron_check_targets();
      
      expect(result.targetsChecked).toBeGreaterThanOrEqual(0);
      expect(result.successful).toBeGreaterThanOrEqual(0);
      expect(result.failed).toBeGreaterThanOrEqual(0);
    });
  });
  
  describe('evaluate_incident_state', () => {
    test('should return expected contract structure', async () => {
      const targetId = 'target-123';
      const result = await evaluate_incident_state(targetId);
      
      expect(result).toHaveProperty('action');
      expect(result).toHaveProperty('incidentId');
      expect(result).toHaveProperty('state');
      
      expect(typeof result.action).toBe('string');
    });
    
    test('should validate action is one of expected values', async () => {
      const targetId = 'target-123';
      const result = await evaluate_incident_state(targetId);
      
      const validActions = ['none', 'created', 'updated', 'resolved'];
      expect(validActions).toContain(result.action);
    });
    
    test('should throw error for invalid targetId', async () => {
      await expect(evaluate_incident_state()).rejects.toThrow('targetId must be a non-empty string');
      await expect(evaluate_incident_state('')).rejects.toThrow('targetId must be a non-empty string');
      await expect(evaluate_incident_state(123)).rejects.toThrow('targetId must be a non-empty string');
    });
    
    test('should accept valid targetId string', async () => {
      const targetId = 'target-123';
      await expect(evaluate_incident_state(targetId)).resolves.toBeDefined();
    });
  });
  
  describe('dispatch_alerts', () => {
    test('should return expected contract structure', async () => {
      const incidentId = 'incident-123';
      const result = await dispatch_alerts(incidentId);
      
      expect(result).toHaveProperty('dispatched');
      expect(result).toHaveProperty('channels');
      expect(result).toHaveProperty('errors');
      
      expect(typeof result.dispatched).toBe('number');
      expect(Array.isArray(result.channels)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
    });
    
    test('should return valid numbers', async () => {
      const incidentId = 'incident-123';
      const result = await dispatch_alerts(incidentId);
      
      expect(result.dispatched).toBeGreaterThanOrEqual(0);
    });
    
    test('should throw error for invalid incidentId', async () => {
      await expect(dispatch_alerts()).rejects.toThrow('incidentId must be a non-empty string');
      await expect(dispatch_alerts('')).rejects.toThrow('incidentId must be a non-empty string');
      await expect(dispatch_alerts(123)).rejects.toThrow('incidentId must be a non-empty string');
    });
    
    test('should accept valid incidentId string', async () => {
      const incidentId = 'incident-123';
      await expect(dispatch_alerts(incidentId)).resolves.toBeDefined();
    });
  });
});
