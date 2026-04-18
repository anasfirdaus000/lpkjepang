/* ================================================
   SEED DATA — Populate Firebase with initial content
   Run this once from admin dashboard to seed Firestore
   ================================================ */
import { db } from './firebase-config.js';
import {
  collection, doc, setDoc, addDoc, getDocs, deleteDoc
} from 'firebase/firestore';

// ====================================================
// ALL INITIAL DATA (BILINGUAL)
// ====================================================

const heroData = {
  badge: { id: 'Your Journey Starts Here', ja: 'あなたの旅が始まる' },
  title: { id: 'Wujudkan Karir ke Jepang Bersama Fujisaki Gakuin Center', ja: '藤崎学院センターで日本でのキャリアを実現しましょう' },
  highlight: { id: 'Jepang', ja: '日本' },
  subtitle: { id: 'Raih peluang karir di Jepang dengan program pelatihan bahasa dan persiapan kerja profesional. Kami mengkurasi masa depan Anda melalui filosofi Modern Ikigai.', ja: '日本語研修と専門的な就職準備プログラムで、日本でのキャリアチャンスを掴みましょう。モダン生きがいの哲学であなたの未来をサポートします。' },
  statNumber: '98%',
  statLabel: { id: 'Lulus Sertifikasi JLPT N3-N1', ja: 'JLPT N3-N1 合格率' },
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqtGwEyPQcbWyP4cqPTr1PUF0YVwRSH7Rht3rcwctA4q5xyriX1ffQ9IjNGZoTIZSk1nwE9aBXe7zbwCEQL6TuMIjniLdK-GloG271i4cBOGSkzZ-DAM-tPv_YtJ3gaQR0bzTY8mU3Q5L1Xvz_gHTZDuA24x04rsIfqF1QsR-058yvGJgUyJZoY84fuDR_493w_EpM1C8sEfKEg8D-oXFKewcCvsfq3TWC_vSovesVIzYTegJspOGzwwQTfMcLjc5TR2E0EXS2Bxs'
};

const contactData = {
  whatsapp: '6285858000088',
  whatsappText: { id: 'Halo Fujisaki Gakuin, saya tertarik untuk mendaftar', ja: 'こんにちは、藤崎学院です。入学に興味があります。' },
  address: { id: 'Jl. Modern Ikigai No. 8, Jakarta Selatan', ja: 'ジャカルタ南部、モダン生きがい通り8番' },
  phone: '0858-5800-0088',
  email: 'info@fujisakigakuin.id'
};

const aboutData = {
  desc1: {
    id: 'Adalah Lembaga pelatihan Bahasa Jepang yang Fokus Membimbing siswa/ peserta pelatihan dari Level dasar sampai Mahir agar siap untuk bekerja di Jepang. Tidak hanya membimbing siswa dengan kemampuan Bahasa Jepang, kami juga membekali siswa dengan keterampilan kerja, pengetahuan teknologi, budaya, dan etos kerja di Jepang.',
    ja: '当校は、日本語の習熟度に応じて、基礎から上級レベルまで学生を指導し、日本での就労に向けた準備を行う日本語学校です。日本語だけでなく、日本での仕事に必要なスキル、技術知識、文化、労働倫理も指導します。'
  },
  desc2: {
    id: 'Berdiri sejak th 2019 dengan kapasitas 300 siswa dan saat ini ada 1668 siswa yang saat ini ada di Jepang (tersebar di berbagai kota di Jepang). Melalui program Magang, Tokutei Ginou, Gijinkoku/ engineering & Study dengan berbagai bidang pekerjaan (Konstruksi, pertanian, peternakan, pengolahan makanan, building cleaning, manufaktur, dsb).',
    ja: '2019年に設立され、定員は300名です。現在、1,668名の学生が日本全国の様々な都市に在籍しています。技能実習、特定技能、技術・人文知識・国際業務、留学などのプログラムを通じて、建設、農業、畜産、食品加工、ビルクリーニング、製造業など様々な分野で活動しています。'
  },
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqT4o-bWl60eYd4g-kF-oWd7Hclz7u5uT90tWf_qYqE2pZ3t3OZyN5g2u7pD7D7Dk-x8C1H2nLq5eJp5zKkQZ3vXw5xT1cZ9U4tXjW-RZmX2K-S7E4tN5wZ9jT9HjX1K1R5U-XnC_5WU8WbIJPZShyNdXji9JeV8S91MFJCDHRKN1SrSL46kmEK33RgLpSPYaIInNfyz8qAkBS3829xKklrJBIHUDolgwgRxmUWDhV1VzDGq4'
};

const statsData = [
  { icon: 'school', number: 1500, suffix: '+', label: { id: 'Alumni Sukses', ja: '卒業生実績' }, order: 0 },
  { icon: 'handshake', number: 45, suffix: '+', label: { id: 'Partner Industri', ja: '産業パートナー' }, order: 1 },
  { icon: 'verified_user', number: 100, suffix: '%', label: { id: 'Legalitas Terjamin', ja: '法的保証' }, order: 2 },
  { icon: 'language', number: 12, suffix: '+', label: { id: 'Tahun Pengalaman', ja: '年の経験' }, order: 3 }
];

const programsData = [
  {
    slug: 'magang',
    badge: 'Popular',
    title: { id: 'Program Magang', ja: '技能実習プログラム' },
    tagline: { id: 'Ginou Jisshusei', ja: '技能実習' },
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_AUDswQFlIH3at2G6lY784MJUjNi6TM2iskwV7bTVxyOjhjmLk71UbhYF1fwBTYs9GLvQF8bycqUJv1c2ZJuMA3DKh_lnWqrjx35Fe_Z6UODym-jpt5kyQ0AmHvIDvdKeT47NW3pB7TVyZ71YCDcocxIwQTXnMFZ7e0MSxp6uCUJR0nH0Mc4DZMGm-XSKm1n3GkFtU0jDRwQX9l83sVubNML2PDp7kxeS31XIh9rRdlv0kmw-g2pYHtV3pNPS8h4f_xbFccdJUP4',
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
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wpOHgGTgakp-tqrpQeTaYf6ZQCawNLGnnt_ebmV0ZtAaLOBb4o4iCdhETLfPyRZvj1yVnBxy-C_W3SBWqtVFBZIEA7RX-OsVQEP8ZvULOErJBiUeM-6TA_LZFTaNJt6_fShLrumNLhHyL97sC8kI6X_Ql8QEeRMAj-0wHdivDf_G0-VV0NfKjVcxD3OuivhtZRJyl_0rdDoUDenE8t1spXGP5uJfsWA8Qr5QP_5eWbhfsdSj11hn2RTBemq4PsorcC__LpyQ47E',
    duration: 'Sampai 5 Tahun',
    level: 'JFT Basic A2 / JLPT N4',
    certificate: 'Sertifikat SSW / Senmonkyu',
    seats: 'Sesuai Kuota',
    description: { 
      id: 'Program Tokutei Ginou (TG) atau disebut dengan Specified Skilled Worker (SSW) adalah program kerja ke Jepang untuk Orang Asing dengan Visa keahlian khusus guna memenuhi kebutuhan lowongan pekerjaan di Jepang yang semakin meningkat. Program TG berlangsung sejak tahun 2019 hingga sekarang. Pemegang Visa TG dapat bekerja di Jepang selama 5th. Saat ini ada 14 bidang pekerjaan yang terdaftar dan dapat mengajuan Visa TG 2 sehingga dapat bekerja di Jepang lebih dari 5th.', 
      ja: '特定技能（TG/SSW）は、深刻化する人手不足に対応するため、特定の専門技能を持つ外国人に与えられる就労ビザです。2019年から開始され、最大5年間の就労が可能です。現在14職種が対象で、特定技能2号への移行により5年を超えた長期就労や家族の帯同も可能になります。' 
    },
    features: [
      { id: 'Pria – Wanita', ja: '男性・女性' },
      { id: 'Usia 18 s/d 35 tahun', ja: '年齢18歳〜35歳' },
      { id: 'Pendidikan SMA / K Sederajat', ja: '高校卒業以上' },
      { id: 'Sertifikat Bahasa (JFT Basic A2 / JLPT N4)', ja: '日本語能力試験（JFT A2 / JLPT N4）' },
      { id: 'Sertifikat Senmonkyu / 3kyu (eks Magang)', ja: '専門級・3級試験合格（技能実習修了者）' }
    ],
    benefits: [
      { icon: 'payments', title: { id: 'Gaji Karyawan', ja: '給与' }, desc: { id: 'Standar gaji sesuai pekerja di Jepang.', ja: '日本人の従業員と同等の給与水準です。' } },
      { icon: 'card_travel', title: { id: 'Perpanjangan', ja: '更新可能' }, desc: { id: 'Bisa berlanjut ke TG2.', ja: '特定技能2号への移行 juga可能です。' } }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya ingin mendaftar Program Tokutei Ginou.'
  },
  {
    slug: 'engineering',
    badge: 'Specialized',
    title: { id: 'Program Engineering / Gijinkoku', ja: '技術・人文知識・国際業務' },
    tagline: { id: 'Keterampilan Profesional', ja: 'プロフェッショナル' },
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW5KsSWdj9UN3RaJQG6Ztf-3QSAlSMh1f2UTL5LEMEv5UkPDlFL0whnCUgesgmsW8b0xHdNwNl2GLKsphmMzqPma0nNwiZYQXCI0yHO8rI1PvqIkcsoOLVfsS4zuiYxBXiCYNDb6DuKKLxLVhTJQ4RqnYtgRA8DszgCUyoTQHrdFk9UUxjlbJc9PJGcc1xy4y9CDc_nyeLIkfZt7FDN_Ho89VrfrUhUgAflq3q5bbrfoUSkd33FBDjzmHQUvQhW7fBCwaa7dArIKE',
    duration: { id: 'Dapat Diperpanjang', ja: '更新可能' },
    level: { id: 'Mahir (N3/N2)', ja: '上級 (N3/N2)' },
    certificate: 'D3 / S1 Resmi DIKTI',
    seats: 'Sesuai Lowongan',
    description: { 
      id: 'Visa Gijinkoku atau yang sering dikenal dengan Engineering adalah Program Kerja ke Jepang dengan keterampilan Profesional. Peserta diwajibkan Lulusan D3 / S1 dari universitas yang terdaftar resmi di DIKTI. Kemampuan Bahasa yang baik menjadi nilai plus untuk para pencari lowongan Gijingkoku / Engineering. Masa kerja Visa Gijinkoku adalah dapat diperpanjang setiap tahunnya.', 
      ja: '技術・人文知識・国際業務ビザ（技人国）は、専門的なスキルを持つ高度人材向けの就労ビザです。DIKTIに登録されている大学のD3またはS1（大卒・短大卒）の学位が必須です。高い日本語能力は採用において有利に働きます。契約が続く限り、毎年ビザの更新が可能です。' 
    },
    features: [
      { id: 'Pria – Wanita', ja: '男性・女性' },
      { id: 'Usia 21 – 40 tahun', ja: '年齢21歳〜40歳' },
      { id: 'Pendidikan Min D3 / S1 (Teknik diutamakan)', ja: 'D3/S1学位保持者（工業系学部優先）' },
      { id: 'Keterampilan Bahasa Jepang tingkat Mahir', ja: '上級レベルの日本語能力' },
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
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZb96K1b0F7zCpqZJeMU7EYL3iXzHtgMITUme-yfcZgccsupf32N1jThDdKUarbC0_H5Jsy2CvAK3QJBEeOg2dGQLCuL4hJQlnLz5UpmTshcWITqCd5OtrwxYsxTnogcz3onbL2Y3ma4iwPMis3AgOdPbuXTwsaB1GNqCW8_v5kgGDX8jvIPFRyu6c3JopSs4pqDyQJXFtWRWptsmLFi-nvl_6apIpsDXicLbFkf0fkMzQKM6Qf1w7p17EbN8Qx6ujNP-qhSICFGY',
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
      { id: 'Bersedia menyelesaikan studi hingga lulus', ja: '卒業まで真面目に学習を継続できること' }
    ],
    benefits: [
      { icon: 'schedule', title: { id: 'Kerja Paruh Waktu', ja: 'アルバイト' }, desc: { id: 'Diijinkan Arubaito max 28 jam / minggu.', ja: '週28時間までのアルバイトが許可されます。' } },
      { icon: 'school', title: { id: 'Lanjut Pendidikan', ja: '進学' }, desc: { id: 'Peluang lolos Universitas Daigaku Jepang.', ja: '日本の大学への進学チャンス。' } }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik Program Student (Ryugaku).'
  }
];

const advantagesData = [
  { icon: 'verified', title: { id: 'Kurikulum Terakreditasi', ja: '認定カリキュラム' }, description: { id: 'Kurikulum kami disesuaikan dengan standar industri di Jepang dan kebutuhan ujian resmi JLPT & JFT.', ja: '日本の業界基準やJLPT・JFT試験に合わせたカリキュラム。' }, order: 0 },
  { icon: 'diversity_3', title: { id: 'Mentor Native & Berpengalaman', ja: 'ネイティブ講師' }, description: { id: 'Belajar langsung dari penutur asli dan alumni yang telah sukses berkarir di Jepang.', ja: '日本人講師や日本での就業経験を持つ卒業生から直接学びます。' }, order: 1 },
  { icon: 'corporate_fare', title: { id: 'Koneksi Perusahaan Luas', ja: '広範なネットワーク' }, description: { id: 'Kami memiliki jaringan luas dengan Kumiai dan Perusahaan Penerima (Sento) di berbagai prefektur Jepang.', ja: '日本の各都道府県にある監理団体や受入れ企業との強力なネットワーク。' }, order: 2 },
  { icon: 'workspace_premium', title: { id: 'Garansi Penempatan Kerja', ja: '就職支援保証' }, description: { id: 'Kami memberikan jaminan penempatan kerja bagi lulusan yang memenuhi kualifikasi dan lulus ujian.', ja: '資格を満たし試験に合格した卒業生への確実な就職支援。' }, order: 3 }
];

const activitiesData = [
  {
    title: { id: 'Workshop Persiapan Wawancara Perusahaan Jepang', ja: '日本企業面接対策ワークショップ' },
    category: 'Event',
    dateRaw: '2026-04-12',
    date: '12 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW5KsSWdj9UN3RaJQG6Ztf-3QSAlSMh1f2UTL5LEMEv5UkPDlFL0whnCUgesgmsW8b0xHdNwNl2GLKsphmMzqPma0nNwiZYQXCI0yHO8rI1PvqIkcsoOLVfsS4zuiYxBXiCYNDb6DuKKLxLVhTJQ4RqnYtgRA8DszgCUyoTQHrdFk9UUxjlbJc9PJGcc1xy4y9CDc_nyeLIkfZt7FDN_Ho89VrfrUhUgAflq3q5bbrfoUSkd33FBDjzmHQUvQhW7fBCwaa7dArIKE',
    summary: { id: 'Pelajari etika dan cara menjawab pertanyaan mensesu (wawancara) dengan lancar bersama sensei native.', ja: '日本人講師と一緒に、面接（面接）の答え方やマナーを学びましょう。' },
    content: [
      { id: 'Workshop Persiapan Wawancara Perusahaan Jepang merupakan salah satu kegiatan rutin yang diselenggarakan oleh LPK Fujisaki Gakuin Center.', ja: '日本企業面接対策ワークショップは、LPK藤崎学院センターが定期的に開催している活動の一つです。' },
      { id: 'Kegiatan ini bertujuan untuk mempersiapkan peserta pelatihan menghadapi proses wawancara kerja (mensesu) dengan perusahaan-perusahaan di Jepang.', ja: 'この活動は、研修生が日本企業との採用面接（面接）に備えることを目的としています。' }
    ],
    highlights: [
      { id: 'Praktek wawancara langsung dengan native speaker', ja: '日本人ネイティブとの模擬面接' },
      { id: 'Materi etika bisnis Jepang (Business Manner)', ja: '日本のビジネスマナー研修' }
    ]
  },
  {
    title: { id: 'Pengenalan Budaya: Upacara Minum Teh di Kampus', ja: '文化紹介：キャンパスでの茶道体験' },
    category: 'Culture',
    dateRaw: '2026-04-08',
    date: '8 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrjnG8_Ef4rwT-ihqGIkUDtGIl_XwJo8QpVGbwAWMSuDQCH2BJsDUMcGW0MkhFFlMp3ayRY3PD7ZhuR_9eubsi-O_ZJ1tSMduUH27EDlpsmump891bAkuloPB70y1o5-_Fx9jsYeXGmQsYFaDRgm_qyHH1VOLi8eIR212cXWIIpvaUKM5IZE6p8tYnD_umtWEybvsufH2n92PfVFreh1j0nAN7lYbugWfjWBYn3585PIxKiFG1dyhxZ3VcYUuMRZKTlB6Q4RcgBE4',
    summary: { id: "Mengenal lebih dalam filosofi 'Omotenashi' melalui praktek langsung Chado bersama instruktur tamu.", ja: '外部講師を招いた茶道の実践を通じて、「おもてなし」の心を学びます。' },
    content: [
      { id: 'Sebagai bagian dari program pemahaman budaya Jepang, LPK Fujisaki Gakuin Center mengadakan sesi khusus pengenalan Upacara Minum Teh Jepang (Chado / 茶道).', ja: '日本文化理解プログラムの一環として、LPK藤崎学院センターでは茶道体験セッションを開催しました。' }
    ],
    highlights: [
      { id: 'Praktek langsung Upacara Minum Teh (Chado)', ja: '茶道の実践体験' },
      { id: 'Bimbingan dari instruktur bersertifikasi', ja: '認定講師による指導' }
    ]
  }
];

// ====================================================
// SEED FUNCTION (UPGRADED)
// ====================================================
export async function seedAllData(onProgress, overwrite = false) {
  const report = { success: 0, skipped: 0, errors: [] };

  async function seedCollection(collName, items, useSlug = false) {
    if (!overwrite) {
      const snap = await getDocs(collection(db, collName));
      if (snap.size > 0) {
        if (onProgress) onProgress(`\u23ED\uFE0F ${collName}: sudah ada, di-skip.`);
        report.skipped++;
        return;
      }
    } else {
      // Clear existing first
      const snap = await getDocs(collection(db, collName));
      for (const d of snap.docs) {
        await deleteDoc(doc(db, collName, d.id));
      }
      if (onProgress) onProgress(`\uD83E\uDDF9 Membersihkan ${collName}...`);
    }

    for (const item of items) {
      try {
        if (useSlug && item.slug) {
          await setDoc(doc(db, collName, item.slug), item);
        } else {
          await addDoc(collection(db, collName), item);
        }
      } catch (e) {
        report.errors.push(`${collName}: ${e.message}`);
      }
    }
    if (onProgress) onProgress(`\u2705 ${collName}: ${items.length} item berhasil disinkronkan.`);
    report.success++;
  }

  async function seedSettingsDoc(docId, data) {
    try {
      await setDoc(doc(db, 'settings', docId), data);
      if (onProgress) onProgress(`\u2705 settings/${docId}: berhasil disinkronkan.`);
      report.success++;
    } catch (e) {
      report.errors.push(`settings/${docId}: ${e.message}`);
    }
  }

  // Seed all collections
  if (onProgress) onProgress('\uD83D\uDE80 Memulai sinkronisasi database...');

  await seedSettingsDoc('hero', heroData);
  await seedSettingsDoc('about', aboutData);
  await seedSettingsDoc('contact', contactData);
  await seedCollection('stats', statsData);
  await seedCollection('programs_v2', programsData, true);
  await seedCollection('advantages', advantagesData);
  await seedCollection('activities', activitiesData);

  if (onProgress) onProgress('\uD83C\uDF89 Sinkronisasi database selesai!');
  return report;
}
