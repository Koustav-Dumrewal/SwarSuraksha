export default function CallDetails({
  callId,
  duration,
  status
}) {
  return (
    <div className="panel">

      <div className="panel-title">
        CALL INFORMATION
      </div>

      <div className="detail-row">
        <span>Call ID</span>
        <strong>{callId || "Not started"}</strong>
      </div>

      <div className="detail-row">
        <span>Duration</span>
        <strong>{duration}</strong>
      </div>

      <div className="detail-row">
        <span>Status</span>
        <strong>{status}</strong>
      </div>

      <div className="detail-row">
        <span>Processing</span>
        <strong>Edge / Local</strong>
      </div>

    </div>
  );
}
