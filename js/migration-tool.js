import { db } from './firebase-config.js';
import { collection, doc, setDoc } from 'firebase/firestore';

const migrationData = [
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
      id: 'Program Tokutei Ginou (TG) atau disebut dengan Specified Skilled Worker (SSW) adalah program kerja ke Jepang untuk Orang Asing dengan Visa keahlian khusus guna memenuhi kebutuhan lowongan pekerjaan di Jepang yang semakin meningkat. Program TG berlangsung sejak tahun 2019 hingga sekarang. Pemegang Visa TG dapat bekerja di Jepang selama 5th. Saat ini ada 14 bidang pekerjaan yang terdaftar dan dapat mengajuan Visa TG 2 sehingga dapat bekerja di Jepang lebih dari 5th.', 
      ja: '特定技能（TG/SSW）は、深刻化する人手不足に対応するため、特定の専門技能を持つ外国人に与えられる就労ビザです。2019年から開始され、最大5年間の就労が可能です。現在14職種が対象で、特定技能2号への移行により家族の帯同や長期就労も可能になります。' 
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
        { icon: 'family_restroom', title: '家族帯同の可能性', desc: '特定技能2号に進むことで家族の帯同も可能になります。' }
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
      id: 'Visa Gijinkoku atau yang sering dikenal dengan Engineering adalah Program Kerja ke Jepang dengan keterampilan Profesional. Peserta diwajibkan Lulusan D3 / S1 dari universitas yang terdaftar resmi di DIKTI. Kemampuan Bahasa yang baik menjadi nilai plus untuk para pencari lowongan Gijingkoku / Engineering. Masa kerja Visa Gijinkoku adalah dapat dapat diperpanjang setiap tahunnya selama perusahaan penerima dan pekerja masih bersedia.', 
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
        { icon: 'engineering', title: 'Karir Professional', desc: 'Bekerja sesuai dengan bidang keahlian akademik.' },
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
      id: 'Program Student / Study atau 留学 Ryugaku adalah Program belajar di Jepang dengan Visa Student / Pelajar asing. Program ini sering diplih bagi peserta yang berminat untuk mempersiapkan masuk Universitas di Jepang. Pemegang visa Study diijinkan untuk melakukan kerja paruh waktu untuk memenuhi kebutuhan sehati hari dengan ketentuan Max 28jam / minnggu. Setelah dinyatakan LULUS peserta dapat memilih untuk masuk Universitas atau mengambil Visa Kerja di Jepang.', 
      ja: '留学（Ryugaku）ビザは、日本の日本語学校、専門学校、または大学で学ぶためのプログラムです。将来的に日本の大学進学を目指す方に最適です。留学ビザでは、生活費を補うために、週28時間以内のアルバイト（資格外活動）が認められています。卒業後は、進学または就労ビザへの切り替えが可能です。' 
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

export async function runMigration(onProgress) {
  if (onProgress) onProgress('🚀 Memulai migrasi data program (4 Program Utama)...');
  const collName = 'programs_v2';
  
  for (const item of migrationData) {
    try {
      await setDoc(doc(db, collName, item.slug), item, { merge: true });
      if (onProgress) onProgress(`✅ Program [${item.slug}] berhasil diperbarui.`);
    } catch (e) {
      if (onProgress) onProgress(`❌ Error [${item.slug}]: ${e.message}`);
    }
  }
  
  if (onProgress) onProgress('✨ Migrasi 4 program selesai!');
}
