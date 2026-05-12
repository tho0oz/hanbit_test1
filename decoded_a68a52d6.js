// Main app — tab switcher + Tweaks

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "isSubscriber": false,
  "initialScreen": "landing"
}/*EDITMODE-END*/;

function App() {
  const [screen, setScreen] = React.useState(() => {
    return localStorage.getItem('hb_screen') || TWEAK_DEFAULS.initialScreen || 'landing';
  });
  const [dark, setDark] = React.useState(TWEAK_DEFAULS.dark);
  const [isSubscriber, setIsSubscriber] = React.useState(TWEAK_DEFAULS.isSubscriber);
  const [planCycle, setPlanCycle] = React.useState('yearly');
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('hb_screen', screen);
    window.scrollTo(0, 0);
  }, [screen]);

  React.useEffect(() => {
    window.__hbNav = (to) => setScreen(to);
    return () => { if (window.__hbNav) delete window.__hbNav; };
  }, []);

  // Edit mode protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setEditMode(true);
      if (e.data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persist = (edits) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  return (
    <>
      <ScreenSwitcher screen={screen} setScreen={setScreen} dark={dark} />
      {screen === 'landing' && (
        <LandingPage
          dark={dark} isSubscriber={isSubscriber}
          planCycle={planCycle} setPlanCycle={setPlanCycle}
        />
      )}
      {screen === 'list' && (
        <ContentListPage dark={dark} isSubscriber={isSubscriber} />
      )}
      {screen === 'recommend' && (
        <RecommendPage dark={dark} isSubscriber={isSubscriber} />
      )}
      {screen === 'detail' && (
        <DetailPage
          dark={dark} isSubscriber={isSubscriber}
          setIsSubscriber={setIsSubscriber}
          setScreen={setScreen}
        />
      )}
      {screen === 'myroom' && (
        <MyRoomPage dark={dark} isSubscriber={isSubscriber} setScreen={setScreen} />
      )}
      {screen === 'myhome' && (
        <MyHomePage dark={dark} isSubscriber={isSubscriber} setScreen={setScreen} />
      )}

      {editMode && (
        <TweaksPanel
          dark={dark} setDark={(v) => { setDark(v); persist({ dark: v }); }}
          isSubscriber={isSubscriber}
          setIsSubscriber={(v) => { setIsSubscriber(v); persist({ isSubscriber: v }); }}
        />
      )}
    </>
  );
}

function ScreenSwitcher({ screen, setScreen, dark }) {
  return (
    <div style={{
      position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
      zIndex: 999,
      padding: 4, borderRadius: 999,
      background: dark ? 'rgba(26,26,28,0.9)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(92,102,118,0.16)'}`,
      boxShadow: '0 4px 20px -4px rgba(0,0,0,0.15)',
      display: 'flex', gap: 2,
      fontFamily: 'Pretendard, sans-serif',
    }}>
      {[
        { id: 'landing', label: '메인 랜딩' },
        { id: 'list', label: '콘텐츠 리스트' },
        { id: 'detail', label: '콘텐츠 상세' },
        { id: 'myhome', label: '개인화 홈' },
      ].map(s => (
        <button key={s.id} onClick={() => setScreen(s.id)} style={{
          padding: '8px 16px', borderRadius: 999, border: 'none',
          background: screen === s.id ? '#03aea0' : 'transparent',
          color: screen === s.id ? '#fff' : (dark ? '#E8E6E1' : '#030712'),
          fontSize: 12, fontWeight: 700, cursor: 'pointer',
          letterSpacing: '0.20px',
          fontFamily: 'inherit',
          transition: 'background 0.15s',
        }}>{s.label}</button>
      ))}
    </div>
  );
}

function TweaksPanel({ dark, setDark, isSubscriber, setIsSubscriber }) {
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 999,
      width: 260, padding: 16, borderRadius: 12,
      background: dark ? '#1C1C1F' : '#FFFFFF',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      boxShadow: '0 12px 40px -8px rgba(0,0,0,0.25)',
      fontFamily: 'Pretendard, sans-serif',
      color: dark ? '#E8E6E1' : '#030712',
    }}>
      <div style={{
        fontSize: 12, fontWeight: 800, letterSpacing: '0.08em',
        textTransform: 'uppercase', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#03aea0' }} />
        Tweaks
      </div>

      <TweakToggle
        label="다크 모드" dark={dark}
        value={dark} onChange={setDark}
        left="라이트" right="다크"
      />
      <div style={{ height: 10 }} />
      <TweakToggle
        label="사용자 상태" dark={dark}
        value={isSubscriber} onChange={setIsSubscriber}
        left="비구독자" right="구독자"
      />
    </div>
  );
}

function TweakToggle({ label, value, onChange, left, right, dark }) {
  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 600, opacity: 0.65,
        marginBottom: 6, letterSpacing: '0.20px',
      }}>{label}</div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 3,
        borderRadius: 8,
        background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      }}>
        {[
          { label: left, val: false },
          { label: right, val: true },
        ].map(o => (
          <button key={o.label} onClick={() => onChange(o.val)} style={{
            padding: '8px', borderRadius: 6, border: 'none',
            background: value === o.val ? (dark ? '#2A2A2D' : '#FFFFFF') : 'transparent',
            boxShadow: value === o.val ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            color: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit', letterSpacing: '0.20px',
          }}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { App });

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
