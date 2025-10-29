export type WorkDetailSection =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "highlight"; label: string; value: string }
  | { type: "image"; src: string; alt: string };

export type WorkProject = {
  id: number;
  companyName: string;
  date: string;
  imageUrl: string;
  description: string;
  stack: string[];
  overview: string;
  detailSections: WorkDetailSection[];
};

export const workProjects: WorkProject[] = [
  {
    id: 1,
    companyName: "Starbucks Cafe",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company2.png",
    description:
      "A kinetic storefront that adapts to customer intent, blending motion design with headless commerce.",
    stack: ["NextJs 16", "Tailwindcss"],
    overview:
      "Kami merancang ulang pengalaman retail Starbucks menjadi etalase kinetik yang bereaksi terhadap pola kunjungan pelanggan secara real time.",
    detailSections: [
      {
        type: "heading",
        text: "Tantangan",
      },
      {
        type: "paragraph",
        text: "Tim Starbucks Indonesia ingin menghadirkan pengalaman retail yang lebih hidup dan personal, namun tetap ringan dijalankan oleh tim marketing internal.",
      },
      {
        type: "list",
        title: "Tujuan utama",
        items: [
          "Memberikan landing page dinamis yang berubah sesuai waktu dan promo",
          "Mengoptimalkan performa supaya animasi tetap halus di seluruh perangkat",
          "Membuka jalan untuk integrasi ecommerce di fase berikutnya",
        ],
      },
      {
        type: "heading",
        text: "Solusi",
      },
      {
        type: "paragraph",
        text: "Kami membangun layout modular dengan kontrol visual berbasis CMS sehingga tim internal dapat mengganti konten tanpa menyentuh kode.",
      },
      {
        type: "image",
        src: "/img/contents/project-company2.png",
        alt: "Preview Starbucks kinetic storefront",
      },
      {
        type: "highlight",
        label: "Hasil",
        value: "↑37% waktu kunjungan dan 2x lebih banyak klik pada kampanye utama.",
      },
    ],
  },
  {
    id: 2,
    companyName: "Flux OS",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company2.png",
    description:
      "Live data orchestration with volumetric UI depth, crafted for ultra-fast decision loops.",
    stack: ["NextJs 16", "Tailwindcss", "GSAP", "Shadcn", "NestJs"],
    overview:
      "Flux membutuhkan antarmuka operasi yang mampu merangkum data sensorik kompleks menjadi keputusan tegas dalam beberapa detik.",
    detailSections: [
      {
        type: "heading",
        text: "Kerangka Produk",
      },
      {
        type: "paragraph",
        text: "Kami memetakan ulang alur kerja operator Flux dan menyusun ulang komponen UI menjadi modul yang dapat diatur ulang sesuai kebutuhan tiap tim.",
      },
      {
        type: "list",
        title: "Pilar desain",
        items: [
          "Navigasi spasial dengan kedalaman untuk membedakan prioritas data",
          "Motion sebagai petunjuk atensi, bukan sekadar estetika",
          "Tema gelap adaptif untuk ruangan kontrol dengan pencahayaan rendah",
        ],
      },
      {
        type: "highlight",
        label: "Kecepatan update",
        value: "≤ 220ms latency dari data masuk ke layar operator.",
      },
    ],
  },
  {
    id: 3,
    companyName: "Nimbus Robotics",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company2.png",
    description:
      "Control interfaces engineered for precision robotics - calibrated for clarity in high-pressure teams.",
    stack: ["NextJs 16", "Tailwindcss"],
    overview:
      "Nimbus membutuhkan dashboard yang membantu teknisi memahami status robot dalam hitungan detik, bukan menit.",
    detailSections: [
      {
        type: "heading",
        text: "Pendekatan",
      },
      {
        type: "paragraph",
        text: "Kami memprioritaskan kejelasan: tipografi besar, kode warna tajam, dan panel data yang dapat di-pin sesuai skenario operasi.",
      },
      {
        type: "highlight",
        label: "Mode darurat",
        value: "Satu tombol untuk mengaktifkan protokol keselamatan lintas 5 unit robot.",
      },
    ],
  },
  {
    id: 4,
    companyName: "Solstice Studio",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company2.png",
    description:
      "Interactive narrative that channels sound, light, and motion to express a bold creative identity.",
    stack: ["NextJs 16", "Tailwindcss"],
    overview:
      "Studio kreatif ini ingin menampilkan portfolio seperti instalasi seni digital: penuh ritme dan resonansi audio visual.",
    detailSections: [
      {
        type: "paragraph",
        text: "Kami menulis sistem scroll-synced storytelling yang menggabungkan tipografi, audio, dan cahaya dinamis yang berubah mengikuti narasi.",
      },
    ],
  },
  {
    id: 5,
    companyName: "Kairo AI",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company2.png",
    description:
      "Sensor-fed interface visualizing anomaly detection with confidence shading and adaptive focus.",
    stack: ["NextJs 16", "Tailwindcss"],
    overview:
      "Kairo menginginkan cara memvisualisasikan deteksi anomali yang mengkomunikasikan tingkat kepercayaan sistem secara intuitif.",
    detailSections: [
      {
        type: "paragraph",
        text: "Kami memperkenalkan 'confidence shading' sebagai bahasa visual baru: semakin pekat warna, semakin tinggi prioritas intervensi.",
      },
      {
        type: "highlight",
        label: "Integrasi",
        value: "Terkoneksi langsung dengan pipeline ML internal via API NestJS.",
      },
    ],
  },
];
