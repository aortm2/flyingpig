document.title = "소리알기"; // 제목

$(function () {
  // bgm
  var bgm = $(".bgm")[0];
  var bgm2 = $(".bgm2")[0];
  if (bgm) {
    bgm.play();
  }
  
  if (bgm2) {
    bgm2.play();
  }
  // 처음 진입 나레이션
  var intro = $(".intro")[0];
  if (intro) {
    intro.play();
    $(".container").addClass("pointer-none")
    intro.addEventListener('ended', function() {
    $(".container").removeClass("pointer-none")
    });
  }

  var activeBgm = $("#active")[0];
  if (activeBgm) {
    var file = activeBgm.src;
    
    activeBgm.onended = function() {
      $(".slider-wrap").addClass("active")
    };
    
    // BGM 재생 시작
    activeBgm.play();
  }

  var effect = $("#effect")[0];
  if (effect) {
    effect.play();
  }

  // 버튼
  var btnEffect = new Audio("./sound/effect/button.mp3");
  $(".btn-effect").on("mouseover", function () {
    btnEffect.play();
  });

  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("aria-hidden", "true");
    img.setAttribute("alt", "");
  });

  // 활동 01
  $(".btn-face").click(async function(){
    var yua3_7 = new Audio('./sound/narration/yua3_7.m4a');
    var yua3_8 = new Audio('./sound/narration/yua3_8.m4a');
    var yua3_9 = new Audio('./sound/narration/yua3_9.m4a');
    var yua3_10 = new Audio('./sound/narration/yua3_10.m4a');
    var music = new Audio('./sound/contents_01/music.mp3');
    var star = new Audio('./sound/contents_01/star.wav');
    $(this).addClass("active")
    
    function playAudio(audio) {
      return new Promise((resolve) => {
          audio.play();
          audio.addEventListener('ended', resolve);
      });
    }

    try {
      await playAudio(yua3_7);

      $(".face").addClass("active");
      await playAudio(music);
      $(".face").removeClass("active");

      await playAudio(yua3_8);
      $(".face").addClass("active");
      await playAudio(music);
      $(".face").removeClass("active");

      await playAudio(yua3_9);

      // 별시작
      await playAudio(yua3_8);
      $(".face").addClass("active");
      await playAudio(music);
      $(".face").removeClass("active");
      $(".star").addClass("active1");
      await playAudio(star);

      // 별 둘
      await playAudio(yua3_8);
      $(".face").addClass("active");
      await playAudio(music);
      $(".face").removeClass("active");
      $(".star").removeClass("active1");
      $(".star").addClass("active2");
      await playAudio(star);

       // 별 셋
       await playAudio(yua3_8);
       $(".face").addClass("active");
       await playAudio(music);
       $(".face").removeClass("active");
       $(".star").removeClass("active2");
       $(".star").addClass("active3");
       await playAudio(star);
       await playAudio(yua3_10);
       $(".star").removeClass("active3");

      //  완료 이후
       $(this).addClass("end")
       $(".star").removeClass("active3");
       $(".btn-hand").removeClass("ponter-none")
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  });

  $(".btn-hand").click(async function(){
    var yua3_11 = new Audio('./sound/narration/yua3_11.m4a');
    var yua3_12 = new Audio('./sound/narration/yua3_12.m4a');
    var yua3_13 = new Audio('./sound/narration/yua3_13.m4a');
    var yua3_14 = new Audio('./sound/narration/yua3_14.m4a');
    var music = new Audio('./sound/contents_01/music.mp3');
    var star = new Audio('./sound/contents_01/star.wav');
    $(this).addClass("active")
    
    function playAudio(audio) {
      return new Promise((resolve) => {
          audio.play();
          audio.addEventListener('ended', resolve);
      });
    }

    try {
      await playAudio(yua3_11);

      $(".hand").addClass("active");
      await playAudio(music);
      $(".hand").removeClass("active");

      await playAudio(yua3_12);
      $(".hand").addClass("active");
      await playAudio(music);
      $(".hand").removeClass("active");

      await playAudio(yua3_13);

      // 별시작
      await playAudio(yua3_12);
      $(".hand").addClass("active");
      await playAudio(music);
      $(".hand").removeClass("active");
      $(".star").addClass("active1");
      await playAudio(star);

      // 별 둘
      await playAudio(yua3_12);
      $(".hand").addClass("active");
      await playAudio(music);
      $(".hand").removeClass("active");
      $(".star").removeClass("active1");
      $(".star").addClass("active2");
      await playAudio(star);

       // 별 셋
       await playAudio(yua3_12);
       $(".hand").addClass("active");
       await playAudio(music);
       $(".hand").removeClass("active");
       $(".star").removeClass("active2");
       $(".star").addClass("active3");
       await playAudio(star);
       await playAudio(yua3_14);

       //  완료 이후
       $(this).addClass("end");
       finish();
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  });
  var congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 효과음

  function finish() {
    $(".finish").fadeIn();
    var audio = new Audio('./sound/narration/yua3_15.m4a');
    audio.play();
    congratsAudio.play();
  }

});
