// In production the API is served from the same origin as this bundle, so a
// relative path resolves correctly. In dev the API runs separately on :3000.
export const BASE_URL = import.meta.env.PROD ? "" : "http://localhost:3000";
