import { Head } from '@inertiajs/react';
import { index as donationsIndex } from '@/routes/donations';

type Donation = {
    id: number;
    donorName: string;
    phone: string;
    amount: number;
    paymentMethod: string;
    message: string | null;
    createdAt: string | null;
};

type Props = {
    donations: Donation[];
    total: number;
};

const formatAmount = (amount: number) =>
    `${new Intl.NumberFormat('fr-FR').format(amount)} FCFA`;

export default function DonationsIndex({ donations, total }: Props) {
    return (
        <>
            <Head title="Dons" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-sidebar-border/70 p-5 dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Total déclaré
                        </p>
                        <p className="mt-1 text-2xl font-semibold">
                            {formatAmount(total)}
                        </p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-5 dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Nombre de dons
                        </p>
                        <p className="mt-1 text-2xl font-semibold">
                            {donations.length}
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Nom</th>
                                <th className="px-4 py-3 font-medium">
                                    Téléphone
                                </th>
                                <th className="px-4 py-3 text-right font-medium">
                                    Montant
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Paiement
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Message
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        Aucun don pour le moment.
                                    </td>
                                </tr>
                            )}
                            {donations.map((donation) => (
                                <tr
                                    key={donation.id}
                                    className="border-t border-sidebar-border/70 dark:border-sidebar-border"
                                >
                                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                                        {donation.createdAt &&
                                            new Date(
                                                donation.createdAt,
                                            ).toLocaleString('fr-FR', {
                                                dateStyle: 'short',
                                                timeStyle: 'short',
                                            })}
                                    </td>
                                    <td className="px-4 py-3 font-medium">
                                        {donation.donorName}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <a
                                            href={`tel:${donation.phone.replace(/\s/g, '')}`}
                                            className="hover:underline"
                                        >
                                            {donation.phone}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                        {formatAmount(donation.amount)}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {donation.paymentMethod}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {donation.message}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

DonationsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dons',
            href: props.currentTeam ? donationsIndex(props.currentTeam.slug) : '/',
        },
    ],
});
