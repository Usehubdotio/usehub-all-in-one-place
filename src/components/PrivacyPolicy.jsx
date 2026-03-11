import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils/helpers";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./Layout";
import I from "../icons";

/**
 * Privacy Policy page — converted from the standalone privacy.html.
 * Reuses ThemeToggle and receives theme from Layout context.
 */
export function PrivacyPolicy() {
    const { theme, setTheme, isDark } = useTheme();

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Header */}
            <header className="px-5 sm:px-8 py-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        to="/"
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition text-sm",
                            isDark
                                ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                                : "border-black/10 bg-white hover:bg-black/5 text-black"
                        )}
                    >
                        <I.ArrowUp className="h-4 w-4 -rotate-90" />
                        Back to USEHUB
                    </Link>

                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-5 sm:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1
                        className={cn(
                            "text-4xl sm:text-5xl font-semibold tracking-tight text-center mb-8",
                            isDark ? "text-white" : "text-black"
                        )}
                    >
                        Privacy Policy
                    </h1>

                    <div className={cn("space-y-8", isDark ? "text-white/80" : "text-black/80")}>
                        {/* Meta info */}
                        <div className={cn("text-sm text-center", isDark ? "text-white/50" : "text-black/50")}>
                            <p><strong>Last Updated:</strong> 04 Feb 2026</p>
                            <p>
                                <strong>Website:</strong>{" "}
                                <a
                                    href="https://usehub.xyz/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn("underline", isDark ? "hover:text-white" : "hover:text-black")}
                                >
                                    https://usehub.xyz/
                                </a>
                            </p>
                        </div>

                        {/* Contact info */}
                        <div className={cn("border-t pt-8 space-y-2 text-sm", isDark ? "border-white/10 text-white/60" : "border-black/10 text-black/60")}>
                            <p>
                                <strong className={isDark ? "text-white/80" : "text-black/80"}>Owner / Data Controller:</strong>{" "}
                                "USEHUB", "we", "us"
                            </p>
                            <p>
                                <strong className={isDark ? "text-white/80" : "text-black/80"}>Contact (privacy):</strong>{" "}
                                <a
                                    href="https://t.me/Usehub_Manager"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn("underline", isDark ? "hover:text-white" : "hover:text-black")}
                                >
                                    Telegram
                                </a>
                            </p>
                        </div>

                        {/* Section 1 */}
                        <Section n="1" title="Introduction" isDark={isDark}>
                            <p>
                                This Privacy Policy explains how USEHUB Resources &amp; Services ("USEHUB") collects, uses, and
                                shares information when you visit our website and use our features.
                            </p>
                            <p>
                                USEHUB is currently a front-end only directory/catalog of resources and services. We do not
                                provide user accounts, logins, or a dedicated back-end database for users at this time.
                            </p>
                        </Section>

                        {/* Section 2 */}
                        <Section n="2" title="Information We Collect" isDark={isDark}>
                            <SubSection title="2.1 Information you provide (Feedback / Contact Form)" isDark={isDark}>
                                <p>If you submit a form (e.g., "Feedback / Add an app"):</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Contact details you type in (email / X / Telegram) — optional</li>
                                    <li>Message content you type (feedback, proposal, details)</li>
                                </ul>
                                <p>We collect only what you submit.</p>
                            </SubSection>

                            <SubSection title="2.2 Information collected automatically (basic technical data)" isDark={isDark}>
                                <p>
                                    Like most websites, our hosting/infrastructure and third-party tools may automatically
                                    process basic technical data such as:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>IP address (often in logs)</li>
                                    <li>browser/device type, operating system</li>
                                    <li>approximate location (country/region)</li>
                                    <li>timestamps, referring/exit pages, basic request logs</li>
                                </ul>
                                <p>
                                    This data is typically processed by our hosting provider and related infrastructure for
                                    security and reliability.
                                </p>
                            </SubSection>

                            <SubSection title="2.3 Analytics (optional, may be added later)" isDark={isDark}>
                                <p>
                                    We may add Google Analytics in the future to understand traffic (visits, countries,
                                    popular pages).
                                </p>
                                <p>
                                    If/when enabled, Google Analytics may use cookies and collect usage data as described in
                                    Section 6.
                                </p>
                                <p>
                                    If analytics is not enabled yet, this section serves as a notice of potential future use.
                                </p>
                            </SubSection>
                        </Section>

                        {/* Section 3 */}
                        <Section n="3" title="How We Use Information" isDark={isDark}>
                            <p>We use information to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Respond to requests you send via the form (if you leave contact info)</li>
                                <li>Improve the website (bug fixes, UX improvements, content updates)</li>
                                <li>Maintain security and prevent abuse (rate limiting, fraud/attack detection)</li>
                                <li>Measure traffic and performance (only if analytics is enabled)</li>
                            </ul>
                        </Section>

                        {/* Section 4 */}
                        <Section n="4" title="Legal Basis (GDPR-style explanation, if applicable)" isDark={isDark}>
                            <p>Depending on your location, we rely on:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>
                                    <strong className={isDark ? "text-white/90" : "text-black/90"}>Consent</strong> — when you
                                    voluntarily submit a form, and for analytics/cookies where required
                                </li>
                                <li>
                                    <strong className={isDark ? "text-white/90" : "text-black/90"}>Legitimate interests</strong> —
                                    security, preventing abuse, keeping the site stable and reliable
                                </li>
                            </ul>
                        </Section>

                        {/* Section 5 */}
                        <Section n="5" title="Sharing of Information" isDark={isDark}>
                            <p>We do not sell your personal information.</p>
                            <p>We may share/transfer data only to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    <strong className={isDark ? "text-white/90" : "text-black/90"}>Service providers</strong> that
                                    help us run the site:
                                    <ul className="list-disc list-inside space-y-1 ml-6 mt-1">
                                        <li>Vercel (hosting/infrastructure)</li>
                                        <li>Tally (form provider)</li>
                                        <li>Google Analytics (only if enabled)</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong className={isDark ? "text-white/90" : "text-black/90"}>Legal requirements</strong> if
                                    we must comply with law, court order, or lawful request
                                </li>
                                <li>
                                    <strong className={isDark ? "text-white/90" : "text-black/90"}>Business changes</strong> (if
                                    the project is transferred/merged), with reasonable safeguards
                                </li>
                            </ul>
                        </Section>

                        {/* Section 6 */}
                        <Section n="6" title="Cookies and Similar Technologies" isDark={isDark}>
                            <p>
                                The website may use essential cookies (for basic functionality and preferences, e.g., theme
                                settings).
                            </p>
                            <p>
                                If Google Analytics is enabled, it may set analytics cookies to measure traffic and usage.
                            </p>
                            <p>
                                <strong className={isDark ? "text-white/90" : "text-black/90"}>Your choices:</strong> you can
                                block or delete cookies in your browser settings. If analytics is enabled and you prefer not
                                to be tracked, you can also use browser add-ons and privacy settings to limit analytics.
                            </p>
                        </Section>

                        {/* Section 7 */}
                        <Section n="7" title="Data Retention" isDark={isDark}>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    <strong className={isDark ? "text-white/90" : "text-black/90"}>Form submissions:</strong>{" "}
                                    kept as long as needed to review/respond and for reasonable follow-up, then deleted or
                                    anonymized when no longer necessary.
                                </li>
                                <li>
                                    <strong className={isDark ? "text-white/90" : "text-black/90"}>Infrastructure logs:</strong>{" "}
                                    may be stored by hosting/infrastructure providers for security/diagnostics for a limited
                                    time according to their policies.
                                </li>
                            </ul>
                        </Section>

                        {/* Section 8 */}
                        <Section n="8" title="Security" isDark={isDark}>
                            <p>
                                We use reasonable measures to protect the website and submitted information (HTTPS, access
                                controls, and standard hosting security practices).
                            </p>
                            <p>However, no method of transmission or storage is 100% secure.</p>
                        </Section>

                        {/* Section 9 */}
                        <Section n="9" title="Third-Party Links" isDark={isDark}>
                            <p>
                                USEHUB contains many links to third-party websites/services. We do not control those websites
                                and are not responsible for their privacy practices. Please review the privacy policies of
                                any third-party sites you visit.
                            </p>
                        </Section>

                        {/* Section 10 */}
                        <Section n="10" title="Children's Privacy" isDark={isDark}>
                            <p>
                                USEHUB is not intended for children under 13. We do not knowingly collect personal
                                information from children under 13. If you believe a child has submitted information to us,
                                contact us and we will delete it.
                            </p>
                        </Section>

                        {/* Section 11 */}
                        <Section n="11" title="International Data Transfers" isDark={isDark}>
                            <p>
                                Our service providers may process data on servers located in different countries (e.g., the
                                United States or EU regions). By using the website, you understand that data may be
                                processed internationally under providers' safeguards and policies.
                            </p>
                        </Section>

                        {/* Section 12 */}
                        <Section n="12" title="Your Rights" isDark={isDark}>
                            <p>Depending on your location, you may have rights to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>request access to the information you provided</li>
                                <li>request correction or deletion</li>
                                <li>withdraw consent (where processing is based on consent)</li>
                            </ul>
                            <p>
                                To exercise these rights, contact us at:{" "}
                                <a
                                    href="https://t.me/Usehub_Manager"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn("underline font-semibold", isDark ? "text-white/90 hover:text-white" : "text-black/90 hover:text-black")}
                                >
                                    Telegram
                                </a>
                            </p>
                            <p className={cn("text-sm", isDark ? "text-white/60" : "text-black/60")}>
                                (Important: we can only act on data we control — e.g., your form submission; we cannot
                                control third-party websites you visit.)
                            </p>
                        </Section>

                        {/* Section 13 */}
                        <Section n="13" title="Changes to This Policy" isDark={isDark}>
                            <p>
                                We may update this Privacy Policy from time to time. We will post the updated version on
                                this page and change the "Last Updated" date.
                            </p>
                        </Section>

                        {/* Section 14 */}
                        <Section n="14" title="Contact" isDark={isDark}>
                            <p>
                                Privacy questions or requests:{" "}
                                <a
                                    href="https://t.me/Usehub_Manager"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn("underline font-semibold", isDark ? "text-white/90 hover:text-white" : "text-black/90 hover:text-black")}
                                >
                                    Telegram
                                </a>
                            </p>
                        </Section>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ---- tiny helpers to keep JSX tidy ---- */

function Section({ n, title, isDark, children }) {
    return (
        <section className="space-y-4">
            <h2 className={cn("text-2xl font-semibold", isDark ? "text-white" : "text-black")}>
                {n}) {title}
            </h2>
            {children}
        </section>
    );
}

function SubSection({ title, isDark, children }) {
    return (
        <div className="space-y-3">
            <h3 className={cn("text-lg font-medium", isDark ? "text-white/90" : "text-black/90")}>
                {title}
            </h3>
            {children}
        </div>
    );
}
