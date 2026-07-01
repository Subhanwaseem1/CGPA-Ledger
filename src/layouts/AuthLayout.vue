<script setup></script>

<template>
  <div class="auth-shell">
    <div class="panel">
      <div class="brand">
        <span class="mark">Σ</span>
        <span class="wordmark">CGPA Ledger</span>
      </div>
      <RouterView />
    </div>
    <div class="side-art" aria-hidden="true">
      <div class="quote">
        <p>“Every semester is a line in the ledger — this keeps yours honest.”</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-10);
  max-width: 420px;
  margin: 0 auto;
  width: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--color-accent);
}

.wordmark {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
}

.side-art {
  background: linear-gradient(160deg, var(--color-accent-strong), var(--color-accent));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-10);
}

.quote p {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: #fff;
  max-width: 380px;
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 860px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }
  .side-art {
    display: none;
  }
}
</style>
