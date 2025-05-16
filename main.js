

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

const items = document.querySelectorAll('.item');

items.forEach((item, index) => {
  if (index !== 0) {
    gsap.set(item, { yPercent: 100 });
    gsap.set(item.querySelector('.img'), { yPercent: -100 });
  }
});

const scroll = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.wrapper',
      start: 'top top',
      end: `+=${items.length * 100}%`,
      scrub: true,
      pin: true,
      // markers: true,
    },
    defaults: { ease: 'none' },
  });

  items.forEach((item, index) => {
    if (index !== items.length - 1) {
      tl.to(item, {
        yPercent: -100,
      })
        .to(
          item.querySelector('img'),
          {
            yPercent: 100,
          },
          '<'
        )
        .to(
          items[index + 1],
          {
            yPercent: 0,
          },
          '<'
        )
        .to(
          items[index + 1].querySelector('img'),
          {
            yPercent: 0,
          },
          '<'
        );
    }
  });
};

scroll();
