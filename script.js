$(document).ready(function () {

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
    let sound = document.getElementById("flipSound");
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }

  $("#musicBtn").click(function () {
    let music = document.getElementById("bgMusic");

    if (music.paused) {
      music.play();
      $("#musicBtn").text("Pause Music");
    } else {
      music.pause();
      $("#musicBtn").text("Play Music");
    }
  });

});