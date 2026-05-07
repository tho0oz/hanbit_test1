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
  const card = (extra) => ({ background: t.bgNormal, border: `1px solid ${t.lineAlt}`, borderRadius: 12, ...extra });

  const continueItems = RECENT_ITEMS.filter(i => i.progress < 100);
  const completedItems = RECENT_ITEMS.filter(i => i.progress === 100);

  const ContentRow = ({ items, columns = 'repeat(2,1fr)', gap = 12 }) => (
    <div style={{ display: 'grid', gridTemplateColumns: columns, gap }}>
      {items.map((item, i) => (
        <button key={i} onClick={() => setScreen('detail')} style={{
          ...card({ padding: 16 }), cursor: 'pointer', fontFamily: 'inherit',
          textAlign: 'left', display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 44, height: 60, borderRadius: 6, flexShrink: 0,
            background: `linear-gradient(150deg, ${item.color || KIND_COLOR[item.kind]}cc, ${item.color || KIND_COLOR[item.kind]}55)`,
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
            {item.progress !== undefined && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 3, borderRadius: 999, background: t.fillNormal, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.progress}%`, borderRadius: 999, background: item.progress === 100 ? t.primary : item.color }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.34px', color: item.progress === 100 ? t.primary : t.labelAlt, flexShrink: 0 }}>
                  {item.progress === 100 ? '완독 ✓' : `${item.progress}%`}
                </span>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );

  const RecommendRow = ({ items }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
      {items.map((item, i) => (
        <button key={i} onClick={() => setScreen('detail')} style={{
          ...card({ padding: 16 }), cursor: 'pointer', fontFamily: 'inherit',
          textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{
            width: '100%', height: 72, borderRadius: 8,
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
              <div style={{ display: 'flex', gap: 4 }}>
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
  );

  const SectionHeader = ({ title, sub }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.4px', color: t.labelStrong }}>{title}</h2>
      {sub && <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: '0.25px', color: t.labelAlt }}>{sub}</span>}
    </div>
  );

  return (
    <div style={{ background: t.bgAlt, color: t.labelNormal, minHeight: '100vh', fontFamily: 'Pretendard, sans-serif' }}>
      <LoggedInGNB activeScreen="myhome" setScreen={setScreen} />

      {/* 인사 배너 */}
      <div style={{ background: `linear-gradient(120deg, ${t.primary}18, ${t.primaryTint} 60%, transparent)`, borderBottom: `1px solid ${t.lineAlt}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 48px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 500, letterSpacing: '0.25px', color: t.primaryHeavy }}>안녕하세요, {USER.name}님 👋</p>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', color: t.labelStrong }}>오늘도 학습을 이어볼까요?</h1>
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 48px 100px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 44 }}>

          {/* 이어보기 */}
          {continueItems.length > 0 && (
            <section>
              <SectionHeader title="이어보기" sub="최근 본 콘텐츠" />
              <ContentRow items={continueItems} />
            </section>
          )}

          {/* AI 추천 */}
          <section>
            <SectionHeader title="AI 맞춤 추천" sub="내 학습 패턴 분석 기반" />
            <RecommendRow items={RECOMMENDED.slice(0, 3)} />
          </section>

          {/* 인기 급상승 */}
          <section>
            <SectionHeader title="이 분야도 관심 있으실까요?" sub="알고리즘 기반" />
            <RecommendRow items={RECOMMENDED.slice(3, 6)} />
          </section>

          {/* 완독 기록 */}
          {completedItems.length > 0 && (
            <section>
              <SectionHeader title="완료한 콘텐츠" />
              <ContentRow items={completedItems} />
            </section>
          )}
        </div>

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
