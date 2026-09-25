const API_BASE = "http://localhost:8000";

export async function checkBackend() {
  const response = await fetch(`${API_BASE}/health`);

  if (!response.ok) {
    throw new Error("Backend unavailable");
  }

  return response.json();
}

export async function startCall() {
  const response = await fetch(`${API_BASE}/calls/start`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Unable to start call");
  }

  return response.json();
}

export async function stopCall(callId) {
  const response = await fetch(
    `${API_BASE}/calls/${callId}/stop`,
    {
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error("Unable to stop call");
  }

  return response.json();
}

export async function triggerVerification(
  callId,
  action
) {
  const response = await fetch(
    `${API_BASE}/verification/${action}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        call_id: callId
      })
    }
  );

  if (!response.ok) {
    throw new Error("Verification request failed");
  }

  return response.json();
}

export function createWebSocket() {
  return new WebSocket(
    "ws://localhost:8000/ws/detection"
  );
}
