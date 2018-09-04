class Scroller {
  el: Element;
  wheel: WheelEvent | null;
  id: String;

  subscribers: {
    bottom: Scroller[];
    top: Scroller[];
  };

  constructor(el: Element) {
    this.el = el;
    this.wheel = null;
    this.id = el.getAttribute("data-scrollport-id") || "unknown";
    this.subscribers = { bottom: [], top: [] };
  }

  start() {
    this.el.addEventListener("wheel", e => this.onWheel(e));
    // this.el.addEventListener("scroll", e => this.onScroll(e));
  }

  subscribe(s: Scroller, type: String) {
    if (type === "bottom") {
      this.subscribers["bottom"].push(s);
    } else if (type === "top") {
      this.subscribers["top"].push(s);
    }
  }

  addBottomSubscriber(s: Scroller) {
    this.subscribers.bottom.push(s);
  }

  get dims() {
    return {
      height: this.el.clientHeight,
      scrollHeight: this.el.scrollHeight,
      scrollTop: this.el.scrollTop,
      scrollBottom: this.el.clientHeight + this.el.scrollTop
    };
  }

  isAtBottom() {
    return this.dims.scrollBottom === this.dims.scrollHeight;
  }

  isAtTop() {
    return this.dims.scrollTop === 0;
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    console.log(`${this.id} onWheel`, e.wheelDeltaY);
    window.requestAnimationFrame(() => this.applyWheel(e));
  }

  applyWheel(e: WheelEvent) {
    this.wheel = e;
    let y = this.wheel.wheelDeltaY;
    console.log(`${this.id} applying wheel`, y);
    this.el.scrollTop -= y;
    if (this.isAtBottom()) {
      this.handleBottom();
    } else if (this.isAtTop()) {
      this.handleTop();
    }
  }

  handleBottom() {
    this.subscribers.bottom.forEach(s => s.applyWheel(this.wheel!));
  }

  handleTop() {
    this.subscribers.top.forEach(s => s.applyWheel(this.wheel!));
  }
}

export default Scroller;
