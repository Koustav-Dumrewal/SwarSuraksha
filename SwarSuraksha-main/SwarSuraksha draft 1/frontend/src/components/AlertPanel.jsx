export default function AlertPanel({
  alerts
}) {
  return (
    <div className="panel">

      <div className="panel-title">
        SECURITY ALERTS
      </div>

      <div className="alerts">

        {alerts.length === 0 && (
          <div className="empty-state">
            No security alerts detected.
          </div>
        )}

        {alerts.map((alert, index) => (

          <div
            className={`alert-item ${alert.level.toLowerCase()}`}
            key={index}
          >

            <div className="alert-icon">
              !
            </div>

            <div className="alert-content">

              <strong>
                {alert.title}
              </strong>

              <span>
                {alert.message}
              </span>

              <small>
                {alert.time}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
