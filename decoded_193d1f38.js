// Landing page — Hanbit+ (non-logged-in)

function LandingPage({ dark, isSubscriber, planCycle, setPlanCycle }) {
  return (
    <div data-screen-label="01 Landing" style={{
      background: dark ? '#0F0F10' : '#ffffff',
      color: dark ? '#E8E6E1' : '#030712',
      fontFamily: 'Pretendard, sans-serif',
      minHeight: '100vh',
    }}>
      <LandingGNB dark={dark} />
      <Hero dark={dark} />
      <PopularRow dark={dark} />
      <Features dark={dark} />
      <RecommendTeaser dark={dark} />
      <Plans dark={dark} planCycle={planCycle} setPlanCycle={setPlanCycle} />
      <LandingFooter dark={dark} />
    </div>
  );
}

function LandingGNB({ dark }) {
  const [menuOpen, setMenuOpen] = React.useState(null); // null | 'content'
  const closeTimer = React.useRef(null);

  const open = (id) => {
    clearTimeout(closeTimer.current);
    setMenuOpen(id);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(null), 120);
  };

  const linkStyle = (active) => ({
    color: 'inherit',
    opacity: active ? 1 : 0.75,
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 14,
    padding: '8px 2px',
    background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.20px',
    position: 'relative',
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: dark ? 'rgba(15,15,16,0.72)' : 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.08)'}`,
    }}>
      <div style={{
        padding: '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <HanbitLogo size={22} light={dark} />
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <button style={linkStyle(false)} onClick={() => window.__hbNav && window.__hbNav('landing')}>서비스 소개</button>
            <button
              style={linkStyle(menuOpen === 'content')}
              onClick={() => window.__hbNav && window.__hbNav('list')}
              onMouseEnter={() => open('content')}
              onMouseLeave={scheduleClose}
              onFocus={() => open('content')}
              onBlur={scheduleClose}
            >
              콘텐츠
              <span style={{ marginLeft: 4, fontSize: 10, opacity: 0.6 }}>▾</span>
            </button>
          </nav>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 14 }}>
          <button style={{
            background: 'none', border: 'none', color: 'inherit', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', padding: '8px 4px', fontFamily: 'inherit',
          }}>로그인</button>
          <button style={{
            background: '#03aea0', color: '#fff', border: 'none',
            padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', letterSpacing: '0.20px', fontFamily: 'inherit',
          }}>구독 시작하기</button>
        </nav>
      </div>

      {menuOpen === 'content' && (
        <ContentMegaMenu
          dark={dark}
          onMouseEnter={() => open('content')}
          onMouseLeave={scheduleClose}
        />
      )}
    </header>
  );
}

const TOPIC_GROUPS = [
  {
    title: '프로그래밍',
    items: [
      { t: 'Python', n: 128 },
      { t: 'JavaScript / TypeScript', n: 96 },
      { t: 'Java / Kotlin', n: 74 },
      { t: 'Go / Rust', n: 42 },
      { t: '자료구조·알고리즘', n: 58 },
    ],
  },
  {
    title: '웹 / 모바일',
    items: [
      { t: 'React', n: 82, hot: true },
      { t: 'Next.js', n: 47 },
      { t: 'Vue / Svelte', n: 36 },
      { t: 'iOS · Swift', n: 44 },
      { t: 'Android · Kotlin', n: 51 },
    ],
  },
  {
    title: 'AI · 데이터',
    items: [
      { t: '바이브코딩', n: 18, hot: true },
      { t: 'LLM · RAG', n: 36, hot: true },
      { t: '머신러닝 · 딥러닝', n: 92 },
      { t: '데이터 분석', n: 78 },
      { t: 'MLOps', n: 24 },
    ],
  },
  {
    title: '인프라 · DevOps',
    items: [
      { t: 'AWS · GCP · Azure', n: 64 },
      { t: 'Docker · Kubernetes', n: 38 },
      { t: 'CI/CD · 모니터링', n: 29 },
      { t: '보안', n: 33 },
      { t: '네트워크·DB', n: 47 },
    ],
  },
  {
    title: '커리어 · 소프트스킬',
    items: [
      { t: '취업·이직', n: 42 },
      { t: '테크 리드', n: 18 },
      { t: '아키텍처·설계', n: 31 },
      { t: '팀·협업', n: 22 },
      { t: '영어·문서', n: 16 },
    ],
  },
];

const FEATURED = [
  { title: '혼자 공부하는\n바이브코딩', subtitle: '김민준', badge: '이번 주 신간' },
  { title: 'LLM으로\n앱 만들기', subtitle: '이현우', badge: '한빛+ 독점' },
  { title: '실전 리액트\n프로그래밍', subtitle: '이재승', badge: '베스트셀러' },
];

function ContentMegaMenu({ dark, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute', left: 0, right: 0, top: '100%',
        background: dark ? '#141416' : '#FFFFFF',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.08)'}`,
        boxShadow: '0 16px 40px -16px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '36px 48px 40px',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1.1fr',
        gap: 32,
      }}>
        {TOPIC_GROUPS.map(g => (
          <div key={g.title}>
            <div style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#03aea0', marginBottom: 14,
            }}>{g.title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: 8 }}>
              {g.items.map(i => (
                <li key={i.t}>
                  <a style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontSize: 13, color: 'inherit',
                    textDecoration: 'none', letterSpacing: '0.20px',
                    padding: '2px 0', cursor: 'pointer',
                    opacity: 0.85,
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {i.t}
                      {i.hot && (
                        <span style={{
                          fontSize: 9, fontWeight: 800, padding: '1px 5px',
                          background: '#03aea0', color: '#fff', borderRadius: 3,
                          letterSpacing: '0.04em',
                        }}>HOT</span>
                      )}
                    </span>
                    <span style={{
                      fontSize: 11, opacity: 0.5, fontVariantNumeric: 'tabular-nums',
                    }}>{i.n}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured picks column */}
        <div>
          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#03aea0', marginBottom: 14,
          }}>편집자 추천</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FEATURED.map(f => (
              <div key={f.title} style={{
                display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer',
              }}>
                <BookCover title={f.title} subtitle={f.subtitle} width={48} height={68} flat />
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#03aea0',
                    letterSpacing: '0.20px', marginBottom: 2,
                  }}>{f.badge}</div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: '-0.43px',
                    lineHeight: 1.25, whiteSpace: 'pre-line',
                  }}>{f.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.08)'}`,
        padding: '14px 48px',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, opacity: 0.7, letterSpacing: '0.20px',
        }}>
          <span>전체 콘텐츠 3,842 권 · 매주 업데이트</span>
          <a style={{ color: '#03aea0', fontWeight: 700, cursor: 'pointer' }}>
            전체 카테고리 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero({ dark }) {
  const codeLines = [
    '$ npm install @hanbit/learn',
    'import { Subscribe } from "@hanbit/plus";',
    'const path = LearningPath.recommend(user);',
    'function grow() { return read(book) + watch(lecture); }',
    'await progress.sync({ chapter: 7, minute: 42 });',
    'export const stack = ["React", "TypeScript", "Python"];',
    'class Developer { study() { return this.everyday; } }',
    '// 개발자의 성장은 매일의 선택입니다',
    'const velocity = knowledge / time;',
    'if (question) { answer = mentor.explain(question); }',
  ];

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '120px 48px 160px',
      background: '#020d0c',
      color: '#F5F4F2',
      textAlign: 'center',
    }}>
      {/* aurora mesh gradient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 900, height: 700,
          top: '-20%', left: '-10%',
          background: 'radial-gradient(ellipse, rgba(3,174,160,0.30) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', width: 700, height: 600,
          top: '-10%', right: '-5%',
          background: 'radial-gradient(ellipse, rgba(0,210,200,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', width: 600, height: 500,
          bottom: '0%', left: '25%',
          background: 'radial-gradient(ellipse, rgba(1,100,95,0.35) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400,
          top: '30%', left: '55%',
          background: 'radial-gradient(ellipse, rgba(100,255,240,0.10) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }} />
      </div>

      {/* dot-grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18,
        backgroundImage: 'radial-gradient(circle, rgba(3,174,160,0.7) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* faint code texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.055,
        fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace',
        fontSize: 13, lineHeight: 2.2, color: '#7ffff8',
        padding: 20, overflow: 'hidden', userSelect: 'none', pointerEvents: 'none',
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ paddingLeft: (i * 47) % 120 }}>{codeLines[i % codeLines.length]}</div>
        ))}
      </div>

      {/* SVG circuit-line decoration */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }} xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="30%" x2="20%" y2="30%" stroke="#03aea0" strokeWidth="1"/>
        <circle cx="20%" cy="30%" r="3" fill="#03aea0"/>
        <line x1="20%" y1="30%" x2="20%" y2="55%" stroke="#03aea0" strokeWidth="1"/>
        <circle cx="20%" cy="55%" r="3" fill="#03aea0"/>
        <line x1="20%" y1="55%" x2="45%" y2="55%" stroke="#03aea0" strokeWidth="1"/>
        <line x1="80%" y1="20%" x2="60%" y2="20%" stroke="#03aea0" strokeWidth="1"/>
        <circle cx="60%" cy="20%" r="3" fill="#03aea0"/>
        <line x1="60%" y1="20%" x2="60%" y2="45%" stroke="#03aea0" strokeWidth="1"/>
        <circle cx="60%" cy="45%" r="3" fill="#03aea0"/>
        <line x1="60%" y1="45%" x2="80%" y2="45%" stroke="#03aea0" strokeWidth="1"/>
        <line x1="5%" y1="70%" x2="15%" y2="70%" stroke="#03aea0" strokeWidth="1"/>
        <circle cx="15%" cy="70%" r="2" fill="#03aea0"/>
        <line x1="15%" y1="70%" x2="15%" y2="85%" stroke="#03aea0" strokeWidth="1"/>
        <line x1="85%" y1="65%" x2="75%" y2="65%" stroke="#03aea0" strokeWidth="1"/>
        <circle cx="75%" cy="65%" r="2" fill="#03aea0"/>
        <line x1="75%" y1="65%" x2="75%" y2="80%" stroke="#03aea0" strokeWidth="1"/>
      </svg>

      {/* bottom vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 110%, rgba(3,174,160,0.08) 0%, transparent 60%)',
      }} />

      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          fontSize: 13, fontWeight: 500, letterSpacing: '0.20px',
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }} />
          한빛미디어 IT 학습 플랫폼
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800,
          letterSpacing: '-0.66px', lineHeight: 1.1,
          margin: '0 0 20px', textWrap: 'balance',
        }}>
          당신의 성장을 구독하세요
        </h1>
        <p style={{
          fontSize: 'clamp(17px, 1.6vw, 20px)', opacity: 0.8,
          margin: '0 0 44px', letterSpacing: '0.20px', lineHeight: 1.6,
        }}>
          전자책·강의 무제한. 최신 기술을 가장 빠르게.
        </p>

        <button onClick={() => window.__hbNav && window.__hbNav('recommend')} style={{
          background: '#03aea0', color: '#fff', border: 'none',
          padding: '18px 36px', borderRadius: 8, fontSize: 17, fontWeight: 700,
          cursor: 'pointer', letterSpacing: '0.20px',
          boxShadow: '0 8px 32px -8px rgba(3,174,160,0.6)',
          fontFamily: 'inherit',
        }}>
          무료로 시작하기 →
        </button>

        <div style={{ marginTop: 20, fontSize: 13, opacity: 0.6, letterSpacing: '-0.01em' }}>
          첫 30일 무료 · 언제든 해지 가능
        </div>
      </div>

      {/* floating content tile silhouettes */}
      <div style={{
        position: 'absolute', bottom: -60, left: 0, right: 0,
        display: 'flex', gap: 16, justifyContent: 'center',
        opacity: 0.18, filter: 'blur(1px)', pointerEvents: 'none',
      }}>
        {CONTENT.slice(0, 6).map((c, i) => (
          <div key={i} style={{
            transform: `translateY(${Math.sin(i) * 12}px) rotate(${(i - 2.5) * 2}deg)`,
          }}>
            <BookCover title={c.title} subtitle={c.subtitle} width={140} height={200} flat />
          </div>
        ))}
      </div>
    </section>
  );
}

function Features({ dark }) {
  const features = [
    { num: '01', title: '전자책 + 강의 무제한', desc: '구독 하나로 수천 종의 IT 도서와 강의를 모두 열람하세요.', icon: 'infinity' },
    { num: '02', title: '학습 진도 트래킹', desc: '읽던 책, 보던 강의 — 어디서 멈췄는지 자동으로 이어갑니다.', icon: 'bookmark' },
    { num: '03', title: '큐레이션 러닝패스', desc: '목표 직무와 기술 스택에 맞는 학습 경로를 추천합니다.', icon: 'path' },
    { num: '04', title: '오프라인 저장', desc: '전자책을 다운로드해 인터넷 없이 어디서든 학습하세요.', icon: 'download' },
    { num: '05', title: '개인화 대시보드', desc: '학습 히스토리와 리포트를 한눈에 — 쓸수록 쌓이는 데이터가 내 성장을 증명합니다.', icon: 'chart' },
    { num: '06', title: '독점 콘텐츠 · 세미나', desc: '구독자만 볼 수 있는 독점 콘텐츠와 업계 전문가 세미나로 한 발 앞서 나가세요.', icon: 'star-lock' },
    { num: '07', title: '커뮤니티 접근 권한', desc: '같이 공부하는 사람들과 Q&A, 스터디, 후기를 나누며 구독 지속의 동기를 만드세요.', icon: 'users' },
  ];


  return (
    <section style={{
      padding: '120px 48px',
      background: dark ? '#141416' : '#f3f4f6',
      color: dark ? '#E8E6E1' : '#030712',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: '#03aea0',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
        }}>Why 한빛+</div>
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800,
          letterSpacing: '-0.43px', lineHeight: 1.15, margin: '0 0 80px',
          textWrap: 'balance', maxWidth: 720,
        }}>
          한빛+에서만 가능한<br/>학습 경험
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24,
        }}>
          {features.map((f) => (
            <div key={f.num} style={{
              padding: '32px 28px',
              background: dark ? '#1C1C1F' : '#FFFFFF',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.16)'}`,
              borderRadius: 10,
              display: 'flex', flexDirection: 'column', minHeight: 240,
            }}>
              <FeatureIcon name={f.icon} />
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#03aea0',
                letterSpacing: '0.05em', marginTop: 20, marginBottom: 10,
              }}>{f.num}</div>
              <h3 style={{
                fontSize: 18, fontWeight: 700, letterSpacing: '-0.43px',
                margin: '0 0 10px', lineHeight: 1.3,
              }}>{f.title}</h3>
              <p style={{
                fontSize: 14, lineHeight: 1.6, margin: 0,
                color: dark ? 'rgba(232,230,225,0.65)' : 'rgba(62,74,92,0.61)',
                letterSpacing: '0.20px',
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }) {
  const common = { width: 28, height: 28, stroke: '#03aea0', strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'infinity') return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M18.178 8c-1.667 0-3.333 1.333-5 4-1.667 2.667-3.333 4-5 4C5.864 16 4 14.209 4 12s1.864-4 4.178-4c1.667 0 3.333 1.333 5 4 1.667 2.667 3.333 4 5 4C20.136 16 22 14.209 22 12s-1.864-4-3.822-4z" />
    </svg>
  );
  if (name === 'bookmark') return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M6 4h12v16l-6-4-6 4z" />
      <path d="M9 10h6" />
    </svg>
  );
  if (name === 'path') return (
    <svg {...common} viewBox="0 0 24 24">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M6 8c0 4 2 6 6 6s6 2 6 4" />
    </svg>
  );
  if (name === 'download') return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M12 4v12m0 0l-4-4m4 4l4-4" />
      <path d="M4 20h16" />
    </svg>
  );
  if (name === 'chart') return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-5 4 3 4-6" />
    </svg>
  );
  if (name === 'star-lock') return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M12 2l2.9 6.1L22 9.3l-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2 2 9.3l7.1-1.2z" />
      <circle cx="17" cy="19" r="3" />
      <path d="M17 17v-1.5a1.5 1.5 0 0 0-3 0V17" />
    </svg>
  );
  if (name === 'users') return (
    <svg {...common} viewBox="0 0 24 24">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 3.1a3 3 0 0 1 0 5.8" />
      <path d="M21 20c0-2.8-1.8-5.1-4.3-5.8" />
    </svg>
  );
  return null;
}

function PopularRow({ dark }) {
  const scrollRef = React.useRef(null);
  const goDetail = () => window.__hbNav && window.__hbNav('detail');
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 640, behavior: 'smooth' });
    }
  };
  return (
    <section style={{
      padding: '100px 0 100px 48px',
      background: dark ? '#0F0F10' : '#FFFFFF',
      color: dark ? '#E8E6E1' : '#030712',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', alignItems: 'end', justifyContent: 'space-between',
        marginBottom: 32, paddingRight: 48,
      }}>
        <div>
          <div style={{
            fontSize: 13, fontWeight: 600, color: '#03aea0',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10,
          }}>Trending now</div>
          <h2 style={{
            fontSize: 'clamp(28px, 3.2vw, 38px)', fontWeight: 800,
            letterSpacing: '-0.43px', margin: 0,
          }}>지금 가장 많이 보는 콘텐츠</h2>
          <div style={{
            fontSize: 13, opacity: 0.6, marginTop: 8,
            letterSpacing: '0.20px',
          }}>카드를 클릭하면 상세 페이지로 이동합니다 · 구독 없이도 둘러볼 수 있어요</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => scroll(-1)} style={arrowBtn(dark)} aria-label="이전">‹</button>
          <button onClick={() => scroll(1)} style={arrowBtn(dark)} aria-label="다음">›</button>
        </div>
      </div>

      <div ref={scrollRef} style={{
        display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 24, paddingRight: 48,
        scrollbarWidth: 'none',
      }}>
        <style>{`.hb-row::-webkit-scrollbar { display: none; } .hb-card { cursor: pointer; transition: transform 0.15s; } .hb-card:hover { transform: translateY(-4px); }`}</style>
        {CONTENT.map((c, i) => (
          <div key={i} className="hb-row hb-card" onClick={goDetail} style={{ flex: '0 0 240px' }}>
            <div style={{ position: 'relative', marginBottom: 14 }}>
              {/* rank number */}
              <div style={{
                position: 'absolute', top: -8, left: -10, zIndex: 2,
                fontSize: 72, fontWeight: 900, lineHeight: 1,
                color: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                letterSpacing: '-0.66px', fontFamily: 'Pretendard, sans-serif',
              }}>{c.hot}</div>
              <div style={{ paddingLeft: 30 }}>
                <BookCover title={c.title} subtitle={c.subtitle} width={210} height={300} kind={c.kinds[0] === 'course' ? 'course' : 'book'} />
              </div>
            </div>
            <div style={{ paddingLeft: 4 }}>
              <h4 style={{
                fontSize: 15, fontWeight: 700, margin: '0 0 6px',
                letterSpacing: '-0.43px', lineHeight: 1.3,
                whiteSpace: 'pre-line',
              }}>{c.title}</h4>
              <div style={{
                fontSize: 12, opacity: 0.6, marginBottom: 10, letterSpacing: '0.20px',
              }}>{c.subtitle}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {c.kinds.includes('ebook') && <Chip tone="ebook" size="sm">전자책</Chip>}
                {c.kinds.includes('course') && <Chip tone="course" size="sm">강의</Chip>}
                <Stars value={c.rating} size={11} muted={!dark ? false : true} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function arrowBtn(dark) {
  return {
    width: 40, height: 40, borderRadius: '50%',
    background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
    color: 'inherit',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    fontSize: 20, cursor: 'pointer', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    lineHeight: 1,
  };
}

function Plans({ dark, planCycle, setPlanCycle }) {
  const monthly = { basic: 9900, pro: 19900 };
  const yearly = { basic: 99000, pro: 199000 }; // ~17% off
  const prices = planCycle === 'yearly' ? yearly : monthly;
  const perMonth = planCycle === 'yearly' ? { basic: Math.round(yearly.basic / 12), pro: Math.round(yearly.pro / 12) } : prices;

  return (
    <section style={{
      padding: '120px 48px',
      background: dark ? '#141416' : '#f3f4f6',
      color: dark ? '#E8E6E1' : '#030712',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: '#03aea0',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
        }}>Subscription</div>
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800,
          letterSpacing: '-0.43px', margin: '0 0 20px', lineHeight: 1.15,
        }}>
          단순한 요금제,<br/>무제한 학습
        </h2>
        <p style={{
          fontSize: 16, opacity: 0.7, margin: '0 0 40px', letterSpacing: '0.20px',
        }}>30일 무료로 체험하고 결정하세요.</p>

        {/* toggle */}
        <div style={{
          display: 'inline-flex', padding: 4, borderRadius: 999,
          background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
          marginBottom: 56,
        }}>
          {['monthly', 'yearly'].map(c => (
            <button key={c} onClick={() => setPlanCycle(c)} style={{
              padding: '10px 22px', borderRadius: 999, border: 'none',
              background: planCycle === c ? (dark ? '#E8E6E1' : '#1A1A1A') : 'transparent',
              color: planCycle === c ? (dark ? '#1A1A1A' : '#FFFFFF') : 'inherit',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              letterSpacing: '0.20px',
            }}>
              {c === 'monthly' ? '월간' : '연간'}
              {c === 'yearly' && (
                <span style={{
                  fontSize: 11, padding: '2px 6px', borderRadius: 4,
                  background: '#03aea0', color: '#fff', fontWeight: 700,
                }}>17% 할인</span>
              )}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
          textAlign: 'left',
        }}>
          <PlanCard
            name="Basic" tagline="개인 학습자를 위한 플랜"
            price={prices.basic} perMonth={perMonth.basic} cycle={planCycle}
            features={['전자책 무제한 열람', '기본 강의 무제한 수강', '학습 진도 트래킹', '오프라인 저장']}
            dark={dark}
          />
          <PlanCard
            name="Pro" tagline="성장에 진심인 개발자를 위해"
            price={prices.pro} perMonth={perMonth.pro} cycle={planCycle}
            features={['Basic의 모든 기능', '프리미엄 강의 포함', '러닝패스 추천', '신간 우선 열람', '수료증 발급']}
            featured dark={dark}
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({ name, tagline, price, perMonth, cycle, features, featured, dark }) {
  return (
    <div style={{
      position: 'relative',
      background: featured
        ? (dark ? '#1C1C1F' : '#FFFFFF')
        : (dark ? '#1C1C1F' : '#FFFFFF'),
      border: featured
        ? '2px solid #03aea0'
        : `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.16)'}`,
      borderRadius: 12, padding: '36px 32px',
    }}>
      {featured && (
        <div style={{
          position: 'absolute', top: -12, left: 32,
          background: '#03aea0', color: '#fff',
          padding: '5px 12px', borderRadius: 4,
          fontSize: 12, fontWeight: 700, letterSpacing: '0.20px',
        }}>추천 플랜</div>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.43px', margin: 0 }}>{name}</h3>
      </div>
      <div style={{ fontSize: 14, opacity: 0.65, marginBottom: 24, letterSpacing: '-0.01em' }}>{tagline}</div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em' }}>₩{perMonth.toLocaleString()}</span>
        <span style={{ fontSize: 14, opacity: 0.6 }}>/ 월</span>
      </div>
      <div style={{ fontSize: 13, opacity: 0.55, marginBottom: 28 }}>
        {cycle === 'yearly' ? `연 ₩${price.toLocaleString()} 일시 결제` : '매월 결제'}
      </div>

      <button style={{
        width: '100%',
        background: featured ? '#03aea0' : 'transparent',
        color: featured ? '#fff' : 'inherit',
        border: featured ? 'none' : `1px solid ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
        padding: '14px', borderRadius: 8, fontSize: 15, fontWeight: 600,
        cursor: 'pointer', letterSpacing: '0.20px', marginBottom: 28,
      }}>
        {featured ? '무료로 시작하기' : '이 플랜 선택'}
      </button>

      <div style={{
        fontSize: 12, fontWeight: 700, opacity: 0.6,
        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14,
      }}>포함 내용</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map(f => (
          <li key={f} style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            fontSize: 14, letterSpacing: '0.20px', lineHeight: 1.5,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#03aea0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LandingFooter({ dark }) {
  return (
    <footer style={{
      padding: '56px 48px 40px',
      background: dark ? '#0A0A0B' : '#f3f4f6',
      color: dark ? 'rgba(232,230,225,0.6)' : 'rgba(62,74,92,0.61)',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(92,102,118,0.08)'}`,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: 36, gap: 40, flexWrap: 'wrap',
        }}>
          <div>
            <HanbitLogo size={20} light={dark} />
            <div style={{ fontSize: 13, marginTop: 12, letterSpacing: '0.20px', maxWidth: 280, lineHeight: 1.6 }}>
              한빛미디어가 운영하는 IT 구독 학습 플랫폼
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))', gap: 40, fontSize: 13 }}>
            {[
              ['서비스', ['카테고리', '러닝패스', '기업 플랜', '이용권']],
              ['회사', ['한빛미디어', '채용', '공지사항', '블로그']],
              ['고객지원', ['도움말', '이용약관', '환불정책', '문의하기']],
              ['한빛+', ['iOS 앱', 'Android 앱', '뉴스레터', '가이드']],
            ].map(([h, items]) => (
              <div key={h}>
                <div style={{ fontWeight: 700, color: dark ? '#E8E6E1' : '#030712', marginBottom: 12 }}>{h}</div>
                {items.map(i => (
                  <div key={i} style={{ padding: '4px 0', letterSpacing: '0.20px' }}>{i}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.16)'}`,
          paddingTop: 24, display: 'flex', justifyContent: 'space-between',
          fontSize: 12, letterSpacing: '0.20px', flexWrap: 'wrap', gap: 12,
        }}>
          <div>© 2026 한빛미디어(주). All rights reserved.</div>
          <div>서울특별시 서대문구 연희로2길 62 · 대표: 김태헌 · 사업자등록번호 229-81-25024</div>
        </div>
      </div>
    </footer>
  );
}

function RecommendTeaser({ dark }) {
  const go = () => window.__hbNav && window.__hbNav('recommend');
  return (
    <section style={{
      padding: '100px 48px',
      background: dark
        ? 'linear-gradient(135deg, #011a19 0%, #141416 100%)'
        : 'linear-gradient(135deg, rgba(3,174,160,0.06) 0%, #f3f4f6 100%)',
      color: dark ? '#E8E6E1' : '#030712',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(92,102,118,0.08)'}`,
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(92,102,118,0.08)'}`,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64,
        alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontSize: 13, fontWeight: 700, color: '#03aea0',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
          }}>For You · 맞춤 추천</div>
          <h2 style={{
            fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800,
            letterSpacing: '-0.43px', lineHeight: 1.2, margin: '0 0 18px',
            textWrap: 'balance',
          }}>3분이면, 내게 맞는 학습 경로가 보여요</h2>
          <p style={{
            fontSize: 16, lineHeight: 1.7, opacity: 0.75, margin: '0 0 28px',
            letterSpacing: '0.20px', textWrap: 'pretty', maxWidth: 500,
          }}>
            직업, 지금의 개발 지식, AI 활용 목적 — 세 가지 질문에 답하면
            한빛+ 큐레이터가 당신에게 꼭 맞는 콘텐츠를 골라드려요.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={go} style={{
              background: '#03aea0', color: '#fff', border: 'none',
              padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.20px', fontFamily: 'inherit',
              boxShadow: '0 6px 20px -6px rgba(3,174,160,0.5)',
            }}>맞춤 추천 받기 →</button>
            <div style={{ fontSize: 12, opacity: 0.55, letterSpacing: '-0.01em' }}>
              로그인 없이 · 30초 소요
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {[
            { n: '01', label: '직업', v: '프론트엔드 개발자' },
            { n: '02', label: '개발 지식', v: '실무 경험이 있어요' },
            { n: '03', label: 'AI 활용 목적', v: '업무 생산성 향상' },
          ].map(s => (
            <div key={s.n} style={{
              padding: '16px 20px', borderRadius: 10,
              background: dark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.16)'}`,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 800, color: '#03aea0',
                letterSpacing: '0.05em',
              }}>{s.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 11, opacity: 0.6, letterSpacing: '0.04em',
                  textTransform: 'uppercase', fontWeight: 700, marginBottom: 2,
                }}>{s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>{s.v}</div>
              </div>
              <div style={{ fontSize: 18, color: '#03aea0', opacity: 0.6 }}>›</div>
            </div>
          ))}
          <div style={{
            padding: '14px 20px', borderRadius: 10,
            background: 'rgba(3,174,160,0.08)',
            border: `1.5px dashed rgba(3,174,160,0.35)`,
            fontSize: 13, fontWeight: 600, color: '#03aea0',
            letterSpacing: '0.20px', textAlign: 'center',
          }}>
            → 5개의 추천 콘텐츠와 학습 경로 제안
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { RecommendTeaser });
