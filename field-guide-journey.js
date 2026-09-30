(() => {
  const scenarios = {
    marketing: {
      title:'마케팅이 도입한다면, 관심 고객의 첫 대화를 돕는 자리에.',
      purpose:'캠페인에 반응한 고객의 질문을 받고 관심사를 파악하는 예시야. 구매 상담이 필요하면 영업 담당자에게 연결할 수 있어.',
      input:'“광고에서 본 서비스가 궁금해요.”', action:'기본 안내 · 관심사 파악', output:'고객의 관심을 기록하고 영업에 전달',
      connections:[['마케팅 자동화 · MA','어떤 캠페인에서 왔고 무엇에 반응했는지'],['고객 정보 · CRM','기존 고객인지, 어떤 관심사를 가졌는지'],['상품 정보 · 연락 동의','안내할 상품 내용과 연락 가능한 범위']]
    },
    sales: {
      title:'영업이 도입한다면, 구매 상담을 이어주는 자리에.',
      purpose:'고객이 원하는 조건을 파악하고 기본 질문에 답하는 예시야. 견적·계약처럼 담당자의 판단이 필요한 업무로 이어줄 수 있어.',
      input:'“우리 팀에 맞는 요금제가 있나요?”', action:'요구사항 파악 · 상품 안내', output:'영업 담당자에게 상담 맥락 전달',
      connections:[['고객 · 거래 관리 CRM','담당자와 이전 상담, 진행 중인 거래'],['상품 · 가격 정보','안내 가능한 요금제와 제공 조건'],['견적 · 일정 관리','후속 상담 예약과 견적 요청 연결']]
    },
    service: {
      title:'CS가 도입한다면, 문의 해결을 돕는 자리에.',
      purpose:'AI가 응대하려면 고객의 상황과 답변 근거가 필요해. 해결이 어려운 문의는 맥락과 함께 상담원에게 이어주는 흐름이야.',
      input:'“주문한 상품이 안 왔어요.”', action:'문의 파악 · 확인 · 안내', output:'해결하거나 상담원에게 인계',
      connections:[['고객 정보 · CRM','누구인지, 이전에 어떤 문의를 했는지'],['주문 · 배송 시스템','구매 내역과 현재 배송 상태'],['답변 지식 · 티켓 관리','안내할 정책과 문의 처리 상태']]
    }
  };
  const buttons = [...document.querySelectorAll('[data-stage]')];
  const panel = document.getElementById('journey-detail');
  buttons.forEach(button => button.addEventListener('click', () => {
    if(button.getAttribute('aria-pressed') === 'true') return;
    const data = scenarios[button.dataset.stage];
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    GuideMotion.layout(panel, [...panel.children], () => {
      for (const [id, value] of Object.entries({
        'journey-detail-title':data.title, 'journey-purpose':data.purpose,
        'journey-input':data.input, 'journey-action':data.action, 'journey-output':data.output
      })) document.getElementById(id).textContent = value;
      document.querySelectorAll('#journey-connections>div').forEach((card, index) => {
        card.querySelector('b').textContent = data.connections[index][0];
        card.querySelector('span').textContent = data.connections[index][1];
      });
    });
    GuideMotion.animate(panel, [{opacity:.65},{opacity:1}], {duration:240});
  }));
})();
