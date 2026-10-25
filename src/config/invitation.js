/**
 * Invitation configuration with bilingual hero and English sections from details onwards,
 * featuring the custom YouTube Short audio (Surah Ar-Rum 30:21).
 */
export const invitation = {
  brand: {
    name: 'Wedding of Umar & Aiman',
    attribution: 'Designed with love for Umar & Aiman',
    socialUrl: '',
    socialLabel: 'Follow us',
  },

  couple: {
    groom: 'عمر',
    bride: 'ايمن',
    groomLatin: 'Umar',
    brideLatin: 'Aiman',
  },

  families: {
    groom: {
      title: "Groom's Family",
      names: ["Mr. & Mrs. [Groom's Parents]"],
    },
    bride: {
      title: "Bride's Family",
      names: ["Mr. & Mrs. [Bride's Parents]"],
    },
  },

  // ISO date with explicit UTC offset + matching IANA zone
  event: {
    start: '2026-12-18T19:00:00+05:00',
    end: '2026-12-18T23:30:00+05:00',
    timeZone: 'Asia/Karachi',
    title: 'Wedding of Umar & Aiman',
    description: 'We joyfully invite you to celebrate our wedding ceremony.',
  },

  opening: {
    titleAr: 'دعوة زفاف',
    titleEn: 'Wedding Invitation',
    welcome: 'Welcome to our wedding celebration',
    hintAr: 'دُقّوا على الباب ثلاث دقّاتٍ ليُفتح',
    hintEn: 'Tap the door 3 times to open',
    tapPromptAr: 'انقر على الباب',
    tapPromptEn: 'Tap on the door',
  },

  hero: {
    messageAr: 'وبدأت حكايتنا بدعوةٍ مباركة، ويكتمل فرحها وسرورها بحضوركم وتشريفكم.',
    messageEn: 'Our story began with a blessed prayer, and our joy is complete with your warm presence.',
    scrollCueAr: 'مرّروا للأسفل',
    scrollCueEn: 'Scroll Down',
  },

  verse: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    referenceAr: 'سورة الروم — آية ۲۱',
    urdu: 'اور اس کی نشانیوں میں سے یہ ہے کہ اس نے تمہارے لیے تمہاری ہی جنس سے جوڑے بنائے تاکہ تم ان کے پاس سکون حاصل کرو اور تمہارے درمیان محبت اور رحمت پیدا کر دی۔',
    referenceUrdu: 'سورۃ الروم (آیت ۲۱)',
    english: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
    referenceEng: 'Surah Ar-Rum (30:21)',
  },

  details: {
    eyebrow: 'With Love & Honor',
    title: 'The Wedding Invitation',
    message:
      'With hearts filled with joy and gratitude to Allah Almighty, we request the pleasure of your company and prayers to celebrate the wedding of our beloved children.',
    ceremony: 'The Nikkah ceremony will be held in the presence of family before the reception.',
  },

  schedule: [
    { name: 'Guest Welcome & Reception', start: '19:00', description: 'Welcoming guests with drinks and refreshments' },
    { name: 'Barat & Grand Entrance', start: '20:00', end: '20:30', description: 'Arrival of the groom and family' },
    { name: 'Dinner Banquet', start: '21:00', end: '22:00', description: 'Enjoy a celebratory dinner feast' },
    { name: 'Cake Cutting & Farewell', start: '22:30', description: 'Cherished memories and blessings (Rukhsati)' },
  ],

  venue: {
    eyebrow: "We Can't Wait To Celebrate With You",
    title: 'The Venue',
    name: 'Grand Celebration Hall',
    address: 'Main Boulevard, Gulberg, Lahore, Pakistan',
    image: '',
    imageAlt: 'Wedding Venue',
    mapsUrl: 'https://maps.google.com/?q=Lahore+Pakistan',
    embedQuery: '',
  },

  rsvp: {
    whatsapp: '923001234567',
    maxExtraGuests: 4,
    deadlineNote: 'Kindly confirm your attendance by December 11, 2026',
  },

  // Audio: Asma-ul-Husna by Atif Aslam
  music: {
    src: '/assets/asma-ul-husna.webm',
    title: 'أسماء الله الحسنى — عاطف أسلم (Asma-ul-Husna)',
  },

  closing: 'Your warm presence and heartfelt prayers are our greatest gift.',

  colors: {
    ivory: '#fbf7ef',
    cream: '#f3ebdc',
    champagne: '#e8d9bd',
    gold: '#b08d57',
    goldDeep: '#8a6a3b',
    ink: '#3d3127',
    inkSoft: '#6f6152',
    door: '#6b4a2f',
    doorDeep: '#4a3220',
  },
}
