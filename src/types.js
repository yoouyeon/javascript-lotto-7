/**
 * @typedef {Object} LottoPrizeType - 각 당첨 정보
 * @property {number} matchCount - 일치하는 숫자의 개수
 * @property {string} description - 당첨 결과에 대한 설명
 * @property {number} winningMoney - 당첨금
 * @property {boolean} bonusRequired - 보너스 번호 필요 여부
 */

/**
 * @typedef {'1st' | '2nd' | '3rd' | '4th' | '5th'} LottoRankType - 로또 당첨 순위
 */

/**
 * @typedef {Record<LottoRankType, LottoPrizeType>} LottoPrizeTableType - 당첨 테이블
 */

/**
 * @typedef {LottoRankType | null} LottoResultType - 로또 결과 (당첨 또는 미당첨)
 */

/**
 * @typedef {Object} LottoStatisticsType - 로또 통계 정보
 * @property {string} description - 당첨 결과에 대한 설명
 * @property {number} winningMoney - 당첨금
 * @property {number} count - 당첨 개수
 */

/**
 * @typedef {Object} RuleType - 검증 규칙
 * @property {Function} isValid - 검증 함수
 * @property {string} errorMessage - 에러 메시지
 */

/**
 * @typedef {Record<string, RuleType>} RuleSetType - 검증 규칙 세트
 */

/**
 * @typedef {Object} ValidationObjectType - 검증 객체
 * @property {RuleSetType} RULE_SET - 검증 규칙 세트
 * @property {Function} validate - 검증 함수
 */

export {}; // 이 파일이 모듈로 인식되도록 빈 객체를 export
