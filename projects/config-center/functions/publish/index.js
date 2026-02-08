import { successEnvelope, errorEnvelope } from "../../src/contracts.js";

/**
 * publish_config(env, version)
 *
 * Snapshots the current set of enabled flags and their rollout rules
 * for the given environment, tagged with the provided version string.
 *
 * Stub: validates input shape, returns NOT_IMPLEMENTED.
 */
export function publish_config(env, version) {
  if (typeof env !== "string" || env.length === 0) {
    return errorEnvelope("VALIDATION_ERROR", "env must be a non-empty string");
  }
  if (typeof version !== "string" || version.length === 0) {
    return errorEnvelope("VALIDATION_ERROR", "version must be a non-empty string");
  }

  // Stub — no business logic
  return errorEnvelope("NOT_IMPLEMENTED", "publish_config is not yet implemented");
}

/**
 * Appwrite Function entrypoint.
 */
export default async function main({ req, res }) {
  try {
    const body = JSON.parse(req.body || "{}");
    const { action, payload } = body;

    if (action !== "publish") {
      return res.json(errorEnvelope("VALIDATION_ERROR", `Unknown action: ${action}`));
    }

    const { env, version } = payload || {};
    const result = publish_config(env, version);
    return res.json(result);
  } catch (err) {
    return res.json(errorEnvelope("INTERNAL_ERROR", err.message));
  }
}
