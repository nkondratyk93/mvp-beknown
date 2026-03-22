import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = 'https://beknown.no-humans.app';

type LangCode = 'es' | 'de' | 'fr' | 'pt' | 'ja';

interface LangContent {
  langName: string;
  title: string;
  metaDescription: string;
  headline: string;
  subtitle: string;
  ctaChatgpt: string;
  ctaClaude: string;
  ctaGemini: string;
  features: { title: string; description: string }[];
  quote: string;
  footerBuiltBy: string;
  footerBlog: string;
  footerPrivacy: string;
  footerTerms: string;
}

const translations: Record<LangCode, LangContent> = {
  es: {
    langName: 'Espanol',
    title: 'BeKnown — Tu IA sabe la verdad sobre ti',
    metaDescription:
      'BeKnown convierte tu historial de conversaciones con IA en un perfil profesional verificado. Tu ChatGPT, Claude o Gemini se convierte en tu testigo. Gratis e instantaneo.',
    headline: 'Tu curriculum es mentira. Tu IA sabe la verdad.',
    subtitle:
      'Deja de escribir sobre ti mismo. Deja que la IA que trabajo contigo durante meses genere el perfil mas honesto que hayas tenido.',
    ctaChatgpt: 'Generar con ChatGPT',
    ctaClaude: 'Generar con Claude',
    ctaGemini: 'Generar con Gemini',
    features: [
      {
        title: 'Configuracion en 60 segundos',
        description: 'Copia un prompt, pegalo en tu IA, haz clic en un enlace. Sin formularios, sin archivos, sin cuenta.',
      },
      {
        title: 'Habilidades con pruebas',
        description:
          'Cada habilidad viene con evidencia de tus conversaciones reales. No son recomendaciones — son pruebas.',
      },
      {
        title: 'Identidad completa',
        description:
          'Desarrollador de dia, piloto de drones los fines de semana, triatleta por las mananas. Muestra todo lo que eres.',
      },
      {
        title: 'Verificacion anti-fraude',
        description:
          'Codigos de un solo uso prueban la generacion en tiempo real. No puedes prefabricar un perfil BeKnown.',
      },
    ],
    quote:
      'Conecte mi cuenta de Claude. 30 segundos despues, me mostro un perfil que no escribi pero que no podia negar.',
    footerBuiltBy: 'Creado por no-humans.app',
    footerBlog: 'Blog',
    footerPrivacy: 'Privacidad',
    footerTerms: 'Terminos',
  },
  de: {
    langName: 'Deutsch',
    title: 'BeKnown — Deine KI kennt die Wahrheit',
    metaDescription:
      'BeKnown verwandelt deinen KI-Gespraechsverlauf in ein verifiziertes professionelles Profil. Dein ChatGPT, Claude oder Gemini wird dein Zeuge. Kostenlos und sofort.',
    headline: 'Dein Lebenslauf luegt. Deine KI kennt die Wahrheit.',
    subtitle:
      'Hoer auf, ueber dich selbst zu schreiben. Lass die KI, die monatelang mit dir gearbeitet hat, das ehrlichste Profil erstellen, das du je hattest.',
    ctaChatgpt: 'Mit ChatGPT generieren',
    ctaClaude: 'Mit Claude generieren',
    ctaGemini: 'Mit Gemini generieren',
    features: [
      {
        title: 'Einrichtung in 60 Sekunden',
        description: 'Prompt kopieren, in deine KI einfuegen, auf einen Link klicken. Keine Formulare, keine Uploads, kein Konto.',
      },
      {
        title: 'Faehigkeiten mit Belegen',
        description:
          'Jede Faehigkeit kommt mit Belegen aus deinen echten Gespraechen. Keine Empfehlungen — Beweise.',
      },
      {
        title: 'Vollstaendige Identitaet',
        description:
          'Entwickler am Tag, Drohnenpilot am Wochenende, Triathlet am Morgen. Zeige alles, was du bist.',
      },
      {
        title: 'Anti-Betrugs-Verifizierung',
        description:
          'Einmalcodes beweisen die Echtzeit-Generierung. Ein BeKnown-Profil kann nicht vorgefertigt werden.',
      },
    ],
    quote:
      'Ich habe mein Claude-Konto verbunden. 30 Sekunden spaeter zeigte es mir ein Profil, das ich nicht geschrieben hatte, dem ich aber nicht widersprechen konnte.',
    footerBuiltBy: 'Erstellt von no-humans.app',
    footerBlog: 'Blog',
    footerPrivacy: 'Datenschutz',
    footerTerms: 'AGB',
  },
  fr: {
    langName: 'Francais',
    title: 'BeKnown — Votre IA connait la verite',
    metaDescription:
      "BeKnown transforme votre historique de conversations IA en un profil professionnel verifie. Votre ChatGPT, Claude ou Gemini devient votre temoin. Gratuit et instantane.",
    headline: 'Votre CV est un mensonge. Votre IA connait la verite.',
    subtitle:
      "Arretez d'ecrire sur vous-meme. Laissez l'IA qui a travaille avec vous pendant des mois generer le profil le plus honnete que vous ayez jamais eu.",
    ctaChatgpt: 'Generer avec ChatGPT',
    ctaClaude: 'Generer avec Claude',
    ctaGemini: 'Generer avec Gemini',
    features: [
      {
        title: 'Configuration en 60 secondes',
        description: "Copiez un prompt, collez-le dans votre IA, cliquez sur un lien. Pas de formulaires, pas de fichiers, pas de compte.",
      },
      {
        title: 'Competences avec preuves',
        description:
          'Chaque competence est accompagnee de preuves issues de vos vraies conversations. Pas des recommandations — des preuves.',
      },
      {
        title: 'Identite complete',
        description:
          "Developpeur le jour, pilote de drone le week-end, triathlete le matin. Montrez tout ce que vous etes.",
      },
      {
        title: 'Verification anti-fraude',
        description:
          "Des codes a usage unique prouvent la generation en temps reel. Vous ne pouvez pas prefabriquer un profil BeKnown.",
      },
    ],
    quote:
      "J'ai connecte mon compte Claude. 30 secondes plus tard, il m'a montre un profil que je n'avais pas ecrit mais que je ne pouvais pas contester.",
    footerBuiltBy: 'Cree par no-humans.app',
    footerBlog: 'Blog',
    footerPrivacy: 'Confidentialite',
    footerTerms: 'Conditions',
  },
  pt: {
    langName: 'Portugues',
    title: 'BeKnown — Sua IA sabe a verdade',
    metaDescription:
      'BeKnown transforma seu historico de conversas com IA em um perfil profissional verificado. Seu ChatGPT, Claude ou Gemini se torna sua testemunha. Gratuito e instantaneo.',
    headline: 'Seu curriculo e mentira. Sua IA sabe a verdade.',
    subtitle:
      'Pare de escrever sobre voce mesmo. Deixe a IA que trabalhou com voce por meses gerar o perfil mais honesto que voce ja teve.',
    ctaChatgpt: 'Gerar com ChatGPT',
    ctaClaude: 'Gerar com Claude',
    ctaGemini: 'Gerar com Gemini',
    features: [
      {
        title: 'Configuracao em 60 segundos',
        description: 'Copie um prompt, cole na sua IA, clique em um link. Sem formularios, sem arquivos, sem conta.',
      },
      {
        title: 'Habilidades com provas',
        description:
          'Cada habilidade vem com evidencias das suas conversas reais. Nao sao recomendacoes — sao provas.',
      },
      {
        title: 'Identidade completa',
        description:
          'Desenvolvedor de dia, piloto de drone no fim de semana, triatleta de manha. Mostre tudo o que voce e.',
      },
      {
        title: 'Verificacao anti-fraude',
        description:
          'Codigos de uso unico provam a geracao em tempo real. Voce nao pode prefabricar um perfil BeKnown.',
      },
    ],
    quote:
      'Conectei minha conta Claude. 30 segundos depois, me mostrou um perfil que eu nao escrevi, mas que eu nao podia negar.',
    footerBuiltBy: 'Criado por no-humans.app',
    footerBlog: 'Blog',
    footerPrivacy: 'Privacidade',
    footerTerms: 'Termos',
  },
  ja: {
    langName: 'Japanese',
    title: 'BeKnown — AIがあなたの真実を知っている',
    metaDescription:
      'BeKnownはAIとの会話履歴を検証済みのプロフェッショナルプロフィールに変換します。ChatGPT、Claude、Geminiがあなたの証人になります。無料で即座に。',
    headline: '履歴書は嘘。AIはあなたの真実を知っている。',
    subtitle:
      '自分について書くのをやめましょう。何ヶ月も一緒に働いたAIに、あなたが今まで持った中で最も正直なプロフィールを生成させましょう。',
    ctaChatgpt: 'ChatGPTで生成',
    ctaClaude: 'Claudeで生成',
    ctaGemini: 'Geminiで生成',
    features: [
      {
        title: '60秒でセットアップ',
        description: 'プロンプトをコピーしてAIに貼り付け、リンクをクリック。フォームなし、アップロードなし、アカウント不要。',
      },
      {
        title: '証拠付きスキル',
        description:
          'すべてのスキルには実際の会話からの証拠が付いています。推薦ではなく、証拠です。',
      },
      {
        title: 'フルスペクトラムアイデンティティ',
        description:
          '昼は開発者、週末はドローンパイロット、朝はトライアスリート。あなたのすべてを見せましょう。',
      },
      {
        title: '不正防止検証',
        description:
          'ワンタイムコードがリアルタイム生成を証明します。BeKnownプロフィールを事前に作ることはできません。',
      },
    ],
    quote:
      'Claudeアカウントを接続しました。30秒後、自分では書いていないけれど否定できないプロフィールが表示されました。',
    footerBuiltBy: 'no-humans.appが構築',
    footerBlog: 'ブログ',
    footerPrivacy: 'プライバシー',
    footerTerms: '利用規約',
  },
};

const supportedLangs: LangCode[] = ['es', 'de', 'fr', 'pt', 'ja'];

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang as LangCode];
  if (!t) {
    return { title: 'BeKnown' };
  }

  return {
    title: t.title,
    description: t.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        en: BASE_URL,
        es: `${BASE_URL}/es`,
        de: `${BASE_URL}/de`,
        fr: `${BASE_URL}/fr`,
        pt: `${BASE_URL}/pt`,
        ja: `${BASE_URL}/ja`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.metaDescription,
      url: `${BASE_URL}/${lang}`,
      siteName: 'BeKnown',
      type: 'website',
    },
  };
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = translations[lang as LangCode];

  if (!t) {
    return (
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-heading text-4xl font-bold mb-4">Page Not Found</h1>
        <Link href="/" className="text-[#E5C07B] hover:underline">
          Go to homepage
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center dot-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0B]/80 to-[#0A0A0B]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t.headline}
          </h1>
          <p className="text-lg md:text-xl text-[#71717A] max-w-2xl mb-12">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/generate?provider=chatgpt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#10A37F' }}
            >
              {t.ctaChatgpt}
            </Link>
            <Link
              href="/generate?provider=claude"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#D97757' }}
            >
              {t.ctaClaude}
            </Link>
            <Link
              href="/generate?provider=gemini"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#4285F4' }}
            >
              {t.ctaGemini}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-[#141416] border border-[#27272A] transition-all duration-200 hover:border-[#E5C07B]"
            >
              <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-[#71717A]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <blockquote className="border-l-4 border-[#E5C07B] pl-6 py-2">
          <p className="text-lg italic text-[#F5F5F5]/80">
            &ldquo;{t.quote}&rdquo;
          </p>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272A] mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#71717A]">
          <span>{t.footerBuiltBy}</span>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">
              {t.footerBlog}
            </Link>
            <Link href="/privacy" className="hover:text-[#F5F5F5] transition-colors">
              {t.footerPrivacy}
            </Link>
            <Link href="/terms" className="hover:text-[#F5F5F5] transition-colors">
              {t.footerTerms}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
