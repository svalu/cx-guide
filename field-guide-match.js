(() => {
  const rounds = [
    { title: '고객이 연락할 때', pairs: [
      ['채널', '고객이 전화 대신 채팅으로 연락했어.'], ['컨택', '같은 고객이 오늘 두 번 연락했어. 각각 한 번의 연락은?'],
      ['멀티채널', '전화와 채팅 창구가 모두 있지만 기록은 따로 보여.'], ['옴니채널', '채팅 내용을 전화 상담원이 이어서 확인해.'], ['IVR', '“배송 문의는 1번”이라는 안내를 듣고 번호를 눌러.']
    ]},
    { title: '연결이 이뤄질 때', pairs: [
      ['ACD', '들어온 전화를 가능한 상담원에게 자동으로 나눠.'], ['큐', '상담원 연결을 기다리는 연락이 줄 서 있어.'],
      ['라우팅', '배송 문의는 배송팀, 환불 문의는 환불팀으로 보내.'], ['CCP', '상담원이 전화 받기·보류·종료를 조작하는 패널.'], ['스크린 팝', '전화가 오자 고객 정보 화면이 자동으로 떠.']
    ]},
    { title: '상담원이 일할 때', pairs: [
      ['CRM', '고객 정보와 상담·구매 관계를 관리해.'], ['고객 프로필', '한 고객의 정보와 이전 문의를 모아 봐.'],
      ['상담원 워크스페이스', '연락과 고객 정보, 처리 도구를 한 화면에서 다뤄.'], ['CTI', '전화 시스템의 통화 상태가 컴퓨터 화면에 반영돼.'], ['연동', '상담 화면과 주문 시스템의 정보를 이어.']
    ]},
    { title: '문의를 처리할 때', pairs: [
      ['티켓', '지원 문의에 담당자·메모·진행 상태를 남겨.'], ['케이스', 'CRM에서 고객 문제를 해결할 때까지 관리해.'],
      ['ACW', '통화 후 메모를 남기고 문의 유형을 분류해.'], ['API', '정해진 요청으로 주문 시스템의 배송 정보를 받아.'], ['지식 베이스', '반품 정책과 FAQ를 검색해 답변해.']
    ]},
    { title: '운영을 살펴볼 때', pairs: [
      ['WEM', '상담원 일정과 품질, 코칭을 관리해.'], ['SLA', '문의에 정해진 시간 안에 답하기로 약속해.'],
      ['KPI', '운영 목표를 주요 숫자로 확인해.'], ['AHT', '상담 한 건을 처리하는 데 평균 6분이 걸렸어.'], ['FCR', '첫 문의에서 문제를 해결해 다시 연락할 필요가 없어.']
    ]},
    { title: '서비스와 기술을 볼 때', pairs: [
      ['CSAT', '상담 후 고객이 만족도 설문에 5점을 줬어.'], ['STT', '고객의 목소리가 화면에 글자로 나타나.'],
      ['할당량', '클라우드 기능의 동시 처리 건수에 한도가 있어.'], ['CCaaS', '컨택센터 기능을 클라우드 서비스로 이용해.'], ['SaaS', '소프트웨어를 인터넷 서비스로 이용해.']
    ]}
  ];
  const $ = id => document.getElementById(id);
  const board = $('match-board'), clues = $('match-clues'), terms = $('match-terms'), lines = $('match-lines');
  const feedback = $('match-feedback'), next = $('match-next'), play = $('match-play'), done = $('match-done');
  let round = 0, selected = { clue: null, term: null }, matched = new Set(), locked = false;

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function card(kind, id, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `match-card match-${kind}`;
    button.dataset.matchId = String(id);
    button.textContent = label;
    button.addEventListener('click', () => choose(kind, button));
    return button;
  }
  function setFeedback(message, type = '') {
    feedback.textContent = message;
    feedback.className = `match-feedback ${type}`;
  }
  function point(button, side) {
    const b = button.getBoundingClientRect(), c = board.getBoundingClientRect();
    return { x: side === 'right' ? b.right - c.left : b.left - c.left, y: b.top + b.height / 2 - c.top };
  }
  function draw() {
    const width = board.clientWidth, height = board.clientHeight;
    lines.setAttribute('viewBox', `0 0 ${width} ${height}`);
    lines.replaceChildren();
    for (const id of matched) addLine(id, id, 'new');
  }
  function addLine(clueId, termId, className) {
    const clue = clues.querySelector(`[data-match-id="${clueId}"]`);
    const term = terms.querySelector(`[data-match-id="${termId}"]`);
    if (!clue || !term) return null;
    const start = point(clue, 'right'), end = point(term, 'left');
    const mid = (start.x + end.x) / 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${start.x} ${start.y} C ${mid} ${start.y}, ${mid} ${end.y}, ${end.x} ${end.y}`);
    path.setAttribute('class', className);
    lines.append(path);
    return path;
  }
  function updateCount() {
    const count = matched.size;
    $('match-count').textContent = `${count} / 5 연결`;
    $('match-progress-fill').style.width = `${count * 20}%`;
    document.querySelector('.match-progress').setAttribute('aria-valuenow', String(count));
  }
  function clearSelection() {
    Object.values(selected).forEach(button => button?.classList.remove('selected'));
    selected = { clue: null, term: null };
  }
  function choose(kind, button) {
    if (locked || button.disabled) return;
    if (selected[kind] === button) {
      button.classList.remove('selected'); selected[kind] = null; return;
    }
    selected[kind]?.classList.remove('selected');
    selected[kind] = button;
    button.classList.add('selected');
    if (!selected.clue || !selected.term) {
      setFeedback(kind === 'clue' ? '이 상황에 맞는 오른쪽 용어를 골라봐.' : '이 용어에 맞는 왼쪽 상황을 골라봐.');
      return;
    }
    const clue = selected.clue, term = selected.term;
    if (clue.dataset.matchId === term.dataset.matchId) {
      const id = clue.dataset.matchId;
      clearSelection();
      matched.add(id);
      clue.classList.add('matched'); term.classList.add('matched');
      clue.disabled = true; term.disabled = true;
      addLine(id, id, 'new'); updateCount();
      if (matched.size === 5) {
        setFeedback('5개 모두 연결했어! 다음 묶음으로 가볼까?', 'success');
        next.textContent = round === rounds.length - 1 ? '결과 보기 →' : '다음 묶음 →';
        next.hidden = false;
      } else setFeedback('맞았어! 다음 두 카드를 이어봐.', 'success');
    } else {
      locked = true;
      clue.classList.add('wrong'); term.classList.add('wrong');
      const wrongLine = addLine(clue.dataset.matchId, term.dataset.matchId, 'wrong');
      setFeedback('이 둘은 연결되지 않아. 다시 골라봐.', 'error');
      setTimeout(() => {
        wrongLine?.remove(); clue.classList.remove('wrong'); term.classList.remove('wrong');
        clearSelection(); locked = false;
      }, 600);
    }
  }
  function render() {
    matched = new Set(); selected = { clue: null, term: null }; locked = false;
    $('match-round').textContent = `${String(round + 1).padStart(2, '0')} / 06 · ${rounds[round].title}`;
    clues.replaceChildren(...rounds[round].pairs.map(([term, clue], id) => card('clue', id, clue)));
    terms.replaceChildren(...shuffle(rounds[round].pairs.map(([term], id) => card('term', id, term))));
    updateCount(); next.hidden = true;
    setFeedback('서로 어울리는 카드 두 장을 골라봐.');
    requestAnimationFrame(draw);
  }
  next.addEventListener('click', () => {
    if (matched.size !== 5) return;
    if (round === rounds.length - 1) { play.hidden = true; done.hidden = false; $('match-restart').focus(); }
    else { round++; render(); $('match-round').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
  $('match-restart').addEventListener('click', () => { round = 0; done.hidden = true; play.hidden = false; render(); $('match-round').scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { if (!play.hidden) draw(); }).observe(board);
  window.addEventListener('resize', () => { if (!play.hidden) draw(); });
  render();
})();
