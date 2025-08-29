'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  href: string;
}

export default function ChiSiamoSection() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('ChiSiamoSection');
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'it';

  const teamMembers: TeamMember[] = [
    {
      id: 'annamaria-diroma',
      name: t('teamMembers.0.name'),
      role: t('teamMembers.0.role'),
      description: t('teamMembers.0.description'),
      imageSrc: '/images/annamaria_curr2.jpg',
      href: `/team/annamaria-diroma`
    },
    {
      id: 'francesca-scaglione',
      name: t('teamMembers.1.name'),
      role: t('teamMembers.1.role'),
      description: t('teamMembers.1.description'),
      imageSrc: '/images/francesca_curr.jpg',
      href: `/team/francesca-scaglione`
    },
    {
      id: 'monserrat-olavarria-balmaceda',
      name: t('teamMembers.2.name'),
      role: t('teamMembers.2.role'),
      description: t('teamMembers.2.description'),
      imageSrc: '/images/monserrat_curr.jpg',
      href: `/team/monserrat-olavarria-balmaceda`
    }
  ];

  const handleMemberClick = (href: string) => {
    router.push(`/${currentLocale}${href}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-neutral mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-neutral/70 max-w-3xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => handleMemberClick(member.href)}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl shadow-lg hover:shadow-xl border border-primary/10 hover:border-primary/30 overflow-hidden transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <div className="inline-block bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mt-2">
                    {member.role}
                  </div>
                </div>

                <p className="text-neutral/70 text-sm leading-relaxed mb-4">
                  {member.description}
                </p>

                <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors duration-300">
                  {t('learnMore')}
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collaborators Section */}
      <div className="mt-20">
        <div className="bg-gradient-to-br from-white to-primary/5 rounded-3xl shadow-lg border border-primary/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="order-2 lg:order-1 p-8">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="/images/tre.jpg"
                  alt="Ensemble 0/3 e Musicisti Collaboratori"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2 p-8">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-neutral mb-6">
                  {t('collaboratorsTitle')}
                </h3>
              </div>

              {/* Ensemble 0/3 */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-primary mb-4 flex items-center">
                  {t('ensembleTitle')}
                </h4>
                <div className="space-y-2 text-neutral/70 ml-8">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="flex items-start">
                      <span className="font-medium text-neutral">{t(`collaborators.ensemble.${index}.name`)}</span>
                      <span className="text-sm ml-2">{t(`collaborators.ensemble.${index}.role`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collaborating Musicians */}
              <div>
                <h4 className="text-xl font-semibold text-primary mb-4 flex items-center">
                  {t('collaborators.musiciansTitle')}
                </h4>
                <div className="space-y-2 text-neutral/70 ml-8">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="flex items-start">
                      <span className="font-medium text-neutral">{t(`collaborators.musicians.${index}.name`)}</span>
                      <span className="text-sm ml-2">{t(`collaborators.musicians.${index}.role`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-neutral mb-4">
            Unisciti alla Nostra Famiglia Musicale
          </h3>
          <p className="text-neutral/70 mb-6 max-w-2xl mx-auto">
            Ogni concerto è un'esperienza unica pensata per stimolare la creatività e l'amore per la musica 
            nei bambini, creando momenti speciali da condividere insieme.
          </p>
          <button className="btn btn-primary bg-primary hover:bg-primary/80 border-primary">
            Scopri i Prossimi Eventi
          </button>
        </div>
      </div>
    </div>
  );
}