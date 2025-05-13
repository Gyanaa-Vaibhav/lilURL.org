// src/pages/TermsOfService.js
import React from 'react';
import '../styles/privacyPolicy.css'; // Use the same styling for consistency

export default function TermsOfService() {
    return (
        <div className='legalHolder'>
            <div className="legal-page">
                <h1>Terms of Service</h1>
                <p><strong>Effective Date:</strong> May 13, 2025</p>

                <p>
                    These Terms of Service ("Terms") govern your access to and use of the LilURL platform, including our website, APIs, dashboard, and all associated services ("Service"). By accessing or using LilURL, you agree to be bound by these Terms. If you do not agree, do not use the Service.
                </p>

                <h2>1. Eligibility</h2>
                <p>
                    You must be at least 13 years old to use the Service. By using LilURL, you represent that you meet this requirement and have the legal capacity to enter into these Terms.
                </p>

                <h2>2. Account Registration</h2>
                <ul>
                    <li>You may be required to create an account to access certain features, including API access and dashboards.</li>
                    <li>You agree to provide accurate and complete information and keep it up to date.</li>
                    <li>You are responsible for maintaining the confidentiality of your credentials and for any activity under your account.</li>
                </ul>

                <h2>3. Use of the Service</h2>
                <p>Subject to compliance with these Terms, LilURL grants you a limited, non-exclusive, non-transferable, revocable license to use the Service.</p>
                <p>You agree not to:</p>
                <ul>
                    <li>Use the Service for unlawful, fraudulent, or harmful purposes.</li>
                    <li>Bypass or disable any security features or rate limits.</li>
                    <li>Interfere with or disrupt the Service’s infrastructure or data.</li>
                    <li>Use automated tools to scrape, crawl, or overload the Service.</li>
                </ul>

                <h2>4. API Usage</h2>
                <ul>
                    <li>API keys are personal and may not be shared or resold.</li>
                    <li>We may impose rate limits or revoke access if abuse or non-compliance is detected.</li>
                    <li>You may not use the API to create derivative or competing products without written permission.</li>
                </ul>

                <h2>5. Content Responsibility</h2>
                <p>
                    You are solely responsible for the content behind any URLs you shorten using LilURL. We do not endorse or verify any third-party content and assume no responsibility for it.
                </p>

                <h2>6. Intellectual Property</h2>
                <p>
                    All content, software, branding, and functionality of the LilURL platform are owned by or licensed to us. You may not copy, modify, or distribute any part of the Service without our prior written consent.
                </p>

                <h2>7. Termination</h2>
                <ul>
                    <li>We reserve the right to suspend or terminate your account or access at any time, with or without cause or notice.</li>
                    <li>Upon termination, your right to use the Service ceases immediately. Certain provisions (e.g., limitations of liability) survive termination.</li>
                </ul>

                <h2>8. Disclaimers</h2>
                <p>
                    The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or secure.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, LilURL shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, revenue, profits, or business, arising out of or related to your use of the Service.
                </p>

                <h2>10. Indemnification</h2>
                <p>
                    You agree to indemnify and hold harmless LilURL, its affiliates, and employees from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
                </p>

                <h2>11. Changes to Terms</h2>
                <p>
                    We may update these Terms from time to time. We will notify users of significant changes via dashboard or email. Continued use of the Service constitutes acceptance of the revised Terms.
                </p>

                <h2>12. Governing Law</h2>
                <p>
                    These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. All disputes shall be subject to the exclusive jurisdiction of the courts located in India.
                </p>

                <h2>13. Contact</h2>
                <p>
                    {/* TODO NEED TO CHANGE EMAIL AND WEBSITE to .org */}
                    For questions about these Terms, please contact us at:<br />
                    Email: <a href="mailto:support@lilurl.in">support@lilurl.in</a><br />
                    Website: <a href="https://lilurl.in" target="_blank" rel="noreferrer">https://lilurl.in</a>
                </p>
            </div>
        </div>
    );
}