import RiskScore from "./RiskScore";
import AudioMonitor from "./AudioMonitor";
import AlertPanel from "./AlertPanel";
import CallDetails from "./CallDetails";
import VerificationPanel from "./VerificationPanel";
import AuditTrail from "./AuditTrail";

export default function Dashboard({
  score,
  level,
  callId,
  duration,
  status,
  monitoring,
  alerts,
  auditEvents,
  onStart,
  onStop,
  onVerification
}) {
  return (
    <main className="dashboard">

      <section className="hero-grid">

        <RiskScore
          score={score}
          level={level}
        />

        <CallDetails
          callId={callId}
          duration={duration}
          status={status}
        />

      </section>

      <AudioMonitor
        active={monitoring}
        onStart={onStart}
        onStop={onStop}
      />

      <section className="two-column">

        <AlertPanel
          alerts={alerts}
        />

        <VerificationPanel
          callId={callId}
          onAction={onVerification}
          disabled={!callId}
        />

      </section>

      <AuditTrail
        events={auditEvents}
      />

    </main>
  );
}
