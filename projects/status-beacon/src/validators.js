/**
 * Schema validators using AJV
 * Provides validation functions for all schema types
 */

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

// Initialize AJV with formats support
const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

// Load schemas
const schemasDir = path.join(__dirname, '../schemas');

const targetSchema = JSON.parse(
  fs.readFileSync(path.join(schemasDir, 'target_schema_v1.json'), 'utf8')
);
const checkSchema = JSON.parse(
  fs.readFileSync(path.join(schemasDir, 'check_schema_v1.json'), 'utf8')
);
const incidentSchema = JSON.parse(
  fs.readFileSync(path.join(schemasDir, 'incident_schema_v1.json'), 'utf8')
);
const alertRuleSchema = JSON.parse(
  fs.readFileSync(path.join(schemasDir, 'alert_rule_schema_v1.json'), 'utf8')
);

// Compile validators
const validateTarget = ajv.compile(targetSchema);
const validateCheck = ajv.compile(checkSchema);
const validateIncident = ajv.compile(incidentSchema);
const validateAlertRule = ajv.compile(alertRuleSchema);

/**
 * Validates a target object against the target schema
 * @param {Object} data - Target data to validate
 * @returns {Object} { valid: boolean, errors: Array|null }
 */
function validateTargetData(data) {
  const valid = validateTarget(data);
  return {
    valid,
    errors: valid ? null : validateTarget.errors
  };
}

/**
 * Validates a check object against the check schema
 * @param {Object} data - Check data to validate
 * @returns {Object} { valid: boolean, errors: Array|null }
 */
function validateCheckData(data) {
  const valid = validateCheck(data);
  return {
    valid,
    errors: valid ? null : validateCheck.errors
  };
}

/**
 * Validates an incident object against the incident schema
 * @param {Object} data - Incident data to validate
 * @returns {Object} { valid: boolean, errors: Array|null }
 */
function validateIncidentData(data) {
  const valid = validateIncident(data);
  return {
    valid,
    errors: valid ? null : validateIncident.errors
  };
}

/**
 * Validates an alert rule object against the alert rule schema
 * @param {Object} data - Alert rule data to validate
 * @returns {Object} { valid: boolean, errors: Array|null }
 */
function validateAlertRuleData(data) {
  const valid = validateAlertRule(data);
  return {
    valid,
    errors: valid ? null : validateAlertRule.errors
  };
}

module.exports = {
  validateTargetData,
  validateCheckData,
  validateIncidentData,
  validateAlertRuleData
};
