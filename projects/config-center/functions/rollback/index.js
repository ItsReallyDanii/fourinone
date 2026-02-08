import { successEnvelope, errorEnvelope } from "../../src/contracts.js";

/**
 * rollback_config(env, version)
 *
 * Rolls back the flag configuration for the given environment to the
 * specified previously-published version.
 *
 * Stub: validates input shape, returns NOT_IMPLEMENTED.
 */
export function rollback_config(env, version) {
  if (typeof env !== "string" || env.length === 0) {
    return errorEnvelope("VALIDATION_ERROR", "env must be a non-empty string");
  }
  if (typeof version !== "string" || version.length === 0) {
    return errorEnvelope("VALIDATION_ERROR", "version must be a non-empty string");
  }

  // Stub — no business logic
  return errorEnvelope("NOT_IMPLEMENTED", "rollback_config is not yet implemented");
}

/**
 * Appwrite Function entrypoint.
 */
export default async function main({ req, res }) {
  try {
    const body = JSON.parse(req.body || "{}");
    const { action, payload } = body;

    if (action !== "rollback") {
      return res.json(errorEnvelope("VALIDATION_ERROR", `Unknown action: ${action}`));
    }

    const { env, version } = payload || {};
    const result = rollback_config(env, version);
    return res.json(result);
  } catch (err) {
    return res.json(errorEnvelope("INTERNAL_ERROR", err.message));
  }
}
