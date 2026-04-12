function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.36-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56C7.16 3.87 6.33 3 5.25 3S3.34 3.87 3.34 4.94c0 1.05.82 1.91 1.89 1.91h.02c1.1 0 1.91-.86 1.91-1.91ZM20.66 13.03C20.66 9.52 18.8 8 16.33 8c-1.99 0-2.88 1.11-3.38 1.89V8.5H9.57c.04.92 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.13-.92.27-.68.88-1.39 1.9-1.39 1.34 0 1.88 1.05 1.88 2.58V20h3.38v-6.97Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 7.01V7h16ZM4 17V9.29l7.4 4.61a1 1 0 0 0 1.2 0L20 9.29V17H4Z"
      />
    </svg>
  );
}

export default function Footer({ sectionId = 'contact' }) {
  return (
    <footer id={sectionId} className="site-footer section-shell">
      <div className="glass-panel footer-panel">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title footer-title">Let&apos;s connect.</h2>
          <p className="section-copy">
            Reach out by email or connect with me on GitHub and LinkedIn. I&apos;m open
            to software engineering opportunities in AI/ML, automation, and
            product-focused development.
          </p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/benjivt"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/benjaminadjepong/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:benji@vt.edu" aria-label="Email">
            <MailIcon />
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
