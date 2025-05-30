import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Rooted Executive Retreats",
  description: "Read the Privacy Policy for Rooted Executive Retreats to understand how we collect, use, and protect your personal information.",
  robots: { // Good practice to allow indexing of privacy policy
    index: true,
    follow: true,
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EB]">
      <header className="bg-[#4A4A4A] py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#FFF8EB] mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-[#FFF8EB]/90 font-body">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 lg:py-16">
        <div className="prose prose-lg max-w-3xl mx-auto text-[#4A4A4A] font-body prose-headings:text-[#317039] prose-strong:text-[#CC4824] prose-a:text-[#CC4824] hover:prose-a:text-[#317039]">
          <p>
            Welcome to Rooted Executive Retreats ("us", "we", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@rootedexecutiveretreats.com.
          </p>

          <p>
            This privacy notice describes how we might use your information if you:
          </p>
          <ul>
            <li>Visit our website at https://www.rootedexecutiveretreats.com</li>
            <li>Sign up for our newsletter (e.g., via MailerLite)</li>
            <li>Engage with us in other related ways ― including any sales, marketing, or events</li>
          </ul>
          <p>
            In this privacy notice, if we refer to:
          </p>
          <ul>
            <li><strong>"Website"</strong>, we are referring to any website of ours that references or links to this policy</li>
            <li><strong>"Services"</strong>, we are referring to our Website, and other related services, including any sales, marketing, or events</li>
          </ul>
          <p>
            The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
          </p>

          <h2>1. What Information Do We Collect?</h2>
          <p>
            <strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website (such as signing up for newsletters or interacting with blog posts) or otherwise when you contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following: email address, name, and other similar information.
          </p>
          <p>
            <strong>Information automatically collected:</strong> We automatically collect certain information when you visit, use or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website and other technical information. This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes (e.g., via Google Analytics).
          </p>

          <h2>2. How Do We Use Your Information?</h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <ul>
            <li>To send you marketing and promotional communications (e.g., our newsletter via MailerLite), if this is in accordance with your marketing preferences. You can opt-out of our marketing emails at any time.</li>
            <li>To respond to user inquiries/offer support to users.</li>
            <li>To analyze usage trends and improve our Website and Services.</li>
            <li>For data backup and operational stability (e.g., through Supabase).</li>
            <li>For other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Website, products, marketing and your experience.</li>
          </ul>

          <h2>3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We may process or share your data that we hold based on the following legal basis:
          </p>
          <ul>
            <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
            <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
            <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
            <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
          </ul>
          <p>
            More specifically, we may need to process your data or share your personal information in the following situations:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: data analytics (Google Analytics), email delivery (MailerLite), and website hosting and backend services (Supabase). We make reasonable efforts to ensure these third parties have appropriate data protection measures.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>

          <h2>4. Do We Use Cookies and Other Tracking Technologies?</h2>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specifically, our third-party services like Google Analytics and MailerLite may use cookies to help analyze how users use the site and to deliver targeted content or advertisements. You can usually set your browser to remove or reject cookies.
          </p>
          
          <h2>5. How Do We Keep Your Information Safe?</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.
          </p>

          <h2>6. What Are Your Privacy Rights?</h2>
          <p>
            In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information.
          </p>
          <p>
            To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
          </p>

          <h2>7. Links to Other Websites</h2>
          <p>
            Our Website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our Services are not directed to individuals under the age of 13 (or a higher age as required by applicable law in your jurisdiction). We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
          </p>

          <h2>10. How Can You Contact Us About This Notice?</h2>
          <p>
            If you have questions or comments about this notice, you may email us at privacy@rootedexecutiveretreats.com or by post to:
          </p>
          <p>
            Rooted Executive Retreats<br />
            [Your Company's Physical Address - Placeholder, please update]<br />
            [City, Postal Code, Country - Placeholder, please update]
          </p>
        </div>
      </main>
    </div>
  );
}
