// Auto-update footer year
(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// Subtle parallax on the floating blobs
(function () {
  var blobs = document.querySelectorAll(".blob");
  if (!blobs.length) return;

  var isTouch = window.matchMedia("(hover: none)").matches;
  if (isTouch) return; // skip on touch devices

  document.addEventListener("mousemove", function (e) {
    var x = (e.clientX / window.innerWidth - 0.5) * 2;
    var y = (e.clientY / window.innerHeight - 0.5) * 2;

    blobs.forEach(function (blob, i) {
      var depth = (i + 1) * 8;
      blob.style.transform =
        "translate(" + x * depth + "px, " + y * depth + "px)";
    });
  });
})();

// Reveal animation when card enters view
(function () {
  var reveal = document.querySelector(".reveal");
  if (!reveal) return;

  if (!("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Start paused, resume on intersect (keeps it tidy on reload)
  reveal.style.animationPlayState = "paused";
  observer.observe(reveal);

  // Fallback: if not triggered quickly, just play it
  setTimeout(function () {
    reveal.style.animationPlayState = "running";
  }, 600);
})();
