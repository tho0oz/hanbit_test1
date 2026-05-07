// My Learning Room — 내 학습실 + 개인화 홈 (한빛 Design System)

const TOKEN = {
  primary:        '#03aea0',
  primaryStrong:  '#009e91',
  primaryHeavy:   '#028b80',
  primaryTint:    'rgba(3,174,160,0.10)',
  primaryTintMd:  'rgba(3,174,160,0.16)',
  bgNormal:       '#ffffff',
  bgAlt:          '#f3f4f6',
  labelStrong:    '#000000',
  labelNormal:    '#030712',
  labelNeutral:   'rgba(30,41,57,0.88)',
  labelAlt:       'rgba(62,74,92,0.61)',
  labelAssistive: 'rgba(62,74,92,0.28)',
  lineNormal:     'rgba(92,102,118,0.22)',
  lineAlt:        'rgba(92,102,118,0.08)',
  fillNormal:     'rgba(92,102,118,0.08)',
  fillAlt:        'rgba(92,102,118,0.05)',
};

const USER = {
  name: '김민준',
  id: '@kimvibe',
  level: 3,
  levelName: '탐험가',
  xp: 720, xpMax: 1000,
  badges: [
    { icon: '🔥', label: '7일 연속', color: '#ff6900' },
    { icon: '📚', label: '첫 완독',  color: '#03aea0' },
    { icon: '⭐', label: '리뷰어',   color: '#f0b100' },
    { icon: '🚀', label: '얼리버드', color: '#6257e3' },
  ],
};

const KIND_LABEL = { ebook: '전자책', course: '강의', paper: '종이책' };
const KIND_COLOR = { ebook: TOKEN.primary, course: '#6257e3', paper: '#f0b100' };

const RECENT_ITEMS = [
  { title: '혼자 공부하는 바이브코딩', author: '김민준', kind: 'ebook',  progress: 38, color: '#03aea0' },
  { title: 'Python 데이터 분석 입문',  author: '이수현', kind: 'course', progress: 72, color: '#6257e3' },
  { title: 'Clean Code 한국어판',      author: 'Robert C. Martin', kind: 'ebook', progress: 100, color: '#f0b100' },
  { title: 'Do it! 자바스크립트',      author: '고경희', kind: 'ebook',  progress: 15, color: '#ff6900' },
];

const RECOMMENDED = [
  { title: 'GPT API 실전 활용',             author: '박서준', kind: 'course', tags: ['AI', 'API'],        rating: 4.9 },
  { title: '파이썬으로 배우는 알고리즘',      author: '홍길동', kind: 'ebook',  tags: ['알고리즘', '취업'],  rating: 4.7 },
  { title: 'React 완전 정복',               author: '이재승', kind: 'course', tags: ['프론트엔드'],        rating: 4.8 },
  { title: 'TypeScript 핸드북',             author: '조시 골드버그', kind: 'ebook', tags: ['TypeScript'], rating: 4.6 },
  { title: 'Docker & Kubernetes 실전',      author: '김도현', kind: 'course', tags: ['DevOps'],           rating: 4.7 },
  { title: 'SQL로 시작하는 데이터 분석',      author: '최유리', kind: 'ebook',  tags: ['데이터', '입문'],   rating: 4.5 },
];

function LoggedInGNB({ activeScreen, setScreen }) {
  const t = TOKEN;
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${t.lineAlt}`,
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <HanbitLogo size={20} />
          <nav style={{ display: 'flex', gap: 4 }}>
            {[
              { label: '메인', screen: 'myhome' },
              { label: '내 콘텐츠', screen: 'myroom' },
            ].map(n => {
              const isActive = n.screen === activeScreen;
              return (
                <button key={n.screen} onClick={() => setScreen(n.screen)} style={{
                  background: isActive ? t.primaryTint : 'none',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  padding: '6px 12px', borderRadius: 6,
                  fontSize: 14, fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.20px', lineHeight: 1.429,
                  color: isActive ? t.primary : t.labelAlt,
                }}>{n.label}</button>
              );
            })}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 999,
            background: t.primaryTint, fontSize: 12, fontWeight: 600, letterSpacing: '0.30px', color: t.primaryHeavy,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.primary }} />
            Pro 구독 중
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.primary}, ${t.primaryHeavy})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff',
          }}>김</div>
        </div>
      </div>
    </header>
  );
}

function ProfileSidebar() {
  const t = TOKEN;
  const user = USER;
  const card = (extra) => ({ background: t.bgNormal, border: `1px solid ${t.lineAlt}`, borderRadius: 12, ...extra });
  return (
    <aside style={{ width: 260, flexShrink: 0 }}>
      <div style={{ position: 'sticky', top: 72, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ ...card({ padding: 20 }) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.primary}, ${t.primaryHeavy})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>김</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.429, letterSpacing: '0.20px', color: t.labelNormal }}>{user.name}</div>
              <div style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.334, letterSpacing: '0.30px', color: t.labelAlt }}>{user.id}</div>
            </div>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 999,
            background: t.primaryTint, marginBottom: 16,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.34px', color: t.primaryHeavy,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.primary }} />
            Pro 구독 중
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.43px', color: t.primary }}>Lv.{user.level}</span>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.30px', color: t.labelAlt }}>{user.levelName}</span>
            </div>
            <div style={{ height: 4, borderRadius: 999, background: t.fillNormal, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(user.xp / user.xpMax) * 100}%`, borderRadius: 999, background: t.primary }} />
            </div>
            <div style={{ marginTop: 5, fontSize: 11, fontWeight: 400, letterSpacing: '0.34px', color: t.labelAssistive, textAlign: 'right' }}>
              {user.xp} / {user.xpMax} XP
            </div>
          </div>
        </div>
        <div style={{ ...card({ padding: 20 }) }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.34px', color: t.labelAlt, textTransform: 'uppercase', marginBottom: 14 }}>획득한 배지</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {user.badges.map((b, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '12px 8px', borderRadius: 8,
                background: t.fillAlt, border: `1px solid ${t.lineAlt}`,
              }}>
                <span style={{ fontSize: 22 }}>{b.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.34px', color: t.labelAlt, textAlign: 'center', lineHeight: 1.3 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...card({ padding: 20 }) }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.34px', color: t.labelAlt, textTransform: 'uppercase', marginBottom: 14 }}>이번 달</div>
          {[
            { label: '읽은 전자책', value: '7권' },
            { label: '완료한 강의', value: '3개' },
            { label: '연속 학습일', value: '12일' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '9px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.lineAlt}` : 'none',
            }}>
              <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: '0.25px', color: t.labelAlt }}>{s.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.20px', color: t.labelNormal }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function MyHomePage({ dark, isSubscriber, setScreen }) {
  const t = TOKEN;
  const fg = dark ? '#E8E6E1' : '#030712';
  const mutedFg = dark ? 'rgba(232,230,225,0.65)' : 'rgba(62,74,92,0.61)';
  const borderCol = dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.22)';
  const bg = dark ? '#0F0F10' : '#ffffff';

  const goDetail = () => setScreen('detail');

  // 이어보기: recent items converted to ListCard format
  const continueCards = RECENT_ITEMS
    .filter(i => i.progress < 100)
    .map(i => ({ title: i.title, subtitle: i.author, kinds: [i.kind], rating: 4.7, reviews: 0, tags: [], _progress: i.progress, _color: i.color }));

  // AI 추천: use REC_POOL (globally available from recommend page)
  const aiRec = typeof REC_POOL !== 'undefined' ? REC_POOL.slice(0, 5) : [];
  // 이 분야도: rest of REC_POOL
  const algoRec = typeof REC_POOL !== 'undefined' ? REC_POOL.slice(5) : [];

  const SectionHeader = ({ title, sub, onMore }) => (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${borderCol}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.43px', color: fg }}>{title}</h2>
        {sub && <span style={{ fontSize: 13, fontWeight: 400, color: mutedFg, letterSpacing: '0.20px' }}>{sub}</span>}
      </div>
      {onMore && (
        <button onClick={onMore} style={{
          background: 'none', border: 'none', color: t.primary,
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: '0.20px',
        }}>전체 보기 →</button>
      )}
    </div>
  );

  // Card with optional progress bar — wraps ListCard visually
  const HomeCard = ({ c, progress, color }) => (
    <div onClick={goDetail} style={{ cursor: 'pointer' }}
      onMouseEnter={e => { const cover = e.currentTarget.querySelector('.hb-list-cover'); if (cover) cover.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { const cover = e.currentTarget.querySelector('.hb-list-cover'); if (cover) cover.style.transform = 'translateY(0)'; }}
    >
      <div className="hb-list-cover" style={{ marginBottom: 14, transition: 'transform 0.15s', position: 'relative' }}>
        <BookCover title={c.title} subtitle={c.subtitle} width={160} height={228} kind={c.kinds[0] === 'course' ? 'course' : 'book'} />
        {progress !== undefined && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'rgba(0,0,0,0.15)', borderRadius: '0 0 4px 4px' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: t.primary, borderRadius: '0 0 0 4px' }} />
          </div>
        )}
      </div>
      <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 3px', letterSpacing: '-0.3px', lineHeight: 1.3, whiteSpace: 'pre-line', color: fg }}>{c.title}</h4>
      <div style={{ fontSize: 13, color: mutedFg, marginBottom: 4, letterSpacing: '0.20px' }}>{c.subtitle}</div>
      {progress !== undefined && (
        <div style={{ fontSize: 11, fontWeight: 600, color: t.primary, letterSpacing: '0.34px' }}>{progress}% 진행 중</div>
      )}
      {progress === undefined && c.rating > 0 && (
        <div style={{ fontSize: 12, color: mutedFg }}>
          <span style={{ color: '#f0b100', fontWeight: 700 }}>★ {c.rating}</span>
          {c.reviews > 0 && <span style={{ marginLeft: 4, opacity: 0.7 }}>({c.reviews.toLocaleString()})</span>}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ background: bg, color: fg, fontFamily: 'Pretendard, sans-serif', minHeight: '100vh' }}>
      <LoggedInGNB activeScreen="myhome" setScreen={setScreen} />

      {/* 페이지 헤더 */}
      <div style={{ borderBottom: `1px solid ${borderCol}`, background: dark ? '#141416' : '#f3f4f6' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 48px 28px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.primary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>My Home</div>
          <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.66px', lineHeight: 1.2, margin: '0 0 8px' }}>
            안녕하세요, {USER.name}님
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: mutedFg, letterSpacing: '0.20px' }}>
            내 학습 패턴에 맞게 큐레이션된 콘텐츠예요.
          </p>
        </div>
      </div>

      {/* 본문 */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 48px 100px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* 좌측 콘텐츠 */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 60 }}>

          {/* 이어보기 */}
          {continueCards.length > 0 && (
            <section>
              <SectionHeader title="이어보기" sub="최근 본 콘텐츠" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '32px 20px' }}>
                {continueCards.map((c, i) => (
                  <HomeCard key={i} c={c} progress={c._progress} color={c._color} />
                ))}
              </div>
            </section>
          )}

          {/* AI 맞춤 추천 */}
          {aiRec.length > 0 && (
            <section>
              <SectionHeader title="AI 맞춤 추천" sub="내 학습 패턴 분석 기반" onMore={() => setScreen('list')} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '32px 20px' }}>
                {aiRec.map((c, i) => (
                  <HomeCard key={i} c={{ ...c, subtitle: c.subtitle }} />
                ))}
              </div>
            </section>
          )}

          {/* 이 분야도 관심 있으실까요 */}
          {algoRec.length > 0 && (
            <section>
              <SectionHeader title="이 분야도 관심 있으실까요?" sub="알고리즘 기반" onMore={() => setScreen('list')} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '32px 20px' }}>
                {algoRec.map((c, i) => (
                  <HomeCard key={i} c={{ ...c, subtitle: c.subtitle }} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 우측 고정 사이드바 */}
        <ProfileSidebar />
      </div>
    </div>
  );
}

function MyRoomPage({ dark, isSubscriber, setScreen }) {
  const t = TOKEN;
  const user = USER;
  const card = (extra) => ({ background: t.bgNormal, border: `1px solid ${t.lineAlt}`, borderRadius: 12, ...extra });

  return (
    <div style={{ background: t.bgAlt, color: t.labelNormal, minHeight: '100vh', fontFamily: 'Pretendard, sans-serif' }}>
      <LoggedInGNB activeScreen="myroom" setScreen={setScreen} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 48px 100px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* 최근 본 콘텐츠 */}
          <section>
            <h2 style={{ margin: '0 0 16px', fontSize: 22, fontWeight: 600, lineHeight: 1.364, letterSpacing: '-0.43px', color: t.labelStrong }}>
              최근 본 콘텐츠
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {RECENT_ITEMS.map((item, i) => (
                <button key={i} onClick={() => setScreen('detail')} style={{
                  ...card({ padding: 16 }), cursor: 'pointer', fontFamily: 'inherit',
                  textAlign: 'left', display: 'flex', gap: 14, alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 44, height: 60, borderRadius: 6, flexShrink: 0,
                    background: `linear-gradient(150deg, ${item.color}cc, ${item.color}66)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>{item.kind === 'course' ? '▶️' : '📖'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 600, letterSpacing: '0.34px', padding: '2px 6px',
                        borderRadius: 4, background: `${KIND_COLOR[item.kind]}18`, color: KIND_COLOR[item.kind],
                      }}>{KIND_LABEL[item.kind]}</span>
                    </div>
                    <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600, lineHeight: 1.429, letterSpacing: '0.20px', color: t.labelNormal, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                    <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 400, lineHeight: 1.334, letterSpacing: '0.30px', color: t.labelAlt }}>{item.author}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 3, borderRadius: 999, background: t.fillNormal, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${item.progress}%`, borderRadius: 999, background: item.progress === 100 ? t.primary : item.color }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.34px', color: item.progress === 100 ? t.primary : t.labelAlt, flexShrink: 0 }}>
                        {item.progress === 100 ? '완독 ✓' : `${item.progress}%`}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 추천 콘텐츠 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, lineHeight: 1.364, letterSpacing: '-0.43px', color: t.labelStrong }}>추천 콘텐츠</h2>
              <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: '0.25px', color: t.labelAlt }}>내 학습 패턴 기반</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {RECOMMENDED.map((item, i) => (
                <button key={i} onClick={() => setScreen('detail')} style={{
                  ...card({ padding: 16 }), cursor: 'pointer', fontFamily: 'inherit',
                  textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10,
                }}>
                  <div style={{
                    width: '100%', height: 80, borderRadius: 8,
                    background: `linear-gradient(135deg, ${KIND_COLOR[item.kind]}22, ${KIND_COLOR[item.kind]}08)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                  }}>{item.kind === 'course' ? '▶️' : '📚'}</div>
                  <div>
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.34px', padding: '2px 6px',
                      borderRadius: 4, background: `${KIND_COLOR[item.kind]}18`, color: KIND_COLOR[item.kind],
                      marginBottom: 6, display: 'inline-block',
                    }}>{KIND_LABEL[item.kind]}</span>
                    <p style={{ margin: '4px 0 2px', fontSize: 13, fontWeight: 600, lineHeight: 1.385, letterSpacing: '0.25px', color: t.labelNormal }}>{item.title}</p>
                    <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 400, letterSpacing: '0.34px', color: t.labelAlt }}>{item.author}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} style={{
                            fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 4,
                            background: t.fillNormal, color: t.labelAlt, letterSpacing: '0.30px',
                          }}>#{tag}</span>
                        ))}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#f0b100', letterSpacing: '0.34px' }}>★ {item.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <ProfileSidebar />
      </div>
    </div>
  );
}
