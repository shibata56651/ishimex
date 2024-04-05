export class load {
  o: { animationClass: string, activeClass: string, closeClass: string, toggleHeight: number };
  element: HTMLElement;
  /**
   * @param  {Element} element rootとなる要素
   * @param  {Element} toggleRoots .js-toggle-roots
   * @returns void
   */
  constructor(element: HTMLElement) {
    const defaultOptions = {
      animationClass: 'is-animation',
      activeClass: 'is-active',
      closeClass: 'is-close',
      toggleHeight: 0,
    };

    this.o = Object.assign(defaultOptions);
    this.element = element;
    this.init();
  }
  /**
   * 初期化処理
   *
   * @returns void
   */
  init() {
    window.addEventListener('load', this.loadHandler.bind(this));
  }

  /**
 * トグル機能
 *
 * @param  {MouseEvent} e クリックした要素
 * @returns void
 */
  loadHandler(e: any) {
    
  }
}
