import './styles/app.scss';
import Scroller from './scroller';

function main() {
  console.log('hi, Im main');
  let el = document.querySelector('.scrollport') as HTMLElement;
  new Scroller(el).start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}