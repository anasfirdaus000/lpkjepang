import { db } from './firebase-config.js';
import { collection, doc, setDoc } from 'firebase/firestore';

const migrationData = [
  {
    slug: 'magang',
    badge: 'Popular',
    title: { id: 'Program Magang', ja: '技能実習プログラム' },
    tagline: { id: 'Ginou Jisshusei', ja: '技能実習' },
    duration: '1 - 3 Tahun',
    level: 'N5 - N4',
    certificate: 'Sertifikat Magang (JITCO)',
    seats: 'Sesuai Kuota',
    description: { 
      id: 'Program pemagangan Teknis (Ginou Jisshusei) adalah program berlatih sambil bekerja. Program magang berlangsung selama 1 sampai 3 tahun tergantung perjanjian kontrak kerja dengan perusahaan yang memperkerjakan. Program ini tidak hanya menawarkan peluang pekerjaan, tetapi juga belajar sambil meningkatkan skil / keterampilan.', 
      ja: '技能実習制度（技能実習生）は、日本企業での実務を通じて学びながら働くプログラムです。最短1年から最長3年の契約となり、就労機会だけでなく、スキルアップや技術習得も目指せます。' 
    },
    features: [
      { id: 'Pria – Wanita', ja: '男性・女性' },
      { id: 'Usia 18 s/d 28 tahun', ja: '年齢18歳〜28歳' },
      { id: 'Pendidikan min SMA/K Sederajat', ja: '最終学歴：高校卒業以上' },
      { id: 'Sehat jasmani dan rohani', ja: '心身ともに健康であること' },
      { id: 'Belum pernah mengikuti program Magang sebelumnya', ja: '過去に技能実習プログラムに参加したことがないこと' }
    ],
    benefits: [
      { icon: 'payments', title: { id: 'Uang Saku', ja: '手当' }, desc: { id: 'Mendapat uang saku berkala dari perusahaan.', ja: '企業から定期的な手当が支給されます。' } },
      { icon: 'school', title: { id: 'Meningkatkan Skill', ja: 'スキルアップ' }, desc: { id: 'Belajar budaya kerja langsung dari praktek lapangan.', ja: '現場実習から直接仕事の文化を学びます。' } }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik mendaftar Program Magang.'
  },
  {
    slug: 'tokutei_ginou',
    badge: 'Flagship',
    title: { id: 'Program Tokutei Ginou (TG)', ja: '特定技能（TG）プログラム' },
    tagline: { id: 'Specified Skilled Worker (SSW)', ja: '特定技能' },
    duration: 'Sampai 5 Tahun',
    level: 'JFT Basic A2 / JLPT N4',
    certificate: 'Sertifikat SSW / Senmonkyu',
    seats: 'Sesuai Kuota',
    description: { 
      id: 'Program Tokutei Ginou (TG) atau disebut dengan Specified Skilled Worker (SSW) adalah program kerja ke Jepang untuk Orang Asing dengan Visa keahlian khusus guna memenuhi kebutuhan lowongan pekerjaan di Jepang yang semakin meningkat. Program TG berlangsung sejak tahun 2019 hingga sekarang. Pemegang Visa TG dapat bekerja di Jepang selama 5th. Saat ini ada 14 bidang pekerjaan yang terdaftar dan dapat mengajuan Visa TG 2 sehingga dapat bekerja di Jepang lebih dari 5th. Sertifikat Kemampuan Bahasa Jepang (JFT Basic A2 / JLPT N4) serta Sertifikat Keterampilan menjadi syarat wajib sebelum melamar.', 
      ja: '特定技能（TG/SSW）は、深刻化する人手不足に対応するため、特定の専門技能を持つ外国人に与えられる就労ビザです。2019年から開始され、最大5年間の就労が可能です。現在14職種が対象で、特定技能2号への移行により5年を超えた長期就労や家族の帯同も可能になります。JFT Basic A2またはJLPT N4の合格が必須条件です。' 
    },
    features: [
      { id: 'Pria – Wanita', ja: '男性・女性' },
      { id: 'Usia 18 s/d 35 tahun', ja: '年齢18歳〜35歳' },
      { id: 'Pendidikan SMA / K Sederajat', ja: '最終学歴：高校卒業以上' },
      { id: 'Sehat jasmani dan rohani', ja: '心身ともに健康であること' },
      { id: 'Sertifikat Senmonkyu / 3kyu (bagi eks Magang)', ja: '専門級・3級試験合格（技能実習修了者）' }
    ],
    benefits: [
      { icon: 'payments', title: { id: 'Gaji Karyawan', ja: '給与' }, desc: { id: 'Standar gaji sesuai pekerja di Jepang.', ja: '日本人の従業員と同等の給与水準です。' } },
      { icon: 'card_travel', title: { id: 'Perpanjangan', ja: '更新可能' }, desc: { id: 'Bisa berlanjut ke TG2.', ja: '特定技能2号への移行も可能です。' } }
    ],
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
      id: 'Visa Gijinkoku atau yang sering dikenal dengan Engineering adalah Program Kerja ke Jepang dengan keterampilan Profesional. Peserta diwajibkan Lulusan D3 / S1 dari universitas yang terdaftar resmi di DIKTI. Kemampuan Bahasa yang baik menjadi nilai plus untuk para pencari lowongan Gijingkoku / Engineering. Masa kerja Visa Gijinkoku adalah dapat diperpanjang setiap tahunnya selama perusahaan penerima dan pekerja masih bersedia.', 
      ja: '技術・人文知識・国際業務ビザ（技人国）は、専門的なスキルを持つ高度人材向けの就労ビザです。DIKTIに登録されている大学のD3またはS1の学位が必須です。高い日本語能力は採用において有利に働きます。契約が続く限り、毎年ビザの更新が可能です。' 
    },
    features: [
      { id: 'Pria – Wanita', ja: '男性・女性' },
      { id: 'Usia 21 – 40 tahun', ja: '年齢21歳〜40歳' },
      { id: 'Pendidikan Min D3 / S1 (Teknik diutamakan)', ja: 'D3/S1学位保持者（工業系学部優先）' },
      { id: 'Bahasa Jepang tingkat Mahir', ja: '上級レベルの日本語能力' },
      { id: 'Sehat Jasmani dan rohani', ja: '心身ともに健康であること' }
    ],
    benefits: [
      { icon: 'engineering', title: { id: 'Professional', ja: 'プロフェッショナル' }, desc: { id: 'Status Visa Pekerja Profesional.', ja: 'プロフェッショナルな就労ビザステータス。' } },
      { icon: 'work', title: { id: 'Dapat Diperpanjang', ja: '更新可能' }, desc: { id: 'Kontrak dapat selalu diperpanjang.', ja: '契約は常に更新可能です。' } }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya lulusan universitas dan tertarik Program Engineering (Gijinkoku).'
  },
  {
    slug: 'study',
    badge: 'Education',
    title: { id: 'Program Student / Study', ja: '留学プログラム' },
    tagline: { id: 'Ryugaku', ja: '留学' },
    duration: { id: 'Hingga Lulus', ja: '卒業まで' },
    level: { id: 'Pemula', ja: '初心者' },
    certificate: 'Sertifikat Lulus',
    seats: 'Terbuka',
    description: { 
      id: 'Program Student / Study atau 留学 Ryugaku adalah Program belajar di Jepang dengan Visa Student / Pelajar asing. Program ini sering dipilih bagi peserta yang berminat untuk mempersiapkan masuk Universitas di Jepang. Pemegang visa Study diizinkan untuk melakukan kerja paruh waktu Max 28 jam / minggu. Setelah dinyatakan LULUS peserta dapat memilih untuk masuk Universitas atau mengambil Visa Kerja di Jepang.', 
      ja: '留学（Ryugaku）ビザは、日本の日本語学校、専門学校、または大学で学ぶためのプログラムです。将来的に日本の大学進学を目指す方に最適です。留学ビザでは、生活費を補うために、週28時間以内のアルバイト（資格外活動）が認められています。卒業後は、進学または就労ビザへの切り替えが可能です。' 
    },
    features: [
      { id: 'Pria – Wanita', ja: '男性・女性' },
      { id: 'Usia 18 s/d 30 tahun', ja: '年齢18歳〜30歳' },
      { id: 'Pendidikan Min SMA/ K Sederajat', ja: '高校卒業以上' },
      { id: 'Ekonomi keluarga yang baik', ja: '安定した家庭内経済状況' },
      { id: 'Bersedia menyelesaikan studi', ja: '卒業まで学習を継続できること' }
    ],
    benefits: [
      { icon: 'schedule', title: { id: 'Kerja Paruh Waktu', ja: 'アルバイト' }, desc: { id: 'Diijinkan Arubaito max 28 jam / minggu.', ja: '週28時間までのアルバイトが許可されます。' } },
      { icon: 'school', title: { id: 'Lanjut Pendidikan', ja: '進学' }, desc: { id: 'Peluang lolos Universitas Daigaku Jepang.', ja: '日本の大学への進学チャンス。' } }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik Program Student (Ryugaku).'
  }
];

export async function runMigration(onProgress) {
  if (onProgress) onProgress('🚀 Memulai migrasi data program khusus...');
  const collName = 'programs_v2';
  
  for (const item of migrationData) {
    try {
      // We only update the dynamic fields to not overwrite images if they changed them in admin
      // But for this case, the user wants me to "masukan ulang", so I'll do a merge update
      await setDoc(doc(db, collName, item.slug), item, { merge: true });
      if (onProgress) onProgress(`\u2705 Program [${item.slug}] berhasil diperbarui.`);
    } catch (e) {
      if (onProgress) onProgress(`\u274C Error [${item.slug}]: ${e.message}`);
    }
  }
  
  if (onProgress) onProgress('\u2728 Migrasi data selesai!');
}
