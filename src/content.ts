/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE
 *  Names, dates, venues, family lists, Marathi + English copy, music, photos.
 *  Nothing else in the project needs changing for normal content updates.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Language = 'mr' | 'en';

export type Bilingual = {
  mr: string;
  en: string;
};

export type EventKind = 'haldi' | 'vivah' | 'pritibhoj';

export type WeddingEvent = {
  id: string;
  kind: EventKind;
  kicker: Bilingual;
  name: Bilingual;
  date: Bilingual;
  time: Bilingual;
  venue: Bilingual;
  description: Bilingual;
  /** With an explicit +05:30 offset so Indian Standard Time is always correct. */
  startISO: string;
  endISO: string;
  featured?: boolean;
};

export type FamilyMember = {
  relation: Bilingual;
  names: Bilingual[];
};

export type FamilyGroup = {
  id: string;
  side: Bilingual;
  familyName: Bilingual;
  members: FamilyMember[];
};

export const content = {
  /**
   * The public address of the finished invitation.
   * IMPORTANT: change this after deploying so WhatsApp previews + sharing work.
   * You can also override it at build time with VITE_SITE_URL.
   */
  siteUrl: 'https://abhishek-rutika.vercel.app',

  seo: {
    title: 'अभिषेक ♥ रुतिका — शुभविवाह आमंत्रण',
    titleEn: 'Abhishek & Rutika — Wedding Invitation',
    description:
      'सोमवार, २७ डिसेंबर २०२७ · स्टार लॉन्स, भुसावळ — अभिषेक व रुतिका यांच्या शुभविवाहास आपले सहर्ष आमंत्रण.',
    descriptionEn:
      'Monday, 27 December 2027 · Star Lawns, Bhusawal — you are warmly invited to the wedding of Abhishek & Rutika.',
    shareTitle: 'दोन घरं, एक उत्सव.',
    shareDescription:
      'आपल्या आशीर्वादासाठी आतुर — अभिषेक व रुतिका.',
    keywords:
      'अभिषेक रुतिका लग्न, Abhishek Rutika wedding, digital wedding invitation, Marathi wedding invite, Star Lawns Bhusawal',
    themeColor: '#2b0710',
    ogImage: '/og-cover.png',
    locale: 'mr_IN',
    localeAlternate: 'en_IN',
  },

  hashtag: '#AbhishekWedsRutika',

  couple: {
    groom: {
      name: { mr: 'अभिषेक', en: 'Abhishek' },
      fullName: { mr: 'अभिषेक पाटील', en: 'Abhishek Patil' },
    },
    bride: {
      name: { mr: 'रुतिका', en: 'Rutika' },
      fullName: { mr: 'रुतिका चौधरी', en: 'Rutika Chaudhari' },
    },
    marathiTitle: 'अभिषेक व रुतिका',
    englishTitle: 'Abhishek weds Rutika',
    monogram: { mr: 'अ ♥ र', en: 'A ♥ R' },
  },

  /** The wedding muhurat — also used by the countdown. */
  wedding: {
    startISO: '2027-12-27T18:45:00+05:30',
    endISO: '2027-12-27T23:00:00+05:30',
    date: { mr: 'सोमवार, २७ डिसेंबर २०२७', en: 'Monday, 27 December 2027' },
    shortDate: { mr: '२७ डिसेंबर २०२७', en: '27 December 2027' },
    time: { mr: 'सायंकाळी ६:४५', en: '6:45 PM' },
    timezone: { mr: 'भारतीय प्रमाणवेळ', en: 'Indian Standard Time' },
  },

  opening: {
    blessing: '॥ श्री गणेशाय नमः ॥',
    families: { mr: 'पाटील व चौधरी परिवार', en: 'The Patil & Chaudhari families' },
    kicker: { mr: 'शुभविवाहास सस्नेह निमंत्रण', en: 'You are warmly invited to the wedding of' },
    date: { mr: 'सोमवार · २७ डिसेंबर २०२७', en: 'Monday · 27 December 2027' },
    venue: { mr: 'स्टार लॉन्स · भुसावळ', en: 'Star Lawns · Bhusawal' },
    note: { mr: 'सस्नेह निमंत्रण', en: 'A warm invitation' },
  },

  hero: {
    blessing: '॥ श्री गणेशाय नमः ॥',
    eyebrow: { mr: 'पाटील व चौधरी परिवार', en: 'The Patil & Chaudhari families' },
    kicker: { mr: 'शुभविवाहास सस्नेह आमंत्रण', en: 'You are warmly invited to our wedding' },
    scrollHint: { mr: 'सोहळ्याकडे चला', en: 'Scroll to the celebration' },
    dateLine: { mr: 'सोमवार · २७ डिसेंबर २०२७', en: 'Monday · 27 December 2027' },
    venueLine: { mr: 'स्टार लॉन्स, भुसावळ', en: 'Star Lawns, Bhusawal' },
    saveTheDate: { mr: 'मंगल तिथी', en: 'Save the date' },
    note: { mr: 'अभिषेक व रुतिका', en: 'Abhishek & Rutika' },
  },

  invitation: {
    eyebrow: { mr: 'मंगल निमंत्रण', en: 'The invitation' },
    title: { mr: 'आपले मनःपूर्वक स्वागत', en: 'With all our hearts' },
    traditional: {
      mr: 'श्री गणेशाच्या कृपेने व आई-वडिलांच्या आशीर्वादाने, आमच्या लाडक्या लेकरांचा शुभविवाह सोहळा आपल्या उपस्थितीने शोभून येईल.',
      en: 'With the grace of Lord Ganesha and the blessings of our elders, we invite you to grace the wedding of our beloved children.',
    },
    message: {
      mr: 'दोन घरांचे एक होणे, हा केवळ एक विवाह नाही — तो आपुलकीचा, आशीर्वादांचा आणि नात्यांचा उत्सव आहे. अभिषेक आणि रुतिका नव्या प्रवासास सुरुवात करत आहेत, आणि आपल्या हसऱ्या चेहऱ्यांशिवाय हा सोहळा अपूर्णच राहील. आपण सहकुटुंब सहपरिवार उपस्थित राहून नवदांपत्यास आशीर्वाद द्यावेत, ही आमची मनःपूर्वक विनंती.',
      en: 'Two families becoming one home — this is not just a wedding, but a celebration of love, blessings, and the bonds that bring us together. As Abhishek and Rutika begin their new journey, the day will only feel complete with you beside us. Please join us with your family and shower the couple with your blessings.',
    },
    hostsTitle: { mr: 'आमंत्रक परिवार', en: 'Inviting families' },
    hosts: [
      {
        id: 'patil',
        side: { mr: 'वरपक्ष', en: "Groom's family" },
        familyName: { mr: 'पाटील परिवार', en: 'The Patil family' },
        names: {
          mr: 'श्री. अशोक पाटील व सौ. विजया पाटील',
          en: 'Shri Ashok Patil & Smt. Vijaya Patil',
        },
      },
      {
        id: 'chaudhari',
        side: { mr: 'वधूपक्ष', en: "Bride's family" },
        familyName: { mr: 'चौधरी परिवार', en: 'The Chaudhari family' },
        names: {
          mr: 'श्री. राजेंद्र चौधरी व सौ. प्रिती चौधरी',
          en: 'Shri Rajendra Chaudhari & Smt. Priti Chaudhari',
        },
      },
    ],
    welcome: {
      mr: 'सहकुटुंब सहपरिवार आपले सहर्ष स्वागत आहे.',
      en: 'We warmly welcome you and your family.',
    },
    signature: { mr: 'सस्नेह — पाटील व चौधरी परिवार', en: 'With love, the Patil & Chaudhari families' },
  },

  /**
   * Optional couple photograph.
   * Leave `src` empty for the hand-drawn monogram arch.
   * Add a file to /public/images and set src: '/images/couple.jpg'.
   */
  photo: {
    src: '',
    alt: { mr: 'अभिषेक आणि रुतिका', en: 'Abhishek and Rutika' },
    kicker: { mr: 'आमचा क्षण', en: 'A moment of us' },
    caption: { mr: 'एका नव्या प्रवासाची सुरुवात', en: 'The beginning of a new journey' },
  },

  countdown: {
    eyebrow: { mr: 'शुभविवाह', en: 'The wedding' },
    title: { mr: 'मंगल घडी', en: 'The auspicious hour' },
    subtitle: {
      mr: 'अभिषेक व रुतिका यांच्या शुभविवाहास उरलेला वेळ',
      en: 'Counting down to Abhishek & Rutika’s wedding',
    },
    note: {
      mr: 'सोमवार, २७ डिसेंबर २०२७ · सायंकाळी ६:४५ · भारतीय प्रमाणवेळ',
      en: 'Monday, 27 December 2027 · 6:45 PM · Indian Standard Time',
    },
    complete: { mr: 'आज मंगल दिन!', en: 'Today is the day!' },
    completeNote: { mr: 'आपल्या शुभेच्छा आणि आशीर्वादासह.', en: 'With your love and blessings.' },
    labels: {
      days: { mr: 'दिवस', en: 'days' },
      hours: { mr: 'तास', en: 'hours' },
      minutes: { mr: 'मिनिटे', en: 'minutes' },
      seconds: { mr: 'सेकंद', en: 'seconds' },
    },
  },

  events: {
    eyebrow: { mr: 'सोहळ्याचे क्षण', en: 'The celebrations' },
    title: { mr: 'तीन क्षण, एक आठवण', en: 'Three moments, one memory' },
    subtitle: {
      mr: 'आपल्या उपस्थितीने प्रत्येक क्षण साजरा होईल.',
      en: 'Each moment will be complete with you there.',
    },
    list: [
      {
        id: 'haldi',
        kind: 'haldi',
        kicker: { mr: 'सोहळ्याची सुरुवात', en: 'The celebrations begin' },
        name: { mr: 'हळद', en: 'Haldi' },
        date: { mr: 'रविवार, २६ डिसेंबर २०२७', en: 'Sunday, 26 December 2027' },
        time: { mr: 'दुपारी ४:०० वाजता', en: '4:00 PM onwards' },
        venue: { mr: 'स्टार लॉन्स, भुसावळ', en: 'Star Lawns, Bhusawal' },
        description: {
          mr: 'हळदीचा सुगंध, मंगलाष्टकांचा नाद आणि आपल्या हसण्याने उजळणारा दुपारचा सोहळा.',
          en: 'Turmeric, marigolds and laughter — an afternoon of blessings to begin the celebrations.',
        },
        startISO: '2027-12-26T16:00:00+05:30',
        endISO: '2027-12-26T20:00:00+05:30',
      },
      {
        id: 'vivah',
        kind: 'vivah',
        kicker: { mr: 'मुख्य सोहळा', en: 'The main day' },
        name: { mr: 'शुभविवाह', en: 'Wedding' },
        date: { mr: 'सोमवार, २७ डिसेंबर २०२७', en: 'Monday, 27 December 2027' },
        time: { mr: 'सायंकाळी ६:४५ वाजता', en: '6:45 PM' },
        venue: { mr: 'स्टार लॉन्स, भुसावळ', en: 'Star Lawns, Bhusawal' },
        description: {
          mr: 'मंगलाष्टकं, अक्षता आणि सात जन्मांची शपथ — अभिषेक आणि रुतिकाच्या नव्या प्रवासाची मंगल सुरुवात.',
          en: 'Mangalashtakas, akshata and seven vows — the auspicious beginning of a new journey.',
        },
        startISO: '2027-12-27T18:45:00+05:30',
        endISO: '2027-12-27T23:00:00+05:30',
        featured: true,
      },
      {
        id: 'pritibhoj',
        kind: 'pritibhoj',
        kicker: { mr: 'स्नेहभोजन', en: 'Dinner & fellowship' },
        name: { mr: 'प्रीतिभोज', en: 'Pritibhoj' },
        date: { mr: 'सोमवार, २७ डिसेंबर २०२७', en: 'Monday, 27 December 2027' },
        time: { mr: 'सायंकाळी ६:०० ते रात्री ११:००', en: '6:00 PM – 11:00 PM' },
        venue: { mr: 'स्टार लॉन्स, भुसावळ', en: 'Star Lawns, Bhusawal' },
        description: {
          mr: 'आपुलकीचे जेवण, गप्पांची मैफल आणि आठवणींची मेजवानी.',
          en: 'A warm meal, unhurried conversations and memories to carry home.',
        },
        startISO: '2027-12-27T18:00:00+05:30',
        endISO: '2027-12-27T23:00:00+05:30',
      },
    ] satisfies WeddingEvent[],
    mainEventId: 'vivah',
  },

  venue: {
    eyebrow: { mr: 'सोहळ्याचे स्थळ', en: 'The venue' },
    title: { mr: 'स्टार लॉन्स, भुसावळ', en: 'Star Lawns, Bhusawal' },
    name: { mr: 'स्टार लॉन्स', en: 'Star Lawns' },
    address: {
      mr: 'स्टार लॉन्स, भुसावळ, जिल्हा जळगाव, महाराष्ट्र',
      en: 'Star Lawns, Bhusawal, Jalgaon District, Maharashtra',
    },
    description: {
      mr: 'हळद, शुभविवाह आणि प्रीतिभोज — तिन्ही सोहळे स्टार लॉन्स येथेच होतील. आपल्या आगमनाची वाट पाहत आहोत.',
      en: 'Haldi, the wedding and the Pritibhoj will all take place at Star Lawns. We look forward to welcoming you.',
    },
    regionLine: { mr: 'भुसावळ · महाराष्ट्र', en: 'Bhusawal · Maharashtra' },
    mapQuery: 'Star Lawns, Bhusawal, Maharashtra',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Star+Lawns%2C+Bhusawal%2C+Maharashtra',
    directionsNote: {
      mr: 'Google Maps मध्ये “स्टार लॉन्स, भुसावळ” असे शोधा.',
      en: 'Search for “Star Lawns, Bhusawal” in Google Maps.',
    },
    calendarTitle: { mr: 'सोहळ्याच्या तारखा जोडा', en: 'Keep the dates' },
    calendarNote: {
      mr: 'एका टॅपमध्ये आपल्या कॅलेंडरमध्ये जोडा.',
      en: 'Add each celebration to your calendar in one tap.',
    },
  },

  families: {
    eyebrow: { mr: 'आमचे लोक', en: 'Our people' },
    title: { mr: 'आमच्या परिवाराकडून', en: 'With love, from our families' },
    intro: {
      mr: 'प्रत्येक घराचे प्रेम आणि मोठ्यांचे आशीर्वाद — या सोहळ्याची हीच खरी शोभा. आमच्यासोबत उभे असलेले हे सारे चेहरे, आमच्या आनंदाचे खरे भांडवल आहेत.',
      en: 'The love of every home and the blessings of our elders are the true beauty of this celebration. These are the people who make our joy complete.',
    },
    groups: [
      {
        id: 'patil',
        side: { mr: 'वरपक्ष', en: "Groom's family" },
        familyName: { mr: 'पाटील परिवार', en: 'The Patil family' },
        members: [
          {
            relation: { mr: 'आई-वडील', en: 'Parents' },
            names: [
              { mr: 'श्री. अशोक पाटील', en: 'Shri Ashok Patil' },
              { mr: 'सौ. विजया पाटील', en: 'Smt. Vijaya Patil' },
            ],
          },
        ],
      },
      {
        id: 'chaudhari',
        side: { mr: 'वधूपक्ष', en: "Bride's family" },
        familyName: { mr: 'चौधरी परिवार', en: 'The Chaudhari family' },
        members: [
          {
            relation: { mr: 'आई-वडील', en: 'Parents' },
            names: [
              { mr: 'श्री. राजेंद्र चौधरी', en: 'Shri Rajendra Chaudhari' },
              { mr: 'सौ. प्रिती चौधरी', en: 'Smt. Priti Chaudhari' },
            ],
          },
        ],
      },
    ] satisfies FamilyGroup[],
    compliments: {
      label: { mr: 'स्नेहांकित', en: 'With best compliments' },
      names: { mr: 'पाटील व चौधरी परिवार', en: 'The Patil & Chaudhari families' },
    },
    blessing: {
      mr: 'आपले आगमन हीच आमची शोभा',
      en: 'Your presence is our honour',
    },
    closing: {
      mr: 'आपल्या शुभेच्छा, आशीर्वाद आणि सहभागासाठी मनःपूर्वक धन्यवाद.',
      en: 'Thank you, in advance, for your love, blessings and presence.',
    },
  },

  footer: {
    blessing: '॥ शुभं भवतु ॥',
    line: { mr: 'आपल्या शुभेच्छा आणि आशीर्वादासह', en: 'With your love and blessings' },
    thanks: {
      mr: 'या मंगल सोहळ्यात आपल्या उपस्थितीची आम्हाला आतुरता आहे.',
      en: 'We look forward to celebrating this auspicious day with you.',
    },
    share: {
      mr: 'अभिषेक व रुतिका यांच्या शुभविवाहास आपले सहर्ष आमंत्रण! 💛\nसोमवार, २७ डिसेंबर २०२७ · स्टार लॉन्स, भुसावळ\n\nआमंत्रण पाहा: ',
      en: 'You are warmly invited to the wedding of Abhishek & Rutika! 💛\nMonday, 27 December 2027 · Star Lawns, Bhusawal\n\nOpen the invitation: ',
    },
  },

  /**
   * MUSIC
   * Leave src empty to use the original, built-in tanpura-inspired ambient score
   * (generated live in the browser — no audio file, no copyright concerns).
   * To use your own song: put it in /public/audio and set src: '/audio/your-song.mp3'.
   */
  music: {
    src: '',
    volume: 0.55,
    title: { mr: 'सोहळ्याचे संगीत', en: 'The wedding score' },
    credit: { mr: 'मूळ ध्वनी — Aaiyeji', en: 'Original score — Aaiyeji' },
  },

  brand: {
    name: 'AAIYEJI',
    url: 'https://aaiyeji.vercel.app',
    line: {
      mr: 'एक सुंदर निमंत्रण, एका आठवणीसाठी.',
      en: 'A beautiful way to say, you’re invited.',
    },
  },

  ui: {
    skipToContent: { mr: 'मुख्य मजकुराकडे जा', en: 'Skip to content' },
    languageLabel: { mr: 'भाषा', en: 'Language' },
    marathi: 'मराठी',
    english: 'EN',
    openInvitation: { mr: 'आमंत्रण उघडा', en: 'Open the invitation' },
    tapToOpen: { mr: 'स्पर्श करून आमंत्रण उघडा', en: 'Tap to open the invitation' },
    withMusic: { mr: 'संगीतासह', en: 'with music' },
    openingFootnote: { mr: 'सस्नेह निमंत्रण', en: 'A warm invitation' },
    scrollHint: { mr: 'सोहळ्याकडे चला', en: 'Scroll to the celebration' },
    musicPlay: { mr: 'संगीत सुरू करा', en: 'Play music' },
    musicPause: { mr: 'संगीत बंद करा', en: 'Mute music' },
    musicPlaying: { mr: 'संगीत सुरू आहे', en: 'Music is playing' },
    musicMuted: { mr: 'संगीत बंद आहे', en: 'Music is muted' },
    countdownComplete: { mr: 'आज मंगल दिन!', en: 'Today is the day!' },
    mainDay: { mr: 'मुख्य सोहळा', en: 'The main day' },
    directions: { mr: 'दिशा मिळवा', en: 'Get directions' },
    addToCalendar: { mr: 'कॅलेंडरमध्ये जोडा', en: 'Add to calendar' },
    saveAllDates: { mr: 'सर्व तारखा जोडा', en: 'Save all dates' },
    calendarDownloaded: { mr: 'कॅलेंडर फाइल डाउनलोड झाली', en: 'Calendar file downloaded' },
    calendarError: { mr: 'कॅलेंडर फाइल तयार करता आली नाही', en: 'Could not create the calendar file' },
    musicUnavailable: {
      mr: 'या ब्राउझरमध्ये संगीत उपलब्ध नाही.',
      en: 'Music is not available in this browser.',
    },
    shareWhatsApp: { mr: 'व्हॉट्सॲपवर शेअर करा', en: 'Share on WhatsApp' },
    copyLink: { mr: 'लिंक कॉपी करा', en: 'Copy link' },
    linkCopied: { mr: 'लिंक कॉपी झाली', en: 'Link copied' },
    copyError: { mr: 'लिंक कॉपी करता आली नाही', en: 'Could not copy the link' },
    opensInNewTab: { mr: 'नवीन टॅबमध्ये उघडते', en: 'opens in a new tab' },
    eventLocation: { mr: 'ठिकाण', en: 'Venue' },
    photoAlt: { mr: 'अभिषेक आणि रुतिका यांचे छायाचित्र', en: 'A photograph of Abhishek and Rutika' },
    madeWithLove: { mr: 'प्रेमाने बनवले', en: 'Made with love' },
    craftedBy: { mr: 'आयेजीकडून', en: 'Crafted by Aaiyeji' },
    viewInvitation: { mr: 'आमंत्रण पाहा', en: 'Open invitation' },
    familyPlaceholderHint: { mr: 'बदलण्यासाठी content.ts मध्ये संपादित करा', en: 'Edit in content.ts to replace' },
    backToTop: { mr: 'पुन्हा वर जा', en: 'Back to top' },
  },
} as const;

export type Content = typeof content;
export type WeddingEventList = typeof content.events.list;

/** All events, handy for the venue section and .ics export. */
export const weddingEvents: WeddingEvent[] = content.events.list;

export const navSections = [
  { id: 'invitation', label: { mr: 'निमंत्रण', en: 'Invitation' } },
  { id: 'events', label: { mr: 'सोहळे', en: 'Events' } },
  { id: 'venue', label: { mr: 'स्थळ', en: 'Venue' } },
  { id: 'families', label: { mr: 'परिवार', en: 'Families' } },
] satisfies Array<{ id: string; label: Bilingual }>;
