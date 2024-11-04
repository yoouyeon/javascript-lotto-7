import LottoMachine from './LottoMachine.js';

class App {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async run() {
    await this.#lottoMachine.run();
  }
}

export default App;
