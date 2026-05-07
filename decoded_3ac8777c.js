// Content list page — grouped by topic / category browsable catalog

const EXTRA_CONTENT = [
  { title: 'LLM으로\n앱 만들기', subtitle: '이현우', kinds: ['ebook', 'course'], rating: 4.7, reviews: 512, tags: ['LLM', 'RAG'], topic: 'ai' },
  { title: '러닝\nLangChain', subtitle: '한동석', kinds: ['ebook'], rating: 4.5, reviews: 302, tags: ['LangChain', 'LLM'], topic: 'ai' },
  { title: '핸즈온\n머신러닝', subtitle: '오렐리앙 제롱', kinds: ['ebook', 'paper'], rating: 4.9, reviews: 2104, tags: ['ML', '입문'], topic: 'ai' },
  { title: 'Next.js\n완벽 가이드', subtitle: '박영웅', kinds: ['ebook', 'course'], rating: 4.6, reviews: 441, tags: ['Next.js', '프론트'], topic: 'web' },
  { title: '모던\n자바스크립트', subtitle: '이웅모', kinds: ['ebook', 'paper'], rating: 4.8, reviews: 1823, tags: ['JS', '실전'], topic: 'web' },
  { title: '플러터로 만드는\n모바일 앱', subtitle: '김동현', kinds: ['ebook', 'course'], rating: 4.4, reviews: 287, tags: ['Flutter', '모바일'], topic: 'web' },
  { title: '쿠버네티스\n인 액션', subtitle: '마르코 룩샤', kinds: ['ebook', 'paper'], rating: 4.7, reviews: 698, tags: ['K8s', 'DevOps'], topic: 'infra' },
  { title: '데브옵스\n핸드북', subtitle: 'Jez Humble', kinds: ['ebook'], rating: 4.6, reviews: 432, tags: ['DevOps'], topic: 'infra' },
  { title: '클린 아키텍처', subtitle: 'Robert C. Martin', kinds: ['ebook', 'paper'], rating: 4.9, reviews: 3284, tags: ['아키텍처'], topic: 'career' },
  { title: '개발자의\n글쓰기', subtitle: '김철수', kinds: ['ebook', 'course'], rating: 4.5, reviews: 512, tags: ['커리어'], topic: 'career' },
];

const ALL_ITEMS = [
  ...CONTENT.map(c => ({ ...c, topic: ['ai','web','web','web','web','web'][CONTENT.indexOf(c)] || 'web' })),
  ...EXTRA_CONTENT,
];

const TOPICS = [
  { id: 'all', label: '전체', count: ALL_ITEMS.length },
  { id: 'ai', label: 'AI · 데이터', count: ALL_ITEMS.filter(i => i.topic === 'ai').length },
  { id: 'web', label: '웹 · 모바일', count: ALL_ITEMS.filter(i => i.topic === 'web').length },
  { id: 'infra', label: '인프라 · DevOps', count: ALL_ITEMS.filter(i => i.topic === 'infra').length },
  { id: 'career', label: '커리어 · 설계', count: ALL_ITEMS.filter(i => i.topic === 'career').length },
];

function ContentListPage({ dark, isSubscriber }) {
  const [topic, setTopic] = React.useState('all');
  const [kindFilter, setKindFilter] = React.useState('all'); // all | ebook | course | paper
  const [sort, setSort] = React.useState('popular');

  const bg = dark ? '#0F0F10' : '#ffffff';
  const fg = dark ? '#E8E6E1' : '#030712';
  const mutedFg = dark ? 'rgba(232,230,225,0.65)' : 'rgba(62,74,92,0.61)';
  const borderCol = dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.22)';

  const filtered = ALL_ITEMS.filter(i => {
    if (topic !== 'all' && i.topic !== topic) return false;
    if (kindFilter !== 'all' && !i.kinds.includes(kindFilter)) return false;
    return true;
  });

  const goDetail = () => window.__hbNav && window.__hbNav('detail');

  // group by topic if 'all', else show single flat grid
  const groups = topic === 'all'
    ? TOPICS.filter(t => t.id !== 'all').map(t => ({
        id: t.id, label: t.label,
        items: filtered.filter(i => i.topic === t.id),
      })).filter(g => g.items.length > 0)
    : [{ id: topic, label: TOPICS.find(t => t.id === topic).label, items: filtered }];

  return (
    <div data-screen-label="02 Content List" style={{
      background: bg, color: fg,
      fontFamily: 'Pretendard, sans-serif', minHeight: '100vh',
    }}>
      <DetailGNB dark={dark} isSubscriber={isSubscriber} />

      {/* Page header */}
      <div style={{
        borderBottom: `1px solid ${borderCol}`,
        background: dark ? '#141416' : '#f3f4f6',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 48px 36px' }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: '#03aea0',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
          }}>Content Library</div>
          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800,
            letterSpacing: '-0.66px', lineHeight: 1.15, margin: '0 0 14px',
            textWrap: 'balance',
          }}>전체 콘텐츠</h1>
          <div style={{ fontSize: 15, color: mutedFg, letterSpacing: '-0.01em' }}>
            전자책 {ALL_ITEMS.filter(i => i.kinds.includes('ebook')).length}권 · 강의 {ALL_ITEMS.filter(i => i.kinds.includes('course')).length}개 · 매주 업데이트
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        position: 'sticky', top: 69, zIndex: 10,
        background: dark ? 'rgba(15,15,16,0.92)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${borderCol}`,
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto', padding: '14px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TOPICS.map(t => (
              <button key={t.id} onClick={() => setTopic(t.id)} style={{
                padding: '8px 14px', borderRadius: 999,
                border: `1px solid ${topic === t.id ? '#03aea0' : borderCol}`,
                background: topic === t.id
                  ? (dark ? 'rgba(3,174,160,0.14)' : 'rgba(3,174,160,0.08)')
                  : 'transparent',
                color: topic === t.id ? '#03aea0' : fg,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                letterSpacing: '0.20px', fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {t.label}
                <span style={{ opacity: 0.55, fontWeight: 500 }}>{t.count}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              display: 'inline-flex', padding: 3, borderRadius: 7,
              background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(92,102,118,0.08)',
            }}>
              {[
                { id: 'all', label: '전체' },
                { id: 'ebook', label: '전자책' },
                { id: 'course', label: '강의' },
                { id: 'paper', label: '종이책' },
              ].map(k => (
                <button key={k.id} onClick={() => setKindFilter(k.id)} style={{
                  padding: '6px 12px', borderRadius: 5, border: 'none',
                  background: kindFilter === k.id ? (dark ? '#2A2A2D' : '#FFFFFF') : 'transparent',
                  boxShadow: kindFilter === k.id ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  color: 'inherit', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>{k.label}</button>
              ))}
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{
              padding: '8px 10px', borderRadius: 6, border: `1px solid ${borderCol}`,
              background: 'transparent', color: 'inherit', fontSize: 12,
              fontFamily: 'inherit', cursor: 'pointer',
            }}>
              <option value="popular">인기순</option>
              <option value="new">최신순</option>
              <option value="rating">평점순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 48px 100px' }}>
        {groups.map((g, gi) => (
          <div key={g.id} style={{ marginBottom: gi === groups.length - 1 ? 0 : 64 }}>
            {topic === 'all' && (
              <div style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                marginBottom: 24, paddingBottom: 14,
                borderBottom: `1px solid ${borderCol}`,
              }}>
                <h2 style={{
                  fontSize: 22, fontWeight: 800, letterSpacing: '-0.43px', margin: 0,
                }}>{g.label}</h2>
                <button onClick={() => setTopic(g.id)} style={{
                  background: 'none', border: 'none', color: '#03aea0',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit', letterSpacing: '0.20px',
                }}>전체 보기 →</button>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '32px 20px',
            }}>
              {g.items.map((c, i) => (
                <ListCard key={i} c={c} onClick={goDetail} dark={dark} mutedFg={mutedFg} fg={fg} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            color: mutedFg, fontSize: 14,
          }}>
            조건에 맞는 콘텐츠가 없어요. 필터를 조정해보세요.
          </div>
        )}
      </div>
    </div>
  );
}

function ListCard({ c, onClick, dark, mutedFg, fg }) {
  return (
    <div onClick={onClick} style={{
      cursor: 'pointer',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector('.hb-list-cover').style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector('.hb-list-cover').style.transform = 'translateY(0)';
      }}
    >
      <div className="hb-list-cover" style={{
        marginBottom: 14, transition: 'transform 0.15s',
      }}>
        <BookCover
          title={c.title} subtitle={c.subtitle}
          width={200} height={286}
          kind={c.kinds[0] === 'course' ? 'course' : 'book'}
        />
      </div>
      <h4 style={{
        fontSize: 15, fontWeight: 700, margin: '0 0 4px',
        letterSpacing: '-0.43px', lineHeight: 1.3,
        whiteSpace: 'pre-line', color: fg,
      }}>{c.title}</h4>
      <div style={{
        fontSize: 12, color: mutedFg, marginBottom: 10, letterSpacing: '0.20px',
      }}>{c.subtitle}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {c.kinds.includes('ebook') && <Chip tone="ebook" size="sm">전자책</Chip>}
        {c.kinds.includes('course') && <Chip tone="course" size="sm">강의</Chip>}
        {c.kinds.includes('paper') && <Chip tone="paper" size="sm">종이책</Chip>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Stars value={c.rating} size={11} showValue={true} />
        <span style={{ fontSize: 11, color: mutedFg }}>· 리뷰 {c.reviews.toLocaleString()}</span>
      </div>
    </div>
  );
}

Object.assign(window, { ContentListPage });
