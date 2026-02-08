import { successEnvelope, errorEnvelope } from "../../src/contracts.js";

/**
 * evaluate_flag(userContext, env, key)
 *
 * Resolves a feature flag value for the given user context, environment,
 * and flag key. Returns the resolved value and the reason for the decision.
 *
 * Stub: validates input shape, returns NOT_IMPLEMENTED.
 */
export function evaluate_flag(userContext, env, key) {
  if (!userContext || typeof userContext !== "object" || !userContext.userId) {
    return errorEnvelope("VALIDATION_ERROR", "userContext must be an object with userId");
  }
  if (typeof env !== "string" || env.length === 0) {
    return errorEnvelope("VALIDATION_ERROR", "env must be a non-empty string");
  }
  if (typeof key !== "string" || key.length === 0) {
    return errorEnvelope("VALIDATION_ERROR", "key must be a non-empty string");
  }

  // Stub — no business logic
  return errorEnvelope("NOT_IMPLEMENTED", "evaluate_flag is not yet implemented");
}

/**
 * Appwrite Function entrypoint.
 */
export default async function main({ req, res }) {
  try {
    const body = JSON.parse(req.body || "{}");
    const { action, payload } = body;

    if (action !== "evaluate") {
      return res.json(errorEnvelope("VALIDATION_ERROR", `Unknown action: ${action}`));
    }

    const { key, context } = payload || {};
    const userContext = context || {};
    const env = userContext.environment || "";

    const result = evaluate_flag(userContext, env, key);
    return res.json(result);
  } catch (err) {
    return res.json(errorEnvelope("INTERNAL_ERROR", err.message));
  }
}
