import { Head } from '@inertiajs/react';
import {
    CalendarDays,
    CarTaxiFront,
    Copy,
    HandHeart,
    MapPin,
    Phone,
} from 'lucide-react';
import { toast } from 'sonner';
import Reveal from '@/components/reveal';

type Props = {
    event: {
        date: string;
        location: string;
        contributionNumber: string;
        infoline: string[];
    };
    paymentLinks: {
        wave: string;
        whatsapp: string;
    };
};

// Laisse le temps à l'écran de chargement de disparaître.
const heroDelay = 700;

const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114522.9344883304!2d-4.234165602734371!3d5.433116299999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1bf0054782ae5%3A0xdae35d7ce113f8bf!2sMarch%C3%A9%20Contenaires%20de%20N'Dotr%C3%A9!5e1!3m2!1sfr!2sci!4v1793094030438!5m2!1sfr!2sci";

const mapDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=March%C3%A9%20Contenaires%20de%20N'Dotr%C3%A9";

// Ouvre Yango avec le lieu de l'événement comme destination.
const yangoRideUrl =
    'https://yango.com/adj/yango?end-lon=-4.08343&end-lat=5.43298';

export default function Welcome({ event, paymentLinks }: Props) {
    const eventDate = new Date(`${event.date}T00:00:00`);
    const daysLeft = Math.ceil(
        (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    const formattedDate = eventDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const copyNumber = () => {
        void navigator.clipboard
            .writeText(event.contributionNumber.replace(/\s/g, ''))
            .then(() => toast.success('Numéro copié'));
    };

    return (
        <>
            <Head title="Œuvre caritative Eleeo" />
            <div className="min-h-screen overflow-x-hidden bg-[#F7F7F4] font-sans text-neutral-900">
                {/* En-tête */}
                <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
                    <a href="#" className="flex items-center">
                        <img
                            src="/images/eleeo-logo.jpg"
                            alt="Eleeo, œuvre caritative"
                            className="h-12 w-auto mix-blend-multiply sm:h-14"
                        />
                    </a>
                    <a
                        href="#don"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-eleeo-orange to-eleeo-yellow px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-eleeo-orange/25 transition hover:brightness-105"
                    >
                        <HandHeart className="size-4" />
                        Faire un don
                    </a>
                </header>

                {/* Hero */}
                <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-8 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-16">
                    <span className="absolute top-10 left-2 size-4 rounded-full bg-eleeo-orange" />
                    <span className="absolute top-24 right-1/2 hidden size-2.5 rounded-full bg-eleeo-teal lg:block" />
                    <span className="absolute bottom-16 left-1/3 size-3 rounded-full bg-eleeo-navy" />

                    <div className="relative">
                        <Reveal delay={heroDelay}>
                            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-eleeo-orange uppercase shadow-sm">
                                Œuvre caritative
                                {daysLeft > 0 && (
                                    <span className="text-neutral-500">
                                        · J-{daysLeft}
                                    </span>
                                )}
                            </p>
                            <h1 className="font-serif text-4xl leading-[1.1] font-semibold sm:text-5xl">
                                Un geste d’amour pour tous ceux qui sont dans le
                                besoin
                            </h1>
                        </Reveal>
                        <Reveal delay={heroDelay + 150}>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600">
                                Le {formattedDate}, à {event.location}, nous
                                allons à la rencontre des enfants vulnérables,
                                des orphelins, des familles démunies et de toute
                                personne dans le besoin, avec des repas, des
                                vêtements et des sourires. Chaque contribution,
                                petite ou grande, compte.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <a
                                    href="#don"
                                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
                                >
                                    <HandHeart className="size-4" />
                                    Je donne
                                </a>
                                <a
                                    href="#evenement"
                                    className="inline-flex items-center rounded-full bg-eleeo-teal px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                                >
                                    L’événement
                                </a>
                            </div>
                        </Reveal>
                        <Reveal delay={heroDelay + 300}>
                            <blockquote className="mt-10 border-l-4 border-eleeo-orange pl-4 font-serif text-lg text-neutral-700 italic">
                                « Heureux les miséricordieux, car ils
                                obtiendront miséricorde. »
                                <span className="mt-1 block font-sans text-xs tracking-[0.3em] text-neutral-500 uppercase not-italic">
                                    Matthieu 5:7
                                </span>
                            </blockquote>
                        </Reveal>
                    </div>

                    {/* Collage en pilules inspiré du modèle */}
                    <Reveal delay={heroDelay + 200}>
                        <div className="relative mx-auto aspect-square w-full max-w-md">
                            <span className="absolute -top-4 right-0 h-28 w-14 rotate-[35deg] rounded-full bg-eleeo-yellow/80" />
                            <div className="absolute inset-0 flex -rotate-[35deg] items-center justify-center gap-4">
                                {[
                                    {
                                        src: '/images/enfants-groupe.jpg',
                                        height: 'h-[70%]',
                                    },
                                    {
                                        src: '/images/enfants-joie.jpg',
                                        height: 'h-[95%]',
                                    },
                                    {
                                        src: '/images/enfants-portrait.jpg',
                                        height: 'h-[70%]',
                                    },
                                ].map((pill) => (
                                    <div
                                        key={pill.src}
                                        className={`relative w-[28%] ${pill.height} overflow-hidden rounded-full bg-neutral-200 shadow-xl`}
                                    >
                                        <img
                                            src={pill.src}
                                            alt=""
                                            className="absolute top-1/2 left-1/2 h-[140%] w-[300%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-[35deg] object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Infos événement */}
                <section
                    id="evenement"
                    className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
                >
                    {[
                        {
                            icon: CalendarDays,
                            label: 'Date',
                            value: formattedDate,
                            color: 'bg-eleeo-orange',
                        },
                        {
                            icon: MapPin,
                            label: 'Lieu',
                            value: event.location,
                            color: 'bg-eleeo-navy',
                        },
                        {
                            icon: Phone,
                            label: 'Infoline',
                            value: event.infoline[0],
                            color: 'bg-eleeo-teal',
                        },
                    ].map((item, index) => (
                        <Reveal
                            key={item.label}
                            delay={index * 120}
                            className="sm:last:col-span-2 lg:last:col-span-1"
                        >
                            <div className="flex h-full items-center gap-4 rounded-3xl bg-white p-5 shadow-sm sm:p-6">
                                <span
                                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-white ${item.color}`}
                                >
                                    <item.icon className="size-5" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                                        {item.label}
                                    </p>
                                    <p className="font-serif text-lg font-semibold">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </section>

                {/* Carte */}
                <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
                    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
                        <div className="max-w-xl">
                            <p className="text-xs font-semibold tracking-wide text-eleeo-orange uppercase">
                                Nous trouver
                            </p>
                            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                                Rendez-vous à {event.location}
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={mapDirectionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-eleeo-navy px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                            >
                                <MapPin className="size-4" />
                                Itinéraire
                            </a>
                            <a
                                href={yangoRideUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff0000]/25 transition hover:bg-[#e00000]"
                            >
                                <CarTaxiFront className="size-4" />
                                Y aller en Yango
                            </a>
                        </div>
                    </Reveal>
                    <Reveal>
                        <div className="overflow-hidden rounded-3xl bg-neutral-200 shadow-sm">
                            <iframe
                                src={mapEmbedUrl}
                                title={`Carte : ${event.location}`}
                                className="block h-80 w-full border-0 sm:h-112"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </div>
                    </Reveal>
                </section>

                {/* Galerie */}
                <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
                    <Reveal className="mb-10 max-w-xl">
                        <p className="text-xs font-semibold tracking-wide text-eleeo-orange uppercase">
                            Pour eux
                        </p>
                        <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                            Derrière chaque don, un visage
                        </h2>
                        <p className="mt-3 text-neutral-600">
                            Un repas chaud, un vêtement propre, un moment de
                            joie partagé : c’est ce que votre générosité apporte
                            aux enfants, aux orphelins, aux familles et à chaque
                            personne dans le besoin.
                        </p>
                    </Reveal>

                    <div className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:gap-4 md:h-[34rem] md:auto-rows-auto md:grid-cols-4 md:grid-rows-2">
                        {[
                            {
                                src: '/images/enfant-pain.jpg',
                                alt: 'Une fillette souriante tient des baguettes de pain',
                                caption: 'Nourrir',
                                className: 'row-span-2',
                            },
                            {
                                src: '/images/enfants-joie.jpg',
                                alt: 'Un groupe d’enfants joyeux salue la caméra',
                                caption: 'Rassembler',
                                className: 'md:col-span-2',
                            },
                            {
                                src: '/images/enfant-pensif.jpg',
                                alt: 'Portrait d’un enfant pensif',
                                className: 'row-span-2 md:col-start-4',
                            },
                            {
                                src: '/images/enfant-repas.jpg',
                                alt: 'Un garçon reçoit un repas',
                                caption: 'Partager',
                            },
                            {
                                src: '/images/enfants-groupe.jpg',
                                alt: 'Des enfants souriants font des signes de la main',
                                className: 'col-span-2 md:col-span-1',
                            },
                        ].map((photo, index) => (
                            <Reveal
                                key={photo.src}
                                delay={index * 100}
                                className={photo.className}
                            >
                                <figure className="group relative size-full overflow-hidden rounded-3xl bg-neutral-200">
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        loading="lazy"
                                        className="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
                                    />
                                    {photo.caption && (
                                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 font-serif text-lg font-semibold text-white">
                                            {photo.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* Faire un don */}
                <section
                    id="don"
                    className="mx-auto max-w-6xl scroll-mt-6 px-4 pb-24 sm:px-6"
                >
                    <Reveal className="mb-10 max-w-xl">
                        <p className="text-xs font-semibold tracking-wide text-eleeo-orange uppercase">
                            Comment donner
                        </p>
                        <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                            En deux minutes, depuis votre téléphone
                        </h2>
                    </Reveal>

                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <Reveal delay={150}>
                            <div className="rounded-3xl bg-gradient-to-br from-eleeo-navy to-eleeo-teal p-6 text-white shadow-xl">
                                <p className="text-sm text-white/80">
                                    Numéro de contribution
                                </p>
                                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                                    <a
                                        href={`tel:${event.contributionNumber.replace(/\s/g, '')}`}
                                        className="text-2xl font-bold tracking-wide whitespace-nowrap min-[380px]:text-3xl sm:text-4xl"
                                    >
                                        {event.contributionNumber}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={copyNumber}
                                        className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium transition hover:bg-white/25"
                                    >
                                        <Copy className="size-4" />
                                        Copier
                                    </button>
                                </div>
                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    <a
                                        href={paymentLinks.wave}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1dc3f0] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:brightness-105 active:scale-[0.99]"
                                    >
                                        <img
                                            src="/images/wave-logo.svg"
                                            alt=""
                                            className="size-10 rounded-full bg-white object-cover ring-2 ring-white/40"
                                        />
                                        Payer avec Wave
                                    </a>
                                    <a
                                        href={paymentLinks.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:brightness-105 active:scale-[0.99]"
                                    >
                                        <img
                                            src="/images/whatsapp-logo.svg"
                                            alt=""
                                            className="size-5 shrink-0"
                                        />
                                        Autres moyens via WhatsApp
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        <div className="space-y-5">
                            {[
                                'Payez avec Wave, ou écrivez-nous sur WhatsApp pour Orange Money.',
                                `Le ${formattedDate}, votre don devient repas et sourires pour ceux qui en ont besoin.`,
                            ].map((step, index) => (
                                <Reveal key={step} delay={250 + index * 120}>
                                    <div className="flex gap-4">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                                            {index + 1}
                                        </span>
                                        <p className="pt-1 text-neutral-700">
                                            {step}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pied de page */}
                <footer className="bg-neutral-900 text-neutral-300">
                    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div className="flex items-center gap-4">
                            <img
                                src="/images/k2s-logo.jpg"
                                alt="Kaide Smart Services"
                                className="h-10 w-auto rounded-md bg-white px-2 py-1"
                            />
                            <p className="text-sm">
                                Organisé par Kaide Smart Services
                            </p>
                        </div>
                        <div className="text-sm">
                            <p className="mb-1 font-semibold text-white">
                                Infoline
                            </p>
                            <p className="flex flex-wrap gap-x-4 gap-y-1">
                                {event.infoline.map((number) => (
                                    <a
                                        key={number}
                                        href={`tel:${number.replace(/\s/g, '')}`}
                                        className="hover:text-eleeo-yellow"
                                    >
                                        {number}
                                    </a>
                                ))}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
