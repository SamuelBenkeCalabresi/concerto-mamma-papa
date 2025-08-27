import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CameraIcon, PlayIcon } from '@heroicons/react/24/outline';

export default async function GalleriaPage() {
  const t = await getTranslations();

  const photoGalleries = [
    {
      id: 1,
      title: "Concerto di Primavera 2024",
      description: "Momenti magici del nostro concerto primaverile",
      thumbnail: "🌸",
      photos: 15,
      date: "Marzo 2024"
    },
    {
      id: 2,
      title: "Natale in Musica 2023",
      description: "Le più belle melodie natalizie per tutta la famiglia",
      thumbnail: "🎄",
      photos: 22,
      date: "Dicembre 2023"
    },
    {
      id: 3,
      title: "Estate Musicale 2023",
      description: "Concerti all'aperto per bambini e famiglie",
      thumbnail: "☀️",
      photos: 18,
      date: "Luglio 2023"
    }
  ];

  const videoGalleries = [
    {
      id: 1,
      title: "Highlights 2024",
      description: "I momenti più belli dei nostri concerti",
      thumbnail: "🎬",
      duration: "5:30",
      views: "1.2k"
    },
    {
      id: 2,
      title: "Dietro le Quinte",
      description: "Come nasce uno spettacolo per famiglie",
      thumbnail: "🎭",
      duration: "8:15",
      views: "856"
    }
  ];

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/8 to-base-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
              Galleria
            </h1>
            <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
              Rivivi i momenti più belli dei nostri concerti attraverso foto e video
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Galleria Fotografica</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Sfoglia le nostre raccolte fotografiche e scopri la magia dei nostri eventi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photoGalleries.map((gallery) => (
              <div key={gallery.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <figure className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{gallery.thumbnail}</div>
                      <CameraIcon className="h-8 w-8 text-primary mx-auto" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 badge badge-primary">
                    {gallery.photos} foto
                  </div>
                </figure>
                
                <div className="card-body">
                  <h3 className="card-title text-lg">{gallery.title}</h3>
                  <p className="text-neutral/70 text-sm">{gallery.description}</p>
                  <div className="text-xs text-neutral/60 mb-4">{gallery.date}</div>
                  
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">
                      Visualizza Gallery
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Galleria Video</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Guarda i video dei nostri concerti e scopri l&apos;atmosfera unica dei nostri eventi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoGalleries.map((video) => (
              <div key={video.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <figure className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{video.thumbnail}</div>
                      <div className="bg-black/50 rounded-full p-3">
                        <PlayIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 badge badge-secondary">
                    {video.duration}
                  </div>
                </figure>
                
                <div className="card-body">
                  <h3 className="card-title text-lg">{video.title}</h3>
                  <p className="text-neutral/70 text-sm">{video.description}</p>
                  <div className="text-xs text-neutral/60 mb-4">{video.views} visualizzazioni</div>
                  
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">
                      <PlayIcon className="h-4 w-4 mr-1" />
                      Riproduci
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Seguici su Instagram</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Non perdere i nostri aggiornamenti quotidiani e le foto più recenti
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-2xl">📸</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="#" className="btn btn-primary">
              Segui @concertoconmammaepapa
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}