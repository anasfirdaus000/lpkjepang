import { db } from './firebase-config.js';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

const programMigrationData = [
  {
    slug: 'magang',
    badge: 'Popular',
    title: { id: 'Program Magang', ja: '技能実習プログラム' },
    tagline: { id: 'Ginou Jisshusei', ja: '技能実習' },
    duration: { id: '1 - 3 Tahun', ja: '1〜3年' },
    level: { id: 'N5 - N4', ja: 'N5〜N4' },
    certificate: 'Sertifikat Magang (JITCO)',
    seats: 'Sesuai Kuota',
    description: { 
      id: 'Program pemagangan Teknis (Ginou Jisshusei) adalah program berlatih sambil bekerja. Program magang berlangsung selama 1 sampai 3 tahun tergantung perjanjian kontrak kerja dengan perusahaan yang memperkerjakan. Program ini tidak hanya menawarkan peluang pekerjaan, tetapi juga belajar sambil meningkatkan skil / keterampilan.', 
      ja: '技能実習制度（技能実習生）は、日本企業での実務を通じて学びながら働くプログラムです。最短1年から最長3年の契約となり、就労機会だけでなく、スキルアップや技術習得も目指せます。' 
    },
    features: {
      id: ['Program berlatih sambil bekerja', 'Kontrak 1 - 3 Tahun', 'Meningkatkan skil & keterampilan'],
      ja: ['実務を通じた学習プログラム', '1〜3年の契約期間', 'スキルと技能の向上']
    },
    requirements: {
      id: ['Pria – Wanita', 'Usia 18 s/d 28 tahun', 'Pendidikan min SMA/K Sederajat', 'Sehat jasmani dan rohani', 'Belum pernah mengikuti program Magang Jepang sebelumnya'],
      ja: ['男性・女性', '年齢18歳〜28歳', '最終学歴：高校卒業以上', '心身ともに健康であること', '過去に日本の技能実習プログラムに参加したことがないこと']
    },
    curriculum: {
      id: ['Pelatihan Dasar Bahasa Jepang', 'Pembekalan Budaya & Etika Kerja', 'Persiapan Fisik & Mental'],
      ja: ['基礎日本語研修', '日本文化と労働倫理の研修', '体力およびメンタル面の準備']
    },
    benefits: {
      id: [
        { icon: 'payments', title: 'Uang Saku', desc: 'Mendapat uang saku berkala dari perusahaan.' },
        { icon: 'school', title: 'Sertifikasi', desc: 'Mendapat sertifikat keahlian resmi setelah selesai.' }
      ],
      ja: [
        { icon: 'payments', title: '手当', desc: '企業から定期的な手当が支給されます。' },
        { icon: 'school', title: '認定書', desc: '修了後に公式な技能認定書が授与されます。' }
      ]
    },
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik mendaftar Program Magang.'
  },
  {
    slug: 'tokutei_ginou',
    badge: 'Flagship',
    title: { id: 'Program Tokutei Ginou (TG)', ja: '特定技能（TG）プログラム' },
    tagline: { id: 'Specified Skilled Worker (SSW)', ja: '特定技能' },
    duration: { id: 'Hingga 5 Tahun', ja: '最大5年間' },
    level: { id: 'JFT Basic A2 / JLPT N4', ja: 'JFT A2 / JLPT N4' },
    certificate: 'Sertifikat SSW / Senmonkyu',
    seats: 'Sesuai Kuota',
    description: { 
      id: 'Program Tokutei Ginou (TG) atau disebut with Specified Skilled Worker (SSW) adalah program kerja ke Jepang untuk Orang Asing with Visa keahlian khusus guna memenuhi kebutuhan lowongan pekerjaan di Jepang yang semakin meningkat. Program TG berlangsung sejak tahun 2019 hingga sekarang. Pemegang Visa TG dapat bekerja di Jepang selama 5th. Saat ini ada 14 bidang pekerjaan yang terdaftar dan dapat mengajuan Visa TG 2 sehingga dapat bekerja di Jepang lebih dari 5th.', 
      ja: '特定技能（TG/SSW）は、深刻化する人手不足に対応するため、特定の専門技能を持つ外国人に与えられる就労ビザです。2019年から開始され、最大5年間の就労が可能です。現在14職種が対象で、特定技能2号への移行により家族の帯同や長期就労 juga可能になります。' 
    },
    features: {
      id: ['Visa Keahlian Khusus', 'Berlaku mulai th 2019', 'Tersedia 14 bidang pekerjaan', 'Dapat lanjut ke Visa TG 2'],
      ja: ['特定技能ビザの取得', '2019年スタートの制度', '現在14の職種が対象', '特定技能2号への移行可能']
    },
    requirements: {
      id: ['Pria – Wanita', 'Usia 18 s/d 35 tahun', 'Pendidikan SMA / K Sederajat', 'Sehat jasmani dan rohani', 'Sertifikat Kemampuan Bahasa (JFT Basic A2 / JLPT N4)', 'Sertifikat Keterampilan Khusus', 'Sertifikat Senmonkyu / 3kyu (bagi eks Magang)'],
      ja: ['男性・女性', '年齢18歳〜35歳', '高校卒業以上', '心身ともに健康であること', '日本語能力証明（JFT A2 または JLPT N4）', '特定技能評価試験の合格証', '実習3級または随時3級（技能実習修了者の場合）']
    },
    curriculum: {
      id: ['Pemantapan Bahasa Jepang Kerja', 'Latihan Soal Skill Test Sektor', 'Pendampingan Matching Perusahaan'],
      ja: ['就労のための日本語強化', '各職種別技能試験対策', '企業とのマッチング支援']
    },
    benefits: {
      id: [
        { icon: 'payments', title: 'Gaji Standar Jepang', desc: 'Mendapat gaji setara dengan pekerja lokal Jepang.' },
        { icon: 'family_restroom', title: 'TG 2 Support', desc: 'Peluang membawa keluarga di masa depan via TG 2.' }
      ],
      ja: [
        { icon: 'payments', title: '日本人と同等の給与', desc: '日本人の従業員と同等の給与水準です。' },
        { icon: 'family_restroom', title: '家族帯同の可能性', desc: '特定技能2号に進むことで家族の帯同 juga可能になります。' }
      ]
    },
    whatsappText: 'Halo Fujisaki Gakuin, saya ingin mendaftar Program Tokutei Ginou.'
  },
  {
    slug: 'engineering',
    badge: 'Specialized',
    title: { id: 'Program Engineering / Gijinkoku', ja: '技術・人文知識・国際業務' },
    tagline: { id: 'Keterampilan Profesional', ja: 'プロフェッショナル' },
    duration: { id: 'Dapat Diperpanjang', ja: '更新可能' },
    level: { id: 'Mahir (N3/N2)', ja: '上級 (N3/N2)' },
    certificate: 'D3 / S1 Resmi DIKTI',
    seats: 'Sesuai Lowongan',
    description: { 
      id: 'Visa Gijinkoku atau yang sering dikenal with Engineering adalah Program Kerja ke Jepang with keterampilan Profesional. Peserta diwajibkan Lulusan D3 / S1 dari universitas yang terdaftar resmi di DIKTI. Kemampuan Bahasa yang baik menjadi nilai plus untuk para pencari lowongan Gijingkoku / Engineering. Masa kerja Visa Gijinkoku adalah dapat dapat diperpanjang setiap tahunnya selama perusahaan penerima dan pekerja masih bersedia.', 
      ja: '技術・人文知識・国際業務ビザ（技人国）は、専門的なスキルを持つ高度人材向けの就労ビザです。DIKTIに登録されている大学のD3またはS1の学位が必須です。高い日本語能力は採用において有利に働きます。契約が続く限り、毎年ビザの更新が可能です。' 
    },
    features: {
      id: ['Program Kerja Keterampilan Profesional', 'Berbasis Ijazah D3 / S1', 'Visa dapat diperpanjang setiap tahun'],
      ja: ['プロフェッショナルな専門職就労', 'D3/S1学位をベースとした採用', 'ビザの毎年更新が可能']
    },
    requirements: {
      id: ['Pria – Wanita', 'Usia 21 – 40 tahun', 'Pendidikan Min Lulusan D3 / S1 (Teknik diutamakan)', 'Keterampilan Bahasa Jepang tingkat Mahir', 'Sehat Jasmani dan rohani'],
      ja: ['男性・女性', '年齢21歳〜40歳', 'D3/S1学位保持者（工業系学部優先）', '上級レベルの日本語能力', '心身ともに健康であること']
    },
    curriculum: {
      id: ['Pelatihan Business Japanese', 'Persiapan Interview Profesional', 'Kajian Budaya Kerja Perusahaan Jepang'],
      ja: ['ビジネス日本語研修', '専門職面接対策', '日本企業の労働文化研究']
    },
    benefits: {
      id: [
        { icon: 'engineering', title: 'Karir Professional', desc: 'Bekerja sesuai with bidang keahlian akademik.' },
        { icon: 'trending_up', title: 'Jenjang Karir', desc: 'Peluang promosi dan kenaikan gaji periodik.' }
      ],
      ja: [
        { icon: 'engineering', title: '専門的なキャリア', desc: '自分の専門分野を活かした仕事に従事できます。' },
        { icon: 'trending_up', title: 'キャリアパス', desc: '定期的な昇給や昇進のチャンスがあります。' }
      ]
    },
    whatsappText: 'Halo Fujisaki Gakuin, saya lulusan universitas dan tertarik Program Engineering (Gijinkoku).'
  },
  {
    slug: 'study',
    badge: 'Education',
    title: { id: 'Program Student / Study', ja: '留学プログラム' },
    tagline: { id: 'Ryugaku', ja: '留学' },
    duration: { id: 'Hingga Lulus', ja: '卒業まで' },
    level: { id: 'Dasar / Pemula', ja: '基礎 / 初心者' },
    certificate: 'Sertifikat Lulus Language School',
    seats: 'Terbuka',
    description: { 
      id: 'Program Student / Study atau 留学 Ryugaku adalah Program belajar di Jepang with Visa Student / Pelajar asing. Program ini sering diplih bagi peserta yang berminat untuk mempersiapkan masuk Universitas di Jepang. Pemegang visa Study diijinkan untuk melakukan kerja paruh waktu untuk memenuhi kebutuhan sehati hari with ketentuan Max 28jam / minnggu. Setelah dinyatakan LULUS peserta dapat memilih untuk masuk Universitas atau mengambil Visa Kerja di Jepang.', 
      ja: '留学（Ryugaku）ビザは、日本の日本語学校、専門学校、または大学で学ぶためのプログラムです。将来的に日本の大学進学を目指す方に最適です。留学ビザでは、生活費を補うために、週28時間以内のアルバイト（資格外活動）が認められています。卒業後は、進学または就労ビザへの切り替え也可能です。' 
    },
    features: {
      id: ['Visa Student / Pelajar Asing', 'Izin kerja paruh waktu 28 jam/minggu', 'Persiapan masuk Universitas di Jepang'],
      ja: ['留学生用学生ビザの取得', '週28時間までのアルバイト許可', '日本の大学進学準備']
    },
    requirements: {
      id: ['Pria – Wanita', 'Usia 18 s/d 30 tahun', 'Pendidikan Min SMA/ K Sederajat', 'Memiliki perekonomian keluarga yang baik', 'Bersedia untuk menyelesaikan masa study hingga lulus'],
      ja: ['男性・女性', '年齢18歳〜30歳', '高校卒業以上', '安定した学費支弁能力があること', '卒業まで真面目に学習を継続できること']
    },
    curriculum: {
      id: ['Bahasa Jepang Akademik', 'Persiapan Ujian EJU / JLPT', 'Konsultasi Penjurusan Universitas'],
      ja: ['アカデミック日本語学習', 'EJU / JLPT 試験対策', '大学・専門学校進学ガイダンス']
    },
    benefits: {
      id: [
        { icon: 'school', title: 'Pendidikan Lanjutan', desc: 'Membuka jalan masuk ke Universitas terbaik di Jepang.' },
        { icon: 'work', title: 'Izin Arubaito', desc: 'Dapat bekerja paruh waktu untuk biaya hidup.' }
      ],
      ja: [
        { icon: 'school', title: '高等教育への道', desc: '日本の上位大学への進学に有利になります。' },
        { icon: 'work', title: 'アルバイト許可', desc: '生活費のための資格外活動が認められます。' }
      ]
    },
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik Program Student (Ryugaku).'
  }
];

const activityMigrationData = [
  {
    title: { id: 'Workshop Persiapan Wawancara Perusahaan Jepang', ja: '日本企業面接対策ワークショップ' },
    category: 'Event',
    dateRaw: '2026-04-12',
    date: '12 April 2026',
    summary: { id: 'Pelajari etika dan cara menjawab pertanyaan mensesu (wawancara) dengan lancar bersama sensei native.', ja: '日本人講師と一緒に、面接（面接）の答え方やマナーを学びましょう。' },
    content: {
      id: [
        'Workshop Persiapan Wawancara Perusahaan Jepang merupakan salah satu kegiatan rutin yang diselenggarakan oleh LPK Fujisaki Gakuin Center.',
        'Kegiatan ini bertujuan untuk mempersiapkan peserta pelatihan menghadapi proses wawancara kerja (mensesu) dengan perusahaan-perusahaan di Jepang.'
      ],
      ja: [
        '日本企業面接対策ワークショップは、LPK藤崎学院センターが定期的に開催している活動の一つです。',
        'この活動は、研修生が日本企業との採用面接（面接）に備えることを目的としています。'
      ]
    },
    highlights: {
      id: ['Praktek wawancara langsung with native speaker', 'Materi etika bisnis Jepang (Business Manner)'],
      ja: ['日本人ネイティブとの模擬面接', '日本のビジネスマナー研修']
    }
  },
  {
    title: { id: 'Pengenalan Budaya: Upacara Minum Teh di Kampus', ja: '文化紹介：キャンパスでの茶道体験' },
    category: 'Culture',
    dateRaw: '2026-04-08',
    date: '8 April 2026',
    summary: { id: "Mengenal lebih dalam filosofi 'Omotenashi' melalui praktek langsung Chado bersama instruktur tamu.", ja: '外部講師を招いた茶道の実践を通じて、「おもてなし」の心を学びます。' },
    content: {
      id: ['Sebagai bagian dari program pemahaman budaya Jepang, LPK Fujisaki Gakuin Center mengadakan sesi khusus pengenalan Upacara Minum Teh Jepang (Chado).'],
      ja: ['日本文化理解プログラムの一環として、LPK藤崎学院センターでは茶道体験セッションを開催しました。']
    },
    highlights: {
      id: ['Praktek langsung Upacara Minum Teh (Chado)', 'Bimbingan dari instruktur bersertifikasi'],
      ja: ['茶道の実践体験', '認定講師による指導']
    }
  }
];

export async function runMigration(onProgress) {
  if (onProgress) onProgress('🚀 Memulai migrasi data (Program & Kegiatan)...');

  // 1. Migrate Programs
  for (const item of programMigrationData) {
    try {
      const oldSnap = await getDoc(doc(db, 'programs_v2', item.slug));
      const finalItem = { ...item };
      if (oldSnap.exists() && oldSnap.data().heroImage?.includes('cloudinary')) {
        finalItem.heroImage = oldSnap.data().heroImage;
      }
      await setDoc(doc(db, 'programs_v2', item.slug), finalItem, { merge: true });
      if (onProgress) onProgress(`✅ Program [${item.slug}] berhasil diperbarui.`);
    } catch (e) {
      if (onProgress) onProgress(`❌ Error Program [${item.slug}]: ${e.message}`);
    }
  }

  // 2. Migrate Activities
  for (const item of activityMigrationData) {
    try {
      // Find by title.id to avoid duplicates if possible, or just add new
      // Since activities don't have slugs, let's just add them as new docs if they don't exist
      // Simplified: for this tool, we just add them
      await setDoc(doc(db, 'activities', item.title.id.replace(/\s+/g, '_').toLowerCase()), item, { merge: true });
      if (onProgress) onProgress(`✅ Kegiatan [${item.title.id.substring(0,20)}...] berhasil diperbarui.`);
    } catch (e) {
      if (onProgress) onProgress(`❌ Error Kegiatan: ${e.message}`);
    }
  }
  
  if (onProgress) onProgress('✨ Migrasi seluruh data selesai!');
}
