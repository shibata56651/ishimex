export class categoryCarousel {
  o: { activeClass: string };
  item: HTMLElement | null;
  categoryImgRoots: NodeListOf<HTMLElement> | null;
  categoryLinkRoots: NodeListOf<HTMLElement> | null;
  displayWidth: number;
  currentIndex: number;
  spSizeBoolean: boolean;
  previousIndex: string | undefined;

  /**
   * @param  {Element} elements rootとなる要素
   * @returns void
   */
  constructor(item: HTMLElement | null, categoryImgRoots: NodeListOf<HTMLElement> | null, categoryLinkRoots: NodeListOf<HTMLElement> | null, spSizeBoolean: boolean) {
    const defaultOptions = {
      activeClass: 'is-active',
    };

    this.o = Object.assign(defaultOptions);
    this.item = item;
    this.categoryImgRoots = categoryImgRoots;
    this.categoryLinkRoots = categoryLinkRoots;
    this.spSizeBoolean = spSizeBoolean;
    this.displayWidth = window.innerWidth;
    this.currentIndex = 0;
    this.previousIndex = undefined;
    this.init();
  }
  /**
   * 初期化処理
   *
   * @returns void
   */
  init() {
    if (this.spSizeBoolean) {
      // console.log(this.categoryImgRoots)
      setInterval(this.changeImage.bind(this), 4000);
    } else {
      this.item?.addEventListener('mouseover', this.activeEvent.bind(this));
      this.item?.addEventListener('focus', this.activeEvent.bind(this));
    }
  }

  FadeAnimation(target: HTMLElement, kind: 'open' | 'close') {
      target.style.opacity = '0';

      const fadeAnimation = kind === 'open' ? target.animate(
        { opacity: ['0', '1']},
        { duration: 1000, easing: 'ease' }
      ) : target.animate(
        { opacity: ['1', '0']},
        { duration: 1000, easing: 'ease' }
      );

      fadeAnimation.onfinish = () => {
        kind === 'open' ? target.style.opacity = '1' : target.style.opacity = '0';
        // kind === 'open' ? target.classList.add(this.o.activeClass) : target.classList.remove(this.o.activeClass);
      };
  }

  changeImage() {
    // if (this.currentIndex === 0) {
    //   this.categoryImgRoots && this.categoryImgRoots[0].classList.add('is-active');
    //   this.currentIndex++;
    // } else {
      // 現在の画像からis-activeクラスを削除
      this.categoryImgRoots && this.categoryImgRoots[this.currentIndex].classList.remove(this.o.activeClass);
      this.categoryImgRoots && this.FadeAnimation(this.categoryImgRoots[this.currentIndex], 'close');

      if (this.categoryImgRoots && this.categoryImgRoots.length - 1 === this.currentIndex) {
        this.currentIndex = -1;
      }

      this.currentIndex++;
      this.categoryImgRoots && this.categoryImgRoots[this.currentIndex].classList.add(this.o.activeClass);
      this.categoryImgRoots && this.FadeAnimation(this.categoryImgRoots[this.currentIndex], 'open');
    // }
  }

  /**
   * ページロード時に情報を取得
   *
   * @returns void
   */
  activeEvent() {
    // this.categoryImgRoots?.forEach((item) => {
    // setTimeout(() => {
    //     item.classList.add(this.o.activeClass);
    //   }, 4000);
    // })

    // 画像のアクティブクラス初期化
    this.categoryImgRoots?.forEach((item) => {
      item.classList.remove(this.o.activeClass);
    })

    // リンクのアクティブクラス初期化
    this.categoryLinkRoots?.forEach((item) => {
      item.classList.remove(this.o.activeClass);
    })

    // 表示画像処理
    const linkTarget = this.item?.dataset.categoryLink;

    this.categoryImgRoots?.forEach((item) => {
      const imgTarget = item.dataset.categoryImg;

      if (linkTarget === imgTarget) {
          item.classList.add(this.o.activeClass);
          this.previousIndex = imgTarget;
          this.FadeAnimation(item, 'open')
      }
    })

    // this.display && this.FadeAnimation(this.display);
  }
}
