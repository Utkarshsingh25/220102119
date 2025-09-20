/**
 * Sends a log to the Affordmed evaluation-service/logs endpoint.
 * @param {"frontend"|"backend"} stack - The stack (frontend or backend)
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} level - The log level
 * @param {string} pkg - The package/module name (see docs for allowed values)
 * @param {string} message - The log message
 * @returns {Promise<object>} 
 */
export async function Log(stack, level, pkg, message) {
  const url = "http://20.244.56.144/evaluation-service/logs";
  const body = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message,
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Log API error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    
    console.error("Logging failed:", err);
    return { error: err.message };
  }
}
