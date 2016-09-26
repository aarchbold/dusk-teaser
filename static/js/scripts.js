/* eslint-disable */

// I like to move it move it. I like to move it move it.
// This handles the little parallaxy stuff
$.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];
  $(this).each(function(){
    instances.push(new moveItItem($(this)));
  });
  window.onscroll = function(){
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  }
}

var moveItItem = function(el){
  this.el = $(el);
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
  var pos = scrollTop / this.speed;
  this.el.css('transform', 'translateY(' + -pos + 'px)');
};

// udpate section heights when page loads
// this will update when a user changes their window size
$.fn.setSectionHeight = function(){
  var context = $(this),
    hero = $('.main-hero', context),
    sections = $('.section-dusk', context),
    windowHeight = $(window).height(),
    footerHeight = $('.main-footer', context).height(),
    heroOffset = 200;

  function setHeroHeight() {
    hero.height(windowHeight + heroOffset);
    // sections.each(function(i,e) {
    //   $(e).css('min-height',windowHeight - footerHeight);
    // });
  }

  setHeroHeight();

  $(window).on('resize', _.debounce(function(){
      // check if window.width() matches function initialized width
      setHeroHeight('main-hero');
  }, 500));
}

// scroll to sections
$.fn.scrolltoSection = function(){
  var context = $(this),
    body = $('html, body'),
    links = $('a[data-goto]', context),
    offset = 50;

  links.click(function(e) {
    e.preventDefault();
    var target = $("section[data-target='" + $(this).data('goto') +"']");
    setTimeout(function(){
      body.stop(true, true).animate({ scrollTop: target.offset().top - offset }, 600);
    }, 50);
  })
}

function scrollyStuff() {
  var lastScrollTop = 0,
    $html = $('html'),
    $window = $(window),
    feedbackSection = $('.home-feedback'),
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
      if (st >= feedbackSection.offset().top - 400) {
        btnSlack.addClass('-show');
        btnTwitter.addClass('-show');
      } else {
        btnSlack.removeClass('-show');
        btnTwitter.removeClass('-show');    }
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
  $('#home-page').setSectionHeight();
  $('.main-footer').scrolltoSection();
  // show footer when scrolling down
  scrollyStuff();


});

