document.title = "장단익히기"; // 제목

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
  // var intro = $(".intro")[0];
  // if (intro) {
  //   intro.play();
  //   $(".container").addClass("pointer-none")
  //   intro.addEventListener('ended', function() {
  //   $(".container").removeClass("pointer-none")
  //   });
  // }

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
  $(".quiz-wrap > div").on("click", function () {
    $(this).parent().addClass("pointer-none");
    var $currentQuiz = $(this).closest(".quiz-wrap");
    var isCorrect = $(this).data("correct") === "yes";

    // img-answer에 yes 또는 no 클래스 추가
    if (isCorrect) {
      $(".img-answer").addClass("yes");
    } else {
      $(".img-answer").addClass("no");
    }

    // 2초 후 다음 퀴즈로 이동
    setTimeout(function () {
      // img-answer에서 yes, no 클래스 제거
      $(".img-answer").removeClass("yes no");

      // 현재 quiz-wrap에 complete 클래스 추가
      $currentQuiz.addClass("complete");

      // 다음 quiz-wrap에 active 클래스 추가
      var $nextQuiz = $currentQuiz.next(".quiz-wrap");
      if ($nextQuiz.length > 0) {
        $currentQuiz.removeClass("active");
        $nextQuiz.addClass("active");
      }
    }, 2000);
    const audioName = $(this).data("audio");
    const audioSrc = new Audio(`./sound/narration/${audioName}.mp3`);
    audioSrc.play();
  });

  $(".quiz-wrap > div").on("mouseover", function () {
    const audioName = $(this).data("audio");
    const audioSrc = new Audio(`./sound/narration/${audioName}.mp3`);
    audioSrc.paused();
    audioSrc.play();
  });


  const congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 효과음

  function finish() {
    $(".finish").fadeIn();
    var audio = new Audio('./sound/narration/yua3_15.m4a');
    audio.play();
    congratsAudio.play();
  }

  // 활동2
  const audio = $('#audio')[0];
  const intro = $(".intro")[0];
  
  const verses = [
    { start: 6760, end: 7310, name: "deong", spanIndex: 0 },
    { start: 7310, end: 7680, name: "duck", spanIndex: 1 },
    { start: 7680, end: 8340, name: "kung", spanIndex: 2 },
    { start: 8340, end: 8980, name: "kung", spanIndex: 3 },
    { start: 8980, end: 9330, name: "duck", spanIndex: 4 },
    { start: 9330, end: 9970, name: "kung", spanIndex: 5 },
    { start: 9970, end: 10570, name: "deong", spanIndex: 6 },
    { start: 10570, end: 10930, name: "duck", spanIndex: 7 },
    { start: 10930, end: 11640, name: "kung", spanIndex: 8 },
    { start: 11640, end: 12300, name: "kung", spanIndex: 9 },
    { start: 12300, end: 12670, name: "duck", spanIndex: 10 },
    { start: 12670, end: 13350, name: "kung", spanIndex: 11 },
    { start: 13350, end: 13940, name: "deong", spanIndex: 12 },
    { start: 13940, end: 14340, name: "duck", spanIndex: 13 },
    { start: 14340, end: 15000, name: "kung", spanIndex: 14 },
    { start: 15000, end: 15610, name: "kung", spanIndex: 15 },
    { start: 15610, end: 16010, name: "duck", spanIndex: 16 },
    { start: 16010, end: 16760, name: "deong", spanIndex: 17 },
    { start: 16760, end: 17370, name: "duck", spanIndex: 18 },
    { start: 17370, end: 17750, name: "kung", spanIndex: 19 },
    { start: 17750, end: 18400, name: "kung", spanIndex: 20 },
    { start: 18400, end: 19040, name: "duck", spanIndex: 21 },
    { start: 19040, end: 19400, name: "kung", spanIndex: 22 },
    { start: 19400, end: 20050, name: "deong", spanIndex: 23 },
    { start: 20050, end: 20690, name: "duck", spanIndex: 24 },
    { start: 20690, end: 21060, name: "kung", spanIndex: 25 },
    { start: 21060, end: 21720, name: "kung", spanIndex: 26 },
    { start: 21720, end: 22330, name: "duck", spanIndex: 27 },
    { start: 22330, end: 22690, name: "kung", spanIndex: 28 },
    { start: 22690, end: 23410, name: "deong", spanIndex: 29 },
    { start: 23410, end: 23980, name: "duck", spanIndex: 30 },
    { start: 23980, end: 24400, name: "kung", spanIndex: 31 },
    { start: 24400, end: 25020, name: "kung", spanIndex: 32 },
    { start: 25020, end: 25680, name: "duck", spanIndex: 33 },
    { start: 25680, end: 26600, name: "kung", spanIndex: 34 },
    { start: 26600, end: 26660, name: "deong", spanIndex: 35 },
  ];
  
  if (intro) {
    intro.play();
    $(".container").addClass("pointer-none");
  
    intro.addEventListener('ended', function () {
      $(".container").removeClass("pointer-none");
      audio.play();
      console.log("Intro ended, main audio started.");
  
      const updateButtons = setInterval(() => {
        // 오디오가 중지되면 이벤트 종료
        if (audio.paused) {
          clearInterval(updateButtons);
          console.log("끝");
          return;
        }
  
        const currentTime = audio.currentTime * 1000;
  
        $('.btn button').removeClass('active');
        $('.lyrics span').removeClass('active'); 
  
        // 현재 verse 처리
        verses.forEach(({ start, end, name, spanIndex }) => {
          if (currentTime >= start && currentTime < end) {
            // 현재 구간에 맞는 버튼에 active 클래스 추가
            $(`.btn button[data-name="${name}"]`).addClass('active');
            $(`.lyrics span[spanIndex="${spanIndex}"]`).addClass('active');
            console.log(`Active: ${name}, spanIndex: ${spanIndex}`);
          }
        });

        if(currentTime > 16760){
          $(".lyrics span[data-verse='1']").hide()
          $(".lyrics span[data-verse='2']").css("display","inline-block")
        }
  
        // 모든 구간이 끝나면 정지
        if (currentTime >= verses[verses.length - 1].end) {

          $(".container").removeClass("pointer-none");
          console.log("end");
          clearInterval(updateButtons);
          setTimeout(finish2(), 2000)
        }
      }, 50);
    });
  }

  function finish2() {
    $(".finish").fadeIn();
    var audio = new Audio('./sound/narration/yua3_21.m4a');
    audio.play();
    congratsAudio.play();
  }


  let currentAudio = null; // 현재 재생 중인 오디오

  // 버튼 클릭 이벤트
  $('.btn button').on('click', function() {
    const soundName = $(this).data('name'); // 버튼의 data-name 속성 값
    const audioSrc = `./sound/contents_02/${soundName}.mp3`; // mp3 파일 경로

    // 이전 오디오가 있으면 중지하고 제거
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.remove();
    }


    currentAudio = new Audio(audioSrc);
    currentAudio.play();

    console.log(`Playing sound: ${audioSrc}`);
  });
});
