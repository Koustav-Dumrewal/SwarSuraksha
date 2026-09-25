import {
  useEffect,
  useRef,
  useState
} from "react";

import Dashboard from "./components/Dashboard";

import {
  startCall,
  stopCall,
  triggerVerification,
  createWebSocket,
  checkBackend
} from "./services/api";

export default function App() {

  const [backendOnline, setBackendOnline] =
    useState(false);

  const [monitoring, setMonitoring] =
    useState(false);

  const [callId, setCallId] =
    useState(null);

  const [score, setScore] =
    useState(0);

  const [level, setLevel] =
    useState("LOW");

  const [status, setStatus] =
    useState("Ready");

  const [duration, setDuration] =
    useState("00:00");

  const [alerts, setAlerts] =
    useState([]);

  const [auditEvents, setAuditEvents] =
    useState([]);

  const websocket =
    useRef(null);

  const audioContext =
    useRef(null);

  const processor =
    useRef(null);

  const stream =
    useRef(null);

  useEffect(() => {

    checkBackend()
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false));

  }, []);

  useEffect(() => {

    if (!monitoring) return;

    const timer =
      setInterval(() => {

        setDuration(previous => {

          const [minutes, seconds] =
            previous.split(":").map(Number);

          let total =
            minutes * 60 +
            seconds +
            1;

          const newMinutes =
            Math.floor(total / 60);

          const newSeconds =
            total % 60;

          return `${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
        });

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [monitoring]);

  async function handleStart() {

    try {

      const call =
        await startCall();

      setCallId(call.call_id);
      setMonitoring(true);
      setStatus("Monitoring");

      websocket.current =
        createWebSocket();

      websocket.current.onopen =
        async () => {

          const mediaStream =
            await navigator.mediaDevices.getUserMedia({
              audio: true
            });

          stream.current =
            mediaStream;

          audioContext.current =
            new AudioContext();

          const source =
            audioContext.current.createMediaStreamSource(
              mediaStream
            );

          processor.current =
            audioContext.current.createScriptProcessor(
              4096,
              1,
              1
            );

          processor.current.onaudioprocess =
            event => {

              const input =
                event.inputBuffer.getChannelData(0);

              const buffer =
                new Float32Array(input);

              if (
                websocket.current &&
                websocket.current.readyState === WebSocket.OPEN
              ) {

                websocket.current.send(
                  buffer.buffer
                );

              }

            };

          source.connect(
            processor.current
          );

          processor.current.connect(
            audioContext.current.destination
          );
        };

      websocket.current.onmessage =
        event => {

          const data =
            JSON.parse(event.data);

          if (data.type === "risk_update") {

            setScore(data.score);
            setLevel(data.level);

            if (
              data.level === "HIGH" ||
              data.level === "CRITICAL"
            ) {

              const alert = {
                title:
                  data.level === "CRITICAL"
                    ? "Potential AI-generated voice"
                    : "Suspicious voice characteristics",

                message:
                  `Detection score reached ${Math.round(data.score)}%.`,

                level:
                  data.level,

                time:
                  new Date().toLocaleTimeString()
              };

              setAlerts(previous => [
                alert,
                ...previous.slice(0, 4)
              ]);
            }
          }
        };

    } catch (error) {

      console.error(error);

      setStatus(
        "Unable to access microphone"
      );

    }

  }

  async function handleStop() {

    if (callId) {
      await stopCall(callId);
    }

    if (processor.current) {
      processor.current.disconnect();
    }

    if (audioContext.current) {
      await audioContext.current.close();
    }

    if (stream.current) {
      stream.current
        .getTracks()
        .forEach(track => track.stop());
    }

    if (websocket.current) {
      websocket.current.close();
    }

    setMonitoring(false);
    setStatus("Call ended");
  }

  async function handleVerification(action) {

    if (!callId) return;

    try {

      const result =
        await triggerVerification(
          callId,
          action
        );

      setAuditEvents(previous => [
        {
          action:
            result.message,

          hash:
            result.audit_hash
        },

        ...previous
      ]);

    } catch (error) {

      console.error(error);

    }
  }

  return (
    <div className="app">

      <header className="topbar">

        <div className="brand">

          <div className="brand-mark">
            S
          </div>

          <div>
            <div className="brand-name">
              SwarSuraksha
            </div>

            <div className="brand-tagline">
              REAL-TIME VOICE SECURITY
            </div>
          </div>

        </div>

        <div className="system-status">

          <span
            className={
              backendOnline
                ? "status-dot online"
                : "status-dot offline"
            }
          />

          {backendOnline
            ? "SYSTEM ONLINE"
            : "BACKEND OFFLINE"}

        </div>

      </header>

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            AI-POWERED CYBERSECURITY
          </div>

          <h1>
            Voice Clone Detection
          </h1>

          <p>
            Detect synthetic and cloned voices
            while the conversation is still happening.
          </p>

        </div>

        <div className="ps-badge">
          SIH 2026 · PS 26104
        </div>

      </div>

      <Dashboard
        score={score}
        level={level}
        callId={callId}
        duration={duration}
        status={status}
        monitoring={monitoring}
        alerts={alerts}
        auditEvents={auditEvents}
        onStart={handleStart}
        onStop={handleStop}
        onVerification={handleVerification}
      />

      <footer>
        SwarSuraksha · AI-Powered Real-Time
        Voice Clone Detection
      </footer>

    </div>
  );
}
