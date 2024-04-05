export class tab {
  o: { activeClass: string, tabItem: HTMLElement };
  element: HTMLAnchorElement;
  roots: NodeListOf<HTMLElement>;
  tabItem: HTMLElement | null;
  displayItem: NodeListOf<HTMLElement> | null;
  content: HTMLElement | null;

  /**
   * @param  {HTMLAnchorElement} element rootとなる要素
   * @returns void
   */
  constructor(element: HTMLAnchorElement, roots: NodeListOf<HTMLElement>, displayTarget: string) {
    const defaultOptions = {
      activeClass: 'is-active',
      tabItem: displayTarget,
    };

    this.o = Object.assign(defaultOptions);
    this.element = element;
    this.roots = roots;
    this.tabItem = null;
    this.displayItem = null;
    this.content = document.getElementById(this.element.hash.substring(1));

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
   * @param  {MouseEvent} e 発火ボタンのイベント
   */
  clickHandler(e: MouseEvent) {
    e.preventDefault();

    for (const item of this.roots) {
      item.parentElement?.classList.remove(this.o.activeClass);
    }

    if (this.displayItem) {
      for (const item of this.displayItem) {
        item.classList.remove(this.o.activeClass);
      }
    }

    if (this.element.getAttribute('href')) {
      const href = this.element.getAttribute('href')?.substring(1);
      href ? this.tabItem = document.getElementById(href) : this.tabItem = null;
    }

    this.element.parentElement?.classList.add(this.o.activeClass);
    this.content?.classList.add(this.o.activeClass);
    }
}
