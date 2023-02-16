import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger);

const nav = document.querySelector("nav");
const text = document.querySelector(".hero-title");
const sub = document.querySelector(".hero-sub");
const icon = document.querySelector("#mouse-icon");
const box = document.querySelector(".panel-text");
const img = document.querySelector(".panel-image");
const btn = document.querySelector(".btn");

// mouse icon animation
const iconTl = gsap.timeline({ repeat: -1, paused: true });
iconTl
  .to(
    "#scroll",
    {
      y: 20,
      autoAlpha: 0,
      transformOrigin: "50% 100%",
      duration: 0.7
    },
    "icon"
  )
  .to("#outline", { y: 8, duration: 0.7 }, "icon")
  .to("#outline", { y: 0, duration: 0.7 }, "icon+=0.7");

// Hero Parallax
const tl = gsap.timeline({
  defaults: { ease: "none", transformOrigin: "50% 50%" },
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.utils.toArray("img").forEach((layer) => {
  const depth = layer.dataset.depth;
  const movement = -(layer.offsetHeight * depth);
  tl.to(layer, { y: -movement }, 0);
});

tl.to(
  text,
  {
    y: -text.offsetHeight * text.dataset.depth,
    autoAlpha: 0,
    scale: 1.08,
    duration: 0.2
  },
  0
)
  .to(
    sub,
    {
      y: -sub.offsetHeight * sub.dataset.depth,
      autoAlpha: 0,
      scale: 1.05,
      duration: 0.2
    },
    0.06
  )
  .to(nav, { y: "-100%", duration: 0.16 }, 0)
  .to(
    icon,
    { y: -icon.offsetHeight * icon.dataset.depth, autoAlpha: 0, duration: 0.2 },
    0
  );

//  Panel Fade In
const tl2 = gsap.timeline({ paused: true, defaults: { ease: "power1.out" } });
tl2
  .from(img, { autoAlpha: 0, scale: 0, y: 20, duration: 0.5 }, 0)
  .from(box, { autoAlpha: 0, x: 50, duration: 0.4 }, 0.04)
  .from(
    btn,
    {
      autoAlpha: 0,
      x: 50,
      duration: 0.36,
      onComplete: () => {
        gsap.set(btn, { clearProps: "transform" });
      }
    },
    0.08
  );

ScrollTrigger.create({
  trigger: ".panel",
  start: "-25% top",
  end: "300px bottom",
  onEnter: () => {
    tl2.play();
    // disable the mouse icon tl
    iconTl.pause();
  },
  onEnterBack: () => {
    tl2.reverse();
    //  resume the mouse icon tl
    iconTl.restart();
  }
});

/* loader */

const heroText = document.querySelectorAll(".hero-title,.hero-sub");
const loaderCircles = document.querySelector(".loader-circles");
const greyCircle = document.querySelector(".grey");
const blackCircle = document.querySelector(".black");
const imgToLoad = document.querySelectorAll("img");
const loadImgs = imagesLoaded(imgToLoad);

let loadedCount = 0;
let loadingProgress = 0;

gsap.set(greyCircle, { scale: 0, transformOrigin: "50% 100%" });
gsap.set(blackCircle, { scale: 0, transformOrigin: "50% 100%" });

gsap.fromTo(
  loaderCircles,
  { scale: 0.9, transformOrigin: "50% 50%" },
  {
    y: -12,
    repeat: -1,
    scale: 1.1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 0.5
  }
);

const loaderTl = gsap.timeline({ defaults: { ease: "sine.inOut" } });

loaderTl
  .to(greyCircle, { repeat: -1, repeatDelay: 0.5, scale: 1 }, "one")
  .to(blackCircle, { repeat: -1, repeatDelay: 0.5, scale: 1 }, "two")
  .set(
    greyCircle,
    { zIndex: "6", scale: 0, repeat: -1, repeatDelay: 1 },
    "two+=0.5"
  )
  .set(
    blackCircle,
    { zIndex: "6", scale: 0, repeat: -1, repeatDelay: 1 },
    "two+=1"
  )
  .set(greyCircle, { zIndex: "5", repeat: -1, repeatDelay: 1 }, "two+=1");

loaderTl.timeScale(0.5);
const loadCompleteTl = gsap.timeline({});
loadImgs.on("progress", () => {
  loadedCount++;
  let loadingProgress = loadedCount / imgToLoad.length;
  if (loadingProgress === 1) {
    loadCompleteTl
      .to(".loader-circles div", {
        delay: 0.75,
        opacity: 0,
        onComplete: () => {
          loaderTl.pause();
        }
      })
      .to(
        ".loader",
        {
          autoAlpha: 0,
          duration: 0.75
        },
        "load"
      )
      .fromTo(
        heroText,
        { autoAlpha: 0, y: 4 },
        { autoAlpha: 1, y: 0, stagger: 0.2 },
        "load+=0.1"
      )
      .fromTo(
        "#mouse-icon",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          onStart: () => {
            iconTl.play();
          }
        },
        "load+=0.35"
      );
  }
});
