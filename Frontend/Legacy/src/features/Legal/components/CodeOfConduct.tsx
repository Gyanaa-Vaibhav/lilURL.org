// src/pages/CodeOfConduct.js
import React from 'react';
import '../styles/privacyPolicy.css'; // Reuses the same styling for consistency

export default function CodeOfConduct() {

    React.useEffect(()=>{
        document.title = "Code of Conduct | lilURL"
    })

    return (


        <div className='legalHolder'>
            {/* TODO NEED TO CHANGE EMAIL AND WEBSITE to .org */}
            <div className="legal-page">
                <h1>Code of Conduct</h1>
                <p><strong>Effective Date:</strong> May 13, 2025</p>

                <p>
                    LilURL is committed to fostering a safe, respectful, and professional environment for all users of our services. This Code of Conduct outlines the standards of behavior we expect from users when accessing and interacting with our platform, services, and community.
                </p>

                <h2>1. Purpose</h2>
                <p>
                    The LilURL platform empowers individuals and businesses to shorten, manage, and monitor links. To ensure a trustworthy and ethical space, we require that all users act responsibly and with integrity. By using LilURL, you agree to comply with this Code of Conduct at all times.
                </p>

                <h2>2. Expected Behavior</h2>
                <ul>
                    <li>Act respectfully towards other users, staff, and the broader internet community.</li>
                    <li>Use LilURL in compliance with all applicable local, national, and international laws.</li>
                    <li>Provide accurate and truthful information when registering, using, or communicating through the service.</li>
                    <li>Respect intellectual property rights and the privacy of others.</li>
                </ul>

                <h2>3. Prohibited Conduct</h2>
                <p>Any of the following behaviors are strictly prohibited:</p>
                <ul>
                    <li>Creating or sharing shortened URLs that lead to malicious, deceptive, or harmful content, including phishing pages, scams, malware, or ransomware.</li>
                    <li>Using LilURL to promote or disseminate hate speech, violence, or discriminatory content based on race, gender, religion, nationality, disability, sexual orientation, or age.</li>
                    <li>Engaging in abusive, threatening, or harassing behavior towards any person or group.</li>
                    <li>Violating our rate limits or attempting to bypass authentication mechanisms, throttle limits, or other system protections.</li>
                    <li>Scraping, reverse engineering, or interfering with the operation or integrity of the LilURL infrastructure or API.</li>
                    <li>Sharing content that violates copyright, trademark, or other proprietary rights.</li>
                </ul>

                <h2>4. Platform Abuse & Fraud Prevention</h2>
                <ul>
                    <li>Do not attempt to artificially manipulate analytics, redirect users deceptively, or mask malicious intent behind a URL.</li>
                    <li>Do not use automated bots to create or spam links.</li>
                    <li>Violation of fair use may result in account termination, blacklisting of domains, or legal action.</li>
                </ul>

                <h2>5. User Accountability</h2>
                <p>
                    Users are responsible for the links they shorten, distribute, and manage through LilURL. If you operate a business or application using our API, you are responsible for monitoring and moderating your usage and content accordingly.
                </p>

                <h2>6. Enforcement</h2>
                <p>
                    We reserve the right to investigate any reported or suspected violations. Based on our sole discretion, we may:
                </p>
                <ul>
                    <li>Issue warnings or request corrective action</li>
                    <li>Suspend or terminate accounts or API keys without prior notice</li>
                    <li>Block or blacklist offending URLs, domains, or IP addresses</li>
                    <li>Report illegal activities to appropriate law enforcement authorities</li>
                </ul>

                <h2>7. Reporting Violations</h2>
                <p>
                    If you observe a violation of this Code or suspect abuse, please report it by emailing us at <a href="mailto:abuse@lilurl.in">abuse@lilurl.in</a>. Include all relevant details so we can take swift and appropriate action.
                </p>

                <h2>8. Modifications</h2>
                <p>
                    This Code of Conduct may be updated from time to time. We will notify users of significant changes via the dashboard or email. Continued use of the platform implies acceptance of the current version.
                </p>

                <h2>9. Contact</h2>
                <p>
                    For any questions regarding this Code of Conduct, please contact us at <a href="mailto:support@lilurl.in">support@lilurl.in</a>.
                </p>
            </div>
        </div>
    );
}