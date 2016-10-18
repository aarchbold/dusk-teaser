function scrollyStuff(){var o=0,t=$("html"),s=$(window),i=($(".home-feedback"),$(".main-footer"));$(".section-feedback__cta-slack"),$(".section-feedback__cta-twitter"),t.hasClass("no-touch")?s.scroll(function(t){var s=$(this).scrollTop();s>o&&i.addClass("-show-footer"),s<50&&i.removeClass("-show-footer"),o=s}):($(window).on("scrollstop",_.debounce(function(t){var s=$(this).scrollTop();s>o?$(this).scrollTop()>200&&($("html").hasClass("iphone")?i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-40}):i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-130}),i.show()):$(this).scrollTop()>200&&($("html").hasClass("iphone")?i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-110}):i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-130}),i.show()),o=s},100)),$(window).on("scrollstart",function(o){$(window).height()+$(this).scrollTop()<$("body").height()&&i.hide()}))}$.fn.moveIt=function(){var o=$(window),t=[];$(this).each(function(){t.push(new moveItItem($(this)))}),window.onscroll=function(){var s=o.scrollTop();t.forEach(function(o){o.update(s)})}};var moveItItem=function(o){this.el=$(o),this.speed=parseInt(this.el.attr("data-scroll-speed"))};moveItItem.prototype.update=function(o){var t=o/this.speed;this.el.css("transform","translateY("+-t+"px)")},$.fn.setSectionHeight=function(){function o(){i>=e?s.height(e):s.height(i+n)}var t=$(this),s=$(".main-hero",t),i=($(".section-dusk",t),$(window).height()),e=1080,n=($(".main-footer",t).height(),200);o(),$(window).on("resize",_.debounce(function(){o("main-hero")},500))},$.fn.scrolltoSection=function(){var o=$(this),t=$("html, body"),s=$("a[data-goto]",o),i=50;s.click(function(o){o.preventDefault();var s=$("section[data-target='"+$(this).data("goto")+"']");setTimeout(function(){t.stop(!0,!0).animate({scrollTop:s.offset().top-i},600)},50)})},$(function(){Modernizr.addTest("iphone",function(){return!!navigator.userAgent.match(/iPhone/i)}),$("html").hasClass("no-touch")?$("[data-scroll-speed]").moveIt():setTimeout(function(){window.scrollTo(0,1)},100),$(".main-footer").scrolltoSection(),scrollyStuff()});home-feedback'),
    footer = $('.main-footer'),
    btnSlack = $('.section-feedback__cta-slack'),
    btnTwitter = $('.section-feedback__cta-twitter');


  // set OG footer position
  if ($html.hasClass('no-touch')) {
    $window.scroll(function(event){
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
      // downscroll code
        footer.addClass('-show-footer');
      } else {
      // upscroll code
      }
      if (st < 50) {
        footer.removeClass('-show-footer');
      }
      // not really working on large screens
      // if (st >= feedbackSection.offset().top - 1000) {
      //   btnSlack.addClass('-show');
      //   btnTwitter.addClass('-show');
      // } else {
      //   btnSlack.removeClass('-show');
      //   btnTwitter.removeClass('-show');
      // }
      lastScrollTop = st;
    });
  } else {
    //footer.css({'position':'absolute','opacity': 1,'bottom': 'auto','top':($(window).height() + $(this).scrollTop()) - 120});

    $(window).on('scrollstop', _.debounce(function(event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        // going down
        if ($(this).scrollTop() > 200) {
          if ($('html').hasClass('iphone')) {
            footer.css({'opacity': 1,'top':($(window).height() + $(this).scrollTop()) - 40});
          } else {
            footer.css({'opacity': 1,'top':($(window).height() + $(this).scrollTop()) - 130});
          }
          footer.show();
        }
      } else {
        // going up
        if ($(this).scrollTop() > 200) {
          if ($('html').hasClass('iphone')) {
            footer.css({'opacity': 1,'top':($(window).height() + $(this).scrollTop()) - 110});
          } else {
            footer.css({'opacity': 1,'top':($(window).height() + $(this).scrollTop()) - 130});
          }
          footer.show();
        }
      }       
      lastScrollTop = st;
    }, 100));
    $(window).on('scrollstart', function(event) {
      // footer.addClass('-hide-footer');
      // footer.css({'opacity': 0})
      if ($(window).height() + $(this).scrollTop() < $('body').height()) {
        footer.hide();
      }
    });
  }

}


$(function(){
  // add Modernizr test for iphone
  Modernizr.addTest('iphone', function () {
    return !!navigator.userAgent.match(/iPhone/i);
  });
  // remove prallax on phones for performance gains
  if ($('html').hasClass('no-touch')) {
    $('[data-scroll-speed]').moveIt();
  } else {
    // attempt to hide the location bar (site looks way better without it)
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 100)
  };
  // $('#home-page').setSectionHeight();
  $('.main-footer').scrolltoSection();
  // show footer when scrolling down
  scrollyStuff();


});

