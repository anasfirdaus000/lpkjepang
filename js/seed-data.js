/* ================================================
   SEED DATA — Populate Firebase with initial content
   Run this once from admin dashboard to seed Firestore
   ================================================ */
import { db } from './firebase-config.js';
import {
  collection, doc, setDoc, addDoc, getDocs
} from 'firebase/firestore';

// ====================================================
// ALL INITIAL DATA
// ====================================================

const heroData = {
  badge: 'Your Journey Starts Here',
  title: 'Wujudkan Karir ke Jepang Bersama Fujisaki Gakuin Center',
  highlight: 'Jepang',
  subtitle: 'Raih peluang karir di Jepang dengan program pelatihan bahasa dan persiapan kerja profesional. Kami mengkurasi masa depan Anda melalui filosofi Modern Ikigai.',
  statNumber: '98%',
  statLabel: 'Lulus Sertifikasi JLPT N3-N1',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqtGwEyPQcbWyP4cqPTr1PUF0YVwRSH7Rht3rcwctA4q5xyriX1ffQ9IjNGZoTIZSk1nwE9aBXe7zbwCEQL6TuMIjniLdK-GloG271i4cBOGSkzZ-DAM-tPv_YtJ3gaQR0bzTY8mU3Q5L1Xvz_gHTZDuA24x04rsIfqF1QsR-058yvGJgUyJZoY84fuDR_493w_EpM1C8sEfKEg8D-oXFKewcCvsfq3TWC_vSovesVIzYTegJspOGzwwQTfMcLjc5TR2E0EXS2Bxs'
};

const contactData = {
  whatsapp: '6285858000088',
  whatsappText: 'Halo Fujisaki Gakuin, saya tertarik untuk mendaftar',
  address: 'Jl. Modern Ikigai No. 8, Jakarta Selatan',
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
  { icon: 'school', number: 1500, suffix: '+', label: 'Alumni Sukses', order: 0 },
  { icon: 'handshake', number: 45, suffix: '+', label: 'Partner Industri', order: 1 },
  { icon: 'verified_user', number: 100, suffix: '%', label: 'Legalitas Terjamin', order: 2 },
  { icon: 'language', number: 12, suffix: '+', label: 'Tahun Pengalaman', order: 3 }
];

const programsData = [
  {
    slug: 'magang',
    badge: 'Popular',
    title: 'Program Magang',
    tagline: 'Ginou Jisshusei',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_AUDswQFlIH3at2G6lY784MJUjNi6TM2iskwV7bTVxyOjhjmLk71UbhYF1fwBTYs9GLvQF8bycqUJv1c2ZJuMA3DKh_lnWqrjx35Fe_Z6UODym-jpt5kyQ0AmHvIDvdKeT47NW3pB7TVyZ71YCDcocxIwQTXnMFZ7e0MSxp6uCUJR0nH0Mc4DZMGm-XSKm1n3GkFtU0jDRwQX9l83sVubNML2PDp7kxeS31XIh9rRdlv0kmw-g2pYHtV3pNPS8h4f_xbFccdJUP4',
    duration: '1 - 3 Tahun',
    level: 'N5 - N4',
    certificate: 'Sertifikat Magang (JITCO)',
    seats: 'Sesuai Kuota',
    description: 'Program pemagangan Teknis (Ginou Jisshusei) adalah program berlatih sambil bekerja. Program magang berlangsung selama 1 sampai 3 tahun tergantung perjanjian kontrak kerja dengan perusahaan yang memperkerjakan.',
    overview: [
      'Program ini tidak hanya menawarkan peluang pekerjaan, tetapi juga belajar sambil meningkatkan skil / keterampilan dasar bagi peserta yang baru mengenal dunia kerja Jepang.'
    ],
    features: [
      'Pelatihan Dasar Bahasa Jepang',
      'Pembekalan Budaya Jepang',
      'Pendidikan Etos Kerja',
      'Simulasi Area Kerja'
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 18 s/d 28 tahun',
      'Pendidikan min SMA/K Sederajad',
      'Sehat jasmani dan rohani',
      'Belum pernah mengikuti program Magang Jepang sebelumnya'
    ],
    benefits: [
      { icon: 'payments', title: 'Uang Saku', desc: 'Mendapat uang saku berkala dari perusahaan.' },
      { icon: 'school', title: 'Meningkatkan Skill', desc: 'Belajar budaya kerja langsung dari praktek lapangan.' }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik mendaftar Program Magang.'
  },
  {
    slug: 'tokutei_ginou',
    badge: 'Flagship',
    title: 'Program Tokutei Ginou (TG)',
    tagline: 'Specified Skilled Worker (SSW)',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wpOHgGTgakp-tqrpQeTaYf6ZQCawNLGnnt_ebmV0ZtAaLOBb4o4iCdhETLfPyRZvj1yVnBxy-C_W3SBWqtVFBZIEA7RX-OsVQEP8ZvULOErJBiUeM-6TA_LZFTaNJt6_fShLrumNLhHyL97sC8kI6X_Ql8QEeRMAj-0wHdivDf_G0-VV0NfKjVcxD3OuivhtZRJyl_0rdDoUDenE8t1spXGP5uJfsWA8Qr5QP_5eWbhfsdSj11hn2RTBemq4PsorcC__LpyQ47E',
    duration: 'Sampai 5 Tahun',
    level: 'JFT Basic A2 / JLPT N4',
    certificate: 'Sertifikat SSW / Senmonkyu',
    seats: 'Sesuai Kuota',
    description: 'Program kerja ke Jepang untuk Orang Asing dengan Visa keahlian khusus guna memenuhi kebutuhan lowongan pekerjaan di Jepang yang semakin meningkat.',
    overview: [
      'Program TG berlangsung sejak tahun 2019 hingga sekarang. Pemegang Visa TG dapat bekerja di Jepang selama 5th.',
      'Saat ini ada 14 bidang pekerjaan yang terdaftar dan dapat mengajuan Visa TG 2 sehingga dapat bekerja di Jepang lebih dari 5th.',
      'Sertifikat Kemampuan Bahasa Jepang (JFT Basic A2 / JLPT N4) serta Sertifikat Keterampilan menjadi syarat wajib yang harus dipenuhi sebelum melamar ke perusahaan penerima di Jepang. Program ini berlaku untuk New Comer / Pemula atau Eks Magang yang telah selesai masa kontrak magang 3 / 5 th.'
    ],
    features: [
      'Persiapan Ujian JFT Basic A2',
      'Persiapan Ujian JLPT N4',
      'Ujian Keterampilan SSW',
      'Pendampingan Matching'
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 18 s/d 35 tahun',
      'Pendidikan SMA / K Sederajad',
      'Sehat jasmani dan rohani',
      'Sertifikat Senmonkyu / 3kyu (bagi eks Magang)'
    ],
    benefits: [
      { icon: 'payments', title: 'Gaji Karyawan', desc: 'Standar gaji sesuai pekerja di Jepang.' },
      { icon: 'card_travel', title: 'Perpanjangan', desc: 'Bisa berlanjut ke TG2.' }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya ingin mendaftar Program Tokutei Ginou.'
  },
  {
    slug: 'engineering',
    badge: 'Specialized',
    title: 'Program Engineering / Gijinkoku',
    tagline: 'Keterampilan Profesional',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW5KsSWdj9UN3RaJQG6Ztf-3QSAlSMh1f2UTL5LEMEv5UkPDlFL0whnCUgesgmsW8b0xHdNwNl2GLKsphmMzqPma0nNwiZYQXCI0yHO8rI1PvqIkcsoOLVfsS4zuiYxBXiCYNDb6DuKKLxLVhTJQ4RqnYtgRA8DszgCUyoTQHrdFk9UUxjlbJc9PJGcc1xy4y9CDc_nyeLIkfZt7FDN_Ho89VrfrUhUgAflq3q5bbrfoUSkd33FBDjzmHQUvQhW7fBCwaa7dArIKE',
    duration: 'Dapat Diperpanjang',
    level: 'Mahir (N3/N2)',
    certificate: 'D3 / S1 Resmi DIKTI',
    seats: 'Sesuai Lowongan',
    description: 'Visa Gijinkoku atau yang sering dikenal dengan Engineering adalah Program Kerja ke Jepang dengan keterampilan Profesional. Peserta diwajibkan Lulusan D3 / S1 dari universitas yang terdaftar resmi di DIKTI.',
    overview: [
      'Kemampuan Bahasa yang baik menjadi nilai plus untuk para pencari lowongan Gijingkoku / Engineering.',
      'Masa kerja Visa Gijinkoku adalah dapat diperpanjang setiap tahunnya selama perusahaan penerima dan pekerja masih bersedia untuk bekerja / memperkerjakan.'
    ],
    features: [
      'Pelatihan Business Japanese',
      'Persiapan Interview',
      'Pengurusan Dokumen',
      'Pendampingan Penempatan'
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 21 – 40th',
      'Pendidikan Min Lulusan D3/ S1 (jurusan Teknik Lebih diutamakan)',
      'Keterampilan Bahasa Jepang tingkat Mahir',
      'Sehat Jasmani dan rohani'
    ],
    benefits: [
      { icon: 'engineering', title: 'Professional', desc: 'Status Visa Pekerja Profesional.' },
      { icon: 'work', title: 'Dapat Diperpanjang', desc: 'Kontrak dapat selalu diperpanjang.' }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya lulusan universitas dan tertarik Program Engineering (Gijinkoku).'
  },
  {
    slug: 'study',
    badge: 'Education',
    title: 'Program Student / Study',
    tagline: 'Ryugaku',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZb96K1b0F7zCpqZJeMU7EYL3iXzHtgMITUme-yfcZgccsupf32N1jThDdKUarbC0_H5Jsy2CvAK3QJBEeOg2dGQLCuL4hJQlnLz5UpmTshcWITqCd5OtrwxYsxTnogcz3onbL2Y3ma4iwPMis3AgOdPbuXTwsaB1GNqCW8_v5kgGDX8jvIPFRyu6c3JopSs4pqDyQJXFtWRWptsmLFi-nvl_6apIpsDXicLbFkf0fkMzQKM6Qf1w7p17EbN8Qx6ujNP-qhSICFGY',
    duration: 'Hingga Lulus',
    level: 'Pemula',
    certificate: 'Sertifikat Lulus',
    seats: 'Terbuka',
    description: 'Program Student / Study atau 留学 Ryugaku adalah Program belajar di Jepang dengan Visa Student / Pelajar asing. Program ini sering diplih bagi peserta yang berminat untuk mempersiapkan masuk Universitas di Jepang.',
    overview: [
      'Pemegang visa Study diijinkan untuk melakukan kerja paruh waktu untuk memenuhi kebutuhan sehari hari dengan ketentuan Max 28jam / minggu.',
      'Setelah dinyatakan LULUS peserta dapat memilih untuk masuk Universitas atau mengambil Visa Kerja di Jepang.'
    ],
    features: [
      'Bimbingan Studi Bahasa 1-2 Tahun',
      'Persiapan Pemilihan Universitas',
      'Panduan Kerja Paruh Waktu (Arubaito)',
      'Konsultasi Lanjut Studi / Kerja'
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 18 s/d 30th',
      'Pendidikan Min SMA/ K Sederajad',
      'Memiliki perekonomian keluarga yang baik',
      'Bersedia untuk menyelesaikan masa study hingga lulus'
    ],
    benefits: [
      { icon: 'schedule', title: 'Kerja Paruh Waktu', desc: 'Diijinkan Arubaito max 28 jam / minggu.' },
      { icon: 'school', title: 'Lanjut Pendidikan', desc: 'Peluang lolos Universitas Daigaku Jepang.' }
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik Program Student (Ryugaku).'
  }
];

const advantagesData = [
  { icon: 'verified', title: 'Kurikulum Terakreditasi', description: 'Kurikulum kami disesuaikan dengan standar industri di Jepang dan kebutuhan ujian resmi JLPT & JFT.', order: 0 },
  { icon: 'diversity_3', title: 'Mentor Native & Berpengalaman', description: 'Belajar langsung dari penutur asli dan alumni yang telah sukses berkarir di Jepang.', order: 1 },
  { icon: 'corporate_fare', title: 'Koneksi Perusahaan Luas', description: 'Kami memiliki jaringan luas dengan Kumiai dan Perusahaan Penerima (Sento) di berbagai prefektur Jepang.', order: 2 },
  { icon: 'workspace_premium', title: 'Garansi Penempatan Kerja', description: 'Kami memberikan jaminan penempatan kerja bagi lulusan yang memenuhi kualifikasi dan lulus ujian.', order: 3 }
];

const testimonialsData = [
  {
    name: 'Siti Rahma',
    role: 'Caregiver, Osaka',
    quote: 'Persiapan di Fujisaki sangat matang, tidak hanya bahasa tapi juga budaya kerja. Sekarang saya sudah 2 tahun di Osaka dan merasa sangat terbantu.',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVU3s8nWxgwULrqjCf1ZBZQHd2sfDFYdb5GLiVvZ4XGN3yYz2vrq2HGylThzHtNbVrVcEekHrGmQ3LftTuICo1JYhAZ7NwOW7k0APcCETWYvvhAm60RFSm1pueqKAA_x-W-dGxIOiWcsH8gi70yASIBKKbfZ4eMBLrOTdbZHsHoyExe58SvoLCW022vRr5dxxXLCb8S6WwHu-17r_eFC_Bhro9kF1FPDmUEZdffw6Z-hQmSL2oVVYTB_I02LydJQkcCCmDViLicnc'
  },
  {
    name: 'Budi Santoso',
    role: 'Engineer, Tokyo',
    quote: 'Materi SSW Konstruksi yang diajarkan sangat akurat dengan apa yang diujikan. Fujisaki Gakuin adalah jembatan terbaik menuju karir di Jepang.',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp6AcCwMMjh1a77tdBPn9a5XvQezbbKnrO50RuNLOZDFscDejzlE4kJVugzuVpCRoMnFkUptn4L_kdyPITnaVsBOlocBF-JrJo6ETpCHlvbVY0nVum2c_QD4EjmZIyVG-a_tWYlGCwPVYUZRboZhj1Damg23Vkwu6FPrIl6bUbdAsDLQftV8vLh0-KosrNp9Zq8iIVXcXErkHp3QDcEMPlo8VlMF64EOlPj8apu5LDg2U7VLA8q-jHrf54-GYvL7aEkKdGM8Zx_V8'
  },
  {
    name: 'Dewi Anggraini',
    role: 'Food Processing, Hokkaido',
    quote: 'Awalnya saya ragu, tapi setelah bergabung dengan Fujisaki semua keraguan hilang. Tim pengajar sangat supportif dan prosesnya sangat transparan.',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_nb-iD_Ny-tm7afYO8sj9GReUW8mm-Rvv8Oqjr354i1QiBrbexpF5jiYNswBGHalTmCxOup6ETYlUaZur8OjVXp_wF7Cp5v2pxjaxA0LyWVBwgi_FUCMLo1sVVoAyWnUK98ZjliVl3lGiiRjwS0AEJPF1tdeSBWNJKcW4hzhrHJ4osDghvZMUDt5F7CO0obCQSJhUTpeyWMbVO73O4r60oLZBHq1HAAbWZH2q0U5rDljQXJvm4FmsjsTsy3uAa1TorHQsGjfrViw'
  }
];

const galleryData = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZb96K1b0F7zCpqZJeMU7EYL3iXzHtgMITUme-yfcZgccsupf32N1jThDdKUarbC0_H5Jsy2CvAK3QJBEeOg2dGQLCuL4hJQlnLz5UpmTshcWITqCd5OtrwxYsxTnogcz3onbL2Y3ma4iwPMis3AgOdPbuXTwsaB1GNqCW8_v5kgGDX8jvIPFRyu6c3JopSs4pqDyQJXFtWRWptsmLFi-nvl_6apIpsDXicLbFkf0fkMzQKM6Qf1w7p17EbN8Qx6ujNP-qhSICFGY',
    caption: 'Alumni Batch 12 @ Kyoto',
    layout: 'wide'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiC4i9fzqysNXxR9N7SCq0VJEkmqRT7upHgmvfxK0_7sKl3s0MBHVpb-D1yvDNV76Y-DTwquCRoXJbgzhwxPofaclTaFAft1Wb8RSJm7nnSoIzqnvN829XMWWTq5zu2IAgsAhlpc_obRAv_guh0BEJfAY_A6uutViyZyI7l6Ab771K8lX4ZIlheHJIT54VsIg6Z8x1NLRnVmJhdzyHlNHIDXJzEBwbfYYgKZbVxDR_aqBmVxZJyEb4x3cy-RQ5T_68LEx5fSSgoKY',
    caption: 'Workshop Budaya: Chado',
    layout: 'normal'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvjATrRe_8EugucnFDEJt-N7UIuCWfpoKFZD7al3sa_T9WEm9veV3AKLu32fxVA3spw1UGdzScnRHLZpZsPkd8E-I41A9DCC8H7jzcu5VFXlajx_HLiKrOOXloBGypjB1ZtVmqF2B093Qc0X0YWR8r86SQvgctfOuOFwxPIIxF85qJgkqpDXaY997Qq7GreP3us4myGFG6WpFj96LkiNO5tl719Ep2j-IK85yodLY2LQEb3hZCBNdi4uVZqo8wK-kBaLY9qVbl5Ds',
    caption: 'Seni Kaligrafi Shodo',
    layout: 'tall'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Bn2JMwizK2xG-PSHmNxqfzkA4gTX9kwiaCPq3DrX85HL17JaJNabi2xjkUnt_Y0weYkiZc8h1cK820N62B6V_uIr03CONsl_bCWBV2AKEGn8-3dK0jr64ivkPRIV2q147xBc4YgxYpfOmBOMem1IvKfpUD29YOcVnC_5WU8WbIJPZShyNdXji9JeV8S91MFJCDHRKN1SrSL46kmEK33RgLpSPYaIInNfyz8qAkBS3829xKklrJBIHUDolgwgRxmUWDhV1VzDGq4',
    caption: 'Interaksi Kelas Seru',
    layout: 'normal'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCevWjioc6J5uIny3oqEPIgxTqBgLTXo4mNbus0YotvkTdEhBKfR9IjP6JUnAicw0OZnwdkYb5aXTBmFREeMYjoH43fCEH4jCHr6tlm26_wHl-BL0cjzWIibsEWBBal5vNC8HhXeyhJkG1n96h4wBK7lRh0l3bXy234I6Gmd6d1WFwjYcytu1oYyJ3DwkFuf3lHONQ2O3Lm7gAvLsXucXESLyHVelNS73uyG6G3WFUL_WwJ_doB0WHs6KeD1BCJXt4mu0_L9xqsUkQ',
    caption: 'Peluang Karir Global',
    layout: 'wide'
  }
];

const activitiesData = [
  {
    title: 'Workshop Persiapan Wawancara Perusahaan Jepang',
    category: 'Event',
    dateRaw: '2026-04-12',
    date: '12 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW5KsSWdj9UN3RaJQG6Ztf-3QSAlSMh1f2UTL5LEMEv5UkPDlFL0whnCUgesgmsW8b0xHdNwNl2GLKsphmMzqPma0nNwiZYQXCI0yHO8rI1PvqIkcsoOLVfsS4zuiYxBXiCYNDb6DuKKLxLVhTJQ4RqnYtgRA8DszgCUyoTQHrdFk9UUxjlbJc9PJGcc1xy4y9CDc_nyeLIkfZt7FDN_Ho89VrfrUhUgAflq3q5bbrfoUSkd33FBDjzmHQUvQhW7fBCwaa7dArIKE',
    summary: 'Pelajari etika dan cara menjawab pertanyaan mensesu (wawancara) dengan lancar bersama sensei native.',
    content: [
      'Workshop Persiapan Wawancara Perusahaan Jepang merupakan salah satu kegiatan rutin yang diselenggarakan oleh LPK Fujisaki Gakuin Center. Kegiatan ini bertujuan untuk mempersiapkan peserta pelatihan menghadapi proses wawancara kerja (mensesu) dengan perusahaan-perusahaan di Jepang.',
      'Dalam workshop kali ini, peserta mendapatkan kesempatan berharga untuk belajar langsung dari Tanaka-sensei, seorang native speaker Jepang yang memiliki pengalaman lebih dari 15 tahun di bidang Human Resources di beberapa perusahaan besar di Tokyo dan Osaka.',
      'Workshop berlangsung selama satu hari penuh dari pukul 09.00 hingga 16.00 WIB dengan istirahat makan siang. Di akhir sesi, setiap peserta mendapatkan feedback individual dari Tanaka-sensei mengenai kekuatan dan area yang perlu diperbaiki.'
    ],
    highlights: [
      'Praktek wawancara langsung dengan native speaker',
      'Materi etika bisnis Jepang (Business Manner)',
      'Tips menjawab pertanyaan umum mensesu',
      'Feedback individual dari sensei',
      'Sertifikat keikutsertaan'
    ]
  },
  {
    title: 'Pengenalan Budaya: Upacara Minum Teh di Kampus',
    category: 'Culture',
    dateRaw: '2026-04-08',
    date: '8 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrjnG8_Ef4rwT-ihqGIkUDtGIl_XwJo8QpVGbwAWMSuDQCH2BJsDUMcGW0MkhFFlMp3ayRY3PD7ZhuR_9eubsi-O_ZJ1tSMduUH27EDlpsmump891bAkuloPB70y1o5-_Fx9jsYeXGmQsYFaDRgm_qyHH1VOLi8eIR212cXWIIpvaUKM5IZE6p8tYnD_umtWEybvsufH2n92PfVFreh1j0nAN7lYbugWfjWBYn3585PIxKiFG1dyhxZ3VcYUuMRZKTlB6Q4RcgBE4',
    summary: "Mengenal lebih dalam filosofi 'Omotenashi' melalui praktek langsung Chado bersama instruktur tamu.",
    content: [
      'Sebagai bagian dari program pemahaman budaya Jepang, LPK Fujisaki Gakuin Center mengadakan sesi khusus pengenalan Upacara Minum Teh Jepang (Chado / 茶道).',
      'Upacara minum teh bukan sekadar minum teh biasa. Ini adalah seni yang mengajarkan prinsip-prinsip fundamental budaya Jepang: Wa (和 - Harmoni), Kei (敬 - Rasa Hormat), Sei (清 - Kemurnian), dan Jaku (寂 - Ketenangan).',
      'Para peserta juga berkesempatan mencoba menyiapkan teh sendiri menggunakan chasen (whisk bambu) dan chawan (mangkuk teh).'
    ],
    highlights: [
      'Praktek langsung Upacara Minum Teh (Chado)',
      'Bimbingan dari instruktur bersertifikasi Urasenke',
      'Memahami filosofi Wa, Kei, Sei, Jaku',
      'Pengalaman menyiapkan matcha sendiri',
      'Pemahaman mendalam tentang Omotenashi'
    ]
  },
  {
    title: 'Pembukaan Pendaftaran Batch Baru SSW Food Processing',
    category: 'Update',
    dateRaw: '2026-04-01',
    date: '1 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQyw7ButzlX7NBgbTBL68zb-U4GzT5ftCbulhG6xJvw9d9rJwCT-hA6SW6yD0rGo6faNuiwEF4MWWo5kshMEV0plRP21SY8RJBuboQ3yHGPEeEBZakVtX9REXpzQkAXJ88k7kNTqRTwh_R1zWjPwkdYQwacmCobuYlqoLh3ELl3ihze3qZ2OrRns5nFGik45gp0iI19blY7QBxz-7eDm1F2gSV_WtSGNWmjdrmDRS4wQTrXGCglybhj8vCG4kL5w8koxCsPpTV91M',
    summary: 'Segera daftar untuk kuota terbatas pengolahan makanan untuk keberangkatan musim gugur tahun depan.',
    content: [
      'LPK Fujisaki Gakuin Center dengan bangga mengumumkan pembukaan pendaftaran Batch terbaru untuk program Specified Skilled Worker (SSW) sektor Pengolahan Makanan.',
      'Batch kali ini memiliki kuota terbatas hanya untuk 30 peserta, dengan target keberangkatan pada musim gugur (Oktober - November).',
      'Untuk informasi lebih lanjut mengenai biaya, jadwal, dan persyaratan pendaftaran, silakan menghubungi kami melalui WhatsApp atau kunjungi kantor kami langsung.'
    ],
    highlights: [
      'Kuota terbatas: 30 peserta',
      'Target keberangkatan: Musim Gugur 2026',
      'Pelatihan 6 bulan intensif',
      'Penempatan di berbagai prefektur Jepang',
      'Termasuk persiapan ujian SSW'
    ]
  }
];

// ====================================================
// SEED FUNCTION
// ====================================================
export async function seedAllData(onProgress) {
  const report = { success: 0, skipped: 0, errors: [] };

  async function seedIfEmpty(collName, items, useSetDoc = false) {
    const snap = await getDocs(collection(db, collName));
    if (snap.size > 0) {
      if (onProgress) onProgress(`⏭️ ${collName}: sudah ada ${snap.size} item, di-skip.`);
      report.skipped++;
      return;
    }

    for (const item of items) {
      try {
        await addDoc(collection(db, collName), item);
      } catch (e) {
        report.errors.push(`${collName}: ${e.message}`);
      }
    }
    if (onProgress) onProgress(`✅ ${collName}: ${items.length} item berhasil ditambahkan.`);
    report.success++;
  }

  async function seedSettingsDoc(docId, data) {
    const snap = await getDocs(collection(db, 'settings'));
    const docExist = snap.docs.find(d => d.id === docId);
    if (docExist) {
      if (onProgress) onProgress(`⏭️ settings/${docId}: sudah ada, di-skip.`);
      report.skipped++;
      return;
    }
    try {
      await setDoc(doc(db, 'settings', docId), data);
      if (onProgress) onProgress(`✅ settings/${docId}: berhasil disimpan.`);
      report.success++;
    } catch (e) {
      report.errors.push(`settings/${docId}: ${e.message}`);
    }
  }

  // Seed all collections
  if (onProgress) onProgress('🚀 Memulai seed data...');

  await seedSettingsDoc('hero', heroData);
  await seedSettingsDoc('about', aboutData);
  await seedSettingsDoc('contact', contactData);
  await seedIfEmpty('stats', statsData);
  await seedIfEmpty('programs_v2', programsData);
  await seedIfEmpty('advantages', advantagesData);
  await seedIfEmpty('testimonials', testimonialsData);
  await seedIfEmpty('gallery', galleryData);
  await seedIfEmpty('activities', activitiesData);

  if (onProgress) onProgress('🎉 Seed data selesai!');

  return report;
}
