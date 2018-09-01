class Scroller {
  el: HTMLElement
  constructor(el: HTMLElement) {
    this.el = el;
  }

  start() {
    this.el.addEventListener('wheel', (e) => this.onWheel(e));
  }

  get dims() {
    return {
      height: this.el.clientHeight,
      scrollHeight: this.el.scrollHeight,
      scrollTop: this.el.scrollTop
    };
  }

  isAtBottom() {
    return this.dims.height + this.dims.scrollTop === this.dims.scrollHeight;
  }

  isAtTop() {
    return this.dims.scrollTop === 0;
  }

  onWheel(e: WheelEvent) {
    console.log(e.wheelDelta,e.wheelDeltaX,e.wheelDeltaY);
    if (this.isAtBottom()) {
      console.log('bottom!');
    } else if (this.isAtTop()) {
      console.log('top!');
    }
  }
}

export default Scroller;