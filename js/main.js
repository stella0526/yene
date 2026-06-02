const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".gnb a");
const navSubmenuItems = document.querySelectorAll(".gnb li.has-submenu");
const mobileMenuQuery = window.matchMedia("(max-width: 760px)");

if (menuToggle) {
  const menuToggleIcon = menuToggle.querySelector(".material-symbols-rounded");

  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("is-menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    if (menuToggleIcon) {
      menuToggleIcon.textContent = isOpen ? "close" : "menu";
    }
    if (!isOpen) {
      navSubmenuItems.forEach((item) => {
        item.classList.remove("is-submenu-open");
        item.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
      });
    }
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const submenuItem = link.closest(".has-submenu");

    if (submenuItem && link.parentElement === submenuItem) {
      event.preventDefault();

      navSubmenuItems.forEach((item) => {
        if (item !== submenuItem) {
          item.classList.remove("is-submenu-open");
          item.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
        }
      });

      const isOpen = submenuItem.classList.toggle("is-submenu-open");
      link.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    body.classList.remove("is-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.querySelector(".material-symbols-rounded")?.replaceChildren(document.createTextNode("menu"));
    navSubmenuItems.forEach((item) => {
      item.classList.remove("is-submenu-open");
      item.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
    });
    menuToggle?.setAttribute("aria-label", "메뉴 열기");
  });
});

// 데스크탑에서 서브메뉴 외부 클릭 시 닫기
document.addEventListener("click", (event) => {
  if (!mobileMenuQuery.matches && !event.target.closest(".has-submenu")) {
    navSubmenuItems.forEach((item) => {
      item.classList.remove("is-submenu-open");
      item.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
    });
  }
});

navSubmenuItems.forEach((item) => {
  item.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
});

/* ── Hero Swiper + Video 제어 ── */
function playHeroVideo(swiper) {
  // 모든 슬라이드 영상 일시정지 (복제 슬라이드 포함)
  swiper.el.querySelectorAll(".hero-media").forEach((v) => {
    v.pause();
    v.currentTime = 0;
  });
  // 현재 활성 슬라이드 영상 재생
  const active = swiper.slides[swiper.activeIndex];
  if (active) {
    const vid = active.querySelector(".hero-media");
    if (vid) vid.play().catch(() => {});
  }
}

if (window.Swiper) {
  const heroSwiper = new Swiper(".hero-swiper", {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".hero .swiper-pagination",
      clickable: true
    },
    navigation: {
      prevEl: ".hero-prev",
      nextEl: ".hero-next"
    },
    on: {
      init: function () {
        playHeroVideo(this);
      },
      slideChangeTransitionStart: function () {
        playHeroVideo(this);
      }
    }
  });
}

const caseSection = document.querySelector(".case-section");

if (caseSection) {
  const caseThumbWrap = caseSection.querySelector(".case-thumbs");
  const caseTrack = caseSection.querySelector(".case-track");
  const caseProgress = caseSection.querySelector(".case-progress span");
  const caseBaseCount = caseTrack?.querySelectorAll("[data-case-source='main']").length || 0;
  let caseItems = [];
  let caseThumbItems = [];
  let activeCaseIndex = 0;
  let caseRollingTimer;
  let caseResetTimer;

  const normalizeCaseItem = (item, index) => {
    if (!item) return null;
    const src = typeof item === "string" ? item : item.src || item.image || item.thumbnail || "";
    if (!src) return null;

    return {
      index: typeof item === "string" || !Number.isFinite(item.index) ? index : item.index,
      src,
      alt: typeof item === "string" ? `시공 사례 ${index + 1}` : item.alt || item.title || `시공 사례 ${index + 1}`
    };
  };

  const getThumbItems = () =>
    Array.from(caseSection.querySelectorAll(".case-thumb")).map((thumb, index) => {
      const image = thumb.querySelector("img");
      return normalizeCaseItem(
        {
          index,
          src: image?.getAttribute("src") || "",
          alt: image?.getAttribute("alt") || thumb.getAttribute("aria-label") || ""
        },
        index
      );
    }).filter(Boolean);

  const getBaseItems = () =>
    caseTrack
      ? Array.from(caseTrack.querySelectorAll("[data-case-source='main'] img")).map((image, index) =>
          normalizeCaseItem(
            {
              index: index - caseBaseCount,
              src: image.getAttribute("src") || "",
              alt: image.getAttribute("alt") || ""
            },
            index
          )
        ).filter(Boolean)
      : [];
  const initialCaseBaseItems = getBaseItems();

  const createCaseSlide = (item, isLarge = false) => {
    const slide = document.createElement("figure");
    const image = document.createElement("img");

    slide.className = `case-slide${isLarge ? " case-slide-large" : ""}`;
    image.src = item.src;
    image.alt = item.alt;
    image.loading = "lazy";
    slide.append(image);

    return slide;
  };

  const renderCaseTrack = (items) => {
    if (!caseTrack || !items.length) return;

    caseTrack.replaceChildren();
    items.forEach((item, index) => {
      caseTrack.append(createCaseSlide(item, index === 0));
    });
    items.forEach((item, index) => {
      caseTrack.append(createCaseSlide(item, index === 0));
    });
  };

  const resetCaseTrack = () => {
    if (!caseTrack || activeCaseIndex < caseItems.length) return;

    activeCaseIndex %= caseItems.length;
    const activeSlide = caseTrack.children[activeCaseIndex];
    if (!activeSlide) return;

    caseTrack.style.transition = "none";
    caseTrack.style.transform = `translateX(${-activeSlide.offsetLeft}px)`;

    window.requestAnimationFrame(() => {
      caseTrack.style.transition = "";
    });
  };

  const updateCaseVisual = (index) => {
    if (!caseTrack || !caseItems.length) return;

    activeCaseIndex = Math.max(0, index);
    const activeItem = caseItems[activeCaseIndex % caseItems.length];
    const activeThumbIndex = Math.max(0, activeItem.index);
    const activeSlide = caseTrack.children[activeCaseIndex];

    if (activeSlide) {
      window.clearTimeout(caseResetTimer);
      caseTrack.style.transform = `translateX(${-activeSlide.offsetLeft}px)`;
      caseResetTimer = window.setTimeout(resetCaseTrack, 820);
    }

    caseSection.querySelectorAll(".case-thumb").forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === activeThumbIndex;
      thumb.classList.toggle("is-active", isActive);
      thumb.toggleAttribute("aria-current", isActive);
    });

    if (caseProgress && caseThumbItems.length) {
      const progressTotal = Math.max(caseThumbItems.length, caseItems.filter((item) => item.index >= 0).length, 1);
      const progressIndex = Math.min(activeThumbIndex + 1, progressTotal);
      caseProgress.style.width = `${(progressIndex / progressTotal) * 100}%`;
    }
  };

  const startCaseRolling = () => {
    if (!caseTrack || caseItems.length < 2) return;

    window.clearInterval(caseRollingTimer);
    caseRollingTimer = window.setInterval(() => {
      updateCaseVisual(activeCaseIndex + 1);
    }, 3200);
  };

  const setCaseItems = (items) => {
    window.clearInterval(caseRollingTimer);
    window.clearTimeout(caseResetTimer);

    caseThumbItems = getThumbItems();
    caseItems = (items || [...initialCaseBaseItems, ...caseThumbItems]).map(normalizeCaseItem).filter(Boolean);
    activeCaseIndex = 0;

    renderCaseTrack(caseItems);
    updateCaseVisual(activeCaseIndex);
    startCaseRolling();
  };

  caseThumbWrap?.addEventListener("click", (event) => {
    const thumb = event.target.closest(".case-thumb");
    if (!thumb) return;

    const thumbIndex = Number(thumb.dataset.case || 0);
    const targetIndex = caseItems.findIndex((item) => item.index === thumbIndex);
    updateCaseVisual(targetIndex >= 0 ? targetIndex : thumbIndex + caseBaseCount);
    startCaseRolling();
  });

  window.YeneCaseGallery = {
    refresh: () => setCaseItems(),
    setItems: setCaseItems,
    goTo: updateCaseVisual,
    start: startCaseRolling,
    stop: () => window.clearInterval(caseRollingTimer)
  };

  setCaseItems();
}
