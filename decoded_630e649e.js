// Shared components for 한빛+ prototype
// Placeholder cover system — CSS-based covers with title typography
// Each book gets a unique hue seeded from its title

const hashStr = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// Hanbit+ Logo
function HanbitLogo({ size = 22, light = false }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'baseline', gap: 2,
      fontFamily: 'Pretendard, sans-serif',
      fontWeight: 800, fontSize: size, letterSpacing: '-0.02em',
      color: light ? '#F5F4F2' : '#000000',
    }}>
      <span>한빛</span>
      <span style={{ color: '#03aea0', fontWeight: 800, fontSize: size * 1.05 }}>+</span>
    </div>
  );
}

// Book cover placeholder — title-driven, colored per book
function BookCover({ title, subtitle, kind = 'book', width = 180, height = 260, flat = false }) {
  const h = hashStr(title);
  // palette of calm, editorial IT-book tones
  const palettes = [
    { bg: '#1F2937', fg: '#F5F4F2', accent: '#03aea0' },  // slate
    { bg: '#0F3E3C', fg: '#EAF5F2', accent: '#F5C451' },  // deep teal
    { bg: '#3A2E2A', fg: '#F6EFE8', accent: '#03aea0' },  // coffee
    { bg: '#1B2A4E', fg: '#E8ECF7', accent: '#F5C451' },  // navy
    { bg: '#2C1A2E', fg: '#F4E9EE', accent: '#03aea0' },  // plum
    { bg: '#F5F1EA', fg: '#1A1A1A', accent: '#03aea0' },  // cream (light)
    { bg: '#03aea0', fg: '#FFFFFF', accent: '#1A1A1A' },  // red
  ];
  const p = palettes[h % palettes.length];
  const pattern = h % 3; // 0=stripes, 1=grid, 2=minimal

  return (
    <div style={{
      width, height, borderRadius: 6, position: 'relative', overflow: 'hidden',
      background: p.bg, color: p.fg,
      boxShadow: flat ? 'none' : '0 1px 2px rgba(0,0,0,0.08), 0 8px 24px -12px rgba(0,0,0,0.25)',
      fontFamily: 'Pretendard, sans-serif',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: width * 0.09,
    }}>
      {/* pattern layer */}
      {pattern === 0 && (
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: `repeating-linear-gradient(0deg, ${p.fg} 0 1px, transparent 1px ${Math.max(6, width/24)}px)`,
        }} />
      )}
      {pattern === 1 && (
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.07,
          backgroundImage: `linear-gradient(${p.fg} 1px, transparent 1px), linear-gradient(90deg, ${p.fg} 1px, transparent 1px)`,
          backgroundSize: `${width/8}px ${width/8}px`,
        }} />
      )}

      {/* top: publisher mark */}
      <div style={{
        fontSize: width * 0.055, letterSpacing: '0.1em',
        textTransform: 'uppercase', opacity: 0.7, fontWeight: 600,
      }}>
        HANBIT<span style={{ color: p.accent }}>+</span>
      </div>

      {/* middle: accent shape */}
      <div style={{
        width: width * 0.36, height: 2, background: p.accent, alignSelf: 'flex-start',
        marginTop: -width * 0.08,
      }} />

      {/* title */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{
          fontSize: width * 0.11, fontWeight: 800, lineHeight: 1.15,
          letterSpacing: '-0.02em', textWrap: 'pretty',
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: width * 0.055, marginTop: 6, opacity: 0.7, fontWeight: 500,
          }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* corner kind badge */}
      {kind === 'course' && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          width: width * 0.12, height: width * 0.12, borderRadius: '50%',
          background: p.accent, color: p.bg, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: width * 0.06,
        }}>▶</div>
      )}
    </div>
  );
}

// Small chip / badge
function Chip({ children, tone = 'neutral', size = 'md' }) {
  const tones = {
    neutral: { bg: 'rgba(0,0,0,0.06)', fg: '#3A3A3A', border: 'transparent' },
    neutralDark: { bg: 'rgba(255,255,255,0.1)', fg: '#E6E4DF', border: 'transparent' },
    ebook: { bg: 'rgba(3,174,160,0.1)', fg: '#028b80', border: 'rgba(3,174,160,0.2)' },
    course: { bg: 'rgba(31, 88, 170, 0.1)', fg: '#1F58AA', border: 'rgba(31,88,170,0.2)' },
    paper: { bg: 'rgba(120, 75, 30, 0.1)', fg: '#784B1E', border: 'rgba(120,75,30,0.2)' },
    included: { bg: 'rgba(3,174,160,0.10)', fg: '#028b80', border: 'rgba(3,174,160,0.20)' },
    discount: { bg: '#FFF0E0', fg: '#A85A14', border: '#FAD9B2' },
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: { padding: '2px 8px', fontSize: 11 },
    md: { padding: '4px 10px', fontSize: 12 },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      borderRadius: 999, fontWeight: 600,
      background: t.bg, color: t.fg, border: `1px solid ${t.border}`,
      ...sizes[size],
    }}>{children}</span>
  );
}

// Star rating
function Stars({ value = 4.5, size = 13, showValue = true, muted = false }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const color = muted ? '#9A9A9A' : '#E8A93A';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color, fontSize: size, fontWeight: 600 }}>
      <span style={{ letterSpacing: 1 }}>
        {'★'.repeat(full)}{half ? '⯨' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
      </span>
      {showValue && <span style={{ color: muted ? '#6A6A6A' : '#2A2A2A' }}>{value.toFixed(1)}</span>}
    </span>
  );
}

// Content data
const CONTENT = [
  { title: '혼자 공부하는\n바이브코딩', subtitle: '김민준', kinds: ['ebook', 'course', 'paper'], rating: 4.8, reviews: 1284, tags: ['입문', 'AI', '바이브코딩'], hot: 1 },
  { title: '모두의\n딥러닝', subtitle: '조태호', kinds: ['ebook', 'course'], rating: 4.7, reviews: 982, tags: ['머신러닝', '입문'], hot: 2 },
  { title: '파이썬\n알고리즘 인터뷰', subtitle: '박상길', kinds: ['ebook', 'paper'], rating: 4.9, reviews: 2341, tags: ['알고리즘', '취업'], hot: 3 },
  { title: 'Do it!\n자바스크립트', subtitle: '고경희', kinds: ['ebook', 'course', 'paper'], rating: 4.6, reviews: 871, tags: ['웹', '입문'], hot: 4 },
  { title: '실전 리액트\n프로그래밍', subtitle: '이재승', kinds: ['ebook', 'course'], rating: 4.7, reviews: 1102, tags: ['프론트엔드', 'React'], hot: 5 },
  { title: '러닝 타입\n스크립트', subtitle: '조시 골드버그', kinds: ['ebook', 'paper'], rating: 4.8, reviews: 654, tags: ['TypeScript'], hot: 6 },
];

Object.assign(window, { HanbitLogo, BookCover, Chip, Stars, CONTENT });
