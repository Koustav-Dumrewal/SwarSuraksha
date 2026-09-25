export default function VerificationPanel({
  callId,
  onAction,
  disabled
}) {
  return (
    <div className="panel">

      <div className="panel-title">
        SECONDARY VERIFICATION
      </div>

      <p className="panel-description">
        Trigger an additional verification step
        when the voice identity is considered risky.
      </p>

      <div className="verification-buttons">

        <button
          disabled={disabled}
          onClick={() =>
            onAction("mfa")
          }
        >
          Request MFA
        </button>

        <button
          disabled={disabled}
          onClick={() =>
            onAction("callback")
          }
        >
          Request Callback
        </button>

        <button
          disabled={disabled}
          onClick={() =>
            onAction("supervisor")
          }
        >
          Escalate
        </button>

      </div>

      {!callId && (
        <small className="hint">
          Start a call before requesting verification.
        </small>
      )}

    </div>
  );
}
