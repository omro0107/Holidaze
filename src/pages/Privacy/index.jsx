import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Privacy Policy</h1>
      
      <div className="prose prose-brown max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            At Holidaze, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="mb-4">We collect the following types of information:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">
              <strong>Account Information:</strong> Name, email address, and profile picture
            </li>
            <li className="mb-2">
              <strong>Booking Information:</strong> Dates, number of guests, and special requests
            </li>
            <li className="mb-2">
              <strong>Venue Manager Information:</strong> Property details and availability
            </li>
            <li className="mb-2">
              <strong>Usage Data:</strong> How you interact with our platform
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Process your bookings and payments</li>
            <li className="mb-2">Communicate about your reservations</li>
            <li className="mb-2">Improve our services</li>
            <li className="mb-2">Ensure platform security</li>
            <li className="mb-2">Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
          <p className="mb-4">We share your information with:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Venue managers (for confirmed bookings)</li>
            <li className="mb-2">Service providers who assist our operations</li>
            <li className="mb-2">Legal authorities when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your information from unauthorized access, alteration, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Access your personal information</li>
            <li className="mb-2">Correct inaccurate information</li>
            <li className="mb-2">Request deletion of your information</li>
            <li className="mb-2">Object to certain data processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
          <p className="mb-4">
            We use cookies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p className="mb-4">
            Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
          <p className="mb-4">
            We may update this policy periodically. We will notify you of any material changes through our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p>
            For privacy-related inquiries, please contact us at privacy@holidaze.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
