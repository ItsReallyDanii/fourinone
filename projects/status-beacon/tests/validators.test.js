/**
 * Tests for schema validators
 */

const {
  validateTargetData,
  validateCheckData,
  validateIncidentData,
  validateAlertRuleData
} = require('../src/validators');

describe('Schema Validators', () => {
  describe('validateTargetData', () => {
    test('should validate a valid target', () => {
      const validTarget = {
        id: 'target-123',
        name: 'Test Target',
        url: 'https://example.com',
        interval: 300
      };
      
      const result = validateTargetData(validTarget);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeNull();
    });
    
    test('should reject target with missing required fields', () => {
      const invalidTarget = {
        id: 'target-123',
        name: 'Test Target'
        // missing url and interval
      };
      
      const result = validateTargetData(invalidTarget);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
      expect(result.errors.length).toBeGreaterThan(0);
    });
    
    test('should reject target with invalid URL format', () => {
      const invalidTarget = {
        id: 'target-123',
        name: 'Test Target',
        url: 'not-a-valid-url',
        interval: 300
      };
      
      const result = validateTargetData(invalidTarget);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
    
    test('should reject target with interval below minimum', () => {
      const invalidTarget = {
        id: 'target-123',
        name: 'Test Target',
        url: 'https://example.com',
        interval: 30 // below minimum of 60
      };
      
      const result = validateTargetData(invalidTarget);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
  });
  
  describe('validateCheckData', () => {
    test('should validate a valid check', () => {
      const validCheck = {
        id: 'check-123',
        targetId: 'target-123',
        timestamp: '2026-02-08T20:00:00Z',
        status: 'success'
      };
      
      const result = validateCheckData(validCheck);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeNull();
    });
    
    test('should reject check with missing required fields', () => {
      const invalidCheck = {
        id: 'check-123',
        targetId: 'target-123'
        // missing timestamp and status
      };
      
      const result = validateCheckData(invalidCheck);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
    
    test('should reject check with invalid status', () => {
      const invalidCheck = {
        id: 'check-123',
        targetId: 'target-123',
        timestamp: '2026-02-08T20:00:00Z',
        status: 'invalid-status'
      };
      
      const result = validateCheckData(invalidCheck);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
  });
  
  describe('validateIncidentData', () => {
    test('should validate a valid incident', () => {
      const validIncident = {
        id: 'incident-123',
        targetId: 'target-123',
        state: 'open',
        severity: 'high',
        startedAt: '2026-02-08T20:00:00Z'
      };
      
      const result = validateIncidentData(validIncident);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeNull();
    });
    
    test('should reject incident with missing required fields', () => {
      const invalidIncident = {
        id: 'incident-123',
        targetId: 'target-123'
        // missing state, severity, and startedAt
      };
      
      const result = validateIncidentData(invalidIncident);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
    
    test('should reject incident with invalid state', () => {
      const invalidIncident = {
        id: 'incident-123',
        targetId: 'target-123',
        state: 'invalid-state',
        severity: 'high',
        startedAt: '2026-02-08T20:00:00Z'
      };
      
      const result = validateIncidentData(invalidIncident);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
  });
  
  describe('validateAlertRuleData', () => {
    test('should validate a valid alert rule', () => {
      const validRule = {
        id: 'rule-123',
        name: 'Critical Alerts',
        channels: ['email', 'slack'],
        conditions: {
          minFailures: 3
        }
      };
      
      const result = validateAlertRuleData(validRule);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeNull();
    });
    
    test('should reject alert rule with missing required fields', () => {
      const invalidRule = {
        id: 'rule-123',
        name: 'Critical Alerts'
        // missing channels and conditions
      };
      
      const result = validateAlertRuleData(invalidRule);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
    
    test('should reject alert rule with empty channels array', () => {
      const invalidRule = {
        id: 'rule-123',
        name: 'Critical Alerts',
        channels: [],
        conditions: {
          minFailures: 3
        }
      };
      
      const result = validateAlertRuleData(invalidRule);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
    
    test('should reject alert rule with invalid channel', () => {
      const invalidRule = {
        id: 'rule-123',
        name: 'Critical Alerts',
        channels: ['invalid-channel'],
        conditions: {
          minFailures: 3
        }
      };
      
      const result = validateAlertRuleData(invalidRule);
      expect(result.valid).toBe(false);
      expect(result.errors).not.toBeNull();
    });
  });
});
