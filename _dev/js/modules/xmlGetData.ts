export class xmlGetData {
  o: { activeClass: string, closeClass: string, changeClass: string, count: number, xmlPath: string };
  elements: HTMLElement;
  count: number;
  items: NodeListOf<Element> | null;
  ul_element: HTMLUListElement | null;

  /**
   * @param  {HTMLElement} elements rootとなる要素
   * @returns void
   */
  constructor(elements: HTMLElement, num: number) {
    const defaultOptions = {
      activeClass: 'is-active',
      changeClass: 'is-changing',
      pauseClass: 'is-pause',
      xmlPath: '/common/data/newdata.xml',
      count: 0,
    };

    this.o = Object.assign(defaultOptions);
    this.elements = elements;
    this.count = num;
    this.items = null;
    this.ul_element = null;
    this.init();
  }
  /**
   * 初期化処理
   *
   * @returns void
   */
  init() {
    window.addEventListener('DOMContentLoaded', this.getDataFunc.bind(this));
  }

  /**
   * ページロード時にスライドショーを再生する
   *
   * @returns void
   */
  getDataFunc() {
    // 取得したレスポンスをページに表示

    fetch(this.o.xmlPath)
    .then(response => response.text()) // (2) レスポンスデータを取得
    .then(data => { // (3)レスポンスデータを処理

      const parser = new DOMParser();
      const sitemap = parser.parseFromString(data, "application/xml");

      this.items = sitemap.querySelectorAll('item');
      this.ul_element = document.createElement('ul');

        for(let data of this.items) {
          const id = data.querySelector('id');

          if (this.count === Number(id?.textContent)) {
            const li_element = document.createElement('li');
            const text = data.querySelector('text');
            const last_update = data.querySelector('lastmod');

            li_element.innerHTML = `text：${text?.textContent}<br>最終更新日：${last_update?.textContent}`;
            this.ul_element.appendChild(li_element);
          }
      }

      this.elements.appendChild(this.ul_element);
    });
  }
}
