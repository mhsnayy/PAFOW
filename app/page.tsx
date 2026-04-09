import { db } from '@/index'; // Kendi Drizzle bağlantı yolunu kontrol et
import { contacts, type Contact } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { ContactsTable } from '@/components/contacts-table'; // Table bileşenini import et

// Sayfanın her istekte yeniden render edilmesini ve en güncel veriyi çekmesini sağlar
export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
  let contactsData: Contact[] = [];
  let fetchError: string | null = null;

  try {
    // Veritabanı sorgusu doğrudan sunucuda çalışır. API route'a gerek yok.
    contactsData = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(50); // Şimdilik 50 kayıt ile sınırlandırıyoruz (Ölçeklenme önlemi)
  } catch (error) {
    // Konsol logu sadece sunucu terminalinde görünür, kullanıcıya sızmaz.
    console.error("Drizzle Fetch Error:", error);
    fetchError = "Veritabanına bağlanırken bir hata oluştu. Lütfen sistem yöneticisiyle iletişime geçin.";
  }

  return (
    <main className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Sayfa Başlığı ve Açıklaması */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Gelen Kutusu
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Sistem üzerinden gönderilen tüm iletişim taleplerini, platform detaylarıyla birlikte buradan inceleyebilirsiniz.
          </p>
        </header>

        {/* Hata Yönetimi veya Tablo Render'ı */}
        {fetchError ? (
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Veri Çekme Hatası</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{fetchError}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ContactsTable contacts={contactsData} />
        )}

      </div>
    </main>
  );
}