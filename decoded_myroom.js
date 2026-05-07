// My Learning Room — 내 학습실 (한빛 Design System 기반)

function MyRoomPage({ dark, isSubscriber, setScreen }) {
  // Semantic tokens (Light mode)
  const token = {
    primary:        '#03aea0',
    primaryStrong:  '#009e91',
    primaryHeavy:   '#028b80',
    primaryTint:    'rgba(3, 174, 160, 0.10)',
    primaryTintMd:  'rgba(3, 174, 160, 0.16)',

    bgNormal:       '#ffffff',
    bgAlt:          '#f3f4f6',          // Background/Normal/Alternative

    labelStrong:    '#000000',
    labelNormal:    '#030712',
    labelNeutral:   'rgba(30, 41, 57, 0.88)',
    labelAlt:       'rgba(62, 74, 92, 0.61)',
    labelAssistive: 'rgba(62, 74, 92, 0.28)',
    labelDisable:   'rgba(62, 74, 92, 0.16)',

    lineNormal:     'rgba(92, 102, 118, 0.22)',
    lineNeutral:    'rgba(92, 102, 118, 0.16)',
    lineAlt:        'rgba(92, 102, 118, 0.08)',

    fillNormal:     'rgba(92, 102, 118, 0.08)',
    fillStrong:     'rgba(92, 102, 118, 0.16)',
    fillAlt:        'rgba(92, 102, 118, 0.05)',

    positive:       '#00c950',
  };

  const levelInfo = { level: 3, name: '탐험가', nextLevel: '숙련자', xp: 720, xpMax: 1000 };
  const stats = [
    { label: '읽은 전자책', value: '7권' },
    { label: '완료한 강의', value: '3개' },
    { label: '연속 학습일', value: '12일' },
    { label: '메모 개수',   value: '41개' },
  ];
  const currentBook = {
    title: '혼자 공부하는 바이브코딩',
    author: '김민준',
    progress: 38,
    lastChapter: '3장 · AI 도구 검증 루틴',
  };
  const recentItems = [
    { type: 'ebook',  title: '혼자 공부하는 바이브코딩', sub: '3장 24쪽까지 읽음',  date: '오늘' },
    { type: 'course', title: 'Python 데이터 분석 입문',  sub: '강의 6 완료',         date: '어제' },
    { type: 'ebook',  title: 'Clean Code 한국어판',      sub: '완독',                date: '3일 전' },
  ];
  const recommended = [
    { title: 'GPT API 실전 활용',        tag: '강의' },
    { title: '파이썬으로 배우는 알고리즘', tag: '전자책' },
    { title: 'React 완전 정복',           tag: '강의' },
  ];

  // Shared card style (Design System: border-radius 12px, line alt border)
  const card = (extra) => ({
    background: token.bgNormal,
    border: `1px solid ${token.lineAlt}`,
    borderRadius: 12,
    padding: 20,
    ...extra,
  });

  return (
    <div style={{ background: token.bgAlt, color: token.labelNormal,
      minHeight: '100vh', fontFamily: 'Pretendard, sans-serif' }}>

      {/* GNB */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${token.lineAlt}`,
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto', padding: '0 48px',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <HanbitLogo size={20} />
            <nav style={{ display: 'flex', gap: 24 }}>
              <button onClick={() => setScreen('landing')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
                lineHeight: 1.429, letterSpacing: '0.20px',
                color: token.labelAlt, padding: '4px 0',
              }}>서비스 소개</button>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                lineHeight: 1.429, letterSpacing: '0.20px',
                color: token.primary, padding: '4px 0',
                borderBottom: `2px solid ${token.primary}`,
              }}>내 학습실</button>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Pro badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 10px', borderRadius: 999,
              background: token.primaryTint,
              fontSize: 12, fontWeight: 600, letterSpacing: '0.30px',
              color: token.primaryHeavy,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: token.primary }} />
              Pro 구독 중
            </div>
            {/* Avatar */}
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: token.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>김</div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 48px 100px' }}>

        {/* 페이지 헤더 */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ margin: '0 0 4px',
            fontSize: 13, fontWeight: 400, lineHeight: 1.385, letterSpacing: '0.25px',
            color: token.labelAlt }}>
            안녕하세요, 김민준 님 👋
          </p>
          <h1 style={{ margin: 0,
            fontSize: 28, fontWeight: 700, lineHeight: 1.358, letterSpacing: '-0.66px',
            color: token.labelStrong }}>
            내 학습실
          </h1>
        </div>

        {/* 레벨 + 스탯 row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>

          {/* 레벨 카드 */}
          <div style={{ ...card(), padding: 24 }}>
            <p style={{ margin: '0 0 12px',
              fontSize: 11, fontWeight: 600, lineHeight: 1.273, letterSpacing: '0.34px',
              color: token.primary, textTransform: 'uppercase' }}>현재 레벨</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
              <span style={{
                fontSize: 48, fontWeight: 700, lineHeight: 1, letterSpacing: '-1.13px',
                color: token.primary }}>Lv.{levelInfo.level}</span>
              <span style={{
                fontSize: 20, fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.24px',
                color: token.labelNormal }}>{levelInfo.name}</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8,
                fontSize: 12, fontWeight: 400, lineHeight: 1.334, letterSpacing: '0.30px',
                color: token.labelAlt }}>
                <span>{levelInfo.name} → {levelInfo.nextLevel}</span>
                <span style={{ fontWeight: 600, color: token.labelNeutral }}>
                  {levelInfo.xp} / {levelInfo.xpMax} XP
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: token.fillNormal, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 999, background: token.primary,
                  width: `${(levelInfo.xp / levelInfo.xpMax) * 100}%`,
                }} />
              </div>
            </div>
          </div>

          {/* 스탯 2×2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {stats.map(s => (
              <div key={s.label} style={{ ...card(), padding: 18 }}>
                <div style={{
                  fontSize: 28, fontWeight: 700, lineHeight: 1.358, letterSpacing: '-0.66px',
                  color: token.labelStrong, marginBottom: 4 }}>{s.value}</div>
                <div style={{
                  fontSize: 12, fontWeight: 400, lineHeight: 1.334, letterSpacing: '0.30px',
                  color: token.labelAlt }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 메인 2-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 12 }}>

          {/* 왼쪽 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* 지금 읽는 중 */}
            <div style={card()}>
              <p style={{ margin: '0 0 16px',
                fontSize: 11, fontWeight: 600, lineHeight: 1.273, letterSpacing: '0.34px',
                color: token.labelAlt, textTransform: 'uppercase' }}>지금 읽는 중</p>

              <div style={{ display: 'flex', gap: 16 }}>
                {/* 커버 */}
                <div style={{
                  width: 48, height: 68, borderRadius: 6, flexShrink: 0,
                  background: `linear-gradient(150deg, ${token.primary}, ${token.primaryHeavy})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>📖</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: '0 0 2px',
                    fontSize: 15, fontWeight: 600, lineHeight: 1.467, letterSpacing: '0.14px',
                    color: token.labelNormal,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentBook.title}
                  </p>
                  <p style={{ margin: '0 0 12px',
                    fontSize: 13, fontWeight: 400, lineHeight: 1.385, letterSpacing: '0.25px',
                    color: token.labelAlt }}>
                    {currentBook.author} · {currentBook.lastChapter}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 4, borderRadius: 999, background: token.fillNormal, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${currentBook.progress}%`,
                        borderRadius: 999, background: token.primary }} />
                    </div>
                    <span style={{ flexShrink: 0,
                      fontSize: 12, fontWeight: 600, letterSpacing: '0.30px',
                      color: token.primary }}>{currentBook.progress}%</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setScreen('detail')} style={{
                marginTop: 16, width: '100%', padding: '10px 0', borderRadius: 8, border: 'none',
                background: token.primary, color: '#fff', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                lineHeight: 1.429, letterSpacing: '0.20px',
              }}>이어 읽기 →</button>
            </div>

            {/* 최근 활동 */}
            <div style={card()}>
              <p style={{ margin: '0 0 4px',
                fontSize: 11, fontWeight: 600, lineHeight: 1.273, letterSpacing: '0.34px',
                color: token.labelAlt, textTransform: 'uppercase' }}>최근 활동</p>

              {recentItems.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 0',
                  borderBottom: i < recentItems.length - 1 ? `1px solid ${token.lineAlt}` : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    background: item.type === 'ebook' ? token.primaryTint : token.fillNormal,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{item.type === 'ebook' ? '📚' : '▶️'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 2px',
                      fontSize: 14, fontWeight: 500, lineHeight: 1.429, letterSpacing: '0.20px',
                      color: token.labelNormal,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </p>
                    <p style={{ margin: 0,
                      fontSize: 12, fontWeight: 400, lineHeight: 1.334, letterSpacing: '0.30px',
                      color: token.labelAlt }}>{item.sub}</p>
                  </div>
                  <span style={{
                    flexShrink: 0, fontSize: 12, fontWeight: 400,
                    lineHeight: 1.334, letterSpacing: '0.30px',
                    color: token.labelAssistive }}>{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* 이번 달 학습 현황 */}
            <div style={card()}>
              <p style={{ margin: '0 0 14px',
                fontSize: 11, fontWeight: 600, lineHeight: 1.273, letterSpacing: '0.34px',
                color: token.labelAlt, textTransform: 'uppercase' }}>이번 달 학습 현황</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                {['일','월','화','수','목','금','토'].map(d => (
                  <div key={d} style={{
                    textAlign: 'center', paddingBottom: 6,
                    fontSize: 11, fontWeight: 500, lineHeight: 1.273,
                    letterSpacing: '0.34px', color: token.labelAssistive,
                  }}>{d}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2;
                  const valid = day >= 1 && day <= 31;
                  const studied = valid && [1,2,3,5,6,7,8,9,12,13,14,15,16].includes(day);
                  const today = day === 7;
                  return (
                    <div key={i} style={{
                      aspectRatio: '1', borderRadius: 6,
                      background: !valid ? 'transparent'
                        : today ? token.primary
                        : studied ? token.primaryTint
                        : token.fillAlt,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: today ? 700 : 400,
                      color: !valid ? 'transparent'
                        : today ? '#fff'
                        : studied ? token.primary
                        : token.labelAssistive,
                      outline: today ? `2px solid ${token.primary}` : 'none',
                      outlineOffset: 1,
                    }}>{valid ? day : ''}</div>
                  );
                })}
              </div>

              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 400, lineHeight: 1.334, letterSpacing: '0.30px',
                color: token.labelAlt }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: token.primary, flexShrink: 0 }} />
                학습한 날 · 이번 달 13일
              </div>
            </div>

            {/* 추천 다음 콘텐츠 */}
            <div style={card()}>
              <p style={{ margin: '0 0 12px',
                fontSize: 11, fontWeight: 600, lineHeight: 1.273, letterSpacing: '0.34px',
                color: token.labelAlt, textTransform: 'uppercase' }}>추천 다음 콘텐츠</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {recommended.map((r, i) => (
                  <button key={i} onClick={() => setScreen('detail')} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 12px', borderRadius: 8,
                    border: `1px solid ${token.lineAlt}`,
                    background: token.fillAlt,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: token.primaryTint,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                    }}>{r.tag === '강의' ? '▶️' : '📚'}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: '0 0 2px',
                        fontSize: 13, fontWeight: 500, lineHeight: 1.385, letterSpacing: '0.25px',
                        color: token.labelNormal,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {r.title}
                      </p>
                      <p style={{ margin: 0,
                        fontSize: 11, fontWeight: 400, lineHeight: 1.273, letterSpacing: '0.34px',
                        color: token.labelAlt }}>{r.tag}</p>
                    </div>
                    <span style={{ fontSize: 16, color: token.labelAssistive, flexShrink: 0 }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
