$(document).ready(function () {
  /*----------------햄버거버튼-------------------*/

  $(".btnMo").click(function (e) {
    e.preventDefault();

    var isOpen = $("#moPanel").hasClass("on");

    if (isOpen) {
      $("#moPanel").removeClass("on");
    } else {
      $("#moPanel").addClass("on");
    }
  });

  $(window).resize(function () {
    var width_size = window.outerWidth;

    if (width_size >= 577) {
      $("#moPanel").css({
        display: "none",
      });
    } else {
      $("#moPanel").css({
        display: "block",
      });
    }
  });

  var $moGnb_li = $("#moGnb>li");

  $moGnb_li.click(function (e) {
    e.preventDefault();

    var isOn = $(this).children("a").hasClass("on");
    if (isOn) {
      $(this).children("a").removeClass("on");
      $(this).children(".sub").stop().slideUp();
    } else {
      $moGnb_li.children("a").removeClass("on");
      $moGnb_li.children(".sub").stop().slideUp();
      $(this).children("a").addClass("on");
      $(this).children(".sub").stop().slideDown();
    }
  });

  /*----------------header Menu-------------------*/

  $(".h-inner>ul>li, .sub-bg").mouseover(function () {
    $(".sub-bg, .sub-gnb").stop().slideDown(300);
  });

  $(".h-inner>ul>li, .sub-bg").mouseleave(function () {
    $(".sub-bg, .sub-gnb").stop().slideUp(300);
  });

  /*-----------------  header scroll  --------------------*/

  $(window).on("scroll", function () {
    var scroll = $(this).scrollTop();

    if (scroll > 0) {
      $("header").css({
        background: "rgba(0,0,0,0.5)",
      });

      $("header").on("mouseleave", function () {
        $("header").css({
          background: "rgba(0,0,0,0.5)",
        });
      });
    } else {
      $("header").css({
        background: "rgba(0,0,0,0)",
      });

      $("header").on("mouseover", function () {
        $("header").css({
          background: "rgba(0,0,0,0.5)",
        });
      });

      $("header").on("mouseleave", function () {
        $("header").css({
          background: "rgba(0,0,0,0)",
        });
      });
    }
  });

  /*----------------smooth scroll-------------------*/

  var md = new MobileDetect(window.navigator.userAgent);
  var isMobile = false;
  if (md.mobile()) {
    isMobile = true;
  }

  var agent = navigator.userAgent.toLowerCase();
  var isIe = false;
  if (
    (navigator.appName == "Netscape" && agent.indexOf("trident") != -1) ||
    agent.indexOf("msie") != -1
  ) {
    isIe = true;
  }

  if (isMobile == false) {
    var $window = $(window);
    var scrollTime = 1.25;
    var scrollDistance = $window.height() / 4;
    window.addEventListener(
      "wheel",
      function (event) {
        event.preventDefault();

        var wheelDelta = event.wheelDelta || event.delta || event.deltaY;
        var detail = event.detail;

        if (isIe) {
          if (wheelDelta > 120) {
            wheelDelta = -120;
          } else {
            wheelDelta = 120;
          }
        }

        var delta = wheelDelta / 120 || -detail / 3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);

        TweenMax.to($window, scrollTime, {
          scrollTo: {
            y: finalScroll,
            autoKill: true,
          },
          ease: Power3.easeOut,
          overwrite: 5,
        });
      }, {
        passive: false,
      }
    );
  }

  /*----------------tab menu-------------------*/

  var tabMenu = $(".h-info");

  tabMenu.find("li>ul").hide();
  tabMenu.find("li.on>ul").show();
  tabMenu.find("li>a").click(tabList);

  function tabList(e) {
    e.preventDefault();
    var target = $(this);

    target
      .next()
      .show()
      .parent("li")
      .addClass("on")
      .siblings("li")
      .removeClass("on")
      .find("ul")
      .hide();
  }

  /*----------------info_slide-------------------*/

  $(".info_slide").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
  });

  /*----------------contents>facility-------------------*/

  var visual = $(".facility_illust>li");

  show(0);

  var total = $(".facility_illust>li").length;

  $(".next").on("click", function (e) {
    e.preventDefault();

    if (currentIndex == total - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    show(currentIndex);
    //left
    $(".pan1")
      .stop()
      .animate({
          "margin-left": "-100%",
        },
        500,
        function () {
          $(".pan1>li").first().appendTo(".pan1");
          $(".pan1").css({
            "margin-left": "0%",
          });
        }
      );

    //right

    $(".pan2")
      .stop()
      .animate({
          "margin-left": "-50%",
        },
        500,
        function () {
          $(".pan2>li").first().appendTo(".pan2");
          $(".pan2").css({
            "margin-left": "0%",
          });
          $(".pan2>li").removeClass("on");
          $(".pan2>li").first().addClass("on");
        }
      );
  });

  $(".prev").on("click", function (e) {
    e.preventDefault();

    if (currentIndex == 0) {
      currentIndex = total - 1;
    } else {
      currentIndex--;
    }
    show(currentIndex);

    //left
    $(".pan1>li").last().prependTo(".pan1");
    $(".pan1").css({
      "margin-left": "-100%",
    });

    $(".pan1").stop().animate({
        "margin-left": "0%",
      },
      500
    );

    //right
    $(".pan2>li").last().prependTo(".pan2");
    $(".pan2").css({
      "margin-left": "-50%",
    });
    $(".pan2")
      .stop()
      .animate({
          "margin-left": "0%",
        },
        500,
        function () {
          $(".pan2>li").removeClass("on");
          $(".pan2>li").first().addClass("on");
        }
      );
  });

  function show(index) {
    $(".facility_illust>li").removeClass("on");
    $(".facility_illust>li").eq(index).addClass("on");

    currentIndex = index;
  }

  /*----------------contents>site-------------------*/

  var wid = $(".site>li").outerWidth();
  var num = $(".site>li").length;
  var totalWid = wid * num;
  $(".site").width(totalWid);

  var mleft = 0;

  var timer = setInterval(move, 20);

  $(".siteBox").on("mouseenter", function () {
    clearInterval(timer);
  });

  $(".siteBox").on("mouseleave", function () {
    timer = setInterval(move, 20);
  });

  $(".btnPrev").on("click", function (e) {
    e.preventDefault();
    $(".site>li").last().prependTo(".site");
  });

  $(".btnNext").on("click", function (e) {
    e.preventDefault();
    $(".site>li").first().appendTo(".site");
  });

  function move() {
    mleft -= 2;

    if (mleft < -wid) {
      $(".site>li").first().appendTo(".site");
      mleft = 0;
    }
    $(".site").css({
      left: mleft,
    });
  }

  /*----------------contents>map-------------------*/

  function initialize() {
    var myLatlng = new google.maps.LatLng(36.381828, 127.354002);
    var myOptions = {
      zoom: 15,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
    };
    var map = new google.maps.Map(
      document.getElementById("map_canvas"),
      myOptions
    );
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: "대전시민천문대",
    });
    var infowindow = new google.maps.InfoWindow({
      content: "대전시민천문대",
    });
    infowindow.open(map, marker);
  }
  window.onload = function () {
    initialize();
  };
});