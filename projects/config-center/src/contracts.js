/**
 * Contract definitions for config-center Phase 2 function stubs.
 *
 * Each contract defines:
 *   - name: function identifier
 *   - params: ordered parameter names + expected shapes
 *   - returns: shape of the success envelope
 *   - errors: possible error codes
 *
 * No business logic lives here — only shape declarations.
 */

export const CONTRACTS = {
  evaluate_flag: {
    name: "evaluate_flag",
    params: {
      userContext: {
        type: "object",
        required: ["userId"],
        properties: {
          userId: { type: "string" },
          attributes: { type: "object" },
        },
      },
      env: {
        type: "string",
        description: "Target environment (e.g. production, staging)",
      },
      key: {
        type: "string",
        description: "Flag key to evaluate",
      },
    },
    returns: {
      type: "object",
      required: ["key", "value", "reason"],
      properties: {
        key: { type: "string" },
        value: { type: ["boolean", "string", "number", "object", "array"] },
        reason: { type: "string" },
      },
    },
    errors: ["FLAG_NOT_FOUND", "VALIDATION_ERROR", "UNAUTHORIZED", "INTERNAL_ERROR"],
  },

  publish_config: {
    name: "publish_config",
    params: {
      env: {
        type: "string",
        description: "Target environment to publish to",
      },
      version: {
        type: "string",
        description: "Semantic version tag for the snapshot (e.g. v1.2.0)",
      },
    },
    returns: {
      type: "object",
      required: ["env", "version", "publishedAt", "flagCount"],
      properties: {
        env: { type: "string" },
        version: { type: "string" },
        publishedAt: { type: "string" },
        flagCount: { type: "integer" },
      },
    },
    errors: ["VALIDATION_ERROR", "UNAUTHORIZED", "FORBIDDEN", "INTERNAL_ERROR"],
  },

  rollback_config: {
    name: "rollback_config",
    params: {
      env: {
        type: "string",
        description: "Target environment to rollback",
      },
      version: {
        type: "string",
        description: "Version tag to rollback to",
      },
    },
    returns: {
      type: "object",
      required: ["env", "version", "rolledBackAt", "previousVersion"],
      properties: {
        env: { type: "string" },
        version: { type: "string" },
        rolledBackAt: { type: "string" },
        previousVersion: { type: "string" },
      },
    },
    errors: ["VALIDATION_ERROR", "VERSION_NOT_FOUND", "UNAUTHORIZED", "FORBIDDEN", "INTERNAL_ERROR"],
  },
};

/**
 * Standard response envelope builder.
 */
export function successEnvelope(data) {
  return { success: true, data };
}

export function errorEnvelope(code, message) {
  return { success: false, data: null, error: { code, message } };
}
