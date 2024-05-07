export class tab {
  o: { activeClass: string, tabItem: HTMLElement };
  element: HTMLButtonElement;
  roots: NodeListOf<HTMLElement>;
  displayItem: NodeListOf<HTMLElement> | null;
  contentTarget: string | null;
  content: HTMLElement | null;

  /**
   * @param  {HTMLButtonElement} element rootとなる要素
   * @returns void
   */
  constructor(element: HTMLButtonElement, roots: NodeListOf<HTMLElement>, displayTarget: NodeListOf<HTMLElement>) {
    const defaultOptions = {
      activeClass: 'is-active',
    };

    this.o = Object.assign(defaultOptions);
    this.element = element;
    this.roots = roots;
    this.displayItem = displayTarget;
    this.contentTarget = this.element.getAttribute('aria-controls');
    this.content = this.contentTarget ? document.getElementById(this.contentTarget) : null;

    this.init();
  }

  /**
   * 初期化処理
   *
   * @returns void
   */
  init() {
    // モーダル発火
    this.element.addEventListener('click', this.clickHandler.bind(this));
  }

  /**
   * @returns 発火ボタンのイベント
   */
  clickHandler() {
    for (const item of this.roots) {
      item.parentElement?.classList.remove(this.o.activeClass);
    }

    if (this.displayItem) {
      for (const item of this.displayItem) {
        item.classList.remove(this.o.activeClass);
      }
    }

    this.element.parentElement?.classList.add(this.o.activeClass);
    this.content?.classList.add(this.o.activeClass);
    }
}
