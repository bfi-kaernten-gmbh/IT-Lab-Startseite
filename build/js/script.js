function mobileCheck(n) { return window.innerWidth <= n };
console.log(mobileCheck(900));

var scheduleStatus = true;
var scheduleHeight = null;

$(document).on('click', '.close_schedule, .mini', animateSchedule);
function animateSchedule() {
  var schedule = $('#schedule');
  scheduleHeight === null ? scheduleHeight = schedule.height() : console.log(emojies[Math.floor(Math.random()*10)]);;

  var scheduleAnim = getScheduleDimensions();

  schedule.stop().animate(scheduleAnim, 300);
  schedule.toggleClass('mini');
  scheduleStatus = !scheduleStatus;
  setTimeout(function () {
    slider.slick('slickGoTo', 0);
    $('.schedule').each(function () {
      $(this).slick('slickGoTo', 0);
    })
  }, 100);
}

function getScheduleDimensions() {
  return {
    height: scheduleStatus ? '120px' : scheduleHeight,
    width: scheduleStatus ? '180px' : mobileCheck(740) ? (window.innerWidth - 12)+'px' : '740px',
  };
}

var slider = $('#schedule_weeks');
// loader
window.addEventListener('load', function() {
    setTimeout(function () {
      $('.mainLoader').css({'visibility': 'hidden', 'opacity' : '0'});
      console.log('type: "emojies" to get an array of the emojies used!');
    }, 500);
    setTimeout(function () {
      console.log('slick');
      slider.slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<i class="slick-prev slick-arrow fa fa-arrow-circle-left" aria-hidden="true"></i>',
        nextArrow: '<i class="slick-next slick-arrow fa fa-arrow-circle-right" aria-hidden="true"></i>',
      });

      setTimeout(function () {
        mobileStuff();
        animateSchedule();
      }, 300);
    }, 100);
});

function mobileStuff() {
  // set height of last row of .sub_container
  setGridRows()
  // init vertical slider if mobile

  if(mobileCheck(740)) {
    $('.schedule').each(function () {
      $(this).slick({
        arrows: false,
        infinite: true,
        verticalSwiping: true,
        vertical: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      })
    })
  }
}

function setGridRows() {
  var paginationLastRow = $('#pag_trainer').height() + 'px';
  paginationLastRow = mobileCheck(740) ? paginationLastRow : 'auto';
  console.log(paginationLastRow);
  var styleTag = $('<style>#schedule .sub_container { grid-template-rows: 30px 50px 35px 100px '+ paginationLastRow +'; }</style>')
  $('html > head').append(styleTag);
}


$(window).resize(function() {
  clearTimeout(timeout);
  var timeout = setTimeout(() => {
    slider.slick('slickGoTo', 0);
    if(mobileCheck(740)) {
      $('.schedule').each(function () {
        $(this).slick('slickGoTo', 0);
      })
    }
    // mobileStuff();
  }, 100);
});

$(document).ready(function(){

// Clock Funktion
updateClock()
analogClock()
dayTime();

setInterval(function(){
  updateClock();
  analogClock();
}, 1000);
setInterval(function() {
    dayTime();
}, 60000);


function analogClock() {
  function r(el, deg) {
    el.setAttribute('transform', 'rotate('+ deg +' 50 50)')
  }
  var d = new Date()
  r(sec, 6*d.getSeconds())
  r(min, 6*d.getMinutes())
  r(hour, 30*(d.getHours()%12) + d.getMinutes()/2)
}
function updateClock() {
  var t = new Date();
  var tMin = t.getMinutes();
  var tHour = t.getHours();

  currentMinutes = ( tMin < 10 ? "0" : "" ) + tMin;
  currentHours = ( tHour < 10 ? "0" : "" ) + tHour;

  var currentTimeString = currentHours + ":" + currentMinutes;

  document.getElementById('clockText').innerHTML = currentTimeString;
}



//Grußformel
function dayTime() {
  var random = Math.floor(Math.random() * 5);
  var smiles = ["｡◕‿‿◕｡", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧*:･ﾟ✧", "(┛◉Д◉)┛", "ლ(ಠ益ಠლ)", "<(◣,..,◢)>"];
  var t = new Date();
  var tMin = t.getMinutes();
  var tHour = t.getHours();

  var curTime = tHour + (tMin/100);
  var greeting;

  if (curTime >=5 && curTime < 11) {
    greeting = "Good Morning </br><span class='smile'>(´～`)</span>";
  }
  else if (curTime >=11 && curTime < 16.3) {
    greeting = "Hi there </br><span class='smile'>"+ smiles[random] +"</span>";
  }
  else if (curTime >=16.3 && curTime < 22) {
    greeting = "It's Beer o'clock </br><span class='smile'>(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧*:･ﾟ✧</span>";
  }
  else if (curTime >=22 && curTime < 23.6 || curTime >= 0 && curTime < 5) {
    greeting = "why are you even here?? go to bed! </br><span class='smile'>(。-ω-)zzz</span>"
  }
  $(".greeting").html(greeting);
}
// Clock ende

//searchBar
var searchBar = $(".searchBar input")
searchBar.focus(function(){
  $(this).attr("value", "");
  searchBar.select();
});
searchBar.focusout(function() {
  $(this).attr("value", "Google Suche");
});

// iframe shit
function linkFunctions() {
  if(mobileCheck(900)) {
    enableTargetBlank();
    return false;
  }
  var link = $(".aLink");
  var wurkPls = 0;
  link.click(function(e){
    var dataLink = $(this).data("link");
    var curLink = $(this).attr('href');
    $(".iframe iframe").on('load', function() {
      if (wurkPls == 0) {
        $(".loader").css({"visibility": "Hidden", "opacity": "0"});
        wurkPls = 1;
      }
    });

    if (dataLink !== "noIframe") {
      e.preventDefault();
      setTimeout(function(){
        $(".iframe iframe").attr("src", curLink);
      }, 700);
      $(".iframe").css("top", "-100%")
      $(".animationWrapper").css("top", "-100%");
    }
  });


  // CLOSE IFRAME BUTTON
  var floatButton = $(".floatingButton");

  floatButton.click(function(){
    setTimeout(function(){
      $(".iframe iframe").attr("src", "");
      $(".loader").css({"visibility": "visible", "opacity": "1"});
      setTimeout(function(){
          wurkPls = 0;
      }, 100);
    }, 700);

    $(".iframe").css("top", "0")
    $(".animationWrapper").css("top", "0");
  });
};
linkFunctions();

function enableTargetBlank() {
  $('.aLink').each(function () {
    $(this).attr('target', '_blank');
  })
}
/** login errorhandling
var error = $(".errormessage").length;
if (error > 0){
  $(".login-modal").css({"visibility": "visible", "opacity": "1"});
  $(".signup").toggleClass("visible");
  $(".login").toggleClass("visible");
  $(".login-content h1").toggleClass("visible");
}
 **/
var s = 0;
$(".secret").click(function(){
  if (s == 0) {
    $(".palette").css("top","0");
    $(this).css({'top': '40px', 'transform':'rotateX(180deg)'});
    s = 1;
  }else if(s == 1) {
    $(".palette").css("top","-80px");
    $(this).css({'top': '4px', 'transform':'rotateY(0)'});
    s = 0;
  }
});
});


var emojies = ['(ꐦ ಠ皿ಠ )', '(╬⓪益⓪)', '(☄ฺ◣д◢)☄ฺ','༼ つ ͠° ͟ ͟ʖ ͡° ༽つ','┌(▀Ĺ̯ ▀-͠ )┐','(｀◕‸◕´+)','૮( ᵒ̌皿ᵒ̌ )ა','╭(๑¯д¯๑)╮','(๑•ૅㅁ•๑)','⋌༼ •̀ ⌂ •́ ༽⋋'];
function emojies() {
  console.log(emojies);
}


var url = $("#hiddenimg").attr('src');
var img = document.getElementById('hiddenimg');
img.src = url + '?';//how does this even work?
img.setAttribute('crossOrigin', 'anonymous');
// console.log(img);
setTimeout(function () {
  img.style.display = 'none';
}, 100);

img.addEventListener('load', function() {
  var vibrant = new Vibrant(img);
  var swatches = vibrant.swatches()
  var color = [];
  var i = 0;
//  console.log(swatches);
  for (var swatch in swatches) {
    if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
      color.push(swatches[swatch].getHex());
    //  console.log(i);
      // console.log(color[i]);
      i++;
    //  console.log(swatch, swatches[swatch].getHex());
    }
  }
  //  console.log("LENGHT: "+color[4]);
  for (var e = 0; e < color.length ; e++) {
    $(".palette div:nth-of-type("+(e+1)+")").css("backgroundColor", color[e]);
    $(".palette div:nth-of-type("+(e+1)+")").attr("data-clipboard-text", color[e]);
    //console.log("color E: "+ color[e]);
    //console.log($(".palette div:nth-of-type("+e+")"));
  }
  //  console.log(color);

  var bodyStyle = '';
  for (var i = 0; i < color.length; i++) {
    bodyStyle += '--sColor' + (i+1) + ':'+ color[i]+'; ';
  }
  $('body').attr('style', bodyStyle);
  getColors(color[2]);
  $(".link p").css("color", color[0]);
  $(".link").css("backgroundColor", color[4]);
  $(".square").css("backgroundColor", color[0]);
  $(".loader").css("backgroundColor", color[4]);
  $(".mainLoader").css("backgroundColor", color[4]);
  $(".floatingButton").css("backgroundColor", color[0]);
  changeColors($(".link"));
  $(".floatingButton").hover(function(){
    $(this).css("backgroundColor", color[4]);
  }, function(){
    $(this).css("backgroundColor", color[0]);
  });
  function changeColors(selector) {
    selector.hover(function(){
      $(this).find("p").css("color", "#fff");
      $(this).css("backgroundColor", color[0]);
      $(this).css("borderColor", color[1]);
    },
    function(){
      $(this).find("p").css("color", color[0]);
      $(this).css("borderColor", "#fff");
      if (color.length <= 4) {
        $(this).css("backgroundColor"," rgba(255,255,255,0.5)");
      } else {
        $(this).css("backgroundColor", color[4]);
      }
    });
  }
});

  function getColors(color) {
    var e = 0;
    var bodyVars = '';
    for (var i = 1; i <= 4; i++) {
      bodyVars += "--s" + i +':'+ shadeBlendConvert(e,String(color)) +';';
      e += 0.05 ;
    }
    $('body').attr('style', $('body').attr('style') + bodyVars);
  }

function shadeBlendConvert(p, from, to) {
  if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
  if(!this.sbcRip)this.sbcRip=function(d){
    var l=d.length,RGB=new Object();
    if(l>9){
      d=d.split(",");
      if(d.length<3||d.length>4)return null;//ErrorCheck
      RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
    }else{
      if(l==8||l==6||l<4)return null; //ErrorCheck
      if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
      d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
    }
    return RGB;}
  var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
  if(!f||!t)return null; //ErrorCheck
  if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
  else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}
