import React from 'react';
import '../styles/privacyPolicy.css'; // Optional: style it if you like

export default function PrivacyPolicy() {
    return (
        <div className='legalHolder'>
        <div className="legal-page">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> May 13, 2025</p>
            <p><strong>Last Updated:</strong> May 13, 2025</p>

            <p>
                LilURL ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy outlines how we
                collect, use, share, and protect your personal information when you use our website, services, application,
                and APIs (collectively, “Services”).
            </p>

            <h2>1. Definitions</h2>
            <ul>
                <li><strong>“Personal Data”</strong> – Any information that identifies an individual.</li>
                <li><strong>“Processing”</strong> – Any operation on personal data (e.g., storage, use, deletion).</li>
                <li><strong>“Service”</strong> – Refers to the LilURL platform including API and dashboard.</li>
            </ul>

            <h2>2. Information We Collect</h2>
            <h3>a. Information You Provide</h3>
            <ul>
                <li>Email, name, API usage data tied to your key, support messages</li>
            </ul>
            <h3>b. Information Collected Automatically</h3>
            <ul>
                <li>IP, device type, cookies, browser type, referrer info</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
                <li>To provide and improve the Service</li>
                <li>To secure and authenticate users</li>
                <li>To communicate important updates</li>
            </ul>

            <h2>4. Cookies Policy</h2>
            <p>We use essential, analytics, and preference cookies. You can disable them via browser settings.</p>

            <h2>5. Legal Basis for Processing (GDPR)</h2>
            <ul>
                <li>Consent, contract, legal obligation, legitimate interest</li>
            </ul>

            <h2>6. CCPA & Data Rights</h2>
            <p>California residents can request access, deletion, or object to use of their data.</p>

            <h2>7. Your Rights</h2>
            <ul>
                <li>Access, correct, delete, restrict, object, and export your data</li>
            </ul>

            <h2>8. Data Retention</h2>
            <ul>
                <li>API logs: 90 days</li>
                <li>User data: as long as account is active or legally required</li>
            </ul>

            <h2>9. How We Share Data</h2>
            <ul>
                <li>No selling of data</li>
                <li>Shared only with secure third-party providers</li>
            </ul>

            <h2>10. Security Practices</h2>
            <p>HTTPS, encryption, secure APIs, internal access control, rate limits</p>

            <h2>11. International Users</h2>
            <p>Your data may be processed in countries outside your own. We comply with GDPR transfer rules.</p>

            <h2>12. Children's Privacy</h2>
            <p>No service for users under 13. We don’t knowingly collect data from minors.</p>

            <h2>13. Changes to Policy</h2>
            <p>We’ll notify you of major changes via dashboard or email. Last update date is always listed.</p>

            <h2>14. Contact Us</h2>
            <p>
                {/* TODO NEED TO CHANGE EMAIL AND WEBSITE to .org */}
                Email: <a href="mailto:privacy@lilurl.in">privacy@lilurl.in</a><br />
                Website: <a href="https://lilurl.in" target="_blank" rel="noreferrer">https://lilurl.in</a>
            </p>
            </div>
        </div>
    );
}
