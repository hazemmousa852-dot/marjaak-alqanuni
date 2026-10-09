(() => {
  'use strict';
  const card = document.getElementById('insurance-adventure');
  if (!card) return;
  const messages = {
    ar: {
      publishedGame: 'لعبة تعليمية جديدة',
      insuranceGameImageAlt: 'يد تحكم في لعبة ودرع تأميني ومسار تحديات وكأس وشهادة إنجاز',
      insuranceGameTitle: 'مغامرة التأمينات — اتعلّم والعب',
      insuranceGameDesc: 'خوض مغامرة في التأمينات الاجتماعية المصرية: جاوب على أسئلة، حلّ مواقف من شغل شئون العاملين، واجمع النقاط لحد ما تستلم شهادة إنجازك.',
      insuranceGameBenefit1: '٥ مستويات و٤٠ مهمة بين أسئلة ومواقف وحسابات',
      insuranceGameBenefit2: 'شرح الإجابات ومراجع القواعد ومراجعة أخطائك',
      insuranceGameBenefit3: 'شهادة باسمك بصيغة PDF أو صورة بعد الاجتياز',
      playInsuranceGame: 'العب الآن'
    },
    en: {
      publishedGame: 'New learning game',
      insuranceGameImageAlt: 'Game controller, insurance shield, challenge trail, trophy and achievement certificate',
      insuranceGameTitle: 'Insurance Adventure — Play & Learn',
      insuranceGameDesc: 'An Arabic learning game about Egyptian social insurance. Answer questions, solve real personnel scenarios, collect points and earn your achievement certificate.',
      insuranceGameBenefit1: '5 levels and 40 questions, scenarios and calculations',
      insuranceGameBenefit2: 'Answer explanations, rule references and mistake review',
      insuranceGameBenefit3: 'Named certificate as PDF or image after passing',
      playInsuranceGame: 'Play now'
    }
  };
  const apply = () => {
    const dictionary = messages[document.documentElement.lang === 'en' ? 'en' : 'ar'];
    card.querySelectorAll('[data-game-i18n]').forEach(element => { element.textContent = dictionary[element.dataset.gameI18n]; });
    card.querySelectorAll('[data-game-i18n-alt]').forEach(element => { element.alt = dictionary[element.dataset.gameI18nAlt]; });
    document.getElementById('toolSearch')?.dispatchEvent(new Event('input', { bubbles: true }));
  };
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  apply();
})();
