/**
 * Status Beacon - Main entry point
 * Exports all core functions and validators
 */

const { cron_check_targets } = require('./cron_check_targets');
const { evaluate_incident_state } = require('./evaluate_incident_state');
const { dispatch_alerts } = require('./dispatch_alerts');
const {
  validateTargetData,
  validateCheckData,
  validateIncidentData,
  validateAlertRuleData
} = require('./validators');

module.exports = {
  // Core functions
  cron_check_targets,
  evaluate_incident_state,
  dispatch_alerts,
  
  // Validators
  validateTargetData,
  validateCheckData,
  validateIncidentData,
  validateAlertRuleData
};
