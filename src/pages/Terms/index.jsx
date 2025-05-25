import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Terms of Service</h1>
      
      <div className="prose prose-brown max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Holidaze. By accessing or using our website and services, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">"Service" refers to the Holidaze platform</li>
            <li className="mb-2">"User" refers to anyone who uses our Service</li>
            <li className="mb-2">"Venue Manager" refers to users who list properties on our platform</li>
            <li className="mb-2">"Guest" refers to users who book accommodations through our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">
            To access certain features of our Service, you must register for an account. You agree to:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Provide accurate and complete information</li>
            <li className="mb-2">Maintain the security of your account credentials</li>
            <li className="mb-2">Promptly update any changes to your information</li>
            <li className="mb-2">Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Venue Listings</h2>
          <p className="mb-4">
            Venue Managers must:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Provide accurate descriptions of their properties</li>
            <li className="mb-2">Maintain up-to-date availability calendars</li>
            <li className="mb-2">Honor confirmed bookings</li>
            <li className="mb-2">Comply with local laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Bookings and Payments</h2>
          <p className="mb-4">
            When making a booking:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Guests agree to honor their reservations</li>
            <li className="mb-2">Cancellations must follow our cancellation policy</li>
            <li className="mb-2">All payments are processed securely through our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Prohibited Activities</h2>
          <p className="mb-4">
            Users may not:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Violate any applicable laws or regulations</li>
            <li className="mb-2">Impersonate others or provide false information</li>
            <li className="mb-2">Interfere with the proper functioning of the Service</li>
            <li className="mb-2">Engage in fraudulent activities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate accounts that violate these terms or engage in inappropriate behavior.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="mb-4">
            We may modify these terms at any time. Continued use of our Service constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@holidaze.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
