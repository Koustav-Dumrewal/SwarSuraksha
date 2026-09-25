:root {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  color: #edf0ff;
  background: #070912;

  font-synthesis: none;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background:
    radial-gradient(
      circle at 20% 0%,
      #151a39 0,
      #070912 40%
    );

  min-height: 100vh;
}

button {
  font: inherit;
}

.app {
  min-height: 100vh;
}

.topbar {
  height: 76px;

  padding: 0 42px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #20243a;

  background: rgba(7, 9, 18, 0.88);

  backdrop-filter: blur(12px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border-radius: 11px;

  background: #7c8cff;

  color: #090b14;

  font-size: 21px;
  font-weight: 900;
}

.brand-name {
  font-weight: 800;
  font-size: 17px;
}

.brand-tagline {
  margin-top: 2px;

  color: #737a9a;

  font-size: 9px;
  letter-spacing: 1.5px;
}

.system-status {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 11px;
  letter-spacing: 1px;

  color: #aab0c7;
}

.status-dot {
  width: 8px;
  height: 8px;

  border-radius: 50%;
}

.status-dot.online {
  background: #5be39b;
  box-shadow: 0 0 12px #5be39b;
}

.status-dot.offline {
  background: #ff6378;
}

.page-heading {
  max-width: 1280px;

  margin: 0 auto;

  padding: 45px 28px 28px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.eyebrow {
  color: #7c8cff;

  font-size: 11px;

  letter-spacing: 2px;

  font-weight: 700;
}

h1 {
  margin: 8px 0;

  font-size: 42px;

  letter-spacing: -1.5px;
}

.page-heading p {
  margin: 0;

  max-width: 650px;

  color: #858ca8;
}

.ps-badge {
  padding: 10px 14px;

  border: 1px solid #292f4b;

  border-radius: 9px;

  color: #aeb5d1;

  font-size: 11px;

  letter-spacing: 1px;
}

.dashboard {
  max-width: 1280px;

  margin: auto;

  padding: 0 28px 50px;
}

.hero-grid {
  display: grid;

  grid-template-columns:
    1.35fr
    1fr;

  gap: 18px;
}

.panel,
.risk-card {
  border: 1px solid #242941;

  border-radius: 18px;

  background:
    linear-gradient(
      145deg,
      rgba(22, 26, 48, 0.94),
      rgba(12, 15, 28, 0.96)
    );

  box-shadow:
    0 18px 50px
    rgba(0, 0, 0, 0.2);
}

.risk-card {
  padding: 28px;
}

.section-label,
.panel-title {
  color: #747c9e;

  font-size: 10px;

  letter-spacing: 1.7px;

  font-weight: 800;
}

.risk-number {
  margin-top: 14px;

  font-size: 78px;

  font-weight: 800;

  letter-spacing: -5px;
}

.risk-number span {
  font-size: 25px;

  color: #747c9e;

  margin-left: 5px;
}

.risk-level {
  display: inline-block;

  margin-top: 4px;

  padding: 6px 11px;

  border-radius: 7px;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 1px;
}

.risk-level.low {
  color: #5be39b;
  background: #123526;
}

.risk-level.medium {
  color: #ffd36b;
  background: #392f16;
}

.risk-level.high,
.risk-level.critical {
  color: #ff7183;
  background: #3b1820;
}

.risk-bar {
  height: 7px;

  margin-top: 22px;

  border-radius: 20px;

  overflow: hidden;

  background: #272b3e;
}

.risk-bar-fill {
  height: 100%;

  transition: width 0.5s ease;

  background: #7c8cff;
}

.risk-description {
  margin-top: 15px;

  color: #6e7592;

  font-size: 12px;
}

.panel {
  padding: 23px;

  margin-top: 18px;
}

.detail-row {
  display: flex;

  justify-content: space-between;

  padding: 14px 0;

  border-bottom: 1px solid #20243a;

  color: #737a98;

  font-size: 12px;
}

.detail-row:last-child {
  border-bottom: 0;
}

.detail-row strong {
  color: #dfe3f5;
}

.panel-header {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.panel-subtitle {
  color: #606782;

  font-size: 11px;

  margin-top: 5px;
}

.audio-panel {
  min-height: 245px;
}

.live-indicator {
  color: #6b728c;

  font-size: 10px;

  display: flex;

  align-items: center;

  gap: 7px;
}

.live-indicator span {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #555b73;
}

.live-indicator.active {
  color: #ff7183;
}

.live-indicator.active span {
  background: #ff7183;

  box-shadow:
    0 0 12px #ff7183;
}

.waveform {
  width: 100%;

  height: 150px;

  margin-top: 15px;

  border-radius: 12px;

  background: #0b0e1c;
}

.audio-controls {
  margin-top: 12px;

  display: flex;

  justify-content: center;
}

.primary-button,
.danger-button,
.verification-buttons button {
  border: 0;

  border-radius: 9px;

  padding: 11px 17px;

  cursor: pointer;

  font-weight: 700;

  font-size: 12px;
}

.primary-button {
  background: #7c8cff;

  color: #090b14;
}

.danger-button {
  background: #3b1820;

  color: #ff7183;
}

.verification-buttons {
  display: flex;

  flex-wrap: wrap;

  gap: 9px;

  margin-top: 18px;
}

.verification-buttons button {
  background: #20253c;

  color: #dce1f6;

  border: 1px solid #303754;
}

.verification-buttons button:hover {
  border-color: #7c8cff;
}

.verification-buttons button:disabled {
  opacity: 0.35;

  cursor: not-allowed;
}

.panel-description {
  color: #747b96;

  font-size: 12px;

  line-height: 1.6;
}

.hint {
  display: block;

  color: #555c77;

  margin-top: 12px;
}

.two-column {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 18px;
}

.alert-item {
  display: flex;

  gap: 12px;

  padding: 14px;

  margin-top: 10px;

  border-radius: 11px;

  background: #111525;

  border: 1px solid #252a42;
}

.alert-item.high,
.alert-item.critical {
  border-color: #63303b;
}

.alert-icon {
  width: 28px;
  height: 28px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 8px;

  background: #3b1820;

  color: #ff7183;

  font-weight: 900;
}

.alert-content {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.alert-content strong {
  font-size: 12px;
}

.alert-content span,
.alert-content small {
  color: #737b98;

  font-size: 11px;
}

.empty-state {
  color: #555d78;

  font-size: 12px;

  padding: 25px 0;
}

.verified {
  color: #5be39b;

  font-size: 10px;

  letter-spacing: 1px;
}

.audit-item {
  display: flex;

  align-items: center;

  gap: 12px;

  padding: 14px 0;

  border-bottom: 1px solid #20243a;
}

.audit-item:last-child {
  border-bottom: 0;
}

.audit-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #5be39b;

  box-shadow: 0 0 10px #5be39b;
}

.audit-item strong,
.audit-item small {
  display: block;
}

.audit-item strong {
  font-size: 12px;
}

.audit-item small {
  margin-top: 4px;

  color: #565e7b;

  font-family: monospace;

  font-size: 10px;
}

footer {
  padding: 25px;

  text-align: center;

  color: #454b65;

  font-size: 10px;

  letter-spacing: 1px;
}

@media (max-width: 800px) {

  .topbar {
    padding: 0 20px;
  }

  .page-heading {
    padding: 35px 20px 20px;

    flex-direction: column;

    align-items: flex-start;

    gap: 20px;
  }

  h1 {
    font-size: 32px;
  }

  .dashboard {
    padding: 0 20px 40px;
  }

  .hero-grid,
  .two-column {
    grid-template-columns: 1fr;
  }

  .risk-number {
    font-size: 60px;
  }
}
