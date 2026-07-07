$(document).ready(function () {
  const bgMusic = document.getElementById("bgMusic");
  const flipSound = document.getElementById("flipSound");

  function startMusic() {
    if (bgMusic) {
      bgMusic.play().then(() => {
        $("#musicBtn").fadeOut();
      }).catch(() => {});
    }

    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  }

  document.addEventListener("click", startMusic);
  document.addEventListener("touchstart", startMusic);

  function resizeFlipbook() {
    let width = Math.min(window.innerWidth * 0.9, 430);
    let height = width * 16 / 9;

    if (height > window.innerHeight * 0.9) {
      height = window.innerHeight * 0.9;
      width = height * 9 / 16;
    }

    $("#flipbook").turn("size", width, height);
  }

  $("#flipbook").turn({
    width: 430,
    height: 765,
    autoCenter: true,
    display: "single",
    gradients: true,
    acceleration: true,
    elevation: 50,
    duration: 900,
    when: {
      turning: function () {
        playFlipSound();
      },
      turned: function (event, page) {
        if (page > 1) {
          $("#swipeHint").fadeOut();
        }
      }
    }
  });

  resizeFlipbook();

  $(window).resize(function () {
    resizeFlipbook();
  });

  $("#flipbook").click(function (e) {
    let offset = $(this).offset();
    let x = e.pageX - offset.left;
    let width = $(this).width();

    if (x > width / 2) {
      $("#flipbook").turn("next");
    } else {
      $("#flipbook").turn("previous");
    }
  });

  let startX = 0;

  $("#flipbook").on("touchstart", function (e) {
    startX = e.originalEvent.touches[0].clientX;
  });

  $("#flipbook").on("touchend", function (e) {
    let endX = e.originalEvent.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        $("#flipbook").turn("next");
      } else {
        $("#flipbook").turn("previous");
      }
    }
  });

  function playFlipSound() {
    if (flipSound) {
      flipSound.currentTime = 0;
      flipSound.play().catch(() => {});
    }
  }

  $("#musicBtn").click(function (e) {
    e.stopPropagation();

    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      $("#musicBtn").text("Pause Music");
    } else {
      bgMusic.pause();
      $("#musicBtn").text("Play Music");
    }
  });

  $("#shareBtn").click(function (e) {
    e.stopPropagation();

    if (navigator.share) {
      navigator.share({
        title: "Ashwin & Ayushi Wedding Reception",
        text: "You are invited to the wedding reception of Ashwin & Ayushi.",
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied!");
    }
  });

  setTimeout(function () {
    $("#loader").fadeOut();
  }, 1200);
});