/* ================================================
   DATA — Programs & Activities Content
   ================================================ */

export const programs = {
  magang: {
    id: 'magang',
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
    curriculum: [
      { phase: 'Pelatihan Dasar', duration: '3 Bulan', items: ['Bahasa Jepang', 'Budaya Jepang', 'Etos Kerja'] }
    ],
    sectors: ['Konstruksi', 'Manufaktur', 'Pertanian', 'Pengolahan Makanan'],
    benefits: [
      { icon: 'payments', title: 'Uang Saku', desc: 'Mendapat uang saku berkala dari perusahaan.' },
      { icon: 'school', title: 'Meningkatkan Skill', desc: 'Belajar budaya kerja langsung dari praktek lapangan.' }
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 18 s/d 28 tahun',
      'Pendidikan min SMA/K Sederajad',
      'Sehat jasmani dan rohani',
      'Belum pernah mengikuti program Magang Jepang sebelumnya'
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik mendaftar Program Magang.'
  },
  tokutei_ginou: {
    id: 'tokutei_ginou',
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
    curriculum: [
      { phase: 'Persiapan Ujian', duration: 'Tergantung Siswa', items: ['JFT Basic A2 / JLPT N4', 'Ujian Keterampilan SSW'] }
    ],
    sectors: ['Kaigo', 'Food Service', 'Pertanian', 'Manufaktur', 'Pembersihan Gedung'],
    benefits: [
      { icon: 'payments', title: 'Gaji Karyawan', desc: 'Standar gaji sesuai pekerja di Jepang.' },
      { icon: 'card_travel', title: 'Perpanjangan', desc: 'Bisa berlanjut ke TG2.' }
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 18 s/d 35 tahun',
      'Pendidikan SMA / K Sederajad',
      'Sehat jasmani dan rohani',
      'Sertifikat Senmonkyu / 3kyu (bagi eks Magang)'
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya ingin mendaftar Program Tokutei Ginou.'
  },
  engineering: {
    id: 'engineering',
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
    curriculum: [
      { phase: 'Bahasa Jepang Bisnis', duration: 'Lanjutan', items: ['Business Japanese', 'Interview Preparation'] }
    ],
    sectors: ['Teknik', 'IT / Komputer', 'Bahasa'],
    benefits: [
      { icon: 'engineering', title: 'Professional', desc: 'Status Visa Pekerja Profesional.' },
      { icon: 'work', title: 'Dapat Diperpanjang', desc: 'Kontrak dapat selalu diperpanjang.' }
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 21 – 40th',
      'Pendidikan Min Lulusan D3/ S1 (jurusan Teknik Lebih diutamakan)',
      'Keterampilan Bahasa Jepang tingkat Mahir',
      'Sehat Jasmani dan rohani'
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya lulusan universitas dan tertarik Program Engineering (Gijinkoku).'
  },
  study: {
    id: 'study',
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
    curriculum: [
      { phase: 'Studi Bahasa', duration: '1-2 Tahun', items: ['Sekolah Bahasa di Jepang', 'Persiapan Universitas'] }
    ],
    sectors: ['Pendidikan'],
    benefits: [
      { icon: 'schedule', title: 'Kerja Paruh Waktu', desc: 'Diijinkan Arubaito max 28 jam / minggu.' },
      { icon: 'school', title: 'Lanjut Pendidikan', desc: 'Peluang lolos Universitas Daigaku Jepang.' }
    ],
    requirements: [
      'Pria – Wanita',
      'Usia 18 s/d 30th',
      'Pendidikan Min SMA/ K Sederajad',
      'Memiliki perekonomian keluarga yang baik',
      'Bersedia untuk menyelesaikan masa study hingga lulus'
    ],
    whatsappText: 'Halo Fujisaki Gakuin, saya tertarik Program Student (Ryugaku).'
  }
};

export const activities = {
  1: {
    id: 1,
    title: 'Workshop Persiapan Wawancara Perusahaan Jepang',
    category: 'Event',
    date: '12 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW5KsSWdj9UN3RaJQG6Ztf-3QSAlSMh1f2UTL5LEMEv5UkPDlFL0whnCUgesgmsW8b0xHdNwNl2GLKsphmMzqPma0nNwiZYQXCI0yHO8rI1PvqIkcsoOLVfsS4zuiYxBXiCYNDb6DuKKLxLVhTJQ4RqnYtgRA8DszgCUyoTQHrdFk9UUxjlbJc9PJGcc1xy4y9CDc_nyeLIkfZt7FDN_Ho89VrfrUhUgAflq3q5bbrfoUSkd33FBDjzmHQUvQhW7fBCwaa7dArIKE',
    summary: 'Pelajari etika dan cara menjawab pertanyaan mensesu (wawancara) dengan lancar bersama sensei native.',
    content: [
      'Workshop Persiapan Wawancara Perusahaan Jepang merupakan salah satu kegiatan rutin yang diselenggarakan oleh LPK Fujisaki Gakuin Center. Kegiatan ini bertujuan untuk mempersiapkan peserta pelatihan menghadapi proses wawancara kerja (mensesu) dengan perusahaan-perusahaan di Jepang.',
      'Dalam workshop kali ini, peserta mendapatkan kesempatan berharga untuk belajar langsung dari Tanaka-sensei, seorang native speaker Jepang yang memiliki pengalaman lebih dari 15 tahun di bidang Human Resources di beberapa perusahaan besar di Tokyo dan Osaka.',
      'Materi yang dibahas mencakup etika berpakaian saat wawancara (suit, nama tag, dll), cara memberi salam dan memperkenalkan diri dalam bahasa Jepang formal (keigo), menjawab pertanyaan umum seperti "Naze Nihon de hatarakitai desu ka?" (Mengapa ingin bekerja di Jepang?), serta tips mengenai body language yang tepat.',
      'Sesi praktek dilakukan secara berpasangan dimana setiap peserta mendapat kesempatan menjadi pewawancara dan yang diwawancarai. Hal ini membantu peserta memahami perspektif dari kedua sisi.',
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

  2: {
    id: 2,
    title: 'Pengenalan Budaya: Upacara Minum Teh di Kampus',
    category: 'Culture',
    date: '8 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrjnG8_Ef4rwT-ihqGIkUDtGIl_XwJo8QpVGbwAWMSuDQCH2BJsDUMcGW0MkhFFlMp3ayRY3PD7ZhuR_9eubsi-O_ZJ1tSMduUH27EDlpsmump891bAkuloPB70y1o5-_Fx9jsYeXGmQsYFaDRgm_qyHH1VOLi8eIR212cXWIIpvaUKM5IZE6p8tYnD_umtWEybvsufH2n92PfVFreh1j0nAN7lYbugWfjWBYn3585PIxKiFG1dyhxZ3VcYUuMRZKTlB6Q4RcgBE4',
    summary: 'Mengenal lebih dalam filosofi \'Omotenashi\' melalui praktek langsung Chado bersama instruktur tamu.',
    content: [
      'Sebagai bagian dari program pemahaman budaya Jepang, LPK Fujisaki Gakuin Center mengadakan sesi khusus pengenalan Upacara Minum Teh Jepang (Chado / 茶道). Kegiatan ini merupakan bagian penting dalam kurikulum kami karena memahami budaya adalah kunci sukses hidup di Jepang.',
      'Upacara minum teh bukan sekadar minum teh biasa. Ini adalah seni yang mengajarkan prinsip-prinsip fundamental budaya Jepang: Wa (和 - Harmoni), Kei (敬 - Rasa Hormat), Sei (清 - Kemurnian), dan Jaku (寂 - Ketenangan).',
      'Instruktur tamu kami, Yamamoto-sensei, seorang praktisi Chado bersertifikasi dari aliran Urasenke, membimbing para peserta melalui setiap langkah upacara. Mulai dari cara masuk ruang teh (chashitsu), cara duduk seiza, hingga cara memegang dan meminum matcha dengan benar.',
      'Para peserta juga berkesempatan mencoba menyiapkan teh sendiri menggunakan chasen (whisk bambu) dan chawan (mangkuk teh). Pengalaman langsung ini memberikan pemahaman mendalam tentang pentingnya ketelitian, kesabaran, dan respect dalam budaya Jepang.',
      'Sesi ini mendapat antusiasme tinggi dari peserta. Banyak yang mengaku bahwa memahami filosofi di balik upacara minum teh membantu mereka lebih menghargai aspek-aspek halus dari budaya kerja Jepang seperti Omotenashi (keramahan tulus).'
    ],
    highlights: [
      'Praktek langsung Upacara Minum Teh (Chado)',
      'Bimbingan dari instruktur bersertifikasi Urasenke',
      'Memahami filosofi Wa, Kei, Sei, Jaku',
      'Pengalaman menyiapkan matcha sendiri',
      'Pemahaman mendalam tentang Omotenashi'
    ]
  },

  3: {
    id: 3,
    title: 'Pembukaan Pendaftaran Batch Baru SSW Food Processing',
    category: 'Update',
    date: '1 April 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQyw7ButzlX7NBgbTBL68zb-U4GzT5ftCbulhG6xJvw9d9rJwCT-hA6SW6yD0rGo6faNuiwEF4MWWo5kshMEV0plRP21SY8RJBuboQ3yHGPEeEBZakVtX9REXpzQkAXJ88k7kNTqRTwh_R1zWjPwkdYQwacmCobuYlqoLh3ELl3ihze3qZ2OrRns5nFGik45gp0iI19blY7QBxz-7eDm1F2gSV_WtSGNWmjdrmDRS4wQTrXGCglybhj8vCG4kL5w8koxCsPpTV91M',
    summary: 'Segera daftar untuk kuota terbatas pengolahan makanan untuk keberangkatan musim gugur tahun depan.',
    content: [
      'LPK Fujisaki Gakuin Center dengan bangga mengumumkan pembukaan pendaftaran Batch terbaru untuk program Specified Skilled Worker (SSW) sektor Pengolahan Makanan (Shokuhin Seizou Gyou / 食品製造業).',
      'Sektor pengolahan makanan merupakan salah satu dari 14 sektor yang menerima tenaga kerja asing melalui skema SSW di Jepang. Permintaan untuk sektor ini terus meningkat seiring dengan pertumbuhan industri makanan di Jepang.',
      'Batch kali ini memiliki kuota terbatas hanya untuk 30 peserta, dengan target keberangkatan pada musim gugur (Oktober - November). Mengingat animo yang selalu tinggi, kami menyarankan calon peserta untuk segera mendaftar.',
      'Program pelatihan akan dimulai pada bulan Mei dan berlangsung selama 6 bulan. Materi pelatihan mencakup bahasa Jepang N4, pengetahuan tentang pengolahan makanan, standar keamanan pangan Jepang (HACCP), serta persiapan ujian skill SSW.',
      'Peserta yang berhasil lulus ujian akan langsung diproses untuk penempatan di perusahaan-perusahaan pengolahan makanan di berbagai wilayah di Jepang, termasuk Hokkaido, Chiba, Shizuoka, dan Fukuoka.',
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
};
