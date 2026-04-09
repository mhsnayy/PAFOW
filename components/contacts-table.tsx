import { Contact } from "@/db/schema";

interface ContactsTableProps {
    contacts: Contact[];
}

export function ContactsTable({ contacts }: ContactsTableProps) {
    // Edge Case: Veri gelmemesi veya boş dizi gelmesi durumu
    if (!contacts || contacts.length === 0) {
        return (
            <div className="w-full p-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
                <p className="text-lg font-medium">Kayıt Bulunamadı</p>
                <p className="text-sm mt-1">Henüz veritabanında listelenecek bir iletişim talebi yok.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Ad Soyad</th>
                            <th className="px-6 py-4 font-semibold">İletişim</th>
                            <th className="px-6 py-4 font-semibold">Platform</th>
                            <th className="px-6 py-4 font-semibold hidden md:table-cell">Mesaj</th>
                            <th className="px-6 py-4 font-semibold text-right">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {contact.fullName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-1">
                                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                            {contact.email}
                                        </a>
                                        <a href={`tel:${contact.phone}`} className="text-xs text-gray-500 hover:text-gray-700">
                                            {contact.phone}
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {contact.platform ? (
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                            {contact.platform}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 italic">Belirtilmemiş</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell max-w-xs">
                                    {/* Uzun mesajları keserek tablo düzenini koruyoruz */}
                                    <p className="truncate text-gray-600" title={contact.message ?? ""}>
                                        {contact.message || <span className="text-gray-400 italic">Mesaj yok</span>}
                                    </p>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap text-gray-500">
                                    {new Date(contact.createdAt).toLocaleDateString('tr-TR', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}