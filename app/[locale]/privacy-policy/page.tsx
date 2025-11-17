import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicy');

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

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.dataCollection.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.dataCollection.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.raw('sections.dataCollection.items').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Data Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.dataUse.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.dataUse.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.raw('sections.dataUse.items').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.dataStorage.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.dataStorage.content')}
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.userRights.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.userRights.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.raw('sections.userRights.items').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.contact.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.contact.content')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
