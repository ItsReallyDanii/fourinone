import Ajv from "ajv";
import flagSchema from "../schemas/flag_schema_v1.json" with { type: "json" };
import rolloutRuleSchema from "../schemas/rollout_rule_schema_v1.json" with { type: "json" };

const ajv = new Ajv({ allErrors: true, strict: false });

export const validateFlag = ajv.compile(flagSchema);
export const validateRolloutRule = ajv.compile(rolloutRuleSchema);

/**
 * Run a compiled validator and return { valid, errors }.
 */
export function validate(validator, data) {
  const valid = validator(data);
  return {
    valid,
    errors: valid ? null : validator.errors,
  };
}
