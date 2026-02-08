import { describe, it, expect } from "vitest";
import { CONTRACTS, successEnvelope, errorEnvelope } from "../src/contracts.js";
import { validate, validateFlag, validateRolloutRule } from "../src/validate.js";
import { evaluate_flag } from "../functions/evaluate/index.js";
import { publish_config } from "../functions/publish/index.js";
import { rollback_config } from "../functions/rollback/index.js";

// ---------------------------------------------------------------------------
// 1. Contract shape validation
// ---------------------------------------------------------------------------
describe("CONTRACTS shape", () => {
  const expectedNames = ["evaluate_flag", "publish_config", "rollback_config"];

  it("exports all three contracts", () => {
    expect(Object.keys(CONTRACTS).sort()).toEqual(expectedNames.sort());
  });

  for (const name of expectedNames) {
    describe(`CONTRACTS.${name}`, () => {
      it("has name, params, returns, and errors", () => {
        const c = CONTRACTS[name];
        expect(c).toBeDefined();
        expect(c.name).toBe(name);
        expect(c.params).toBeDefined();
        expect(typeof c.params).toBe("object");
        expect(c.returns).toBeDefined();
        expect(typeof c.returns).toBe("object");
        expect(Array.isArray(c.errors)).toBe(true);
        expect(c.errors.length).toBeGreaterThan(0);
      });

      it("returns shape has required array", () => {
        const c = CONTRACTS[name];
        expect(Array.isArray(c.returns.required)).toBe(true);
        expect(c.returns.required.length).toBeGreaterThan(0);
      });
    });
  }
});

// ---------------------------------------------------------------------------
// 2. Envelope builders
// ---------------------------------------------------------------------------
describe("Envelope builders", () => {
  it("successEnvelope wraps data", () => {
    const res = successEnvelope({ foo: 1 });
    expect(res).toEqual({ success: true, data: { foo: 1 } });
  });

  it("errorEnvelope wraps code + message", () => {
    const res = errorEnvelope("TEST_ERROR", "something broke");
    expect(res).toEqual({
      success: false,
      data: null,
      error: { code: "TEST_ERROR", message: "something broke" },
    });
  });
});

// ---------------------------------------------------------------------------
// 3. evaluate_flag contract validation
// ---------------------------------------------------------------------------
describe("evaluate_flag stub", () => {
  it("rejects missing userContext", () => {
    const res = evaluate_flag(null, "production", "my_flag");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects userContext without userId", () => {
    const res = evaluate_flag({}, "production", "my_flag");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects empty env", () => {
    const res = evaluate_flag({ userId: "u1" }, "", "my_flag");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects non-string env", () => {
    const res = evaluate_flag({ userId: "u1" }, 123, "my_flag");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects empty key", () => {
    const res = evaluate_flag({ userId: "u1" }, "production", "");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns NOT_IMPLEMENTED for valid inputs (stub)", () => {
    const res = evaluate_flag({ userId: "u1" }, "production", "my_flag");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("NOT_IMPLEMENTED");
  });
});

// ---------------------------------------------------------------------------
// 4. publish_config contract validation
// ---------------------------------------------------------------------------
describe("publish_config stub", () => {
  it("rejects empty env", () => {
    const res = publish_config("", "v1.0.0");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects non-string env", () => {
    const res = publish_config(42, "v1.0.0");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects empty version", () => {
    const res = publish_config("production", "");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects non-string version", () => {
    const res = publish_config("production", null);
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns NOT_IMPLEMENTED for valid inputs (stub)", () => {
    const res = publish_config("production", "v1.0.0");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("NOT_IMPLEMENTED");
  });
});

// ---------------------------------------------------------------------------
// 5. rollback_config contract validation
// ---------------------------------------------------------------------------
describe("rollback_config stub", () => {
  it("rejects empty env", () => {
    const res = rollback_config("", "v1.0.0");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects non-string env", () => {
    const res = rollback_config(undefined, "v1.0.0");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects empty version", () => {
    const res = rollback_config("staging", "");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns NOT_IMPLEMENTED for valid inputs (stub)", () => {
    const res = rollback_config("staging", "v0.9.0");
    expect(res.success).toBe(false);
    expect(res.error.code).toBe("NOT_IMPLEMENTED");
  });
});

// ---------------------------------------------------------------------------
// 6. JSON Schema validation (flag_schema_v1)
// ---------------------------------------------------------------------------
describe("flag_schema_v1 validation", () => {
  it("accepts a valid flag document", () => {
    const result = validate(validateFlag, {
      key: "enable_dark_mode",
      type: "boolean",
      defaultValue: false,
      enabled: true,
      tags: ["ui"],
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toBeNull();
  });

  it("rejects flag missing required key field", () => {
    const result = validate(validateFlag, {
      type: "boolean",
      defaultValue: false,
      enabled: true,
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.params?.missingProperty === "key")).toBe(true);
  });

  it("rejects flag with invalid type enum", () => {
    const result = validate(validateFlag, {
      key: "test_flag",
      type: "invalid_type",
      defaultValue: "x",
      enabled: true,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects flag with key not matching slug pattern", () => {
    const result = validate(validateFlag, {
      key: "UPPER-CASE",
      type: "string",
      defaultValue: "x",
      enabled: true,
    });
    expect(result.valid).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 7. JSON Schema validation (rollout_rule_schema_v1)
// ---------------------------------------------------------------------------
describe("rollout_rule_schema_v1 validation", () => {
  it("accepts a valid percentage rule", () => {
    const result = validate(validateRolloutRule, {
      flagKey: "enable_dark_mode",
      type: "percentage",
      value: true,
      percentage: 50,
      priority: 1,
      enabled: true,
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toBeNull();
  });

  it("rejects percentage rule missing percentage field", () => {
    const result = validate(validateRolloutRule, {
      flagKey: "enable_dark_mode",
      type: "percentage",
      value: true,
      priority: 1,
      enabled: true,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects percentage outside 0-100", () => {
    const result = validate(validateRolloutRule, {
      flagKey: "flag_a",
      type: "percentage",
      value: true,
      percentage: 150,
      priority: 1,
      enabled: true,
    });
    expect(result.valid).toBe(false);
  });

  it("accepts a valid user_list rule", () => {
    const result = validate(validateRolloutRule, {
      flagKey: "flag_b",
      type: "user_list",
      value: "beta",
      userIds: ["user_1", "user_2"],
      priority: 2,
      enabled: true,
    });
    expect(result.valid).toBe(true);
  });

  it("rejects user_list rule with empty userIds", () => {
    const result = validate(validateRolloutRule, {
      flagKey: "flag_b",
      type: "user_list",
      value: "beta",
      userIds: [],
      priority: 2,
      enabled: true,
    });
    expect(result.valid).toBe(false);
  });

  it("accepts a valid environment rule", () => {
    const result = validate(validateRolloutRule, {
      flagKey: "flag_c",
      type: "environment",
      value: true,
      environment: "production",
      priority: 0,
      enabled: true,
    });
    expect(result.valid).toBe(true);
  });

  it("rejects environment rule missing environment field", () => {
    const result = validate(validateRolloutRule, {
      flagKey: "flag_c",
      type: "environment",
      value: true,
      priority: 0,
      enabled: true,
    });
    expect(result.valid).toBe(false);
  });
});
