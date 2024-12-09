document.title = "장단익히기"; // 제목

$(function () {
  // 모바일 세로 팝업 삽입
  $(".container").append("<div class='mobile-pop'><p>모바일 가로모드로 변경해 주세요.</p></div>")
  const winWidth = window.innerWidth

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

  //  셀렉트
  if (winWidth > 1420) {
    $(".btn-select").on("mouseover", function () {
      var btnIdx = $(".btn-select").index(this);
  
      $(".audio_wrap audio").each(function () {
        this.pause();
        this.currentTime = 0;
      });
  
      $(".audio_wrap audio").eq(btnIdx)[0].play();
    });
  } else{
    let touchNum = 0;
    let currentIdx = -1; // 현재 클릭된 버튼의 인덱스를 추적
    
    $(".btn-select").on("click", function (event) {
      event.preventDefault();
      var btnIdx = $(".btn-select").index(this);

      // 클릭한 버튼이 이전 버튼과 다르면 touchNum을 초기화
      if (btnIdx !== currentIdx) {
        touchNum = 0;
      }
    
      // 새로운 인덱스를 현재 인덱스로 설정
      currentIdx = btnIdx;
    
      $(".audio_wrap audio").each(function () {
        this.pause();
        this.currentTime = 0;
      });
    
      $(".audio_wrap audio").eq(btnIdx)[0].play();
    
      if (touchNum === 1) {
        touchNum++;
        const link = $(this).attr("href");
        window.location = link;
      }
    
      touchNum++;
    });
  }

  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("aria-hidden", "true");
    img.setAttribute("alt", "");
  });

  // 활동 01
  $(".btn-face").click(async function(){
    var yua3_7 = new Audio('./sound/narration/yua3_7.mp3');
    var yua3_8 = new Audio('./sound/narration/yua3_8.mp3');
    var yua3_9 = new Audio('./sound/narration/yua3_9.mp3');
    var yua3_10 = new Audio('./sound/narration/yua3_10.mp3');
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
    var yua3_8 = new Audio('./sound/narration/yua3_8.mp3');
    var yua3_11 = new Audio('./sound/narration/yua3_11.mp3');
    var yua3_12 = new Audio('./sound/narration/yua3_12.m4a');
    var yua3_13 = new Audio('./sound/narration/yua3_13.mp3');
    var yua3_14 = new Audio('./sound/narration/yua3_14.mp3');
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
      

      await playAudio(yua3_8);
      $(".hand").addClass("active");
      await playAudio(music);
      $(".hand").removeClass("active");

      await playAudio(yua3_13);

      // 별시작
      await playAudio(yua3_8);
      $(".hand").addClass("active");
      await playAudio(music);
      $(".hand").removeClass("active");
      $(".star").addClass("active1");
      await playAudio(star);

      // 별 둘
      await playAudio(yua3_8);
      $(".hand").addClass("active");
      await playAudio(music);
      $(".hand").removeClass("active");
      $(".star").removeClass("active1");
      $(".star").addClass("active2");
      await playAudio(star);

       // 별 셋
       await playAudio(yua3_8);
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
  const congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 효과음

  function finish() {
    $(".finish").fadeIn();
    const finishAudio = new Audio('./sound/narration/yua3_15.mp3');
    congratsAudio.play();
    congratsAudio.addEventListener("ended", function () {
      finishAudio.play();
    });

    finishAudio.addEventListener("ended", function () {
      $(".btn-wrap").css("display","flex")
    });
  }

  // 활동2
  const audio = $('#audio')[0];
  const intro = $(".intro")[0];
  
  const verses = [
    { start: 7000, end: 7190, name: "deong"},
    { start: 7190, end: 8000, name: "duck"},
    { start: 8000, end: 8160, name: "kung"},
    { start: 8160, end: 9040, name: "kung"},
    { start: 9040, end: 9190, name: "duck"},
    { start: 9190, end: 1009, name: "kung"},

    { start: 10090, end: 10280, name: "deong"},
    { start: 10820, end: 11090, name: "duck"},
    { start: 11090, end: 11290, name: "kung"},
    { start: 11290, end: 12150, name: "kung"},
    { start: 12150, end: 12280, name: "duck"},
    { start: 12280, end: 13180, name: "kung"},

    { start: 13180, end: 14090, name: "deong",},
    { start: 14090, end: 14190, name: "duck",},
    { start: 14190, end: 15100, name: "kung",},
    { start: 15100, end: 15290, name: "kung",},
    { start: 15290, end: 16090, name: "duck",},
    { start: 16090, end: 16260, name: "deong",},

    { start: 16260, end: 17180, name: "duck",},
    { start: 17180, end: 17280, name: "kung",},
    { start: 17280, end: 18180, name: "kung",},
    { start: 18180, end: 19060, name: "duck",},
    { start: 19060, end: 19160, name: "kung",},
    { start: 19160, end: 20070, name: "deong",},

    { start: 20070, end: 20260, name: "duck",},
    { start: 20260, end: 21080, name: "kung",},
    { start: 21080, end: 21270, name: "kung",},
    { start: 21270, end: 22160, name: "duck",},
    { start: 22160, end: 22290, name: "kung",},
    { start: 22290, end: 23150, name: "deong",},

    { start: 23150, end: 24070, name: "duck",},
    { start: 24070, end: 24180, name: "kung",},
    { start: 24180, end: 24280, name: "kung",},
    { start: 24280, end: 25280, name: "duck",},
    { start: 25280, end: 26090, name: "kung",},
    { start: 26090, end: 26270, name: "deong",},
  ];

  const audioFiles = {
    deong: './sound/contents_02/deong.mp3',
    duck: './sound/contents_02/duck.mp3',
    kung: './sound/contents_02/kung.mp3'
  };
  
  const lyricsTimestamps = [
    { start: 0, end: 10090 },
    { start: 10090, end: 13180 },
    { start: 13180, end: 16260 },
    { start: 16260, end: 20070 },
    { start: 20070, end: 23150 },
    { start: 23150, end: Infinity },
  ];

  $(".btn-rendition").click(function () {
    const currentTime = audio.currentTime * 1000; // 현재 오디오의 시간 (초 -> 밀리초)
    
    // currentTime에 해당하는 verse를 찾아서 해당하는 name을 추출
    const currentVerse = verses.find(verse => currentTime >= verse.start && currentTime < verse.end);
    
    if (currentVerse) {
      const { name } = currentVerse; // name을 추출
      console.log(`현재 verse: ${name} (시간: ${currentTime}ms)`);
  
      // name에 해당하는 오디오 파일을 audioFiles에서 찾아서 재생
      const audioFile = audioFiles[name];
  
      if (audioFile) {
        const audioClip = new Audio(audioFile); // 해당 오디오 파일 객체 생성
        audioClip.play(); // 오디오 재생
        console.log(`Reproducing audio for ${name}`);
      } else {
        console.log(`오디오 파일을 찾을 수 없습니다: ${name}`);
      }
    } else {
      console.log("현재 시간에 맞는 verse를 찾을 수 없습니다.");
    }
  });
  
  if (intro) {
    intro.play();
    $(".container").addClass("pointer-none");
  
    intro.addEventListener('ended', function () {
      $(".container").removeClass("pointer-none");
      audio.play();
      console.log("Intro ended, main audio started.");
  
      const updateLyricsAndButtons = setInterval(() => {
        // 오디오가 중지되면 이벤트 종료
        if (audio.paused) {
          clearInterval(updateLyricsAndButtons);
          console.log("끝");
          return;
        }
  
        const currentTime = audio.currentTime * 1000; // 초를 밀리초로 변환
  
        // `lyrics-wrap` 전환 로직
        $(".lyrics-wrap").each((index, element) => {
          const { start, end } = lyricsTimestamps[index];
          if (currentTime >= start && currentTime < end) {
            $(element).css("display", "block");
          } else {
            $(element).css("display", "none");
          }
        });
  
        $(".lyrics-wrap > div").each((index, element) => {
          const start = $(element).data('start'); // data-start 값을 가져옴
          const end = $(element).data('end'); // data-end 값을 가져옴
  
          // 현재 재생 시간이 start와 end 사이에 있으면 active 클래스 추가
          if (currentTime >= start && currentTime < end) {
            $(element).addClass('active');
          } else {
            $(element).removeClass('active');
          }
        });
  
        const currentVerse = verses.find(verse => currentTime >= verse.start && currentTime < verse.end);
    
        if (currentVerse) {
          const { name } = currentVerse;
          console.log(`현재 verse: ${name} (시간: ${currentTime}ms)`);

          $(".chat").each(function () {
            const chatName = $(this).data("name"); // data-name 값을 가져옴
            const namesArray = chatName.split(" | "); // '|'를 기준으로 나눔

            // verse.name과 일치하는 chat 요소에 active 클래스 추가/제거
            if (namesArray.includes(name)) {
              $(this).addClass('active'); // active 클래스 추가
            } else {
              $(this).removeClass('active'); // active 클래스 제거
            }
          });
        }

        // 마지막 구간 종료 처리
        if (currentTime >= verses[verses.length - 1].end) {
          $(".container").removeClass("pointer-none");
          console.log("end");
          clearInterval(updateLyricsAndButtons);
          setTimeout(finish2(), 2000);
        }
      }, 50); // 50ms마다 실행
    });
  }

  function finish2() {
    $(".finish").fadeIn();
    const finishAudio = new Audio('./sound/narration/yua3_19.mp3');
    congratsAudio.play();
    congratsAudio.addEventListener("ended", function () {
      finishAudio.play();
    });
    finishAudio.addEventListener("ended", function () {
      $(".btn-wrap").css("display","flex")
    });
  }

});
