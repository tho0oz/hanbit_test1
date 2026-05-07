// Personalized recommendation flow — 3-step quiz → recommended content

const ROLES = [
  { id: 'frontend', label: '프론트엔드 개발자', icon: '🖥️' },
  { id: 'backend', label: '백엔드 개발자', icon: '⚙️' },
  { id: 'fullstack', label: '풀스택 개발자', icon: '🔗' },
  { id: 'mobile', label: '모바일 개발자', icon: '📱' },
  { id: 'data', label: '데이터 / ML 엔지니어', icon: '📊' },
  { id: 'devops', label: '인프라 / DevOps', icon: '🛠️' },
  { id: 'pm', label: '기획자 / PM', icon: '📋' },
  { id: 'designer', label: '디자이너', icon: '🎨' },
  { id: 'student', label: '학생 / 입문자', icon: '🌱' },
  { id: 'other', label: '그 외 / 비개발자', icon: '✨' },
];

const LEVELS = [
  { id: 'none', label: '코딩은 처음이에요', desc: 'HTML, 변수가 무엇인지부터 배우고 싶어요' },
  { id: 'basic', label: '기초 문법은 알아요', desc: '프로그래밍 수업을 들어봤거나 간단한 예제를 따라해 봤어요' },
  { id: 'intermediate', label: '실무 경험이 있어요', desc: '1~3년차 · 실제 서비스의 기능을 만들 수 있어요' },
  { id: 'advanced', label: '숙련된 개발자예요', desc: '3년 이상 · 설계·리뷰·멘토링이 가능해요' },
];

const GOALS = [
  { id: 'productivity', label: '업무 생산성 향상', desc: 'AI로 반복 작업을 자동화하고 싶어요' },
  { id: 'learn-faster', label: '더 빨리 학습하기', desc: 'AI를 튜터처럼 활용해 새 기술을 익히고 싶어요' },
  { id: 'build-app', label: '앱·서비스 직접 만들기', desc: 'AI와 함께 바이브코딩으로 사이드 프로젝트를 만들래요' },
  { id: 'llm-feature', label: 'AI 기능을 제품에 탑재', desc: 'LLM/RAG 등을 실제 서비스에 넣고 싶어요' },
  { id: 'career', label: '커리어 전환·성장', desc: 'AI 시대에 필요한 역량을 새로 쌓고 싶어요' },
];

// Minimal content pool for recommendations (uses same palette as BookCover)
const REC_POOL = [
  { id: 'vibe', title: '혼자 공부하는\n바이브코딩', subtitle: '김민준', kinds: ['ebook','course','paper'], rating: 4.8, reviews: 1284, tags: ['바이브코딩','AI','입문'], level: ['none','basic','intermediate'], goals: ['productivity','build-app','learn-faster','career'], roles: ['student','other','pm','designer','frontend','backend'] },
  { id: 'llm-app', title: 'LLM으로\n앱 만들기', subtitle: '이현우', kinds: ['ebook','course'], rating: 4.7, reviews: 512, tags: ['LLM','RAG'], level: ['intermediate','advanced'], goals: ['llm-feature','build-app'], roles: ['backend','fullstack','data'] },
  { id: 'react', title: '실전 리액트\n프로그래밍', subtitle: '이재승', kinds: ['ebook','course'], rating: 4.7, reviews: 1102, tags: ['React','프론트엔드'], level: ['basic','intermediate'], goals: ['career','build-app'], roles: ['frontend','fullstack'] },
  { id: 'ml', title: '모두의\n딥러닝', subtitle: '조태호', kinds: ['ebook','course'], rating: 4.7, reviews: 982, tags: ['딥러닝','입문'], level: ['basic','intermediate'], goals: ['career','learn-faster'], roles: ['data','student'] },
  { id: 'algo', title: '파이썬\n알고리즘 인터뷰', subtitle: '박상길', kinds: ['ebook','paper'], rating: 4.9, reviews: 2341, tags: ['알고리즘','취업'], level: ['intermediate','advanced'], goals: ['career'], roles: ['backend','frontend','fullstack','student'] },
  { id: 'js', title: 'Do it!\n자바스크립트', subtitle: '고경희', kinds: ['ebook','course','paper'], rating: 4.6, reviews: 871, tags: ['JS','입문'], level: ['none','basic'], goals: ['learn-faster','build-app','career'], roles: ['frontend','fullstack','student','other'] },
  { id: 'clean', title: '클린 아키텍처', subtitle: 'Robert C. Martin', kinds: ['ebook','paper'], rating: 4.9, reviews: 3284, tags: ['아키텍처','설계'], level: ['advanced'], goals: ['career'], roles: ['backend','fullstack','devops'] },
  { id: 'k8s', title: '쿠버네티스\n인 액션', subtitle: '마르코 룩샤', kinds: ['ebook','paper'], rating: 4.7, reviews: 698, tags: ['K8s','DevOps'], level: ['intermediate','advanced'], goals: ['career','llm-feature'], roles: ['devops','backend'] },
  { id: 'ts', title: '러닝\n타입스크립트', subtitle: '조시 골드버그', kinds: ['ebook','paper'], rating: 4.8, reviews: 654, tags: ['TypeScript'], level: ['intermediate','advanced'], goals: ['productivity','career'], roles: ['frontend','fullstack'] },
  { id: 'next', title: 'Next.js\n완벽 가이드', subtitle: '박영웅', kinds: ['ebook','course'], rating: 4.6, reviews: 441, tags: ['Next.js'], level: ['intermediate'], goals: ['build-app'], roles: ['frontend','fullstack'] },
];

function scoreContent(c, a) {
  let s = 0;
  if (a.role && c.roles.includes(a.role)) s += 3;
  if (a.level && c.level.includes(a.level)) s += 3;
  if (a.goal && c.goals.includes(a.goal)) s += 4;
  s += c.rating * 0.2;
  return s;
}

function RecommendPage({ dark, isSubscriber }) {
  const [step, setStep] = React.useState(0); // 0,1,2 = questions, 3 = results
  const [answers, setAnswers] = React.useState({ role: null, level: null, goal: null });

  const bg = dark ? '#0F0F10' : '#ffffff';
  const fg = dark ? '#E8E6E1' : '#030712';
  const mutedFg = dark ? 'rgba(232,230,225,0.65)' : 'rgba(62,74,92,0.61)';
  const borderCol = dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.22)';
  const cardBg = dark ? '#1C1C1F' : '#FFFFFF';

  const setAns = (k, v) => setAnswers(a => ({ ...a, [k]: v }));
  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => Math.max(0, s - 1));
  const reset = () => { setAnswers({ role: null, level: null, goal: null }); setStep(0); };

  const stepTitles = [
    { label: '직업', val: answers.role ? ROLES.find(r => r.id === answers.role).label : '' },
    { label: '개발 지식', val: answers.level ? LEVELS.find(l => l.id === answers.level).label : '' },
    { label: 'AI 활용 목적', val: answers.goal ? GOALS.find(g => g.id === answers.goal).label : '' },
  ];

  return (
    <div data-screen-label="03 Recommend" style={{
      background: bg, color: fg,
      fontFamily: 'Pretendard, sans-serif', minHeight: '100vh',
    }}>
      <DetailGNB dark={dark} isSubscriber={isSubscriber} />

      <div style={{
        background: dark
          ? 'radial-gradient(ellipse at 20% 0%, #3A0E10 0%, #141416 70%)'
          : 'radial-gradient(ellipse at 20% 0%, rgba(3,174,160,0.08) 0%, #f3f4f6 70%)',
        borderBottom: `1px solid ${borderCol}`,
      }}>
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '56px 48px 40px', textAlign: 'center' }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: '#03aea0',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
          }}>For You</div>
          <h1 style={{
            fontSize: 'clamp(30px, 3.8vw, 42px)', fontWeight: 800,
            letterSpacing: '-0.66px', lineHeight: 1.2, margin: '0 0 14px',
            textWrap: 'balance',
          }}>나에게 맞는 학습 콘텐츠 찾기</h1>
          <p style={{ fontSize: 15, color: mutedFg, margin: 0, letterSpacing: '0.20px', lineHeight: 1.6 }}>
            3가지 질문에 답하면 한빛+ 큐레이터가 당신에게 꼭 맞는 콘텐츠를 추천해 드려요.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 840, margin: '0 auto', padding: '48px 48px 100px' }}>
        {step < 3 && (
          <>
            <Stepper step={step} titles={stepTitles} dark={dark} borderCol={borderCol} mutedFg={mutedFg} fg={fg} />

            <div style={{ marginTop: 36 }}>
              {step === 0 && (
                <Question label="어떤 직업이신가요?" sub="가장 가까운 하나를 선택하세요." dark={dark} fg={fg} mutedFg={mutedFg}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10,
                  }}>
                    {ROLES.map(r => (
                      <OptionCard key={r.id} active={answers.role === r.id}
                        onClick={() => { setAns('role', r.id); setTimeout(next, 180); }}
                        dark={dark} borderCol={borderCol} cardBg={cardBg} fg={fg}
                      >
                        <div style={{ fontSize: 22, marginBottom: 8 }}>{r.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>{r.label}</div>
                      </OptionCard>
                    ))}
                  </div>
                </Question>
              )}

              {step === 1 && (
                <Question label="지금의 개발 지식은 어느 정도인가요?" dark={dark} fg={fg} mutedFg={mutedFg}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {LEVELS.map(l => (
                      <OptionCard key={l.id} active={answers.level === l.id}
                        onClick={() => { setAns('level', l.id); setTimeout(next, 180); }}
                        dark={dark} borderCol={borderCol} cardBg={cardBg} fg={fg} horizontal
                      >
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.43px', marginBottom: 4 }}>{l.label}</div>
                          <div style={{ fontSize: 13, color: mutedFg, letterSpacing: '-0.01em' }}>{l.desc}</div>
                        </div>
                      </OptionCard>
                    ))}
                  </div>
                </Question>
              )}

              {step === 2 && (
                <Question label="AI를 어떻게 활용하고 싶으세요?" sub="가장 중요한 목적 하나를 선택해주세요." dark={dark} fg={fg} mutedFg={mutedFg}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {GOALS.map(g => (
                      <OptionCard key={g.id} active={answers.goal === g.id}
                        onClick={() => { setAns('goal', g.id); setTimeout(next, 180); }}
                        dark={dark} borderCol={borderCol} cardBg={cardBg} fg={fg} horizontal
                      >
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.43px', marginBottom: 4 }}>{g.label}</div>
                          <div style={{ fontSize: 13, color: mutedFg, letterSpacing: '-0.01em' }}>{g.desc}</div>
                        </div>
                      </OptionCard>
                    ))}
                  </div>
                </Question>
              )}
            </div>

            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prev} disabled={step === 0} style={{
                padding: '10px 16px', borderRadius: 8, border: `1px solid ${borderCol}`,
                background: 'transparent', color: fg, fontSize: 13, fontWeight: 600,
                cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1,
                fontFamily: 'inherit', letterSpacing: '0.20px',
              }}>← 이전</button>
              <div style={{ fontSize: 12, color: mutedFg, alignSelf: 'center' }}>
                {step + 1} / 3 · 답을 선택하면 자동으로 진행됩니다
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <RecommendResults
            answers={answers} reset={reset}
            dark={dark} fg={fg} mutedFg={mutedFg} borderCol={borderCol} cardBg={cardBg}
          />
        )}
      </div>
    </div>
  );
}

function Stepper({ step, titles, dark, borderCol, mutedFg, fg }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
    }}>
      {titles.map((t, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={t.label} style={{
            padding: '14px 16px', borderRadius: 10,
            background: active ? (dark ? 'rgba(3,174,160,0.1)' : 'rgba(3,174,160,0.06)') : 'transparent',
            border: `1px solid ${active ? '#03aea0' : borderCol}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: done ? '#03aea0' : (active ? '#03aea0' : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.16)')),
                color: (done || active) ? '#fff' : mutedFg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800,
              }}>{done ? '✓' : (i + 1)}</div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: active ? '#03aea0' : mutedFg,
              }}>{t.label}</div>
            </div>
            <div style={{
              fontSize: 13, fontWeight: 600, letterSpacing: '0.20px',
              color: t.val ? fg : mutedFg, minHeight: 18,
            }}>{t.val || '선택해주세요'}</div>
          </div>
        );
      })}
    </div>
  );
}

function Question({ label, sub, children, dark, fg, mutedFg }) {
  return (
    <div>
      <h2 style={{
        fontSize: 24, fontWeight: 800, letterSpacing: '-0.43px',
        margin: '0 0 8px', textWrap: 'balance',
      }}>{label}</h2>
      {sub && <p style={{ fontSize: 14, color: mutedFg, margin: '0 0 24px', letterSpacing: '-0.01em' }}>{sub}</p>}
      {!sub && <div style={{ height: 24 }} />}
      {children}
    </div>
  );
}

function OptionCard({ active, onClick, children, dark, borderCol, cardBg, fg, horizontal }) {
  return (
    <button onClick={onClick} style={{
      textAlign: horizontal ? 'left' : 'center',
      padding: horizontal ? '16px 20px' : '20px 12px',
      borderRadius: 10,
      border: `1.5px solid ${active ? '#03aea0' : borderCol}`,
      background: active
        ? (cardBg === '#FFFFFF' ? 'rgba(3,174,160,0.04)' : 'rgba(3,174,160,0.1)')
        : cardBg,
      color: fg, cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', flexDirection: horizontal ? 'row' : 'column',
      alignItems: horizontal ? 'center' : 'center',
      justifyContent: horizontal ? 'flex-start' : 'center',
      gap: horizontal ? 16 : 0,
      minHeight: horizontal ? 0 : 96,
      transition: 'all 0.12s',
      boxShadow: active ? '0 0 0 3px rgba(3,174,160,0.12)' : 'none',
    }}>
      {horizontal && (
        <div style={{
          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${active ? '#03aea0' : 'rgba(128,128,128,0.4)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#03aea0' }} />}
        </div>
      )}
      <div style={{ flex: 1 }}>{children}</div>
    </button>
  );
}

// Level system — maps skill level to a gamified grade
const LEVEL_GRADES = {
  none:         { n: 1, name: 'Explorer',  ko: '탐험가', color: '#4A9B7F', desc: '개발의 세계로 첫 발을 내딛는 단계', next: 'Learner · 기초 문법 익히기' },
  basic:        { n: 2, name: 'Learner',   ko: '러너',   color: '#C88A3B', desc: '기초를 다지며 만들어보는 단계',   next: 'Builder · 실무 프로젝트 경험' },
  intermediate: { n: 3, name: 'Builder',   ko: '빌더',   color: '#03aea0', desc: '실제 서비스를 만드는 실무자',      next: 'Architect · 시스템 설계 역량' },
  advanced:     { n: 4, name: 'Architect', ko: '아키텍트', color: '#6E5BC9', desc: '설계·멘토링이 가능한 숙련자',    next: '— 이미 정점에 계십니다' },
};

// Curriculum templates by goal — 4 phases × 2 weeks
function buildCurriculum(goal, level) {
  const base = {
    productivity: [
      { w: '1-2주', title: 'AI 도구 기본기', desc: 'ChatGPT · Claude · Cursor로 워크플로우 세팅', pick: 'vibe' },
      { w: '3-4주', title: '프롬프팅 실전', desc: '반복 업무 자동화 · 스크립트·문서 템플릿화', pick: 'js' },
      { w: '5-6주', title: 'AI 통합 개발', desc: 'IDE와 AI를 결합해 기능 단위 생산성 끌어올리기', pick: 'ts' },
      { w: '7-8주', title: '팀·조직에 적용', desc: '동료와 공유할 AI 가이드·템플릿 정착', pick: 'clean' },
    ],
    'learn-faster': [
      { w: '1-2주', title: '학습 로드맵 설계', desc: 'AI 튜터와 함께 학습 계획 잡기', pick: 'js' },
      { w: '3-4주', title: '기초 체화', desc: '예제·퀴즈·피드백 루프로 빠르게 익히기', pick: 'vibe' },
      { w: '5-6주', title: '프로젝트 만들기', desc: '배운 것을 작은 앱으로 직접 구현', pick: 'react' },
      { w: '7-8주', title: '심화·리뷰', desc: 'AI에게 코드 리뷰 받고 리팩터링', pick: 'ts' },
    ],
    'build-app': [
      { w: '1-2주', title: '아이디어→프로토타입', desc: '바이브코딩으로 MVP 스케치', pick: 'vibe' },
      { w: '3-4주', title: '프론트엔드 구축', desc: 'UI·라우팅·상태관리 얹기', pick: 'react' },
      { w: '5-6주', title: '백엔드·배포', desc: 'API·DB·서버리스 배포', pick: 'next' },
      { w: '7-8주', title: '피드백·출시', desc: '사용자 테스트 후 개선, 런칭', pick: 'clean' },
    ],
    'llm-feature': [
      { w: '1-2주', title: 'LLM 기초', desc: 'API 호출·토큰·비용 감각 잡기', pick: 'llm-app' },
      { w: '3-4주', title: 'RAG 구축', desc: '임베딩·벡터 DB로 지식 연결', pick: 'llm-app' },
      { w: '5-6주', title: '에이전트·툴 사용', desc: '함수 호출·도구 사용 패턴', pick: 'ml' },
      { w: '7-8주', title: '프로덕션화', desc: '모니터링·평가·운영 전략', pick: 'k8s' },
    ],
    career: [
      { w: '1-2주', title: '기초 점검', desc: 'CS·언어 기초를 AI와 복습', pick: 'js' },
      { w: '3-4주', title: '알고리즘·자료구조', desc: '코딩 테스트 루틴화', pick: 'algo' },
      { w: '5-6주', title: '포트폴리오 프로젝트', desc: '실무형 앱으로 이력서 완성', pick: 'react' },
      { w: '7-8주', title: '모의 면접·이직', desc: '시스템 설계·행동 면접 대비', pick: 'clean' },
    ],
  };
  return base[goal] || base.productivity;
}

function RecommendResults({ answers, reset, dark, fg, mutedFg, borderCol, cardBg }) {
  const scored = REC_POOL
    .map(c => ({ c, s: scoreContent(c, answers) }))
    .sort((a, b) => b.s - a.s);
  const top = scored.slice(0, 5);
  const fallback = REC_POOL[0];
  const topPick = (top[0] && top[0].c) || fallback;
  const rest = top.slice(1).map(t => t.c).filter(Boolean);

  const role = ROLES.find(r => r.id === answers.role);
  const level = LEVELS.find(l => l.id === answers.level);
  const goal = GOALS.find(g => g.id === answers.goal);
  const grade = (answers.level && LEVEL_GRADES[answers.level]) || LEVEL_GRADES.basic;

  const curriculum = buildCurriculum(answers.goal, answers.level);
  const byId = Object.fromEntries(REC_POOL.map(c => [c.id, c]));

  const goDetail = () => window.__hbNav && window.__hbNav('detail');
  const goList = () => window.__hbNav && window.__hbNav('list');

  return (
    <div>
      {/* Level grade badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        padding: 24, borderRadius: 14, marginBottom: 24,
        background: dark
          ? `linear-gradient(135deg, ${grade.color}22 0%, transparent 60%)`
          : `linear-gradient(135deg, ${grade.color}18 0%, transparent 60%)`,
        border: `1px solid ${grade.color}55`,
      }}>
        <div style={{
          width: 88, height: 88, flexShrink: 0, position: 'relative',
          borderRadius: 12,
          background: `linear-gradient(135deg, ${grade.color} 0%, ${grade.color}CC 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', boxShadow: `0 8px 24px -8px ${grade.color}88`,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', opacity: 0.85 }}>DEV.LV</div>
            <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1, marginTop: 2, fontFamily: 'ui-monospace, monospace' }}>{String(grade.n).padStart(2, '0')}</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: grade.color, marginBottom: 4,
          }}>현재 레벨</div>
          <h3 style={{
            fontSize: 22, fontWeight: 800, letterSpacing: '-0.43px',
            margin: '0 0 6px',
          }}>
            {grade.name} <span style={{ color: mutedFg, fontWeight: 600, fontSize: 16 }}>· {grade.ko}</span>
          </h3>
          <div style={{ fontSize: 13, color: mutedFg, letterSpacing: '0.20px', marginBottom: 12 }}>
            {grade.desc}
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                flex: 1, height: 6, borderRadius: 3,
                background: i <= grade.n ? grade.color : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.16)'),
              }} />
            ))}
          </div>
          <div style={{ fontSize: 11, color: mutedFg, letterSpacing: '-0.01em' }}>
            <span style={{ opacity: 0.7 }}>다음 단계 →</span> <span style={{ fontWeight: 700, color: fg, opacity: 0.85 }}>{grade.next}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28,
      }}>
        {[
          { l: '직업', v: role?.label },
          { l: '지식', v: level?.label },
          { l: '목적', v: goal?.label },
        ].filter(s => s.v).map(s => (
          <div key={s.l} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 999,
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.05)',
            fontSize: 12, letterSpacing: '0.20px',
          }}>
            <span style={{ color: mutedFg, fontWeight: 600 }}>{s.l}</span>
            <span style={{ fontWeight: 700 }}>{s.v}</span>
          </div>
        ))}
        <button onClick={reset} style={{
          marginLeft: 'auto', background: 'none', border: 'none',
          color: '#03aea0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: '0.20px',
        }}>↻ 다시 선택</button>
      </div>
      {/* Summary */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28,
      }}>
        {[
          { l: '직업', v: role?.label },
          { l: '지식', v: level?.label },
          { l: '목적', v: goal?.label },
        ].map(s => (
          <div key={s.l} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 999,
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(92,102,118,0.05)',
            fontSize: 12, letterSpacing: '0.20px',
          }}>
            <span style={{ color: mutedFg, fontWeight: 600 }}>{s.l}</span>
            <span style={{ fontWeight: 700 }}>{s.v}</span>
          </div>
        ))}
        <button onClick={reset} style={{
          marginLeft: 'auto', background: 'none', border: 'none',
          color: '#03aea0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: '0.20px',
        }}>↻ 다시 선택</button>
      </div>

      {/* Top pick */}
      <div style={{
        display: 'flex', gap: 24, alignItems: 'flex-start',
        padding: 28, borderRadius: 14,
        background: dark ? 'rgba(3,174,160,0.06)' : 'rgba(3,174,160,0.04)',
        border: `1px solid rgba(3,174,160,0.3)`,
        marginBottom: 40,
      }}>
        <div onClick={goDetail} style={{ cursor: 'pointer', flexShrink: 0 }}>
          <BookCover title={topPick.title} subtitle={topPick.subtitle}
            width={160} height={230}
            kind={topPick.kinds[0] === 'course' ? 'course' : 'book'} />
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 10px', borderRadius: 4,
            background: '#03aea0', color: '#fff',
            fontSize: 11, fontWeight: 800, letterSpacing: '0.04em',
            marginBottom: 14,
          }}>★ BEST MATCH</div>
          <h3 style={{
            fontSize: 26, fontWeight: 800, letterSpacing: '-0.43px',
            margin: '0 0 6px', lineHeight: 1.2, whiteSpace: 'pre-line',
            textWrap: 'balance',
          }}>{topPick.title}</h3>
          <div style={{ fontSize: 14, color: mutedFg, marginBottom: 14, letterSpacing: '-0.01em' }}>
            <span style={{ fontWeight: 600 }}>{topPick.subtitle}</span> 지음
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
            <Stars value={topPick.rating} size={13} />
            <span style={{ fontSize: 12, color: mutedFg }}>리뷰 {topPick.reviews.toLocaleString()}개</span>
          </div>
          <p style={{
            fontSize: 14, lineHeight: 1.7, color: mutedFg, margin: '0 0 18px',
            letterSpacing: '-0.005em', textWrap: 'pretty',
          }}>
            <strong style={{ color: fg }}>{role?.label || '개발자'}</strong>로서 <strong style={{ color: fg }}>{goal?.label || '성장'}</strong>을 목표로 한다면,
            지금 가장 먼저 봐야 할 콘텐츠예요. {(level?.label || '현재').replace('이에요','').replace('예요','')} 수준에 맞춰 단계별로 따라갈 수 있도록 구성되어 있습니다.
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {topPick.kinds.includes('ebook') && <Chip tone="ebook" size="sm">전자책</Chip>}
            {topPick.kinds.includes('course') && <Chip tone="course" size="sm">강의</Chip>}
            {topPick.kinds.includes('paper') && <Chip tone="paper" size="sm">종이책</Chip>}
            <Chip tone="included" size="sm">✓ 한빛+ 구독 포함</Chip>
          </div>
          <button onClick={goDetail} style={{
            background: '#03aea0', color: '#fff', border: 'none',
            padding: '13px 24px', borderRadius: 8, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.20px', fontFamily: 'inherit',
          }}>상세 페이지 보기 →</button>
        </div>
      </div>

      {/* Curriculum */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 6,
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.43px', margin: 0 }}>
            맞춤 8주 커리큘럼
          </h3>
          <div style={{
            fontSize: 11, fontWeight: 700, color: '#03aea0',
            padding: '4px 10px', borderRadius: 4,
            background: 'rgba(3,174,160,0.08)',
            letterSpacing: '0.04em',
          }}>PERSONALIZED</div>
        </div>
        <p style={{
          fontSize: 13, color: mutedFg, margin: '0 0 20px',
          letterSpacing: '0.20px', lineHeight: 1.6,
        }}>
          <strong style={{ color: fg }}>{goal?.label || '목표'}</strong>을 위한
          {' '}<strong style={{ color: fg }}>{grade.ko}</strong> 단계 학습 경로예요.
          일주일에 3~5시간씩, 8주면 목표에 도달할 수 있어요.
        </p>

        <div style={{ position: 'relative' }}>
          {/* connector line */}
          <div style={{
            position: 'absolute', left: 19, top: 14, bottom: 14,
            width: 2, background: borderCol, borderRadius: 1,
          }} />
          {curriculum.map((phase, i) => {
            const content = byId[phase.pick];
            return (
              <div key={i} style={{
                display: 'flex', gap: 18, alignItems: 'flex-start',
                padding: '14px 0',
                position: 'relative',
              }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0, borderRadius: '50%',
                  background: i === 0 ? '#03aea0' : (dark ? '#1C1C1F' : '#FFFFFF'),
                  border: `2px solid ${i === 0 ? '#03aea0' : borderCol}`,
                  color: i === 0 ? '#fff' : fg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, fontFamily: 'ui-monospace, monospace',
                  position: 'relative', zIndex: 1,
                }}>{i + 1}</div>
                <div style={{
                  flex: 1, padding: '14px 18px', borderRadius: 10,
                  background: cardBg,
                  border: `1px solid ${borderCol}`,
                  display: 'flex', gap: 16, alignItems: 'center', minWidth: 0,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex', gap: 8, alignItems: 'baseline',
                      flexWrap: 'wrap', marginBottom: 4,
                    }}>
                      <div style={{
                        fontSize: 10, fontWeight: 800, color: '#03aea0',
                        letterSpacing: '0.08em', padding: '2px 6px', borderRadius: 3,
                        background: 'rgba(3,174,160,0.1)',
                      }}>{phase.w}</div>
                      <div style={{
                        fontSize: 15, fontWeight: 800, letterSpacing: '0.09px',
                      }}>{phase.title}</div>
                    </div>
                    <div style={{
                      fontSize: 12, color: mutedFg, marginBottom: 8,
                      letterSpacing: '0.20px', lineHeight: 1.5,
                    }}>{phase.desc}</div>
                    {content && (
                      <div onClick={goDetail} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontSize: 11, color: mutedFg, cursor: 'pointer',
                        padding: '4px 8px', borderRadius: 4,
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(92,102,118,0.05)',
                        letterSpacing: '0.20px',
                      }}>
                        <span style={{ opacity: 0.7 }}>추천 콘텐츠</span>
                        <span style={{ fontWeight: 700, color: fg }}>
                          📖 {content.title.replace('\n', ' ')}
                        </span>
                      </div>
                    )}
                  </div>
                  {content && (
                    <div onClick={goDetail} style={{ cursor: 'pointer', flexShrink: 0 }}>
                      <BookCover title={content.title} subtitle={content.subtitle}
                        width={52} height={74}
                        kind={content.kinds[0] === 'course' ? 'course' : 'book'} flat />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rest */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${borderCol}`,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.43px', margin: 0 }}>
          함께 보면 좋은 콘텐츠
        </h3>
        <button onClick={goList} style={{
          background: 'none', border: 'none', color: '#03aea0',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: '0.20px',
        }}>전체 리스트 보기 →</button>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '28px 16px',
      }}>
        {rest.map((c, i) => (
          <div key={c.id} onClick={goDetail} style={{ cursor: 'pointer' }}>
            <div style={{ marginBottom: 10 }}>
              <BookCover title={c.title} subtitle={c.subtitle}
                width={160} height={230}
                kind={c.kinds[0] === 'course' ? 'course' : 'book'} />
            </div>
            <h4 style={{
              fontSize: 13, fontWeight: 700, margin: '0 0 4px',
              letterSpacing: '-0.43px', lineHeight: 1.3, whiteSpace: 'pre-line',
            }}>{c.title}</h4>
            <div style={{ fontSize: 11, color: mutedFg, marginBottom: 6 }}>{c.subtitle}</div>
            <Stars value={c.rating} size={10} showValue={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { RecommendPage });
