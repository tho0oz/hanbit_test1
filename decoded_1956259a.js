// Content detail page — 혼자 공부하는 바이브코딩

function DetailPage({ dark, isSubscriber, setIsSubscriber, setScreen }) {
  const [tab, setTab] = React.useState('intro'); // intro | review | curriculum
  const [format, setFormat] = React.useState('ebook'); // ebook | course | paper
  const [reviewFilter, setReviewFilter] = React.useState('all');
  const [wished, setWished] = React.useState(false);

  const content = {
    title: '혼자 공부하는 바이브코딩',
    author: '김민준',
    publisher: '한빛미디어',
    published: '2025.11.28',
    rating: 4.8, reviewCount: 1284,
    tags: ['입문', 'AI', '바이브코딩', 'Claude Code', '2025 신간'],
  };

  // subtle bg per mode
  const bg = dark ? '#0F0F10' : '#ffffff';
  const fg = dark ? '#E8E6E1' : '#030712';
  const mutedFg = dark ? 'rgba(232,230,225,0.65)' : 'rgba(62,74,92,0.61)';
  const borderCol = dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.22)';
  const cardBg = dark ? '#1C1C1F' : '#FFFFFF';

  return (
    <div data-screen-label="02 Detail" style={{
      background: bg, color: fg, fontFamily: 'Pretendard, sans-serif',
      minHeight: '100vh',
    }}>
      <DetailGNB dark={dark} isSubscriber={isSubscriber} />

      {/* breadcrumb */}
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '20px 48px 0', fontSize: 13,
        color: mutedFg, letterSpacing: '0.20px',
      }}>
        <span>카테고리</span>
        <span style={{ margin: '0 8px', opacity: 0.5 }}>›</span>
        <span>개발/프로그래밍</span>
        <span style={{ margin: '0 8px', opacity: 0.5 }}>›</span>
        <span>AI / 머신러닝</span>
      </div>

      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '28px 48px 100px',
        display: 'grid', gridTemplateColumns: '1fr 380px', gap: 56,
      }}>
        {/* LEFT */}
        <div style={{ minWidth: 0 }}>
          <ContentHeader content={content} mutedFg={mutedFg} />

          {/* Tabs */}
          <div style={{
            display: 'flex', gap: 0, borderBottom: `1px solid ${borderCol}`,
            marginTop: 40, marginBottom: 32,
          }}>
            {[
              { id: 'intro', label: '소개' },
              { id: 'review', label: `리뷰 ${content.reviewCount.toLocaleString()}` },
              { id: 'curriculum', label: '커리큘럼' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '16px 4px', marginRight: 32,
                background: 'none', border: 'none', cursor: 'pointer',
                color: tab === t.id ? fg : mutedFg,
                fontSize: 15, fontWeight: 600, letterSpacing: '0.20px',
                borderBottom: tab === t.id ? '2px solid #03aea0' : '2px solid transparent',
                marginBottom: -1,
              }}>{t.label}</button>
            ))}
          </div>

          {tab === 'intro' && <IntroTab dark={dark} mutedFg={mutedFg} fg={fg} borderCol={borderCol} cardBg={cardBg} />}
          {tab === 'review' && (
            <ReviewTab
              content={content} filter={reviewFilter} setFilter={setReviewFilter}
              dark={dark} fg={fg} mutedFg={mutedFg} borderCol={borderCol} cardBg={cardBg}
            />
          )}
          {tab === 'curriculum' && <CurriculumTab mutedFg={mutedFg} fg={fg} borderCol={borderCol} cardBg={cardBg} />}
        </div>

        {/* RIGHT — sticky purchase card */}
        <div>
          <div style={{ position: 'sticky', top: 96 }}>
            <PurchaseCard
              format={format} setFormat={setFormat}
              isSubscriber={isSubscriber} setIsSubscriber={setIsSubscriber}
              setScreen={setScreen}
              wished={wished} setWished={setWished}
              dark={dark} cardBg={cardBg} fg={fg} mutedFg={mutedFg} borderCol={borderCol}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailGNB({ dark, isSubscriber }) {
  const [menuOpen, setMenuOpen] = React.useState(null);
  const closeTimer = React.useRef(null);
  const open = (id) => { clearTimeout(closeTimer.current); setMenuOpen(id); };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(null), 120);
  };
  const linkStyle = (active) => ({
    color: 'inherit', opacity: active ? 1 : 0.75,
    textDecoration: 'none', fontWeight: 500, fontSize: 14,
    padding: '8px 2px', background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'inherit', letterSpacing: '0.20px',
  });
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: dark ? 'rgba(15,15,16,0.82)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.08)'}`,
    }}>
     <div style={{
        padding: '16px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <HanbitLogo size={22} light={dark} />
        <nav style={{ display: 'flex', gap: 28, fontSize: 14 }}>
          <button style={linkStyle(false)} onClick={() => window.__hbNav && window.__hbNav('landing')}>서비스 소개</button>
          <button
            style={linkStyle(menuOpen === 'content')}
            onClick={() => window.__hbNav && window.__hbNav('list')}
            onMouseEnter={() => open('content')}
            onMouseLeave={scheduleClose}
            onFocus={() => open('content')}
            onBlur={scheduleClose}
          >
            콘텐츠 <span style={{ marginLeft: 4, fontSize: 10, opacity: 0.6 }}>▾</span>
          </button>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.08)',
          borderRadius: 8, padding: '8px 14px', width: 240,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6, marginRight: 8 }}>
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4-4" />
          </svg>
          <span style={{ fontSize: 13, opacity: 0.6 }}>제목, 저자, 키워드 검색</span>
        </div>
        {isSubscriber ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(3,174,160,0.10)', color: '#028b80',
            fontSize: 12, fontWeight: 700,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#03aea0' }} />
            Pro 구독 중
          </div>
        ) : (
          <button style={{
            background: '#03aea0', color: '#fff', border: 'none',
            padding: '9px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}>구독 시작하기</button>
        )}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(92,102,118,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700,
        }}>김</div>
      </div>
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

function ContentHeader({ content, mutedFg }) {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <BookCover
        title={content.title} subtitle={content.author}
        width={200} height={286}
      />
      <div style={{ flex: 1, minWidth: 0, paddingTop: 8 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <Chip tone="ebook" size="sm">전자책</Chip>
          <Chip tone="course" size="sm">강의</Chip>
          <Chip tone="paper" size="sm">종이책</Chip>
        </div>
        <h1 style={{
          fontSize: 36, fontWeight: 800, letterSpacing: '-0.66px',
          margin: '0 0 12px', lineHeight: 1.15, textWrap: 'balance',
        }}>
          혼자 공부하는<br/>바이브코딩
        </h1>
        <div style={{
          fontSize: 15, color: mutedFg, marginBottom: 18, letterSpacing: '0.20px',
        }}>
          <span style={{ fontWeight: 600 }}>김민준</span> 지음 · 한빛미디어 · 2025.11.28
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <Stars value={content.rating} size={15} />
          <span style={{ fontSize: 13, color: mutedFg }}>
            리뷰 {content.reviewCount.toLocaleString()}개
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {content.tags.map(t => (
            <span key={t} style={{
              fontSize: 12, padding: '5px 10px', borderRadius: 4,
              background: 'rgba(92,102,118,0.08)', color: mutedFg,
              letterSpacing: '0.20px',
            }}>#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Tabs ---
function IntroTab({ dark, mutedFg, fg, borderCol, cardBg }) {
  return (
    <div style={{ maxWidth: 680 }}>
      <h2 style={{
        fontSize: 22, fontWeight: 800, letterSpacing: '-0.43px',
        margin: '0 0 16px',
      }}>책 소개</h2>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: mutedFg, margin: '0 0 20px', letterSpacing: '0.09px', textWrap: 'pretty' }}>
        AI가 코드를 대신 써주는 시대. 그럼 우리는 무엇을 해야 할까요? 이 책은 Claude Code, Cursor, GitHub Copilot 같은 AI 코딩 도구와 함께 일하는 새로운 방식 — "바이브코딩"을 처음부터 차근차근 익히는 실전 입문서입니다.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: mutedFg, margin: '0 0 32px', letterSpacing: '0.09px', textWrap: 'pretty' }}>
        혼자서도 막히지 않도록, 실제 프로젝트를 구상하고 프롬프트로 설계하고 AI가 만든 결과를 검증하고 개선하는 전 과정을 따라할 수 있게 구성했습니다. 터미널 한 번 열어본 적 없는 완전 입문자부터, 이미 코딩은 하지만 AI 도구를 업무에 제대로 녹여내고 싶은 현업 개발자까지 도움이 될 수 있도록 썼습니다.
      </p>

      <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.43px', margin: '0 0 14px' }}>이런 분께 추천합니다</h3>
      <ul style={{
        listStyle: 'none', padding: 0, margin: '0 0 40px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {[
          'AI 도구를 써보긴 했지만 원하는 결과를 얻기 어려웠던 분',
          '비개발자지만 AI와 함께 작은 앱이나 자동화를 만들고 싶은 분',
          'AI가 생성한 코드를 신뢰할 수 있는 검증 루틴을 세우고 싶은 개발자',
          '팀에 AI 코딩을 도입하기 위한 실전 워크플로가 필요한 리드',
        ].map(item => (
          <li key={item} style={{
            display: 'flex', gap: 10, fontSize: 14, color: mutedFg,
            letterSpacing: '0.20px', lineHeight: 1.6,
          }}>
            <span style={{ color: '#03aea0', fontWeight: 700 }}>—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.43px', margin: '0 0 14px' }}>저자 소개</h3>
      <div style={{
        display: 'flex', gap: 16, padding: 20,
        background: cardBg, borderRadius: 10,
        border: `1px solid ${borderCol}`,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #03aea0 0%, #028b80 100%)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700, flexShrink: 0,
        }}>김</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, letterSpacing: '-0.01em' }}>김민준</div>
          <div style={{ fontSize: 13, color: mutedFg, lineHeight: 1.6, letterSpacing: '-0.01em' }}>
            10년차 풀스택 개발자. 토스·카카오를 거쳐 현재는 AI 개발자 도구 스타트업에서 일하고 있다. 블로그 '매일의 바이브'를 운영하며 AI 시대의 개발 워크플로를 공유한다.
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewTab({ content, filter, setFilter, dark, fg, mutedFg, borderCol, cardBg }) {
  const reviews = [
    { id: 1, user: '이**', date: '2026.03.14', rating: 5, kind: 'ebook', text: '전자책으로 읽었는데 코드 예제를 바로 복사해서 실행해볼 수 있어서 좋았어요. 특히 4장의 프롬프트 체크리스트는 업무에 바로 적용 중.', helpful: 48 },
    { id: 2, user: '박**', date: '2026.03.02', rating: 5, kind: 'course', text: '강의 영상이 책의 내용을 그대로 따라가는 게 아니라 실제 프로젝트를 처음부터 만드는 과정을 보여줘서 실전 감각이 확실히 붙었습니다.', helpful: 31 },
    { id: 3, user: '최**', date: '2026.02.21', rating: 4, kind: 'paper', text: '종이책의 깊은 종이 질감과 깔끔한 타이포가 너무 좋네요. 옆에 놓고 참고서처럼 보고 있습니다. 다만 업데이트가 빠른 분야라 전자책도 병행할 예정.', helpful: 27 },
    { id: 4, user: '정**', date: '2026.02.08', rating: 5, kind: 'ebook', text: '입문서치고 깊이가 있어요. "AI가 써준 코드를 그대로 믿지 말고 이렇게 검증해라"는 부분에서 인상 깊었습니다.', helpful: 22 },
    { id: 5, user: '장**', date: '2026.01.30', rating: 4, kind: 'course', text: '강의와 전자책 둘 다 포함이라니 한빛+ 구독이 진짜 이득이네요. 영상 보다가 헷갈리면 책에서 같은 부분 찾아 읽는 식으로 공부 중.', helpful: 19 },
  ];
  const filtered = filter === 'all' ? reviews : reviews.filter(r => r.kind === filter);

  // stats
  const byKind = { ebook: 0, course: 0, paper: 0 };
  reviews.forEach(r => byKind[r.kind]++);
  const histogram = [5, 4, 3, 2, 1].map(r => ({
    rating: r, count: reviews.filter(rv => rv.rating === r).length,
  }));
  const maxCount = Math.max(...histogram.map(h => h.count), 1);

  const filters = [
    { id: 'all', label: '전체', count: reviews.length },
    { id: 'paper', label: '종이책', count: byKind.paper },
    { id: 'ebook', label: '전자책', count: byKind.ebook },
    { id: 'course', label: '강의', count: byKind.course },
  ];

  return (
    <div>
      {/* overall */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40,
        alignItems: 'center',
        padding: '28px 32px', borderRadius: 12,
        background: cardBg, border: `1px solid ${borderCol}`,
        marginBottom: 32,
      }}>
        <div style={{ textAlign: 'center', borderRight: `1px solid ${borderCol}`, paddingRight: 40 }}>
          <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: '-0.66px', lineHeight: 1 }}>
            {content.rating}
          </div>
          <div style={{ marginTop: 10 }}>
            <Stars value={content.rating} size={14} showValue={false} />
          </div>
          <div style={{ fontSize: 12, color: mutedFg, marginTop: 6 }}>
            리뷰 {content.reviewCount.toLocaleString()}개
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {histogram.map(h => (
            <div key={h.rating} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
              <span style={{ width: 18, color: mutedFg }}>{h.rating}점</span>
              <div style={{
                flex: 1, height: 6, borderRadius: 3,
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.16)',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(h.count / maxCount) * 100}%`,
                  height: '100%', background: '#03aea0',
                }} />
              </div>
              <span style={{ width: 28, textAlign: 'right', color: mutedFg }}>{h.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 24, alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '8px 14px', borderRadius: 999,
              border: `1px solid ${filter === f.id ? '#03aea0' : borderCol}`,
              background: filter === f.id
                ? (dark ? 'rgba(3,174,160,0.12)' : 'rgba(3,174,160,0.08)')
                : 'transparent',
              color: filter === f.id ? '#03aea0' : fg,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              letterSpacing: '0.20px',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {f.label}
              <span style={{ opacity: 0.6, fontWeight: 500 }}>{f.count}</span>
            </button>
          ))}
        </div>
        <select style={{
          padding: '8px 12px', borderRadius: 6,
          border: `1px solid ${borderCol}`,
          background: 'transparent', color: 'inherit',
          fontSize: 13, fontFamily: 'inherit', cursor: 'pointer',
        }}>
          <option>최신순</option>
          <option>도움 많은 순</option>
          <option>평점 높은 순</option>
        </select>
      </div>

      {/* Reviews */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {filtered.map((r, i) => (
          <div key={r.id} style={{
            padding: '24px 0',
            borderTop: `1px solid ${borderCol}`,
            ...(i === filtered.length - 1 ? { borderBottom: `1px solid ${borderCol}` } : {}),
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 10, flexWrap: 'wrap', gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>{r.user}</div>
                <Stars value={r.rating} size={12} showValue={false} />
                <Chip tone={r.kind} size="sm">
                  {r.kind === 'ebook' ? '전자책' : r.kind === 'course' ? '강의' : '종이책'}
                </Chip>
              </div>
              <div style={{ fontSize: 12, color: mutedFg }}>{r.date}</div>
            </div>
            <p style={{
              fontSize: 14, lineHeight: 1.7, color: fg,
              letterSpacing: '0.09px', margin: '0 0 12px', textWrap: 'pretty',
            }}>{r.text}</p>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: mutedFg }}>
              <button style={{
                background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
                padding: 0, fontSize: 12, fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <span>👍</span> 도움됐어요 {r.helpful}
              </button>
              <button style={{
                background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
                padding: 0, fontSize: 12, fontFamily: 'inherit',
              }}>신고</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurriculumTab({ mutedFg, fg, borderCol, cardBg }) {
  const chapters = [
    { n: 1, title: '바이브코딩이란 무엇인가', items: ['AI 코딩 도구의 현재', '왜 바이브코딩인가', '우리가 새로 배워야 할 것'] },
    { n: 2, title: '첫 번째 도구: Claude Code 시작하기', items: ['설치와 초기 설정', '첫 프롬프트 작성하기', '결과 검증 루틴'] },
    { n: 3, title: '프롬프트 설계의 원칙', items: ['맥락을 전달하는 법', '제약을 명시하는 법', '반복 개선 사이클'] },
    { n: 4, title: '실전: 나만의 앱 만들기', items: ['아이디어를 명세로', '아키텍처 스케치', '기능 단위 구현', '테스트와 배포'] },
    { n: 5, title: 'AI가 쓴 코드를 신뢰하는 법', items: ['정적 분석으로 걸러내기', '테스트로 보강하기', '리뷰 체크리스트'] },
    { n: 6, title: '팀에 도입하기', items: ['워크플로 재설계', '리뷰 문화 변화', 'AI 규약 만들기'] },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.43px', margin: 0 }}>커리큘럼</h2>
        <div style={{ fontSize: 13, color: mutedFg }}>총 6장 · 예상 학습시간 12시간</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chapters.map(ch => (
          <div key={ch.n} style={{
            padding: '18px 22px', borderRadius: 10,
            background: cardBg, border: `1px solid ${borderCol}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 6,
                background: 'rgba(3,174,160,0.1)', color: '#03aea0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, flexShrink: 0,
              }}>{ch.n.toString().padStart(2, '0')}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.43px', margin: 0 }}>{ch.title}</h3>
            </div>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0, paddingLeft: 46,
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              {ch.items.map(i => (
                <li key={i} style={{
                  fontSize: 13, color: mutedFg, letterSpacing: '0.20px',
                  display: 'flex', gap: 8,
                }}>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Purchase card ---
function PurchaseCard({ format, setFormat, isSubscriber, setIsSubscriber, setScreen, wished, setWished, dark, cardBg, fg, mutedFg, borderCol }) {
  return (
    <div style={{
      background: cardBg, border: `1px solid ${borderCol}`,
      borderRadius: 14, overflow: 'hidden',
      boxShadow: dark ? 'none' : '0 1px 3px rgba(0,0,0,0.04), 0 12px 32px -16px rgba(0,0,0,0.1)',
    }}>
      {/* Format selector */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: mutedFg,
          letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10,
        }}>구매 형태</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
          padding: 4, borderRadius: 10,
          background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(92,102,118,0.08)',
        }}>
          {[
            { id: 'ebook', label: '전자책', icon: 'ebook' },
            { id: 'course', label: '강의', icon: 'course' },
            { id: 'paper', label: '종이책', icon: 'paper' },
          ].map(f => (
            <button key={f.id} onClick={() => setFormat(f.id)} style={{
              padding: '12px 8px', borderRadius: 7, border: 'none',
              background: format === f.id
                ? (dark ? '#2A2A2D' : '#FFFFFF')
                : 'transparent',
              boxShadow: format === f.id
                ? '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px -2px rgba(0,0,0,0.08)'
                : 'none',
              color: format === f.id ? fg : mutedFg,
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              letterSpacing: '0.20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <FormatIcon kind={f.icon} active={format === f.id} />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic content by format */}
      <div style={{ padding: '22px 20px 20px' }}>
        {format === 'ebook' && <EbookBlock isSubscriber={isSubscriber} setIsSubscriber={setIsSubscriber} setScreen={setScreen} mutedFg={mutedFg} fg={fg} />}
        {format === 'course' && <CourseBlock isSubscriber={isSubscriber} setIsSubscriber={setIsSubscriber} setScreen={setScreen} mutedFg={mutedFg} fg={fg} />}
        {format === 'paper' && <PaperBlock mutedFg={mutedFg} fg={fg} borderCol={borderCol} />}
      </div>

      {/* Footer — wish + share */}
      <div style={{
        padding: '14px 20px', borderTop: `1px solid ${borderCol}`,
        display: 'flex', gap: 10,
      }}>
        <button onClick={() => setWished(!wished)} style={{
          flex: 1, padding: '11px', borderRadius: 8,
          border: `1px solid ${wished ? '#03aea0' : borderCol}`,
          background: wished
            ? (dark ? 'rgba(3,174,160,0.1)' : 'rgba(3,174,160,0.06)')
            : 'transparent',
          color: wished ? '#03aea0' : fg,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          letterSpacing: '0.20px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: 'inherit',
        }}>
          {wished ? '♥' : '♡'} 찜하기{wished && ' 완료'}
        </button>
        <button style={{
          width: 44, padding: 0, borderRadius: 8,
          border: `1px solid ${borderCol}`,
          background: 'transparent', color: fg,
          cursor: 'pointer', fontSize: 16,
        }}>↗</button>
      </div>
    </div>
  );
}

function FormatIcon({ kind, active }) {
  const color = active ? '#03aea0' : 'currentColor';
  const props = { width: 18, height: 18, fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'ebook') return (
    <svg {...props} viewBox="0 0 24 24">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  );
  if (kind === 'course') return (
    <svg {...props} viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M10 9l5 3-5 3z" fill={color} />
    </svg>
  );
  if (kind === 'paper') return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M4 4h10l6 6v10H4z" />
      <path d="M14 4v6h6" />
    </svg>
  );
}

function EbookBlock({ isSubscriber, setIsSubscriber, setScreen, mutedFg, fg }) {
  return (
    <div>
      <IncludedBanner tone="green">
        <strong>한빛+ 구독에 포함</strong> — {isSubscriber ? '지금 바로 읽을 수 있어요' : '구독하면 무제한으로 열람 가능해요'}
      </IncludedBanner>

      <div style={{ marginTop: 20 }}>
        {isSubscriber ? (
          <>
            <button style={primaryCTA}>바로 읽기 →</button>
            <div style={{
              fontSize: 12, color: mutedFg, textAlign: 'center',
              marginTop: 10, letterSpacing: '0.20px',
            }}>3장 24쪽부터 이어 읽기</div>
          </>
        ) : (
          <>
            <button style={primaryCTA} onClick={() => { setIsSubscriber(true); setScreen('myroom'); }}>구독하고 읽기</button>
            <div style={{
              fontSize: 12, color: mutedFg, textAlign: 'center',
              marginTop: 10, letterSpacing: '0.20px',
            }}>
              30일 무료 · 이후 월 ₩19,900
            </div>
          </>
        )}
      </div>

      <IncludeList
        title="포함 내용"
        items={['전체 내용 열람', '형광펜·메모 기능', '오프라인 저장 (최대 10권)', '모든 기기에서 동기화']}
        mutedFg={mutedFg}
      />
    </div>
  );
}

function CourseBlock({ isSubscriber, setIsSubscriber, setScreen, mutedFg, fg }) {
  return (
    <div>
      <IncludedBanner tone="green">
        <strong>한빛+ 구독에 포함</strong> — {isSubscriber ? '바로 수강할 수 있어요' : '구독하면 무제한으로 수강 가능해요'}
      </IncludedBanner>

      <div style={{ marginTop: 20 }}>
        {isSubscriber ? (
          <>
            <button style={primaryCTA}>바로 수강하기 ▶</button>
            <div style={{
              fontSize: 12, color: mutedFg, textAlign: 'center',
              marginTop: 10, letterSpacing: '0.20px',
            }}>강의 3 · "첫 프롬프트" 에서 이어보기</div>
          </>
        ) : (
          <>
            <button style={primaryCTA} onClick={() => { setIsSubscriber(true); setScreen('myroom'); }}>구독하고 수강하기</button>
            <div style={{
              fontSize: 12, color: mutedFg, textAlign: 'center',
              marginTop: 10, letterSpacing: '0.20px',
            }}>
              30일 무료 · 이후 월 ₩19,900
            </div>
          </>
        )}
      </div>

      <IncludeList
        title="포함 내용"
        items={['강의 영상 12개 (총 8시간 42분)', '예제 소스코드', 'Q&A 게시판', '수료증 발급']}
        mutedFg={mutedFg}
      />
    </div>
  );
}

function PaperBlock({ mutedFg, fg, borderCol }) {
  return (
    <div>
      <IncludedBanner tone="orange">
        <strong>종이책은 구독에 포함되지 않아요</strong>
        <div style={{ marginTop: 4, fontWeight: 500, fontSize: 12, opacity: 0.9 }}>
          전자책은 구독으로 무료 열람 가능합니다.
        </div>
      </IncludedBanner>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: mutedFg, textDecoration: 'line-through' }}>₩24,000</span>
          <span style={{ fontSize: 13, color: '#03aea0', fontWeight: 700 }}>10% 할인</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em' }}>₩21,600</span>
          <span style={{ fontSize: 13, color: mutedFg }}>+ 배송비 3,000원</span>
        </div>

        <button style={primaryCTA}>종이책 주문하기</button>
        <div style={{
          fontSize: 12, color: mutedFg, textAlign: 'center',
          marginTop: 10, letterSpacing: '0.20px',
        }}>내일(금) 도착 예정 · 오후 3시 이전 주문 시</div>
      </div>

      <IncludeList
        title="포함 내용"
        items={['종이책 배송 (368쪽)', '전자책 추가 구매 시 50% 할인', '한빛미디어 멤버십 적립 5%']}
        mutedFg={mutedFg}
      />

      <div style={{
        marginTop: 18, padding: 14, borderRadius: 8,
        background: 'rgba(3,174,160,0.06)',
        border: `1px solid rgba(3,174,160,0.15)`,
      }}>
        <div style={{
          fontSize: 13, fontWeight: 700, color: '#03aea0',
          marginBottom: 4, letterSpacing: '0.20px',
        }}>💡 이런 조합은 어떠세요?</div>
        <div style={{ fontSize: 12, color: mutedFg, letterSpacing: '0.20px', lineHeight: 1.5 }}>
          한빛+ 구독으로 전자책을 먼저 읽어보고, 마음에 들면 종이책을 구매하세요.
        </div>
      </div>
    </div>
  );
}

const primaryCTA = {
  width: '100%',
  background: '#03aea0', color: '#fff', border: 'none',
  padding: '14px', borderRadius: 8, fontSize: 15, fontWeight: 700,
  cursor: 'pointer', letterSpacing: '0.20px',
  fontFamily: 'Pretendard, sans-serif',
};

function IncludedBanner({ tone, children }) {
  const tones = {
    green: {
      bg: 'linear-gradient(135deg, rgba(3,174,160,0.10) 0%, rgba(3,174,160,0.16) 100%)',
      fg: '#028b80', border: 'rgba(3,174,160,0.20)', dot: '#028b80',
    },
    orange: {
      bg: 'linear-gradient(135deg, #FFF2E0 0%, #FEE7CA 100%)',
      fg: '#A85A14', border: '#FAD9B2', dot: '#E0890F',
    },
  };
  const t = tones[tone];
  return (
    <div style={{
      padding: '12px 14px', borderRadius: 8,
      background: t.bg, border: `1px solid ${t.border}`,
      color: t.fg, fontSize: 13, letterSpacing: '0.20px', lineHeight: 1.5,
      display: 'flex', gap: 10, alignItems: 'flex-start',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%', background: t.dot,
        flexShrink: 0, marginTop: 6,
      }} />
      <div>{children}</div>
    </div>
  );
}

function IncludeList({ title, items, mutedFg }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        fontSize: 12, fontWeight: 700, color: mutedFg,
        letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12,
      }}>{title}</div>
      <ul style={{
        listStyle: 'none', padding: 0, margin: 0,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {items.map(i => (
          <li key={i} style={{
            display: 'flex', gap: 8, fontSize: 13,
            letterSpacing: '0.20px', lineHeight: 1.5,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#028b80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { DetailPage });
