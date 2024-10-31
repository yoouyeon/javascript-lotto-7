# 🎰 로또

## 📋 기능 목록

### 입력

- [x] 로또 구입 금액 입력
- [x] 당첨 번호 입력
- [x] 보너스 번호 입력

### 출력

- [x] 발행한 로또 개수 출력
- [x] 발행한 로또 번호 출력 (각 번호는 오름차순이어야 한다.)
- [x] 당첨 내역 출력 (등수별 당첨 개수, 당첨금액)
- [x] 수익률 출력

### 로또

- [x] 로또 구입 금액에 따라 로또 발행
- [x] 로또 번호 생성 (1~45 사이의 정수, 중복되지 않아야 한다.)
- [x] 로또 번호 정렬 (오름차순)
- [ ] 당첨 여부와 등수 확인
- [ ] 수익률 계산

### 예외 처리

- 로또 구입 금액
  - [ ] 숫자가 아니거나 숫자로 변환할 수 없는 경우 예외 처리
  - [ ] 1000원 미만인 경우 예외 처리
  - [ ] 1000원 단위가 아닌 경우 예외 처리
- 당첨 번호
  - [ ] 6개가 아닌 경우 예외 처리
  - [ ] 숫자가 아니거나 숫자로 변환할 수 없는 경우 예외 처리
  - [ ] 1~45 사이의 정수가 아닌 경우 예외 처리
  - [ ] 중복된 숫자가 있는 경우 예외 처리
- 보너스 번호
  - [ ] 숫자가 아니거나 숫자로 변환할 수 없는 경우 예외 처리
  - [ ] 1~45 사이의 정수가 아닌 경우 예외 처리
  - [ ] 당첨 번호와 중복된 숫자가 있는 경우 예외 처리
- 로또 발행
  - [x] 로또 번호가 6개가 아닌 경우 예외 처리
