import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container className='mt-4'>
        <h2>DATA SAFETY AND PRIVACY STATEMENT</h2>
        This privacy policy applies to our online store and mobile app available
        on Google Play and the Apple App Store. Please carefully read this
        policy to understand how we collect, use, and protect your personal
        information in compliance with the standards set by major app stores.
        <br />
        <br />
        For any inquiries about this privacy policy or our practices, please
        contact our customer service at{' '}
        <b> sunrise.multitradelink@gmail.com.</b>
        <br />
        <br />
        <b>Collection and Use of Personal Data</b>
        <br />
        We collect and store the information you provide when making purchases
        through our online store and mobile app. This includes information
        related to product orders, delivery follow-up, and customer service
        interactions. We may also collect IP addresses and technical information
        about your device and internet connection using tools such as Google
        Analytics. We use cookies to enhance website functionality and analyze
        user data.
        <br />
        <br />
        <b>Analysis Tools and Cookies</b>
        <br />
        We utilize analysis tools, cookies, and other technologies to enhance
        the user experience and analyze user data. Cookies are small text files
        sent from our web server and stored by your web browser. You can delete
        cookies at any time or adjust your browser settings to prevent them from
        being stored.
        <br />
        <br />
        <b>Data Security and Retention</b>
        <br />
        We have implemented routines and measures to ensure the security of
        personal data. Your personal data will not be stored longer than
        necessary for the purposes outlined in this policy.
        <br />
        <b>Updates to this Privacy Policy</b>
        <br />
        <br />
        We may update this privacy policy to comply with legal requirements or
        our own practices. If there are significant changes that require your
        approval, we will notify you and seek your consent.
        <br />
        <br />
        <b>Your Rights</b>
        <br />
        You have the right to access, correct, and delete your personal data by
        using the option under the account section under my details:
        https://sunrisemultitradelink.com/account . If you have any questions or
        requests regarding the collection and use of your personal data, please
        contact us at sunrise.multitradelink@gmail.com.
        <br />
        <br />
        By using our online store and mobile app available on major app stores,
        you acknowledge that you have read and understood this privacy policy
        and agree to the collection, use, and protection of your personal
        information as described herein.
        <br />
        <br />
        <b>Account Deletion</b>
        <br />
        You can delete your account from
        https://sunrisemultitradelink.com/account anytime and all your personal
        data related with your account will be permanently deleted from our
        system.
        <br />
        <br />
        Last updated: 12/12/2023.
      </Container>
    </div>
  );
};

export default Privacy;
