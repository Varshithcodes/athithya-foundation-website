// ── Google Apps Script Configuration ──
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynWy0eUcqv6FliR-pKinCOE3bzMDojNvBdEDbKDA3f47rtXlS6zOK3vWP6bZseRb9U/exec';

function sendToGoogleSheet(data) {
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).catch(err => console.error('Google Sheet Sync Error:', err));
}

// ── Sanity.io Configuration ──
const SANITY_PROJECT_ID = 'm5wsa8rt';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2023-01-01';

const SANITY_QUERY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

// ── Remove Loader on Load ──
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-wrap');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 200);
  }
});

// ── Sanity Image Helper ──
function urlFor(source) {
  if (!source || !source.asset || !source.asset._ref) return '';
  const ref = source.asset._ref;
  const [_file, id, dimensions, extension] = ref.split('-');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${extension}`;
}

async function sanityFetch(query) {
  const url = `${SANITY_QUERY_URL}?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Sanity Fetch Error:', error);
    return null;
  }
}

// ── Program data for Learn More modal ──
const programData = {
  school: {
    emoji: '',
    tag: 'Education',
    title: 'Government School Adoption',
    img: 'images/architecture-independence-palace-ho-chi-minh-city.jpg',
    desc: 'Athithya Foundation® partners with government schools to provide complete infrastructure upgrades from new furniture and sanitation to libraries, computers, and learning resources. We work with school management, parents, and local authorities to create a holistic transformation that lasts well beyond a single academic year. Each adopted school receives dedicated mentoring support, teacher training, and quarterly impact assessments to track progress and celebrate milestones.'
  },
  foundational: {
    emoji: '',
    tag: 'Foundational Learning',
    title: 'Foundational Learning Enhancement',
    img: 'images/Coalition for foundational learning.jpg.webp',
    desc: 'Millions of children in government schools lack basic literacy and numeracy skills by Grade 3. Our Foundational Learning programme deploys trained volunteers and evidence-based materials designed by educational experts to bridge this gap. Through small-group instruction, gamified learning tools, and regular assessments, we ensure every child can read, write, and count by the end of primary school - building the confidence they need for the rest of their academic journey.'
  },
  smart: {
    emoji: '',
    tag: 'Digital Access',
    title: 'Smart Classrooms & Digital Access',
    img: 'images/img3 educlassrooms.jpeg',
    desc: 'We install interactive projectors, Android learning tablets, and high-speed internet connectivity in government classrooms. Teachers are trained to integrate these tools into their daily lessons using a curated digital content library aligned to the state curriculum. Our Smart Classroom initiative has already transformed learning experiences for thousands of students who had never had access to technology, igniting curiosity and preparing them for a digital future.'
  },
  library: {
    emoji: '',
    tag: 'Reading',
    title: 'Library & Reading Initiatives',
    img: 'images/lib.avif',
    desc: 'A love for reading is one of the greatest gifts we can give a child. We set up fully-stocked, beautifully designed libraries inside government schools filled with age-appropriate books in Kannada and English, magazines, and activity kits. Weekly reading circles, storytelling sessions, and book-of-the-month clubs are run by trained reading facilitators. We also run a book-donation drive, collecting gently-used books from the public and redistributing them to children who need them most.'
  },
  teacher: {
    emoji: '',
    tag: 'Capacity Building',
    title: 'Teacher Capacity Building',
    img: 'images/teacher.jpg',
    desc: 'Great teachers are the backbone of great schools. Our intensive Teacher Capacity Building workshops run over weekends and school holidays, covering modern pedagogy, classroom management techniques, digital tool integration, subject-matter deepening, and emotional intelligence. Partnering with experienced educators and child psychologists, we equip government school teachers with both the skills and the confidence to transform their classrooms because when a teacher grows, every child in their class benefits.'
  },
  women: {
    emoji: '',
    tag: 'Social Impact',
    title: 'Women & Youth Empowerment',
    img: 'images/img3.webp',
    desc: 'Beyond the classroom, Athithya Foundation® runs targeted programmes for women and youth from underserved communities. Our Women\'s Empowerment cohorts offer vocational skill training, financial literacy, legal awareness, and entrepreneurship mentoring. Our Youth Leadership Camps help adolescent boys and girls develop communication, civic responsibility, and career readiness skills. We believe that an empowered generation of women and youth is the surest path to a more equitable and prosperous Karnataka.'
  }
};

function showProgramInfo(id) {
  const p = programData[id];
  if (!p) return;
  const modalImg = document.getElementById('progModalEmoji');
  if (modalImg) {
    modalImg.textContent = p.emoji;
    if (p.img) {
      modalImg.style.backgroundImage = `url('${p.img}')`;
    } else {
      modalImg.style.backgroundImage = 'none';
    }
  }
  document.getElementById('progModalTag').textContent = p.tag;
  document.getElementById('progModalTitle').textContent = p.title;
  document.getElementById('progModalDesc').textContent = p.desc;
  document.getElementById('infoModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeProgramModal() {
  document.getElementById('infoModal').classList.remove('show');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeProgramModal(); closeLightbox(); } });

// ── Cactus Comments init ──
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initComments === 'function') {
    initComments({
      node: document.getElementById('comment-section'),
      defaultHomeserverUrl: 'https://matrix.cactus.chat:8448',
      serverName: 'cactus.chat',
      siteName: 'athithya-foundation',
      commentSectionId: 'general',
    });
  }
});

// ── Mobile menu toggle ──
function toggleMenu() {
  const m = document.getElementById('mobmenu');
  m.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobmenu').classList.remove('open');
}

// ── Right FAB menu toggle ──
function toggleFabMenu() {
  const btn = document.getElementById('fabBtn');
  const menu = document.getElementById('fabMenu');
  if (btn && menu) {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  }
}

document.addEventListener('click', (e) => {
  const btn = document.getElementById('fabBtn');
  const menu = document.getElementById('fabMenu');
  if (btn && menu && menu.classList.contains('open') && !btn.contains(e.target) && !menu.contains(e.target)) {
    btn.classList.remove('open');
    menu.classList.remove('open');
  }
});

// ── Gallery lightbox ──
function openLightbox(title, location, imgSrc) {
  const captionParts = [title, location].filter(Boolean);
  document.getElementById('lbox-caption').textContent = captionParts.join(' - ');

  const lboxContent = document.getElementById('lbox-img-content');
  if (imgSrc) {
    lboxContent.innerHTML = `<img src="${imgSrc}" style="max-width:100%; max-height:100%; object-fit:contain;" />`;
  } else {
    lboxContent.innerHTML = '📸';
  }
  document.getElementById('lightbox').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('show');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── Dynamic Gallery Loader ──
document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('.gal-grid');
  if (!grid) return;

  // 1. Try to fetch from Sanity.io
  const query = `*[_type == "galleryItem"] | order(_createdAt desc)`;
  const sanityData = await sanityFetch(query);

  if (sanityData && sanityData.length > 0) {
    renderData(sanityData.map(item => ({
      image: urlFor(item.image),
      title: item.title,
      location: item.caption || item.location || "",
      videoUrl: item.videoUrl
    })));
    return;
  }

  // 2. Fallback to localStorage (or hardcoded data)
  const savedGallery = localStorage.getItem('af_gallery');
  if (savedGallery) {
    try {
      const data = JSON.parse(savedGallery);
      if (Array.isArray(data) && data.length > 0) { renderData(data); return; }
    } catch (e) { }
  }

  // 3. Absolute Fallback
  const fallbackData = [
    { image: "", title: "Smart Classroom Setup", location: "Govt. School, Malleshwaram" },
    { image: "", title: "Community Welfare", location: "Health & Nutrition Camp" },
    { image: "", title: "Digital Literacy Session", location: "Student Training" },
    { image: "", title: "Teacher Training", location: "Pedagogical Development" },
    { image: "", title: "CSR Partner Visit", location: "Corporate Engagement" }
  ];
  renderData(fallbackData);

  function renderData(data) {
    grid.innerHTML = '';
    data.forEach((item, index) => {
      const isTall = index === 0;
      const div = document.createElement('div');
      div.className = isTall ? 'gi tall g1' : `gi g${index + 1}`;
      div.onclick = () => openLightbox(item.title, item.location, item.image);

      const imgHtml = item.image
        ? `<img src="${item.image}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;z-index:0">`
        : `<div class="gi-bg" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;display:flex;align-items:center;justify-content:center;font-size:3rem;background:#f9f9f9;">📸</div>`;

      div.innerHTML = `
        ${imgHtml}
        <div class="gi-ov" style="z-index:1;position:relative;height:100%;"><span>View Photo</span></div>
        <div class="gi-cap" style="z-index:2;position:absolute;bottom:0;left:0;right:0;">
          <p>${item.title}</p><span>${item.location}</span>
        </div>
      `;
      grid.appendChild(div);
    });
  }
});

// ── Shared Sanity Review Loader ──
async function loadSanityReviews() {
  const query = `*[_type == "review" && status == "approved"] | order(_createdAt desc)`;
  const reviews = await sanityFetch(query);
  return reviews || [];
}


// ── Navbar: add shadow on scroll ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('topnav');
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 24px rgba(232,97,10,0.12)';
  } else {
    nav.style.boxShadow = '0 2px 18px rgba(232,97,10,0.07)';
  }
});

// ── Form: Save Contact Message to localStorage & Google Sheets ──
function saveContactForm(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('cf-name')?.value.trim();
  const email = document.getElementById('cf-email')?.value.trim();
  const enquiryType = document.getElementById('cf-type')?.value;
  const message = document.getElementById('cf-message')?.value.trim();
  if (!name || !email || !message) { alert('Please fill in Name, Email and Message.'); return; }

  const submission = {
    sheetName: 'Contact',
    name,
    email,
    enquiryType,
    message,
    date: new Date().toISOString()
  };

  // 1. Save to localStorage
  const submissions = JSON.parse(localStorage.getItem('af_contact') || '[]');
  submissions.push(submission);
  localStorage.setItem('af_contact', JSON.stringify(submissions));

  // 2. Clear form
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-type').selectedIndex = 0;
  document.getElementById('cf-message').value = '';

  // 3. Send to Google Sheets
  sendToGoogleSheet(submission);

  alert('✅ Message sent! We will respond within one business day.');
}

// ── Form: Save CSR Enquiry to localStorage & Google Sheets ──
function saveCsrForm(e) {
  if (e) e.preventDefault();
  const firstName = document.getElementById('csr-fname')?.value.trim();
  const lastName = document.getElementById('csr-lname')?.value.trim();
  const company = document.getElementById('csr-company')?.value.trim();
  const email = document.getElementById('csr-email')?.value.trim();
  const budget = document.getElementById('csr-budget')?.value;
  const message = document.getElementById('csr-message')?.value.trim();

  if (!firstName || !email) { alert('Please fill in at least your name and email.'); return; }

  const submission = {
    sheetName: 'CSR_Companies',
    firstName,
    lastName,
    company,
    email,
    budget,
    message,
    date: new Date().toISOString()
  };

  // 1. Save to localStorage (for admin panel)
  const submissions = JSON.parse(localStorage.getItem('af_csr') || '[]');
  submissions.push(submission);
  localStorage.setItem('af_csr', JSON.stringify(submissions));

  // 2. Clear form
  ['csr-fname', 'csr-lname', 'csr-company', 'csr-email', 'csr-message'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('csr-budget').selectedIndex = 0;

  // 3. Send to Google Sheets
  sendToGoogleSheet(submission);

  alert('✅ Enquiry submitted! Our team will reach out within 24 hours.');
}

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});


// ── Doc modal logic ──
const docData = {
  privacy: {
    title: 'Privacy Policy',
    content: '<p style="margin-bottom:12px;"><strong>Athithya Foundation®</strong> respects your privacy and is committed to protecting your personal data. We collect minimal information required to process donations and communicate our impact. We do not sell or share your personal data with third parties.</p><p style="margin-bottom:12px;">The information we collect is solely used to send updates, newsletters, and donation receipts. We implement appropriate security measures to prevent unauthorized access or disclosure of your information.</p><p>For any privacy-related queries, please contact us at foundationathithya@gmail.com.</p>'
  },
  terms: {
    title: 'Terms & Conditions',
    content: '<p style="margin-bottom:12px;">These Terms & Conditions govern your use of the Athithya Foundation website. By accessing this site, you agree to these terms.</p><p style="margin-bottom:12px;">All donations are final and non-refundable. Athithya Foundation holds the right to utilize the donated funds towards any of our ongoing socio-educational programs as deemed necessary.</p><p>The content on this website is for informational purposes related to our social impact programs. Unauthorized use or reproduction of the materials may violate copyright and trademark laws.</p>'
  },
  certificate: {
    title: '80G Certificate',
    content: '<p style="margin-bottom:12px;">Athithya Foundation® is a registered non-profit organization. All donations made to us are eligible for tax deduction under Section 80G of the Income Tax Act, 1961.</p><p style="margin-bottom:12px;">When making a donation, please ensure you provide your full name, PAN, and address to facilitate the generation of an 80G receipt.</p><p>Your 80G receipt and acknowledgment will be emailed to you within 7-10 working days of your successful donation processing.</p>'
  }
};

function showDocModal(id) {
  const d = docData[id];
  if (!d) return;
  document.getElementById('docModalTitle').textContent = d.title;
  document.getElementById('docModalContent').innerHTML = d.content;
  document.getElementById('docModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeDocModal() {
  const modal = document.getElementById('docModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}


document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeDocModal();
    closeMosaicModal();
  }
});

// ── Popup Modal Logic (Shared by Mosaic & Founders) ──
const popupData = {
  // Mosaic Items
  main: {
    img: 'images/IMG_0490.PNG',
    title: 'Our Work in Action',
    desc: 'Athithya Foundation® has transformed over 50 government schools across Karnataka. We provide infrastructure upgrades, smart classrooms, libraries, and ongoing mentoring - giving every child the environment they deserve to learn and grow.'
  },
  sec: {
    img: 'images/class.avif',
    title: 'Learning Without Limits',
    desc: 'Our smart classrooms bring digital learning to children who never had access to technology. With interactive projectors, curated content, and trained teachers, we are bridging the education gap one school at a time.'
  },
  // Founders
  // Founders
  sudhanv: {
    img: 'images/photo_2024-03-14_22-37-56.jpg',
    role: 'CEO & Co-Founder',
    icon: '',
    headTitle: '',
    title: 'Sudhanv P Gudi',
    desc: 'Optimizing the resources for the benefit of the students is and will always be our priority. We are committed to redefining education through innovative systems.'
  },
  jyothi: {
    img: 'images/Gemini_Generated_Image_sm9dlcsm9dlcsm9d.png',
    role: 'Secretary & Co-Founder',
    icon: '',
    headTitle: '',
    title: 'Jyothi Gudi',
    desc: 'We started Athithya to ensure that every rural student has access to equal learning opportunities. Our goal is to level the playing field for the next generation.'
  },
  nityashree: {
    img: 'images/Gemini_Generated_Image_863s7e863s7e863s.png',
    role: 'Vice President',
    icon: '',
    headTitle: '',
    title: 'Nityashree.J',
    desc: 'Technology should never be a luxury. We\'re bridging the gap between desire and reality for young minds by integrating modern digital tools into rural education ecosystems.'
  },
  shridevi: {
    img: 'images/Gemini_Generated_Image_rv1aqorv1aqorv1a.png',
    role: 'Trustee',
    icon: '',
    headTitle: '',
    title: 'Shridevi',
    desc: 'Providing youth with digital tools is the core of our vision for a better Education. We believe in empowering the next generation with the tools they need to succeed.'
  },
  // Guest Reviews
  guest1: {
    img: 'images/WhatsApp Image 2026-04-02 at 11.19.50 PM.jpeg',
    role: 'Founder, LOD Malleshwaram',
    title: 'Deeya Chhajed',
    desc: 'I decided to donate to the Athithya Foundation because seeing the smart classroom in action changed everything for these kids. For the first time, they could actually see the world through a screen right in their own school, opening up possibilities they never had before. It is incredibly moving to see that spark of curiosity, and this exactly why I wanted to support them to make sure this next generation of potential engineers gets the start they deserve.'
  },
  guest2: {
    img: 'images/WhatsApp Image 2026-04-02 at 11.25.30 PM.jpeg',
    role: 'Founder, workINgenes Bengaluru',
    title: 'Varshith Hegde',
    desc: "Athithya Foundation delivered exactly what they had promised, Transparent reporting, visible impact, and genuine dedication. For me, Athithya is the best CSR partner we have worked with in Bengaluru.Their professionalism and on ground execution are unparalleled, and seeing the real world change they create gave us total confidence that our funds were being used perfectly.It is rare that we get to find a partner that combines such heart with such high level efficiency."
  },
  guest3: {
    img: 'images/Gemini_Generated_Image_k25u8gk25u8gk25u.png',
    title: 'Praveen V. Gudi',
    desc: 'I have visited many schools and foundations before, but what Athithya Foundation has achieved here is truly commendable. Transitioning from broken benches and no library to a modern smart classroom and 500 books in just two years is a remarkable feat of on ground execution. As someone in the health department, I know that environment dictates outcomes... by providing these resources, they have brought a renewed sense of dignity and hope to both students and teachers. The transformation is unbelievable, and it is clear that their dedication to the community is genuine'
  },
  connect: {
    img: 'Athithya_Foundation_Logo_withoutBG.png',
    role: 'Our Digital Community',
    icon: '📱',
    headTitle: 'Stay Updated',
    title: 'Follow Athithya Foundation®',
    desc: 'Join our growing community on social media to see real-time updates of our transformations, school adoptions, and community impact. Your engagement helps us reach more donors and volunteers!'
  }
};

function openMosaicPopup(type) {
  const d = popupData[type];
  if (!d) return;
  const modal = document.getElementById('mosaicModal');
  const modalImg = document.getElementById('mosaicModalImg');
  const modalHeader = document.getElementById('mosaicModalHeader');
  const overlayText = modalHeader.querySelector('div[style*="z-index:1"]');
  const roleTag = document.getElementById('mosaicModalRole');

  modalImg.src = d.img || '';
  modalImg.style.opacity = '1';
  modalImg.style.objectFit = 'contain';
  modalImg.style.objectPosition = 'center';

  if (overlayText) {
    overlayText.style.display = (d.icon === '' && d.headTitle === '') ? 'none' : 'block';
  }

  if (roleTag) {
    roleTag.textContent = d.role || '';
    roleTag.style.display = d.role ? 'inline-block' : 'none';
  }

  document.getElementById('mosaicModalIcon').textContent = d.icon || '';
  document.getElementById('mosaicModalHeadTitle').textContent = d.headTitle || '';
  document.getElementById('mosaicModalTitle').textContent = d.title || '';
  document.getElementById('mosaicModalDesc').textContent = d.desc || '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeMosaicModal() {
  const modal = document.getElementById('mosaicModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal, .stagger-reveal');
  revealElements.forEach(el => revealObserver.observe(el));

  // ── Interactive Hero Background ──
  const hero = document.querySelector('.hero');
  const bgGrid = document.querySelector('.hero-bg-grid');

  if (hero && bgGrid) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Move slightly in the opposite direction (parallax)
      const moveX = (clientX - centerX) / 25;
      const moveY = (clientY - centerY) / 25;

      bgGrid.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
      bgGrid.style.transform = 'translate3d(0, 0, 0)';
    });
  }

  // ── Full Logo Viewer Logic (Click/Long Press) ──
  const logoTrigger = document.getElementById('logoClickTrigger');
  const logoModal = document.getElementById('logoModal');
  let logoTimer;

  function showFullLogo() {
    logoModal.classList.add('open');
  }

  if (logoTrigger && logoModal) {
    // Immediate Click
    logoTrigger.addEventListener('click', showFullLogo);

    // Long Press (Desktop)
    logoTrigger.addEventListener('mousedown', () => {
      logoTimer = setTimeout(showFullLogo, 500);
    });
    logoTrigger.addEventListener('mouseup', () => clearTimeout(logoTimer));
    logoTrigger.addEventListener('mouseleave', () => clearTimeout(logoTimer));

    // Long Press (Mobile)
    logoTrigger.addEventListener('touchstart', (e) => {
      logoTimer = setTimeout(showFullLogo, 500);
    }, {
      passive: true
    });
    logoTrigger.addEventListener('touchend', () => clearTimeout(logoTimer));
  }

  // ── Social Icons: Reveal color on click ──
  const socBtns = document.querySelectorAll('.soc-btn-v');
  socBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      this.classList.toggle('revealed');
    });
  });
});

