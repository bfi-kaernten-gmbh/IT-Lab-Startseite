window.addEventListener('load', function(){
var tryout = anime({
  targets: '.segmenter__pieceWrap',
  scale: '1.05',
  delay: 200,
  duration: 1000,
  loop: false,
  direction: 'alternate',
  elasticity: 600,
  easing: 'linear'
});
var tryout2 = anime({
  targets: '.segmenter__shadow',
  opacity: 1,
  delay: 200,
  duration: 1000,
  loop: false,
  direction: 'alternate',
  elasticity: 600,
  easing: 'easeInCubic'
});
});

$(".palette div").click(function() {
  var current = $(this);
  $(this).addClass("gotCode");
  $(this).addClass("styleAfter");
    setTimeout(function(){
      current.removeClass("gotCode");
    }, 200);
    setTimeout(function () {
      current.removeClass("styleAfter");
    }, 1000);
});
/*
$(".link").hover(function(){
  var aaaa = anime({
    targets: '.link',
    rotateZ: '360deg',
    duration: 300,
    loop: true,
    easing: 'linear'
  });
});*/
