import { useTranslations } from 'next-intl';

export default function CookiePolicyPage() {
  const t = useTranslations('CookiePolicy');

  const currentDate = new Date().toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-sm text-gray-500">
            {t('lastUpdated', { date: currentDate })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 space-y-8">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.intro.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.intro.content')}
            </p>
          </section>

          {/* Cookies We Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('sections.cookiesWeUse.title')}
            </h2>

            {/* Essential Cookies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('sections.cookiesWeUse.essential.title')}
              </h3>
              <p className="text-gray-700 mb-3">
                {t('sections.cookiesWeUse.essential.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {t.raw('sections.cookiesWeUse.essential.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Functional Cookies */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('sections.cookiesWeUse.functional.title')}
              </h3>
              <p className="text-gray-700 mb-3">
                {t('sections.cookiesWeUse.functional.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {t.raw('sections.cookiesWeUse.functional.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* What We Don't Use */}
          <section className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.noCookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.noCookies.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.raw('sections.noCookies.items').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Manage Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.manageCookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.manageCookies.content')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
