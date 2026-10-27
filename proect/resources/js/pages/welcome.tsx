import { Form, Head } from '@inertiajs/react';
import {
    Banknote,
    CalendarDays,
    CarTaxiFront,
    Check,
    Copy,
    HandHeart,
    MapPin,
    Phone,
    ShieldCheck,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { store } from '@/actions/App/Http/Controllers/DonationController';
import InputError from '@/components/input-error';
import Reveal from '@/components/reveal';
import { cn } from '@/lib/utils';

type Props = {
    event: {
        date: string;
        location: string;
        contributionNumber: string;
        infoline: string[];
    };
    paymentMethods: { value: string; label: string }[];
};

const quickAmounts = [1000, 2000, 5000, 10000, 25000, 50000];

// Laisse le temps à l'écran de chargement de disparaître.
const heroDelay = 700;

const paymentStyles: Record<string, { badge: string; className: string }> = {
    orange_money: { badge: 'OM', className: 'bg-[#ff7900] text-white' },
    wave: { badge: 'W', className: 'bg-[#1dc3f0] text-white' },
};

const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114522.9344883304!2d-4.234165602734371!3d5.433116299999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1bf0054782ae5%3A0xdae35d7ce113f8bf!2sMarch%C3%A9%20Contenaires%20de%20N'Dotr%C3%A9!5e1!3m2!1sfr!2sci!4v1793094030438!5m2!1sfr!2sci";

const mapDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=March%C3%A9%20Contenaires%20de%20N'Dotr%C3%A9";

// Ouvre Yango avec le lieu de l'événement comme destination.
const yangoRideUrl =
    'https://yango.com/adj/yango?end-lon=-4.08343&end-lat=5.43298';

const formatAmount = (amount: number) =>
    new Intl.NumberFormat('fr-FR').format(amount);

const fieldClass =
    'w-full rounded-2xl border border-neutral-200 bg-neutral-50/60 py-3.5 pr-4 pl-11 text-base text-neutral-900 sm:text-sm outline-none transition placeholder:text-neutral-400 focus:border-eleeo-teal focus:bg-white focus:ring-4 focus:ring-eleeo-teal/10';

const labelClass = 'mb-2 block text-sm font-medium text-neutral-800';

export default function Welcome({ event, paymentMethods }: Props) {
    const [amount, setAmount] = useState('');

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
                                Un geste d’amour pour les enfants dans le besoin
                            </h1>
                        </Reveal>
                        <Reveal delay={heroDelay + 150}>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600">
                                Le {formattedDate}, nous allons à la rencontre
                                des enfants de {event.location} avec des repas,
                                des vêtements et des sourires. Chaque
                                contribution, petite ou grande, compte.
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
                                <span className="mt-1 block font-sans text-xs tracking-[0.3em] text-neutral-500 not-italic uppercase">
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
                            joie partagé : c’est ce que votre générosité
                            apporte à ces enfants.
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
                    className="mx-auto grid max-w-6xl scroll-mt-6 items-start gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_1.15fr]"
                >
                    <div>
                        <Reveal>
                            <p className="text-xs font-semibold tracking-wide text-eleeo-orange uppercase">
                                Comment donner
                            </p>
                            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                                En deux minutes, depuis votre téléphone
                            </h2>
                        </Reveal>

                        <Reveal delay={150}>
                            <div className="mt-8 rounded-3xl bg-gradient-to-br from-eleeo-navy to-eleeo-teal p-6 text-white shadow-xl">
                                <p className="text-sm text-white/80">
                                    Numéro pour contribution · Orange Money &
                                    Wave
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
                            </div>
                        </Reveal>

                        <div className="mt-8 space-y-5">
                            {[
                                'Envoyez votre contribution par Orange Money ou Wave au numéro ci-dessus.',
                                'Remplissez le formulaire pour que l’équipe puisse vous remercier.',
                                `Le ${formattedDate}, votre don devient repas et sourires à ${event.location}.`,
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

                    {/* Formulaire (sans animation d'apparition) */}
                    <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-neutral-300/40 ring-1 ring-neutral-100">
                        <div className="h-1.5 bg-gradient-to-r from-eleeo-orange via-eleeo-yellow to-eleeo-teal" />
                        <div className="p-5 sm:p-9">
                            <div className="flex items-start gap-4">
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-eleeo-orange/10 text-eleeo-orange">
                                    <HandHeart className="size-6" />
                                </span>
                                <div>
                                    <h3 className="font-serif text-2xl font-semibold">
                                        J’ai fait un don
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-500">
                                        Signalez votre contribution, l’équipe
                                        vous recontactera pour vous remercier.
                                    </p>
                                </div>
                            </div>

                            <Form
                                {...store.form()}
                                resetOnSuccess
                                onSuccess={() => setAmount('')}
                                className="mt-8 space-y-6"
                            >
                                {({ errors, processing }) => (
                                    <>
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="donor_name"
                                                    className={labelClass}
                                                >
                                                    Nom complet
                                                </label>
                                                <div className="relative">
                                                    <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
                                                    <input
                                                        id="donor_name"
                                                        name="donor_name"
                                                        required
                                                        autoComplete="name"
                                                        className={fieldClass}
                                                        placeholder="Ex. Morel Effobi"
                                                    />
                                                </div>
                                                <InputError
                                                    message={errors.donor_name}
                                                    className="mt-1.5"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className={labelClass}
                                                >
                                                    Téléphone
                                                </label>
                                                <div className="relative">
                                                    <Phone className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        required
                                                        autoComplete="tel"
                                                        className={fieldClass}
                                                        placeholder="07 00 00 00 00"
                                                    />
                                                </div>
                                                <InputError
                                                    message={errors.phone}
                                                    className="mt-1.5"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="amount"
                                                className={labelClass}
                                            >
                                                Montant envoyé
                                            </label>
                                            <div className="mb-3 grid grid-cols-3 gap-2">
                                                {quickAmounts.map((value) => {
                                                    const selected =
                                                        amount ===
                                                        String(value);

                                                    return (
                                                        <button
                                                            key={value}
                                                            type="button"
                                                            onClick={() =>
                                                                setAmount(
                                                                    String(
                                                                        value,
                                                                    ),
                                                                )
                                                            }
                                                            aria-pressed={
                                                                selected
                                                            }
                                                            className={`rounded-2xl border py-3 text-sm font-semibold transition ${
                                                                selected
                                                                    ? 'border-eleeo-orange bg-eleeo-orange text-white shadow-md shadow-eleeo-orange/25'
                                                                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-eleeo-orange/60 hover:text-eleeo-orange'
                                                            }`}
                                                        >
                                                            {formatAmount(
                                                                value,
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <div className="relative">
                                                <Banknote className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
                                                <input
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    inputMode="numeric"
                                                    min={100}
                                                    required
                                                    value={amount}
                                                    onChange={(e) =>
                                                        setAmount(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={`${fieldClass} pr-16`}
                                                    placeholder="Autre montant"
                                                />
                                                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                                                    FCFA
                                                </span>
                                            </div>
                                            <InputError
                                                message={errors.amount}
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <fieldset>
                                            <legend className={labelClass}>
                                                Moyen de paiement
                                            </legend>
                                            <div className="grid gap-2 sm:grid-cols-3">
                                                {paymentMethods.map(
                                                    (method) => {
                                                        const style =
                                                            paymentStyles[
                                                                method.value
                                                            ];

                                                        return (
                                                            <label
                                                                key={
                                                                    method.value
                                                                }
                                                                className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-neutral-200 p-3 text-sm font-medium transition hover:border-eleeo-teal/60 has-checked:border-eleeo-teal has-checked:bg-eleeo-teal/5 has-focus-visible:ring-4 has-focus-visible:ring-eleeo-teal/10"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment_method"
                                                                    value={
                                                                        method.value
                                                                    }
                                                                    required
                                                                    className="peer sr-only"
                                                                />
                                                                <span
                                                                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                                                                        style?.className ??
                                                                        'bg-neutral-100 text-neutral-600'
                                                                    }`}
                                                                >
                                                                    {style?.badge ?? (
                                                                        <Banknote className="size-4" />
                                                                    )}
                                                                </span>
                                                                <span className="leading-tight">
                                                                    {
                                                                        method.label
                                                                    }
                                                                </span>
                                                                <Check className="absolute top-2 right-2 size-3.5 text-eleeo-teal opacity-0 transition peer-checked:opacity-100" />
                                                            </label>
                                                        );
                                                    },
                                                )}
                                            </div>
                                            <InputError
                                                message={errors.payment_method}
                                                className="mt-1.5"
                                            />
                                        </fieldset>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className={labelClass}
                                            >
                                                Un mot pour les enfants{' '}
                                                <span className="font-normal text-neutral-400">
                                                    (facultatif)
                                                </span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={3}
                                                className={cn(
                                                    fieldClass,
                                                    'resize-none pl-4',
                                                )}
                                                placeholder="Votre message d’encouragement…"
                                            />
                                            <InputError
                                                message={errors.message}
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-eleeo-orange to-eleeo-yellow py-4 text-sm font-semibold text-white shadow-lg shadow-eleeo-orange/25 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
                                        >
                                            <HandHeart className="size-4" />
                                            {processing
                                                ? 'Envoi…'
                                                : 'Confirmer mon don'}
                                        </button>

                                        <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-500">
                                            <ShieldCheck className="size-3.5" />
                                            Vos informations restent privées et
                                            ne servent qu’aux organisateurs.
                                        </p>
                                    </>
                                )}
                            </Form>
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
