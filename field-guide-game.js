(() => {
  const levels = [
    {
      name: '고객이 연락할 때',
      questions: [
        { term: '채널', icon: '📱', situation: '고객이 전화 대신 채팅으로 배송을 문의했어.', ask: '전화·채팅처럼 고객이 연락하는 경로는?', options: ['채널', '컨택', '큐'], hint: '한 번의 대화가 아니라, 연락하는 길을 떠올려 봐.', explain: '전화와 채팅은 각각 고객이 선택할 수 있는 채널이야.' },
        { term: '컨택', icon: '💬', situation: '같은 고객이 오전에 채팅하고 오후에 전화했어.', ask: '채팅 한 번, 전화 한 번을 각각 무엇이라 부를까?', options: ['컨택', '채널', '케이스'], hint: '고객 한 명에게 연락은 여러 번 생길 수 있어.', explain: '각각의 연락이나 상호작용 한 번이 컨택 한 건이야.' },
        { term: '멀티채널', icon: '📞', situation: '회사에 전화와 채팅 창구가 모두 있어. 두 기록은 따로 보여.', ask: '연락 창구가 여러 개인 상태는?', options: ['멀티채널', '옴니채널', '라우팅'], hint: '기록이 이어지는지는 아직 중요하지 않아. 창구 수를 봐.', explain: '여러 연락 창구를 제공하면 멀티채널이야.' },
        { term: '옴니채널', icon: '🔁', situation: '오전 채팅 내용을 오후 전화 상담원이 바로 확인했어.', ask: '채널이 바뀌어도 상담 맥락이 이어지는 방식은?', options: ['옴니채널', '멀티채널', 'ACD'], hint: '창구가 여러 개인 것에 더해 이전 대화까지 이어져.', explain: '같은 고객의 대화와 업무 맥락이 채널 사이에서 이어지면 옴니채널 경험이야.' },
        { term: 'IVR', icon: '🔢', situation: '전화하자 “배송 문의는 1번을 누르세요”가 나와.', ask: '고객에게 안내하고 입력을 받는 자동 응답은?', options: ['IVR', 'CCP', 'STT'], hint: '상담원 연결 전에 고객이 번호를 누르는 장면이야.', explain: 'IVR은 전화 안내를 들려주고 번호나 음성 입력을 받는 흐름이야.' },
        { term: 'ACD', icon: '↪', situation: '시스템이 규칙에 따라 가능한 상담원에게 전화를 자동 배분해.', ask: '이 자동 배분 기능은?', options: ['ACD', 'API', 'CTI'], hint: '핵심은 상담원이 직접 고르지 않고 시스템이 자동으로 나누는 거야.', explain: 'ACD는 들어온 연락을 상담원에게 자동 배분하는 기능이야.' },
        { term: '큐', icon: '⏳', situation: '배송 담당 상담원이 통화 중이라 고객의 연락이 기다려.', ask: '상담원 연결을 기다리는 연락이 모이는 곳은?', options: ['큐', '고객 프로필', '티켓'], hint: '극장에서 줄을 서서 기다리는 것과 비슷해.', explain: '큐는 상담원에게 연결될 때까지 연락이 기다리는 대기열이야.' },
        { term: '라우팅', icon: '🧭', situation: '배송 문의는 배송팀으로, 환불 문의는 환불팀으로 보내.', ask: '조건에 따라 연락의 경로를 정하는 일은?', options: ['라우팅', '후처리', '스크린 팝'], hint: '어디로 보낼지 길을 정하는 단계야.', explain: '라우팅은 문의 유형과 상담원 상태 등을 보고 연락의 경로를 정하는 일이야.' },
        { term: 'CCP', icon: '🎛', situation: '상담원이 화면에서 전화를 받고 보류한 뒤 종료했어.', ask: '이런 연락 조작 패널을 Amazon Connect에서는 뭐라 부를까?', options: ['CCP', 'CRM', 'KPI'], hint: '고객 정보 저장소가 아니라 연락을 제어하는 패널이야.', explain: 'CCP는 Contact Control Panel, 상담원이 연락을 제어하는 화면이야.' },
        { term: '스크린 팝', icon: '🪟', situation: '전화가 들어오자 해당 고객 정보가 화면에 자동으로 나타났어.', ask: '이 자동 표시 동작은?', options: ['스크린 팝', '라우팅', 'ACW'], hint: '연락과 함께 관련 화면이 ‘팝’ 하고 뜨는 장면이야.', explain: '스크린 팝은 연락이 시작될 때 관련 고객 정보나 업무 화면을 자동으로 띄워.' },
      ],
    },
    {
      name: '상담원이 일할 때',
      questions: [
        { term: 'CRM', icon: '👥', situation: '고객 정보와 그동안의 상담·구매 관계를 관리해.', ask: '이런 고객 관계 관리 체계는?', options: ['CRM', 'CCaaS', 'STT'], hint: '연락을 배분하는 기능보다 고객과의 관계 기록에 가까워.', explain: 'CRM은 Customer Relationship Management, 고객 관계를 관리하는 체계야.' },
        { term: '고객 프로필', icon: '🪪', situation: '상담원이 고객 이름과 이전 문의를 한곳에서 확인해.', ask: '같은 고객의 정보를 묶어 보는 기록은?', options: ['고객 프로필', '큐', 'SLA'], hint: '문의 한 건보다 오래 이어지는, 고객 한 사람의 정보야.', explain: '고객 프로필은 같은 고객의 정보와 연락 이력을 모아 보는 기록이야.' },
        { term: '상담원 워크스페이스', icon: '🖥', situation: '한 화면에서 연락을 받고 고객 정보를 보고 처리 업무를 해.', ask: '상담원이 일하는 이 작업 공간은?', options: ['상담원 워크스페이스', 'IVR', '할당량'], hint: '상담원이 매일 보는 작업 화면 전체를 뜻해.', explain: '상담원 워크스페이스는 연락·고객 정보·업무 도구를 다루는 작업 공간이야.' },
        { term: 'CTI', icon: '☎', situation: '전화 시스템의 통화 상태가 컴퓨터 상담 화면에 반영돼.', ask: '전화와 컴퓨터 업무 화면을 잇는 기술은?', options: ['CTI', 'FCR', 'WEM'], hint: '전화와 컴퓨터의 연결이라는 뜻이 이름에 담겨 있어.', explain: 'CTI는 Computer Telephony Integration이야.' },
        { term: '티켓', icon: '🎫', situation: '배송 요청에 담당자, 메모, 진행 상태를 남겼어.', ask: '지원 문의와 처리 과정을 묶는 업무 기록은?', options: ['티켓', '컨택', '채널'], hint: '연락 한 번보다 오래 남아 처리 상태를 추적해.', explain: '티켓은 고객 문의와 그 처리 과정을 묶는 지원 업무 기록이야.' },
        { term: '케이스', icon: '📂', situation: 'CRM 안에서 고객의 배송 문제를 해결할 때까지 관리해.', ask: 'CRM에서 지원 이슈를 관리하는 업무 단위는?', options: ['케이스', '큐', 'ACD'], hint: 'CRM에서 고객의 문제를 하나의 업무 건으로 다루는 이름이야.', explain: '케이스는 CRM에서 고객의 문제와 해결 과정을 관리하는 업무 단위야.' },
        { term: 'ACW', icon: '📝', situation: '통화를 끝낸 상담원이 메모를 남기고 문의 유형을 분류해.', ask: '대화가 끝난 뒤의 상담 업무 단계는?', options: ['ACW', 'IVR', 'AHT'], hint: '고객과 대화한 다음에 하는 일을 생각해 봐.', explain: 'ACW는 After Contact Work, 상담 후 기록과 후속 조치를 정리하는 단계야.' },
        { term: '연동', icon: '🔗', situation: '상담 화면에서 주문 시스템의 배송 상태를 가져와 보여줘.', ask: '서로 다른 시스템의 정보와 동작을 잇는 일은?', options: ['연동', '라우팅', 'WEM'], hint: '고객 연락의 길이 아니라 시스템끼리의 연결이야.', explain: '연동은 여러 시스템을 연결해 필요한 정보를 주고받게 하는 일이야.' },
        { term: 'API', icon: '⇄', situation: '상담 화면이 정해진 요청을 보내 주문 시스템에서 배송 상태를 받아.', ask: '소프트웨어끼리 기능·데이터를 주고받는 접점은?', options: ['API', 'CCP', 'SLA'], hint: '연동을 만들 때 사용할 수 있는 기술적 접점이야.', explain: 'API는 시스템이 정해진 규칙에 따라 기능과 데이터를 주고받는 접점이야.' },
        { term: '지식 베이스', icon: '📚', situation: '상담원이 반품 정책과 자주 묻는 질문을 검색해 답변했어.', ask: '답변 근거가 되는 자료 모음은?', options: ['지식 베이스', '고객 프로필', '큐'], hint: '고객 한 명의 정보가 아니라 여러 상담에 공통으로 쓰는 답변 자료야.', explain: '지식 베이스는 정책·FAQ·매뉴얼 같은 답변 근거를 모은 곳이야.' },
      ],
    },
    {
      name: '운영·기술을 볼 때',
      questions: [
        { term: 'CCaaS', icon: '☁', situation: '전화·채팅을 받고 상담원에게 연결하는 기능을 클라우드로 써.', ask: '이런 컨택센터 서비스 방식은?', options: ['CCaaS', 'CRM', 'STT'], hint: '고객 연락을 처리하는 컨택센터와 클라우드를 함께 떠올려 봐.', explain: 'CCaaS는 Contact Center as a Service야.' },
        { term: 'SaaS', icon: '🌐', situation: '소프트웨어를 직접 설치해 관리하는 대신 인터넷 서비스로 이용해.', ask: '이 제품 제공 방식은?', options: ['SaaS', 'ACD', '옴니채널'], hint: '상담 기능 이름이 아니라 소프트웨어 제공 방식이야.', explain: 'SaaS는 Software as a Service, 인터넷으로 소프트웨어를 이용하는 방식이야.' },
        { term: 'WEM', icon: '🗓', situation: '관리자가 상담원 일정, 품질, 코칭을 함께 관리해.', ask: '이런 인력·성과 관리 영역은?', options: ['WEM', 'CTI', 'IVR'], hint: '상담원 인력 운영과 참여를 다루는 영역이야.', explain: 'WEM은 Workforce Engagement Management야.' },
        { term: 'SLA', icon: '⏱', situation: '고객 문의에 정해진 시간 안에 답하기로 약속했어.', ask: '이런 응답·처리 수준의 약속은?', options: ['SLA', 'FCR', 'API'], hint: '실제 결과 수치가 아니라 지키기로 한 수준이야.', explain: 'SLA는 응답 시간이나 처리 수준에 대한 약속 또는 목표야.' },
        { term: 'KPI', icon: '🎯', situation: '관리자가 목표 달성 여부를 주요 숫자로 확인해.', ask: '운영 목표를 보는 핵심 수치는?', options: ['KPI', 'CCP', '큐'], hint: '다양한 숫자 중 목표와 연결된 핵심 지표를 뜻해.', explain: 'KPI는 Key Performance Indicator, 목표 달성을 확인하는 핵심 지표야.' },
        { term: 'AHT', icon: '⌛', situation: '상담 한 건의 대화와 후처리에 평균 6분이 걸렸어.', ask: '평균 처리 시간을 나타내는 지표는?', options: ['AHT', 'CSAT', 'FCR'], hint: '세 지표 중 시간을 재는 것을 찾아봐.', explain: 'AHT는 Average Handle Time, 한 건을 처리하는 데 걸린 평균 시간이야.' },
        { term: 'FCR', icon: '✅', situation: '고객이 다시 연락하지 않아도 첫 문의에서 문제가 해결됐어.', ask: '첫 문의 해결 비율을 나타내는 지표는?', options: ['FCR', 'AHT', 'CSAT'], hint: '시간이나 만족도가 아니라 첫 문의에서 해결됐는지 봐.', explain: 'FCR은 First Contact Resolution, 첫 문의에서 해결된 비율이야.' },
        { term: 'CSAT', icon: '🙂', situation: '상담이 끝난 뒤 고객이 만족도 설문에서 5점을 줬어.', ask: '고객 만족 수준을 나타내는 지표는?', options: ['CSAT', 'SLA', 'AHT'], hint: '상담을 받은 고객의 평가를 뜻해.', explain: 'CSAT은 Customer Satisfaction, 고객이 평가한 만족 수준이야.' },
        { term: 'STT', icon: '🎙', situation: '통화 중 고객의 목소리가 화면에 글자로 나타났어.', ask: '음성을 문자로 바꾸는 기술은?', options: ['STT', 'CTI', 'CCP'], hint: 'Speech to Text의 약자야.', explain: 'STT는 Speech to Text, 음성을 글자로 바꾸는 기술이야.' },
        { term: '할당량', icon: '📏', situation: '클라우드 기능의 동시 처리 건수에 한도가 있어.', ask: '서비스가 정한 사용 한도는?', options: ['할당량', 'SLA', '라우팅'], hint: '목표가 아니라 사용할 수 있는 양의 상한이야.', explain: '할당량(Quota)은 요청 횟수나 동시 처리 수 등에 적용되는 사용 한도야.' },
      ],
    },
  ];

  const startView = document.getElementById('game-start');
  const playView = document.getElementById('game-play');
  const resultView = document.getElementById('game-result');
  const levelName = document.getElementById('game-level-name');
  const count = document.getElementById('game-count');
  const progress = document.querySelector('.game-progress');
  const progressFill = document.getElementById('game-progress-fill');
  const situation = document.getElementById('game-situation');
  const icon = document.getElementById('game-icon');
  const question = document.getElementById('game-question');
  const options = document.getElementById('game-options');
  const feedback = document.getElementById('game-feedback');
  const next = document.getElementById('game-next');
  const resultTitle = document.getElementById('game-result-title');
  const resultCopy = document.getElementById('game-result-copy');
  const nextLevel = document.getElementById('game-next-level');
  const bestKey = 'cx-guide-term-game-best-v1';
  let best = [null, null, null];
  let activeLevel = 0;
  let deck = [];
  let index = 0;
  let firstTryScore = 0;
  let triedWrong = false;

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  try {
    const saved = JSON.parse(localStorage.getItem(bestKey) || 'null');
    if (Array.isArray(saved) && saved.length === 3) best = saved;
  } catch { /* 브라우저 저장을 사용할 수 없어도 게임은 진행된다. */ }

  function show(view) {
    startView.hidden = view !== 'start';
    playView.hidden = view !== 'play';
    resultView.hidden = view !== 'result';
  }

  function refreshBest() {
    document.querySelectorAll('[data-best]').forEach(label => {
      const value = best[Number(label.dataset.best)];
      label.textContent = Number.isInteger(value) ? `최고 기록 ${value} / 10` : '최고 기록 없음';
    });
  }

  function renderQuestion() {
    const item = deck[index];
    triedWrong = false;
    levelName.textContent = levels[activeLevel].name;
    count.textContent = `${index + 1} / ${deck.length}`;
    progress.setAttribute('aria-valuenow', String(index));
    progressFill.style.width = `${index / deck.length * 100}%`;
    icon.textContent = item.icon;
    situation.textContent = item.situation;
    question.textContent = item.ask;
    options.replaceChildren();
    feedback.hidden = true;
    feedback.classList.remove('correct');
    next.hidden = true;

    shuffle(item.options).forEach(label => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'game-option';
      button.textContent = label;
      button.addEventListener('click', () => answer(button, label, item));
      options.append(button);
    });
    question.focus({ preventScroll: true });
  }

  function answer(button, label, item) {
    if (label !== item.term) {
      triedWrong = true;
      button.classList.add('wrong');
      button.disabled = true;
      feedback.textContent = `조금 달라. ${item.hint} 다시 골라봐.`;
      feedback.hidden = false;
      options.querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
      return;
    }
    if (!triedWrong) firstTryScore++;
    button.classList.add('correct');
    options.querySelectorAll('button').forEach(choice => { choice.disabled = true; });
    feedback.textContent = `맞았어! ${item.explain}`;
    feedback.classList.add('correct');
    feedback.hidden = false;
    progress.setAttribute('aria-valuenow', String(index + 1));
    progressFill.style.width = `${(index + 1) / deck.length * 100}%`;
    next.textContent = index === deck.length - 1 ? '결과 보기 →' : '다음 상황 →';
    next.hidden = false;
    next.focus({ preventScroll: true });
  }

  function start(level) {
    activeLevel = level;
    deck = shuffle(levels[level].questions);
    index = 0;
    firstTryScore = 0;
    show('play');
    renderQuestion();
  }

  function finish() {
    const previous = best[activeLevel];
    if (!Number.isInteger(previous) || firstTryScore > previous) {
      best[activeLevel] = firstTryScore;
      try { localStorage.setItem(bestKey, JSON.stringify(best)); } catch { /* 저장 없이 계속 진행 */ }
    }
    refreshBest();
    resultTitle.textContent = `첫 시도에 ${firstTryScore} / ${deck.length}개 맞혔어`;
    resultCopy.textContent = '틀린 문제도 다시 골라보며 익혔어. 다른 주제를 풀거나 다시 도전해 봐.';
    nextLevel.hidden = activeLevel === levels.length - 1;
    show('result');
    resultTitle.setAttribute('tabindex', '-1');
    resultTitle.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-game-level]').forEach(button => {
    button.addEventListener('click', () => start(Number(button.dataset.gameLevel)));
  });
  document.getElementById('game-back').addEventListener('click', () => show('start'));
  next.addEventListener('click', () => {
    if (index === deck.length - 1) finish();
    else { index++; renderQuestion(); }
  });
  document.getElementById('game-retry').addEventListener('click', () => start(activeLevel));
  document.getElementById('game-home').addEventListener('click', () => show('start'));
  nextLevel.addEventListener('click', () => start(activeLevel + 1));
  refreshBest();
})();
