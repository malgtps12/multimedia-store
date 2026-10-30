/*
 * MXL — motion layer.
 * One orchestrated opening, one pinned horizontal passage, and a ruling
 * engine that draws the page's hairlines. Everything degrades to a plain,
 * fully readable document when GSAP is missing or motion is reduced.
 */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     Page always opens at the top.
     --------------------------------------------------------------- */
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  window.addEventListener("pageshow", function () { window.scrollTo(0, 0); });

  var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reducedMotion = reduceMotionQuery.matches;

  var hasGSAP = typeof window.gsap !== "undefined";
  var hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";

  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof SplitText !== "undefined") gsap.registerPlugin(SplitText);
    if (typeof DrawSVGPlugin !== "undefined") gsap.registerPlugin(DrawSVGPlugin);
  }

  var MOTION = !reducedMotion && hasGSAP;
  var SCROLL_MOTION = MOTION && hasScrollTrigger;

  /* ===============================================================
     1. Ruling engine — draw the hairlines the world is built from.
     =============================================================== */
  var SVG_NS = "http://www.w3.org/2000/svg";

  function makeLine(x1, y1, x2, y2, strong) {
    var line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    if (strong) line.setAttribute("class", "is-strong");
    return line;
  }

  function buildRulings(plate) {
    var layer = plate.querySelector(".rule-layer");
    if (!layer) return;
    var margin = plate.querySelector(".margin-col");
    var block = plate.querySelector(".spread, .promo-inner, .statement, .alur-pin");
    if (!block) return;

    var plateBox = plate.getBoundingClientRect();
    var blockBox = block.getBoundingClientRect();
    var width = Math.max(plateBox.width, 1);
    var height = Math.max(plateBox.height, 1);

    layer.setAttribute("viewBox", "0 0 " + width + " " + height);
    layer.setAttribute("preserveAspectRatio", "none");
    while (layer.firstChild) layer.removeChild(layer.firstChild);

    var top = blockBox.top - plateBox.top;
    var bottom = blockBox.bottom - plateBox.top;
    var left = blockBox.left - plateBox.left;
    var right = left + blockBox.width;

    // Rule closing the top of the block.
    layer.appendChild(makeLine(left, top, right, top, true));

    // The margin rail: the one vertical rule the whole page hangs from.
    if (margin && plateBox.width > 900) {
      var marginBox = margin.getBoundingClientRect();
      var railX = marginBox.right - plateBox.left + (left - (marginBox.right - plateBox.left)) / 2;
      layer.appendChild(makeLine(railX, top, railX, bottom, false));
    }

    // Square detents at the block's corners.
    var tick = 7;
    layer.appendChild(makeLine(left, top, left, top + tick, true));
    layer.appendChild(makeLine(right, top, right, top + tick, true));
    layer.appendChild(makeLine(left, bottom - tick, left, bottom, false));
    layer.appendChild(makeLine(right, bottom - tick, right, bottom, false));
  }

  var ruledPlates = Array.prototype.slice.call(document.querySelectorAll(".plate"));

  function buildAllRulings() {
    ruledPlates.forEach(buildRulings);
  }

  buildAllRulings();

  var rulingTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(rulingTimer);
    rulingTimer = window.setTimeout(buildAllRulings, 160);
  });

  /* ===============================================================
     2. Opening — the curtain is GSAP's, not CSS's.
     =============================================================== */
  var curtain = document.createElement("div");
  curtain.className = "page-transition";
  curtain.setAttribute("aria-hidden", "true");

  var panelLeft = document.createElement("span");
  panelLeft.className = "page-transition-panel page-transition-panel-left";
  var panelRight = document.createElement("span");
  panelRight.className = "page-transition-panel page-transition-panel-right";
  var curtainMark = document.createElement("p");
  curtainMark.className = "page-transition-mark";
  curtainMark.textContent = "MXL.";
  var curtainMeta = document.createElement("p");
  curtainMeta.className = "page-transition-meta";
  curtainMeta.textContent = "Initializing / Multimedia Experience";

  curtain.appendChild(panelLeft);
  curtain.appendChild(panelRight);
  curtain.appendChild(curtainMark);
  curtain.appendChild(curtainMeta);
  document.body.appendChild(curtain);

  function removeCurtain() {
    if (curtain && curtain.parentNode) curtain.parentNode.removeChild(curtain);
  }

  /* ===============================================================
     3. Split type
     =============================================================== */
  var splitTargets = Array.prototype.slice.call(document.querySelectorAll("[data-split]"));
  var splits = [];

  function buildSplits() {
    if (!MOTION || typeof SplitText === "undefined") return;
    splitTargets.forEach(function (el) {
      if (el.dataset.splitDone === "true") return;
      var split = new SplitText(el, {
        type: "lines,words,chars",
        linesClass: "split-line",
        charsClass: "split-char",
        autoSplit: false
      });
      el.dataset.splitDone = "true";
      splits.push({ el: el, split: split });
    });
  }

  buildSplits();

  /* ===============================================================
     4. Timeline: opening + hero
     =============================================================== */
  var masthead = document.querySelector(".masthead");
  var hero = document.querySelector(".hero");

  if (MOTION) {
    var heroChars = hero ? hero.querySelectorAll(".split-char") : [];
    var heroRailKeys = hero ? hero.querySelectorAll(".rail-key") : [];
    var heroCols = hero ? hero.querySelectorAll(".hero-cols .col") : [];
    var heroFigure = hero ? hero.querySelector(".plate-figure") : null;

    gsap.set(heroChars, { yPercent: 112, opacity: 0 });
    gsap.set(heroRailKeys, { opacity: 0, y: 8 });
    gsap.set(heroCols, { opacity: 0, y: 14 });
    if (heroFigure) gsap.set(heroFigure, { clipPath: "inset(0 0 100% 0)" });
    if (masthead) gsap.set(masthead, { yPercent: -100 });
    gsap.set(curtainMark, { opacity: 0, scale: 0.92 });
    gsap.set(curtainMeta, { opacity: 0 });
    gsap.set([panelLeft, panelRight], { yPercent: 0 });

    var intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: removeCurtain
    });

    intro
      .to(curtainMark, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, 0)
      .to(curtainMeta, { opacity: 1, duration: 0.5 }, 0.18)
      .to(curtainMark, { opacity: 0, scale: 1.04, duration: 0.45, ease: "power2.in" }, 0.95)
      .to(curtainMeta, { opacity: 0, duration: 0.3 }, 0.9)
      .to(panelLeft, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 1.05)
      .to(panelRight, { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, 1.05)
      .to(masthead, { yPercent: 0, duration: 0.7 }, 1.35)
      .to(heroChars, {
        yPercent: 0,
        opacity: 1,
        duration: 1.05,
        stagger: { each: 0.012, from: "start" }
      }, 1.4)
      .to(heroRailKeys, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 1.75)
      .to(heroCols, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.85);

    if (heroFigure) {
      intro.to(heroFigure, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out" }, 1.5);
    }

    /* Hero stays alive: the figure drifts as the page leaves it. */
    if (SCROLL_MOTION && heroFigure) {
      gsap.to(heroFigure, {
        yPercent: -9,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
      });
    }
  } else {
    removeCurtain();
  }

  /* ===============================================================
     5. Section entrances — one system, not scattered effects
     =============================================================== */
  if (SCROLL_MOTION) {
    var sections = Array.prototype.slice.call(
      document.querySelectorAll("main > section:not(.hero):not(.alur)")
    );

    /* Content is visible by default; each entrance starts from a from-state
       only when its trigger fires, so a failed script never hides the page. */
    sections.forEach(function (section) {
      var headline = section.querySelector(".headline, .display");
      var rows = section.querySelectorAll("[data-rule], .ledger-row, .instrument, .step, .contact, .statement-line");
      var figures = section.querySelectorAll(".plate-figure");

      var tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", immediateRender: false }
      });

      if (headline) {
        var chars = headline.querySelectorAll(".split-char");
        if (chars.length) {
          tl.from(chars, {
            yPercent: 105,
            opacity: 0,
            duration: 0.85,
            stagger: { each: 0.01 }
          }, 0);
        } else {
          tl.from(headline, { opacity: 0, y: 24, duration: 0.8 }, 0);
        }
      }

      if (rows.length) {
        tl.from(rows, {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.07
        }, 0.12);
      }

      if (figures.length) {
        tl.from(figures, {
          opacity: 0,
          clipPath: "inset(0 0 18% 0)",
          duration: 0.9,
          ease: "expo.out"
        }, 0);
      }

      var layer = section.querySelector(".rule-layer");
      if (layer && typeof DrawSVGPlugin !== "undefined") {
        var lines = layer.querySelectorAll("line");
        if (lines.length) {
          tl.from(lines, {
            drawSVG: "0%",
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.05
          }, 0);
        }
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: function () { tl.play(0); }
      });
    });

    /* Competency counters. */
    var counters = document.querySelectorAll("[data-count]");
    if (counters.length) {
      counters.forEach(function (node) {
        var target = parseInt(node.getAttribute("data-count"), 10) || 0;
        var state = { value: 0 };
        var pad = node.textContent.trim().length > 1 ? 2 : 1;
        ScrollTrigger.create({
          trigger: node,
          start: "top 88%",
          once: true,
          onEnter: function () {
            gsap.to(state, {
              value: target,
              duration: 1.1,
              ease: "power2.out",
              onUpdate: function () {
                var out = String(Math.round(state.value));
                while (out.length < pad) out = "0" + out;
                node.textContent = out;
              }
            });
          }
        });
      });
    }

    /* Pinned horizontal passage: LANGKAH MENUJU LULUS. */
    var alur = document.querySelector(".alur");
    var alurTrack = document.querySelector(".alur-track");
    var alurPin = document.querySelector(".alur-pin");

    if (alur && alurTrack && alurPin) {
      var mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", function () {
        var getDistance = function () {
          return Math.max(0, alurTrack.scrollWidth - alurPin.clientWidth + 64);
        };

        var tween = gsap.to(alurTrack, {
          x: function () { return -getDistance(); },
          ease: "none",
          scrollTrigger: {
            trigger: alur,
            start: "top top",
            end: function () { return "+=" + (getDistance() + window.innerHeight * 0.6); },
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        /* Each step's numeral rule inks in as it reaches the reading position. */
        var steps = alurTrack.querySelectorAll(".step");
        steps.forEach(function (step) {
          var num = step.querySelector(".step-num");
          if (!num) return;
          gsap.fromTo(num,
            { borderBottomColor: "rgba(216,205,250,0.55)" },
            {
              borderBottomColor: "rgba(217,70,239,1)",
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: step,
                containerAnimation: tween,
                start: "left 90%",
                end: "left 60%",
                scrub: true
              }
            }
          );
        });

        return function () {
          gsap.set(alurTrack, { clearProps: "x" });
        };
      });
    }

    /* Photograph parallax inside the annotation margin. */
    document.querySelectorAll(".plate-figure img").forEach(function (img) {
      gsap.fromTo(img,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        }
      );
    });

    /* The masthead rule tightens once the page starts moving. */
    if (masthead) {
      ScrollTrigger.create({
        start: 80,
        onEnter: function () { masthead.classList.add("is-scrolled"); },
        onLeaveBack: function () { masthead.classList.remove("is-scrolled"); }
      });
    }
  }

  /* ===============================================================
     6. Rail detents follow the block they sit in
     =============================================================== */
  if (SCROLL_MOTION) {
    document.querySelectorAll("[data-rail]").forEach(function (rail) {
      var keys = rail.querySelectorAll(".rail-key");
      if (!keys.length) return;
      var host = rail.closest(".spread") || rail.parentElement;

      ScrollTrigger.create({
        trigger: host,
        start: "top 70%",
        end: "bottom 40%",
        onToggle: function (self) {
          rail.classList.toggle("is-live", self.isActive);
        },
        onUpdate: function (self) {
          if (!self.isActive) return;
          var index = Math.min(keys.length - 1, Math.floor(self.progress * keys.length));
          keys.forEach(function (key, i) {
            key.classList.toggle("is-active", i === index);
          });
        }
      });
    });
  }

  /* ===============================================================
     7. Background music — unchanged behaviour, new timing
     =============================================================== */
  var backgroundMusic = document.getElementById("backgroundMusic");
  var musicToggle = document.getElementById("musicToggle");
  var MUSIC_VOLUME = 0.35;
  var musicAudible = false;
  var activationEvents = ["pointerdown", "touchend", "keydown", "click"];
  var scrollEvents = ["wheel", "scroll", "touchmove"];

  function updateMusicToggle() {
    if (!backgroundMusic || !musicToggle) return;
    var isPlaying = !backgroundMusic.paused && !backgroundMusic.muted;
    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
    musicToggle.setAttribute("title", isPlaying ? "Jeda musik" : "Putar musik");
  }

  function startBackgroundMusic() {
    if (!backgroundMusic) return;
    backgroundMusic.volume = MUSIC_VOLUME;
    backgroundMusic.muted = false;
    var attempt = backgroundMusic.play();
    if (attempt && typeof attempt.then === "function") {
      attempt.then(checkAudible).catch(function () {});
    }
    window.setTimeout(checkAudible, 300);
  }

  function startMutedMusic() {
    if (!backgroundMusic || musicAudible) return;
    try {
      backgroundMusic.muted = true;
      backgroundMusic.volume = MUSIC_VOLUME;
      backgroundMusic.play().catch(function () {});
    } catch (_) {}
    window.setTimeout(checkAudible, 300);
  }

  function checkAudible() {
    if (!backgroundMusic) return;
    if (!backgroundMusic.paused && !backgroundMusic.muted) {
      musicAudible = true;
      detachActivationListeners();
    } else {
      musicAudible = false;
    }
    updateMusicToggle();
  }

  if (musicToggle && backgroundMusic) {
    ["pointerdown", "touchend", "keydown"].forEach(function (eventName) {
      musicToggle.addEventListener(eventName, function (event) { event.stopPropagation(); });
    });

    musicToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      unlockAudioContext();

      if (!backgroundMusic.paused && !backgroundMusic.muted) {
        backgroundMusic.pause();
        musicAudible = false;
        updateMusicToggle();
        return;
      }
      startBackgroundMusic();
    });

    backgroundMusic.addEventListener("play", updateMusicToggle);
    backgroundMusic.addEventListener("pause", updateMusicToggle);
    backgroundMusic.addEventListener("volumechange", updateMusicToggle);
  }

  /* Draggable toggle — a printed mark the reader can move aside. */
  if (musicToggle) {
    var dragging = false;
    var moved = false;
    var startX = 0;
    var startY = 0;
    var startLeft = 0;
    var startTop = 0;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function positionButton(left, top) {
      var rect = musicToggle.getBoundingClientRect();
      var maxLeft = window.innerWidth - rect.width;
      var maxTop = window.innerHeight - rect.height;
      musicToggle.style.left = clamp(left, 8, Math.max(maxLeft, 8)) + "px";
      musicToggle.style.top = clamp(top, 8, Math.max(maxTop, 8)) + "px";
      musicToggle.style.right = "auto";
    }

    musicToggle.addEventListener("pointerdown", function (event) {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      var rect = musicToggle.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      musicToggle.setPointerCapture(event.pointerId);
    });

    musicToggle.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      if (!moved && Math.hypot(dx, dy) < 6) return;
      moved = true;
      musicToggle.classList.add("is-dragging");
      positionButton(startLeft + dx, startTop + dy);
    });

    function endDrag(event) {
      if (!dragging) return;
      dragging = false;
      musicToggle.classList.remove("is-dragging");
      if (musicToggle.hasPointerCapture && musicToggle.hasPointerCapture(event.pointerId)) {
        musicToggle.releasePointerCapture(event.pointerId);
      }
    }

    musicToggle.addEventListener("pointerup", endDrag);
    musicToggle.addEventListener("pointercancel", endDrag);

    musicToggle.addEventListener("click", function (event) {
      if (moved) {
        event.stopImmediatePropagation();
        moved = false;
      }
    }, true);

    window.addEventListener("resize", function () {
      var rect = musicToggle.getBoundingClientRect();
      positionButton(rect.left, rect.top);
    });
  }

  function handleAudioActivation() {
    startBackgroundMusic();
    if (backgroundMusic) {
      backgroundMusic.addEventListener("canplay", function () {
        if (!backgroundMusic.paused) return;
        startBackgroundMusic();
      }, { once: true });
    }
  }

  var audioContext = null;
  function unlockAudioContext() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx || audioContext) return;
      audioContext = new Ctx();
      var buffer = audioContext.createBuffer(1, 1, 22050);
      var source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
      if (audioContext.state === "suspended") audioContext.resume();
    } catch (_) {}
  }

  window.addEventListener("load", function () {
    startBackgroundMusic();
    window.setTimeout(startBackgroundMusic, 2600);
  });

  function gestureHandler() {
    unlockAudioContext();
    handleAudioActivation();
    if (backgroundMusic && !backgroundMusic.paused) {
      backgroundMusic.muted = false;
      checkAudible();
    }
  }

  function scrollHandler() {
    unlockAudioContext();
    if (musicAudible) return;
    startMutedMusic();
    startBackgroundMusic();
  }

  activationEvents.forEach(function (eventName) {
    window.addEventListener(eventName, gestureHandler, { passive: true });
  });
  scrollEvents.forEach(function (eventName) {
    window.addEventListener(eventName, scrollHandler, { passive: true, once: true });
  });

  function detachActivationListeners() {
    activationEvents.forEach(function (eventName) {
      window.removeEventListener(eventName, gestureHandler);
    });
    scrollEvents.forEach(function (eventName) {
      window.removeEventListener(eventName, scrollHandler);
    });
  }

  /* ===============================================================
     8. Live instruments
     =============================================================== */
  var pageOpenedAt = Date.now();
  var birthdayMonth = 8;
  var birthdayDay = 12;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatDuration(milliseconds) {
    var totalSeconds = Math.floor(milliseconds / 1000);
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  }

  function getNextBirthday(now) {
    var birthday = new Date(now.getFullYear(), birthdayMonth, birthdayDay);
    if (birthday <= now) birthday.setFullYear(now.getFullYear() + 1);
    return birthday;
  }

  var timeNode = document.getElementById("currentTime");
  var dateNode = document.getElementById("currentDate");
  var birthdayNode = document.getElementById("birthdayCountdown");
  var uptimeNode = document.getElementById("siteUptime");

  function updateLiveStatus() {
    var now = new Date();

    if (timeNode) {
      timeNode.textContent = now.toLocaleTimeString("id-ID", {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
    }
    if (dateNode) {
      dateNode.textContent = now.toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      });
    }
    if (birthdayNode) {
      var remaining = getNextBirthday(now).getTime() - now.getTime();
      var remainingDays = Math.floor(remaining / 86400000);
      var remainingHours = Math.floor((remaining % 86400000) / 3600000);
      var remainingMinutes = Math.floor((remaining % 3600000) / 60000);
      birthdayNode.textContent = remainingDays + " hari " + pad(remainingHours) + ":" + pad(remainingMinutes);
    }
    if (uptimeNode) {
      uptimeNode.textContent = formatDuration(Date.now() - pageOpenedAt);
    }
  }

  updateLiveStatus();
  window.setInterval(updateLiveStatus, 1000);

  /* ===============================================================
     9. Birthday plate — only on 12 September
     =============================================================== */
  function isBirthdayToday(date) {
    return date.getMonth() === birthdayMonth && date.getDate() === birthdayDay;
  }

  function showBirthdayCelebration() {
    if (!isBirthdayToday(new Date())) return;

    var celebration = document.createElement("section");
    celebration.className = "birthday-celebration";
    celebration.setAttribute("role", "dialog");
    celebration.setAttribute("aria-modal", "true");
    celebration.setAttribute("aria-labelledby", "birthdayCelebrationTitle");
    celebration.innerHTML =
      '<div class="birthday-celebration__glow" aria-hidden="true"></div>' +
      '<div class="birthday-celebration__confetti" aria-hidden="true"></div>' +
      '<div class="birthday-celebration__card">' +
        '<h2 id="birthdayCelebrationTitle">OWNER WEBNYA<br><span>LAGI ULTAH NIH!</span></h2>' +
        '<p>Ayo ucapin ultah ke ownernya — 12 September!</p>' +
        '<a class="birthday-celebration__close" href="https://wa.me/6289516353968?text=Selamat%20ulang%20tahun%21%20Semoga%20selalu%20sehat%20dan%20sukses." target="_blank" rel="noopener noreferrer">Ucapkan Selamat Ulang Tahun →</a>' +
      '</div>';

    var confettiContainer = celebration.querySelector(".birthday-celebration__confetti");
    var colors = ["#7c3aed", "#2ee6c8", "#ead9ff"];
    var confettiColors = colors.concat(["#d946ef"]);

    if (!reducedMotion && hasGSAP) {
      for (var index = 0; index < 44; index += 1) {
        var confetti = document.createElement("i");
        confetti.style.setProperty("--x", (Math.random() * 100) + "%");
        confetti.style.setProperty("--color", confettiColors[index % confettiColors.length]);
        confettiContainer.appendChild(confetti);
        gsap.fromTo(confetti,
          { y: "-14vh", rotate: 0, opacity: 1 },
          {
            y: "112vh",
            rotate: Math.round(Math.random() * 540 - 270),
            opacity: 0.85,
            duration: 2.6 + Math.random() * 2.2,
            delay: Math.random() * 1.4,
            repeat: -1,
            ease: "none"
          }
        );
      }
    }

    function closeCelebration() {
      celebration.classList.add("is-closing");
      if (hasGSAP) {
        gsap.to(celebration, {
          opacity: 0,
          duration: 0.4,
          onComplete: function () { celebration.remove(); }
        });
      } else {
        window.setTimeout(function () { celebration.remove(); }, 400);
      }
    }

    celebration.querySelector(".birthday-celebration__close").addEventListener("click", closeCelebration);
    document.body.appendChild(celebration);

    if (hasGSAP) {
      gsap.fromTo(celebration, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(celebration.querySelector(".birthday-celebration__card"),
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
    }

    window.setTimeout(closeCelebration, 7000);
  }

  window.setTimeout(showBirthdayCelebration, 1200);

  /* ===============================================================
     10. Crosshair glow on the photographs
     =============================================================== */
  document.querySelectorAll(".plate-figure").forEach(function (figure) {
    var glow = document.createElement("span");
    glow.className = "photo-crosshair-glow";
    glow.setAttribute("aria-hidden", "true");
    figure.appendChild(glow);

    function move(event) {
      var bounds = figure.getBoundingClientRect();
      figure.style.setProperty("--crosshair-x", (event.clientX - bounds.left) + "px");
      figure.style.setProperty("--crosshair-y", (event.clientY - bounds.top) + "px");
    }

    figure.addEventListener("pointerenter", function (event) {
      move(event);
      figure.classList.add("is-crosshair-active");
    });
    figure.addEventListener("pointermove", move);
    figure.addEventListener("pointerleave", function () {
      figure.classList.remove("is-crosshair-active");
    });
  });

  /* ===============================================================
     11. Re-measure once fonts and images have settled
     =============================================================== */
  function refresh() {
    buildAllRulings();
    if (hasScrollTrigger) ScrollTrigger.refresh();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
  window.addEventListener("load", refresh);

  /* ===============================================================
     12. Ultraviolet atmosphere — aurora drift + pointer bloom
     =============================================================== */
  if (MOTION) {
    var auroraField = document.querySelector(".aurora");
    if (auroraField) {
      auroraField.querySelectorAll("i").forEach(function (blob, index) {
        gsap.to(blob, {
          x: gsap.utils.random(-52, 52),
          y: gsap.utils.random(40, 120) * (index % 2 ? -1 : 1),
          scale: gsap.utils.random(0.92, 1.14),
          duration: gsap.utils.random(9, 15),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });
    }
  }

  if (MOTION && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
    var bloom = document.createElement("div");
    bloom.className = "cursor-glow";
    bloom.setAttribute("aria-hidden", "true");
    document.body.appendChild(bloom);

    gsap.set(bloom, { xPercent: -50, yPercent: -50, opacity: 0 });
    var bloomX = gsap.quickTo(bloom, "x", { duration: 0.45, ease: "power3.out" });
    var bloomY = gsap.quickTo(bloom, "y", { duration: 0.45, ease: "power3.out" });

    window.addEventListener("pointermove", function (event) {
      gsap.to(bloom, { opacity: 0.8, duration: 0.4, overwrite: "auto" });
      bloomX(event.clientX);
      bloomY(event.clientY);
    }, { passive: true });

    document.documentElement.addEventListener("pointerleave", function () {
      gsap.to(bloom, { opacity: 0, duration: 0.5 });
    });
  }

  /* Late-split headings that arrive after the first paint keep their entrance. */
  reduceMotionQuery.addEventListener("change", function (event) {
    if (event.matches) {
      if (hasGSAP) gsap.globalTimeline.clear();
      document.querySelectorAll("[data-split]").forEach(function (el) {
        el.dataset.splitDone = "false";
      });
    }
  });
})();
