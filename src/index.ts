import "./styles/app.scss";
import Scroller from "./scroller";

function main() {
  console.log("hi, Im main");

  let els = document.querySelectorAll("[data-scrollport-id]");
  let scrollers: Scroller[] = [];
  for (let i = 0; i < els.length; i++) {
    scrollers.push(new Scroller(els[i]));
  }
  scrollers[0].subscribe(scrollers[1], "bottom");
  scrollers[1].subscribe(scrollers[0], "top");

  scrollers[1].subscribe(scrollers[2], "bottom");
  scrollers[2].subscribe(scrollers[1], "top");

  // This can create an infinite loop
  // scrollers[2].subscribe(scrollers[0], "bottom");

  scrollers.forEach(s => s.start());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
