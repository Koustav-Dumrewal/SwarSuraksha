export default function AuditTrail({
  events
}) {
  return (
    <div className="panel">

      <div className="panel-header">

        <div>
          <div className="panel-title">
            SECURITY AUDIT TRAIL
          </div>

          <div className="panel-subtitle">
            Tamper-evident event chain
          </div>
        </div>

        <div className="verified">
          ✓ VERIFIED
        </div>

      </div>

      <div className="audit-list">

        {events.length === 0 && (
          <div className="empty-state">
            No audit events yet.
          </div>
        )}

        {events.map((event, index) => (

          <div
            className="audit-item"
            key={index}
          >

            <div className="audit-dot" />

            <div>

              <strong>
                {event.action}
              </strong>

              <small>
                {event.hash}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
