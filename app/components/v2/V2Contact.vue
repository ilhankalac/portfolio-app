<template>
  <section id="contact" class="v2-section">
    <div class="v2-container">
      <div class="v2-card panel">
        <div class="pitch">
          <span class="v2-eyebrow">Contact</span>
          <h2 class="v2-heading">Let's build<br>something.</h2>
          <p class="v2-lede">
            A role, a project or just a question. Write a few lines and I'll get back to you.
          </p>
        </div>

        <form class="form" @submit.prevent="send">
          <label>
            <span>Email</span>
            <input v-model="email" type="email" placeholder="you@company.com" autocomplete="email">
          </label>
          <label>
            <span>Message</span>
            <textarea v-model="message" rows="5" placeholder="Tell me a little about it…" />
          </label>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

          <div class="submit-row">
            <span class="hint">Usually replies within a day or two.</span>
            <button type="submit" class="v2-pill">
              Send message
              <span class="v2-pill-disc"><UIcon name="i-mdi-arrow-right" /></span>
            </button>
          </div>
        </form>

        <div class="reach">
          <p class="reach-label">You can also reach me here.</p>
          <div class="reach-grid">
            <a v-for="item in channels" :key="item.label" :href="item.href" target="_blank" rel="noopener noreferrer">
              <UIcon :name="item.icon" class="reach-icon" />
              <span>
                <strong>{{ item.label }}</strong>
                <small>{{ item.handle }}</small>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { pushVal } = useFirebase()
const { errorMessage, validateEmail, timeStamp } = useHelpers()
const toast = useToast()

const email = ref('')
const message = ref('')

const channels = [
  { label: 'GitHub', handle: '@ilhankalac', icon: 'i-mdi-github', href: 'https://github.com/ilhankalac' },
  { label: 'LinkedIn', handle: 'Ilhan Kalač', icon: 'i-mdi-linkedin', href: 'https://www.linkedin.com/in/ilhankalac/' },
  { label: 'Email', handle: 'ilhandeveloper@gmail.com', icon: 'i-mdi-email-outline', href: 'mailto:ilhandeveloper@gmail.com' },
]

const send = () => {
  if (validateEmail(email)) return

  pushVal('contacted', { email: email.value, message: message.value, timeStamp: timeStamp() })
  toast.add({ title: 'Your message has been sent!', color: 'success' })
  email.value = ''
  message.value = ''
}
</script>

<style scoped lang="scss">
.panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.pitch {
  padding: 2.5rem;
  border-right: 1px solid var(--v2-border);

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid var(--v2-border);
    padding: 1.75rem;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 2.5rem;

  @media (max-width: 900px) {
    padding: 1.75rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;

    span {
      font-family: var(--v2-mono);
      font-size: 0.68rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--v2-faint);
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid var(--v2-border);
    border-radius: 0.8rem;
    background: var(--v2-bg);
    color: var(--v2-text);
    font: inherit;
    resize: vertical;
    transition: border-color 0.2s ease;

    &::placeholder {
      color: var(--v2-faint);
    }

    &:focus {
      outline: none;
      border-color: rgb(var(--v2-ink-rgb) / 0.35);
    }
  }
}

.error {
  margin: 0;
  font-size: 0.85rem;
  color: #f87171;
}

.submit-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
}

.hint {
  font-size: 0.85rem;
  color: var(--v2-faint);
}

.reach {
  grid-column: 1 / -1;
  border-top: 1px solid var(--v2-border);
}

.reach-label {
  margin: 0;
  padding: 1rem 1.5rem;
  font-size: 0.85rem;
  color: var(--v2-faint);
  border-bottom: 1px solid var(--v2-border);
}

.reach-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1.1rem 1.5rem;
    color: inherit;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:not(:last-child) {
      border-right: 1px solid var(--v2-border);

      @media (max-width: 700px) {
        border-right: none;
        border-bottom: 1px solid var(--v2-border);
      }
    }

    &:hover {
      background: var(--v2-surface-2);
    }
  }

  strong {
    display: block;
    font-family: var(--v2-display);
    font-weight: 500;
    font-size: 0.9rem;
  }

  small {
    font-size: 0.78rem;
    color: var(--v2-faint);
  }
}

.reach-icon {
  font-size: 1.2rem;
  color: var(--v2-muted);
}
</style>
