import resumePdf from '../../info/resumes/Resume 2026.pdf';
import { motion, useReducedMotion } from 'framer-motion';
import { revealEnter, revealViewport, staggerStepMs } from '../utils/motionPresets';

const footerHeadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealEnter,
  },
};

const footerPanelVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const footerLinksContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerStepMs / 1000,
    },
  },
};

const footerLinkVariants = {
  hidden: { y: 14 },
  visible: {
    y: 0,
    transition: revealEnter,
  },
};

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 2.5L18.5 9H13V4.5ZM8 13h8v2H8v-2Zm0 4h8v2H8v-2Z"
      />
    </svg>
  );
}

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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm9.65 1.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
  );
}

function BeliIcon() {
  return (
    <img
      src="/social-logos/beli-icon.jpg"
      alt=""
      aria-hidden="true"
      className="footer-link-logo"
    />
  );
}

const footerLinks = [
  {
    href: resumePdf,
    label: 'Resume',
    ariaLabel: 'Download resume (PDF)',
    download: 'Benjamin-Adjepong-Resume.pdf',
    external: false,
    Icon: ResumeIcon,
  },
  {
    href: 'https://github.com/benjivt',
    label: 'GitHub',
    external: true,
    Icon: GitHubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/benjaminadjepong/',
    label: 'LinkedIn',
    external: true,
    Icon: LinkedInIcon,
  },
  {
    href: 'mailto:benji@vt.edu',
    label: 'Email',
    external: false,
    Icon: MailIcon,
  },
  {
    href: 'https://www.instagram.com/benjarooniii/',
    label: 'Instagram',
    ariaLabel: 'Instagram (@benjarooniii)',
    external: true,
    Icon: InstagramIcon,
  },
  {
    href: 'https://beliapp.co/benjarooniii',
    label: 'Beli',
    ariaLabel: 'Beli (@benjarooniii)',
    external: true,
    Icon: BeliIcon,
  },
];

function FooterLink({ link, index }) {
  const shouldReduceMotion = useReducedMotion();
  const { href, label, ariaLabel, external, download, Icon } = link;

  const content = (
    <>
      <motion.span
        className="footer-link-icon"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.12, x: 2 }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      >
        <Icon />
      </motion.span>
      <span>{label}</span>
    </>
  );

  const className = 'footer-link-item';
  const style = { '--footer-link-delay': `${index * 60}ms` };

  const linkProps = {
    href,
    'aria-label': ariaLabel ?? label,
    className,
    style,
    variants: footerLinkVariants,
  };

  if (download) {
    return (
      <motion.a {...linkProps} download={download}>
        {content}
      </motion.a>
    );
  }

  if (external) {
    return (
      <motion.a {...linkProps} target="_blank" rel="noreferrer">
        {content}
      </motion.a>
    );
  }

  return <motion.a {...linkProps}>{content}</motion.a>;
}

export default function Footer({ sectionId = 'contact' }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer id={sectionId} className="site-footer section-shell section-viewport-centered">
      <motion.div
        className="glass-panel glass-tier-3 footer-panel"
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={revealViewport}
        variants={footerPanelVariants}
      >
        <motion.div variants={footerHeadingVariants}>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title footer-title">Let&apos;s connect.</h2>
        </motion.div>
        <motion.div className="footer-links" variants={footerLinksContainerVariants}>
          {footerLinks.map((link, index) => (
            <FooterLink key={link.label} link={link} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
}
