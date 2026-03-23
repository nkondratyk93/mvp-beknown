import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — BeKnown',
  description: 'Privacy policy for BeKnown. We collect minimal data and never sell your information.',
  alternates: {
    canonical: 'https://beknown.no-humans.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-[#71717A] mb-8">Last updated: March 23, 2026</p>

      <div className="space-y-8 text-[#A1A1AA] leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Overview</h2>
          <p>
            BeKnown is operated by no-humans.app. We built BeKnown to be privacy-first.
            We collect as little data as possible and never sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">What We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-[#F5F5F5]">Profile data you submit:</strong> When you paste your AI-generated JSON
              profile on the claim page, we store that data to create your public profile. This includes your name,
              tagline, skills, projects, domains, thinking style, and learning patterns as reported by your AI.
            </li>
            <li>
              <strong className="text-[#F5F5F5]">Verification codes:</strong> We generate one-time nonce codes to verify
              that profiles are created in real time. These codes expire after 10 minutes and are deleted after use.
            </li>
            <li>
              <strong className="text-[#F5F5F5]">Analytics:</strong> We use Google Analytics to understand how people use
              the site. This collects anonymized usage data such as page views, referral sources, and device type. No
              personal information is tied to analytics data.
            </li>
            <li>
              <strong className="text-[#F5F5F5]">Cookies:</strong> We use a single cookie for A/B testing variant
              assignment. This cookie contains no personal information — only a letter (&quot;A&quot; or &quot;B&quot;)
              indicating which version of the homepage you see.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">What We Don&apos;t Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We do not collect email addresses (there is no signup).</li>
            <li>We do not collect passwords (there are no accounts).</li>
            <li>We do not access your AI conversation history. Your AI processes the prompt locally, and only the structured JSON output is shared with us when you paste it.</li>
            <li>We do not use tracking pixels or third-party ad networks.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">How We Use Your Data</h2>
          <p>
            Profile data is used solely to generate and display your public BeKnown profile at the URL you receive.
            We do not use your profile data for training AI models, advertising, or any purpose other than displaying
            your profile.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Data Storage</h2>
          <p>
            Profile data is stored in Supabase (hosted on AWS). Verification codes are stored temporarily and deleted
            after expiration or use. We do not store your AI conversation history at any point.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Data Deletion</h2>
          <p className="mb-3">
            You can delete your profile directly from your profile page using the &quot;Delete My Profile&quot; button.
            When you create a profile, your edit token is automatically saved in your browser&apos;s local storage for
            convenience, so you can manage your profile without needing to remember anything.
          </p>
          <p>
            If you&apos;ve cleared your browser data or are on a different device, you can still delete your profile by
            entering your edit token manually. If you&apos;ve lost your edit token, visit{' '}
            <a href="https://no-humans.app" target="_blank" rel="noopener noreferrer" className="text-[#E5C07B] hover:underline">
              no-humans.app
            </a>{' '}
            to request deletion.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Your Rights</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-[#F5F5F5]">Right to delete:</strong> You can delete your profile and all associated
              data at any time using the &quot;Delete My Profile&quot; button on your profile page.
            </li>
            <li>
              <strong className="text-[#F5F5F5]">Right to know:</strong> We only store the data you explicitly paste —
              the JSON profile output from your AI conversation. No hidden data is collected beyond what is described above.
            </li>
            <li>
              <strong className="text-[#F5F5F5]">Right to data portability:</strong> Your profile is publicly visible and
              served as structured data. You can access your full profile data at any time via your public profile URL.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Third-Party Services</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-[#F5F5F5]">Supabase:</strong> Database hosting for profile storage.</li>
            <li><strong className="text-[#F5F5F5]">Vercel:</strong> Application hosting and deployment.</li>
            <li><strong className="text-[#F5F5F5]">Google Analytics:</strong> Anonymized usage analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Children&apos;s Privacy</h2>
          <p>
            BeKnown is not intended for use by anyone under the age of 16. We do not knowingly collect data from children.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be reflected on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-[#F5F5F5] mb-3">Contact</h2>
          <p>
            If you have questions about this privacy policy or want to request data deletion, visit{' '}
            <a href="https://no-humans.app" target="_blank" rel="noopener noreferrer" className="text-[#E5C07B] hover:underline">
              no-humans.app
            </a>{' '}
            for contact information.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#27272A]">
        <Link href="/" className="text-[#71717A] text-sm hover:text-[#F5F5F5] transition-colors">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
