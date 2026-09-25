export default function RiskScore({ score, level }) {
  const normalizedScore = Math.max(
    0,
    Math.min(100, score)
  );

  return (
    <div className="risk-card">

      <div className="section-label">
        CURRENT IMPERSONATION RISK
      </div>

      <div className="risk-number">
        {Math.round(normalizedScore)}
        <span>%</span>
      </div>

      <div className={`risk-level ${level.toLowerCase()}`}>
        {level}
      </div>

      <div className="risk-bar">
        <div
          className="risk-bar-fill"
          style={{
            width: `${normalizedScore}%`
          }}
        />
      </div>

      <div className="risk-description">
        Risk score is updated continuously during
        the monitored call.
      </div>

    </div>
  );
}
