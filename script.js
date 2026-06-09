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
    img: 'images/architecture_village.jpg',
    desc: 'Athithya Foundation® partners with government schools to provide complete infrastructure upgrades from new furniture and sanitation to libraries, computers, and learning resources. We work with school management, parents, and local authorities to create a holistic transformation that lasts well beyond a single academic year. Each adopted school receives dedicated mentoring support, teacher training, and quarterly impact assessments to track progress and celebrate milestones.'
  },
  foundational: {
    emoji: '',
    tag: 'Foundational Learning',
    title: 'Foundational Learning Enhancement',
    img: 'images/coalition_foundational_learning.webp',
    desc: 'Millions of children in government schools lack basic literacy and numeracy skills by Grade 3. Our Foundational Learning programme deploys trained volunteers and evidence-based materials designed by educational experts to bridge this gap. Through small-group instruction, gamified learning tools, and regular assessments, we ensure every child can read, write, and count by the end of primary school - building the confidence they need for the rest of their academic journey.'
  },
  smart: {
    emoji: '',
    tag: 'Digital Access',
    title: 'Smart Classrooms & Digital Access',
    img: 'images/img3_educlassrooms.jpeg',
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

// ── Consolidated Lightbox Logic ──
function openLightbox(title, desc, url, type = 'photo') {
  const lb = document.getElementById('afLightbox');
  const container = document.getElementById('aflMedia');
  if (!lb || !container) return;

  lb.style.display = 'flex';
  setTimeout(() => lb.classList.add('show'), 10);
  document.body.style.overflow = 'hidden';

  document.getElementById('aflTitle').textContent = title || 'Untitled';
  document.getElementById('aflDesc').textContent = desc || '';

  if (type === 'video') {
    container.innerHTML = `<video src="${url}" controls autoplay style="max-width:100%; max-height:75vh; border-radius:12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);"></video>`;
  } else {
    container.innerHTML = `<img src="${url}" style="max-width:100%; max-height:75vh; border-radius:12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">`;
  }
}

function closeLightbox() {
  const lb = document.getElementById('afLightbox');
  if (!lb) return;
  lb.classList.remove('show');
  setTimeout(() => {
    lb.style.display = 'none';
    const media = document.getElementById('aflMedia');
    if (media) media.innerHTML = '';
    // Only restore scroll if we are not in another modal
    const galModal = document.getElementById('galleryModal');
    if (!galModal || !galModal.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }, 300);
}

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

  // 3. Fallback to static data.json (for static/online deployments)
  try {
    const res = await fetch('/data.json');
    if (res.ok) {
      const staticData = await res.json();
      if (staticData.gallery && staticData.gallery.length > 0) {
        renderData(staticData.gallery);
        return;
      }
    }
  } catch (_) {}

  // 4. Absolute Fallback (Empty by default per user request)
  const fallbackData = [];
  renderData(fallbackData);

  function renderData(data) {
    grid.innerHTML = '';
    if (!data || data.length === 0) {
      grid.style.display = 'block'; // Avoid grid gaps for empty state
      grid.innerHTML = `
        <div style="width:100%; height:430px; display:flex; flex-direction:column; align-items:center; justify-content:center; border: 2px dashed rgba(218, 101, 23, 0.26); border-radius:18px; background: rgba(232, 99, 10, 0.09);">
          <div style="font-size:3rem; margin-bottom:15px; opacity:0.3;">📸</div>
          <p style="font-family:'Playfair Display', serif; font-size:1.3rem; font-weight:700; color:var(--mut); margin-bottom:8px; opacity:15;">MEMORIES GALLERY</p>
          <p style="font-size:0.85rem; color:var(--mut); max-width:280px; text-align:center; line-height:1.5;">The images will be visible here once uploaded.</p>
        </div>
      `;
      return;
    }

    grid.style.display = 'grid'; // Restore grid layout
    data.forEach((item, index) => {
      const isTall = index === 0;
      const div = document.createElement('div');
      div.className = isTall ? 'gi tall g1' : `gi g${index + 1}`;

      const tryStr = (v) => (!v || String(v).trim().toLowerCase() === 'undefined' || String(v).trim().toLowerCase() === 'null') ? '' : String(v).trim();
      const mediaUrl = tryStr(item.media) || tryStr(item.image) || tryStr(item.videoUrl) || '';
      const isVidPath = mediaUrl.match(/\.(mp4|webm|ogg)$/i) || mediaUrl.startsWith('data:video');
      const mediaType = tryStr(item.type) === 'video' ? 'video' : (isVidPath ? 'video' : 'photo');
      const itemDesc = tryStr(item.desc) || tryStr(item.caption) || tryStr(item.location) || '';
      const itemTitle = tryStr(item.title) || 'Untitled';

      div.onclick = () => openLightbox(itemTitle, itemDesc, mediaUrl, mediaType);

      const imgHtml = mediaUrl
        ? (mediaType === 'video'
          ? `<video src="${mediaUrl}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;z-index:0;" muted playsinline loop autoplay></video>`
          : `<img src="${mediaUrl}" alt="${itemTitle}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;z-index:0">`)
        : `<div class="gi-bg" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;display:flex;align-items:center;justify-content:center;font-size:3rem;background:#f9f9f9;">📸</div>`;

      div.innerHTML = `
        ${imgHtml}
        <div class="gi-cap" style="z-index:2;position:absolute;bottom:0;left:0;right:0; padding: 25px 20px; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);">
          <p style="font-family:'Playfair Display', serif; font-size:1.1rem; font-weight:800; color:#fff; margin-bottom:4px; text-shadow:0 2px 10px rgba(0,0,0,0.3);">${itemTitle}</p>
          <span style="font-size:0.72rem; font-weight:700; color:var(--ors); text-transform:uppercase; letter-spacing:0.05em; opacity:0.9;">${itemDesc}</span>
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
let isNavShadow = false;
window.addEventListener('scroll', () => {
  const nav = document.getElementById('topnav');
  if (nav) {
    const shouldHaveShadow = window.scrollY > 40;
    if (shouldHaveShadow !== isNavShadow) {
      isNavShadow = shouldHaveShadow;
      if (shouldHaveShadow) {
        nav.classList.add('nav-shadow');
      } else {
        nav.classList.remove('nav-shadow');
      }
    }
  }
}, { passive: true });

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
    if (target) { e.preventDefault(); target.scrollIntoView(); }
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
    img: 'images/Deeya.jpeg',
    role: 'Founder, LOD Malleshwaram',
    title: 'Deeya Chhajed',
    desc: 'I decided to donate to the Athithya Foundation because seeing the smart classroom in action changed everything for these kids. For the first time, they could actually see the world through a screen right in their own school, opening up possibilities they never had before. It is incredibly moving to see that spark of curiosity, and this exactly why I wanted to support them to make sure this next generation of potential engineers gets the start they deserve.'
  },
  guest2: {
    img: 'images/Varshith_Hegde.jpeg',
    role: 'Founder, workINgenes Bengaluru',
    title: 'Varshith Hegde',
    desc: "Athithya Foundation delivered exactly what they had promised, Transparent reporting, visible impact, and genuine dedication. For me, Athithya is the best CSR partner we have worked with in Bengaluru.Their professionalism and on ground execution are unparalleled, and seeing the real world change they create gave us total confidence that our funds were being used perfectly.It is rare that we get to find a partner that combines such heart with such high level efficiency."
  },
  guest3: {
    img: 'images/Gemini_Generated_Image_k25u8gk25u8gk25u.png',
    role: 'Health Department / Community Member',
    title: 'Praveen V. Gudi',
    desc: 'I have visited many schools and foundations before, but what Athithya Foundation has achieved here is truly commendable. Transitioning from broken benches and no library to a modern smart classroom and 500 books in just two years is a remarkable feat of on ground execution. As someone in the health department, I know that environment dictates outcomes... by providing these resources, they have brought a renewed sense of dignity and hope to both students and teachers. The transformation is unbelievable, and it is clear that their dedication to the community is genuine'
  },
  connect: {
    img: 'Athithya_Foundation_Logo_withoutBG.png',
    role: 'Our Digital Community',
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
        revealObserver.unobserve(entry.target);
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

  // ── Full Logo Viewer Logic (Click/Double Click/Long Press) ──
  const logoTrigger = document.getElementById('logoClickTrigger');
  const logoModal = document.getElementById('logoModal');
  let logoTimer;
  let logoClickCount = 0;
  let logoClickTimer;

  function showFullLogo() {
    if (logoModal) logoModal.classList.add('open');
  }

  if (logoTrigger && logoModal) {
    logoTrigger.addEventListener('click', (e) => {
      logoClickCount++;
      if (logoClickCount === 1) {
        logoClickTimer = setTimeout(() => {
          logoClickCount = 0;
          // Single click action: Go to home
          window.location.href = '#home';
        }, 300);
      } else if (logoClickCount === 2) {
        clearTimeout(logoClickTimer);
        logoClickCount = 0;
        // Double click action: Show full logo
        showFullLogo();
      }
    });

    // Long Press (Desktop)
    logoTrigger.addEventListener('mousedown', () => {
      logoTimer = setTimeout(() => {
        clearTimeout(logoClickTimer);
        logoClickCount = 0;
        showFullLogo();
      }, 600);
    });
    logoTrigger.addEventListener('mouseup', () => clearTimeout(logoTimer));
    logoTrigger.addEventListener('mouseleave', () => clearTimeout(logoTimer));

    // Long Press (Mobile)
    logoTrigger.addEventListener('touchstart', (e) => {
      logoTimer = setTimeout(() => {
        clearTimeout(logoClickTimer);
        logoClickCount = 0;
        showFullLogo();
      }, 600);
    }, { passive: true });
    logoTrigger.addEventListener('touchend', () => clearTimeout(logoTimer));
  }

  // 💬 Social Icons: Reveal color on click 💬
  const socBtns = document.querySelectorAll('.soc-btn-v');
  socBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      this.classList.toggle('revealed');
    });
  });
});

/* ─────────────────────────────────────────
   PROJECTS & TINDER SWIPE LOGIC
───────────────────────────────────────── */
let allProjects = [];
let currentSwipeIndex = 0;
let _swipeLocked = false;

// Placeholder projects shown when no real projects are uploaded yet
const PLACEHOLDER_PROJECTS = [
  {
    id: '__placeholder_1',
    title: 'Smart Classroom Initiative',
    shortDesc: 'Bringing interactive digital classrooms to government schools across Karnataka, equipped with projectors and curated learning content.',
    detailedContent: 'Our Smart Classroom Initiative transforms bare government school rooms into vibrant digital learning hubs. We install projectors, interactive whiteboards, and curated educational content aligned to the state curriculum. This project has already impacted thousands of students.',
    image: 'images/img3_educlassrooms.jpeg',
    isPlaceholder: true
  },
  {
    id: '__placeholder_2',
    title: 'Library & Reading Programme',
    shortDesc: 'Stocking school libraries with 500+ age-appropriate books in Kannada and English, with weekly reading circles and storytelling sessions.',
    detailedContent: 'A love for reading is one of the greatest gifts we can give a child. We set up fully-stocked, beautifully designed libraries inside government schools. Weekly reading circles, storytelling sessions, and book-of-the-month clubs are run by trained facilitators.',
    image: 'images/lib.avif',
    isPlaceholder: true
  },
  {
    id: '__placeholder_3',
    title: 'Teacher Capacity Building',
    shortDesc: 'Weekend workshops empowering government school teachers with modern pedagogy, digital tools, and subject-matter expertise.',
    detailedContent: 'Great teachers are the backbone of great schools. Our intensive Teacher Capacity Building workshops run over weekends covering modern pedagogy, classroom management, digital tool integration, and emotional intelligence.',
    image: 'images/teacher.jpg',
    isPlaceholder: true
  }
];

// ── Fetch & render initial 3 cards ──
async function fetchAndRenderProjects() {
  const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000'
    ? 'http://localhost:3000'
    : '';

  try {
    let projects = [];

    // 1. Try to fetch from Sanity.io first
    try {
      const sanityQuery = `*[_type == "project"] | order(date desc, _createdAt desc)`;
      const sanityProjects = await sanityFetch(sanityQuery);
      if (sanityProjects && sanityProjects.length > 0) {
        projects = sanityProjects.map(proj => ({
          id: proj._id,
          title: proj.title || 'Untitled Project',
          shortDesc: proj.shortDesc || '',
          detailedContent: proj.detailedContent || '',
          image: urlFor(proj.image),
          showOnFront: !!proj.showOnFront,
          date: proj.date || proj._createdAt
        }));
      }
    } catch (sanityErr) {
      console.warn('Could not fetch projects from Sanity, falling back to local server.', sanityErr);
    }

    // 2. Fallback to local server or data.json if Sanity is empty/failed
    if (projects.length === 0) {
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        if (res.ok) {
          projects = await res.json();
        } else {
          // Fallback to static data.json for static hosts / Vercel
          const staticRes = await fetch('/data.json');
          if (staticRes.ok) {
            const staticData = await staticRes.json();
            projects = staticData.projects || [];
          }
        }
      } catch (netErr) {
        // Fallback on network error (e.g. backend server not running)
        try {
          const staticRes = await fetch('/data.json');
          if (staticRes.ok) {
            const staticData = await staticRes.json();
            projects = staticData.projects || [];
          }
        } catch (_) {}
      }
    }
    allProjects = projects || [];

    const grid = document.getElementById('projGrid');
    if (!grid) return;

    // Filter projects that are explicitly marked for front page
    const shownProjects = allProjects.filter(p => p.showOnFront);

    // Always render 3 slots. Fill with shown projects first, remaining are empty slots
    const initialProjects = [null, null, null];
    for (let i = 0; i < 3; i++) {
      if (i < shownProjects.length) {
        initialProjects[i] = shownProjects[i];
      }
    }

    const frag = document.createDocumentFragment();
    initialProjects.forEach((proj, idx) => {
      const card = document.createElement('div');
      if (proj) {
        card.className = 'proj-card';
        card.onclick = () => openWikiModal(proj.id, allProjects);
        card.innerHTML = `
          <img src="${proj.image}" alt="${proj.title}" class="proj-img" loading="lazy">
          <div class="proj-info">
            <h3>${proj.title}</h3>
            <p>${proj.shortDesc}</p>
            <div style="margin-top:14px; color:var(--or); font-weight:800; font-size:0.8rem; letter-spacing:0.04em;">
              READ MORE →
            </div>
          </div>
        `;
      } else {
        // Render a beautiful, premium blank/placeholder card
        card.className = 'proj-card placeholder-card';
        card.innerHTML = `
          <div class="proj-info" style="display: flex; align-items: center; justify-content: center; height: 100%; min-height: 290px; border: 2px dashed rgba(255,255,255,0.15); border-radius: 20px; text-align: center; color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.01); margin: 5px;">
            <div style="padding: 20px;">
              <div style="font-size: 1.8rem; margin-bottom: 12px; color: rgba(232, 97, 10, 0.4);">✦</div>
              <h4 style="font-family:'Playfair Display', serif; font-size: 1.05rem; margin-bottom: 6px; color: rgba(255,255,255,0.4); font-weight:700;">Project Slot ${idx + 1}</h4>
              <p style="font-size: 0.75rem; font-weight: 500; letter-spacing: 0.05em; color: rgba(255,255,255,0.2);">Awaiting Project Details</p>
            </div>
          </div>
        `;
      }
      frag.appendChild(card);
    });
    grid.innerHTML = '';
    grid.appendChild(frag);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}
document.addEventListener('DOMContentLoaded', fetchAndRenderProjects);

// ── Open View All Modal (all projects, newest first) ──
function openViewAllModal() {
  const projects = [...allProjects];
  if (projects.length === 0) {
    alert('No projects have been added yet. Check back soon!');
    return;
  }

  // Sort newest first — use createdAt / date / id as fallback
  projects.sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date || 0).getTime();
    const dateB = new Date(b.createdAt || b.date || 0).getTime();
    if (dateB !== dateA) return dateB - dateA;
    // Fallback: higher id = newer
    return String(b.id).localeCompare(String(a.id));
  });

  const modal = document.getElementById('viewAllModal');
  const grid = document.getElementById('vaGrid');
  const count = document.getElementById('vaCount');

  if (count) count.textContent = `${projects.length} Project${projects.length !== 1 ? 's' : ''}`;

  const frag = document.createDocumentFragment();
  projects.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'va-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    // Format date label
    let dateLabel = '';
    if (proj.createdAt || proj.date) {
      try {
        dateLabel = new Date(proj.createdAt || proj.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' });
      } catch(_) {}
    }

    const imgSrc = proj.image || '';
    const imgHtml = imgSrc
      ? `<div class="va-card-img-wrap"><img src="${imgSrc}" alt="${proj.title}" loading="lazy"></div>`
      : `<div class="va-card-img-wrap" style="height:200px;background:rgba(232,97,10,0.08);display:flex;align-items:center;justify-content:center;"><span style="font-size:2.5rem;opacity:0.3;">✦</span></div>`;

    card.innerHTML = `
      ${imgHtml}
      <div class="va-card-body">
        ${dateLabel ? `<div class="va-card-date">${dateLabel}</div>` : ''}
        <div class="va-card-title">${proj.title}</div>
        <div class="va-card-desc">${proj.shortDesc || ''}</div>
      </div>
      <div class="va-card-footer">
        <span class="va-card-cta">Read Full Story</span>
        <span class="va-card-arrow">→</span>
      </div>
    `;

    card.addEventListener('click', () => openWikiModal(proj.id, projects));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openWikiModal(proj.id, projects); });
    frag.appendChild(card);
  });

  grid.innerHTML = '';
  grid.appendChild(frag);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeViewAllModal() {
  document.getElementById('viewAllModal').classList.remove('open');
  if (document.getElementById('wikiModal').style.display !== 'block') {
    document.body.style.overflow = '';
  }
}

// ── Render the full card stack ──
function renderSwipeStack() {
  const projects = window._swipeProjects || [];
  const container = document.getElementById('swipeContainer');

  // Update counter
  const counter = document.getElementById('swipeCounter');
  if (counter) {
    counter.textContent = currentSwipeIndex < projects.length
      ? `${currentSwipeIndex + 1} / ${projects.length}`
      : '';
  }

  if (currentSwipeIndex >= projects.length) {
    container.innerHTML = `
      <div style="color:#fff;text-align:center;padding:30px 20px;">
        <div style="font-size:3rem;margin-bottom:16px;">🎉</div>
        <h3 style="font-size:1.5rem;font-weight:900;margin-bottom:10px;font-family:'Playfair Display',serif;">You've seen them all!</h3>
        <p style="color:rgba(255,255,255,0.6);font-size:0.9rem;margin-bottom:24px;">Want to revisit?</p>
        <button class="btn-main" onclick="currentSwipeIndex=0;_swipeLocked=false;renderSwipeStack();">Start Over</button>
      </div>`;
    return;
  }

  // Render up to 3 stacked cards (back to front)
  const frag = document.createDocumentFragment();
  const stackDepth = Math.min(3, projects.length - currentSwipeIndex);
  for (let offset = stackDepth - 1; offset >= 0; offset--) {
    const idx = currentSwipeIndex + offset;
    if (idx >= projects.length) continue;
    const proj = projects[idx];
    const isTop = offset === 0;

    const card = document.createElement('div');
    card.className = 'swipe-card';
    card.dataset.projId = proj.id;
    card.dataset.isTop = isTop ? '1' : '0';

    // Stack visual offset
    const scale = 1 - offset * 0.04;
    const yShift = offset * 16;
    card.style.cssText = `
      transform: scale(${scale}) translateY(${yShift}px);
      z-index: ${10 - offset};
      transition: transform 0.3s ease;
    `;

    card.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}" loading="${isTop ? 'eager' : 'lazy'}" style="width:100%;height:52%;object-fit:cover;display:block;">
      <div class="sc-content">
        <h3>${proj.title}</h3>
        <p>${proj.shortDesc}</p>
        <div class="sc-btn">Tap to read full story →</div>
      </div>
      <div class="swipe-like-label" style="position:absolute;top:28px;left:20px;background:#27AE60;color:#fff;padding:6px 16px;border-radius:8px;font-weight:900;font-size:1.1rem;border:3px solid #fff;opacity:0;transform:rotate(-15deg);transition:opacity 0.15s;">LIKE ♥</div>
      <div class="swipe-skip-label" style="position:absolute;top:28px;right:20px;background:#E74C3C;color:#fff;padding:6px 16px;border-radius:8px;font-weight:900;font-size:1.1rem;border:3px solid #fff;opacity:0;transform:rotate(15deg);transition:opacity 0.15s;">SKIP ✕</div>
    `;

    if (isTop) attachDragToCard(card, proj, projects);
    frag.appendChild(card);
  }

  container.innerHTML = '';
  container.appendChild(frag);
}

// ── Tinder drag logic ──
function attachDragToCard(card, proj, projects) {
  let startX = 0, startY = 0, currentX = 0;
  let isDragging = false;
  let didDrag = false; // Track whether user actually dragged

  const SWIPE_THRESHOLD = 90; // px to trigger swipe

  function onStart(e) {
    if (_swipeLocked) return;
    isDragging = true;
    didDrag = false;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    currentX = 0;
    card.style.transition = 'none';
  }

  function onMove(e) {
    if (!isDragging) return;
    const point = e.touches ? e.touches[0] : e;
    currentX = point.clientX - startX;
    const currentY = point.clientY - startY;

    // Only treat as drag if horizontal movement dominates
    if (Math.abs(currentX) < 5 && Math.abs(currentY) < 5) return;
    didDrag = true;
    if (e.cancelable) e.preventDefault();

    const rotate = currentX * 0.08;
    card.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;

    // Show like/skip labels
    const likeLabel = card.querySelector('.swipe-like-label');
    const skipLabel = card.querySelector('.swipe-skip-label');
    const ratio = Math.min(Math.abs(currentX) / SWIPE_THRESHOLD, 1);
    if (currentX > 0) {
      likeLabel.style.opacity = ratio;
      skipLabel.style.opacity = 0;
    } else {
      skipLabel.style.opacity = ratio;
      likeLabel.style.opacity = 0;
    }
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;

    if (!didDrag) {
      // Pure tap — open wiki
      openWikiModal(proj.id, projects);
      return;
    }

    if (Math.abs(currentX) >= SWIPE_THRESHOLD) {
      // Commit swipe
      triggerSwipe(card, currentX > 0 ? 'right' : 'left');
    } else {
      // Snap back
      card.style.transition = 'transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275)';
      card.style.transform = 'translateX(0) rotate(0deg)';
      card.querySelector('.swipe-like-label').style.opacity = 0;
      card.querySelector('.swipe-skip-label').style.opacity = 0;
    }
  }

  card.addEventListener('mousedown', onStart);
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseup', onEnd);
  card.addEventListener('mouseleave', onEnd);
  card.addEventListener('touchstart', onStart, { passive: true });
  card.addEventListener('touchmove', onMove, { passive: false });
  card.addEventListener('touchend', onEnd);
}

// ── Trigger programmatic swipe (buttons or drag) ──
function triggerSwipe(card, direction) {
  if (_swipeLocked) return;
  _swipeLocked = true;

  const xFly = direction === 'right' ? window.innerWidth + 100 : -(window.innerWidth + 100);
  card.style.transition = 'transform 0.38s ease, opacity 0.38s ease';
  card.style.transform = `translateX(${xFly}px) rotate(${xFly * 0.04}deg)`;
  card.style.opacity = '0';

  // Animate next card up
  const container = document.getElementById('swipeContainer');
  const nextCard = container.querySelector('.swipe-card:not([data-is-top="1"])');
  if (nextCard) {
    nextCard.style.transition = 'transform 0.38s ease';
    nextCard.style.transform = 'scale(1) translateY(0)';
  }

  setTimeout(() => {
    currentSwipeIndex++;
    _swipeLocked = false;
    renderSwipeStack();
  }, 380);
}

// Button swipe (← Skip / Next →)
function swipeCard(direction) {
  const container = document.getElementById('swipeContainer');
  const topCard = container.querySelector('.swipe-card[data-is-top="1"]');
  if (!topCard || _swipeLocked) return;
  triggerSwipe(topCard, direction === 'left' ? 'left' : 'right');
}


// ── Wiki (full project detail) modal ──
function openWikiModal(projId, projectsArr) {
  const pool = projectsArr || allProjects;
  const proj = pool.find(p => p.id === projId);
  if (!proj) return;

  document.getElementById('wikiImg').src = proj.image || '';
  document.getElementById('wikiTitle').textContent = proj.title;
  document.getElementById('wikiText').textContent = proj.detailedContent || proj.shortDesc || '';

  document.getElementById('wikiModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeWikiModal() {
  document.getElementById('wikiModal').style.display = 'none';
  // Only restore scroll if the View All modal is also closed
  const vaModal = document.getElementById('viewAllModal');
  if (!vaModal || !vaModal.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

// ── Scroll-To-Top Button ──
(function initScrollTop() {
  let ticking = false;
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
