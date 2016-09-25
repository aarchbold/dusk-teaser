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
    footer.css({'position':'absolute','opacity': 1,'bottom': 'auto','top':($(window).height() + $(this).scrollTop()) - 120});

    $(window).on('scrollstop', function(event) {
      console.log('show footer');
      console.log($(this).scrollTop());
      console.log('window height + scroll top', $(window).height() + $(this).scrollTop());
      // footer.removeClass('-hide-footer');
      console.log('body height', $('body').height())
      footer.css({'top':($(window).height() + $(this).scrollTop()) - 130});
      footer.show();
    });
    $(window).on('scrollstart', function(event) {
      console.log('hide footer');
      // footer.addClass('-hide-footer');
      // footer.css({'opacity': 0})
      if ($(window).height() + $(this).scrollTop() < $('body').height()) {
        footer.hide();
      }
    });
  }

}


$(function(){
  if ($('html').hasClass('no-touch')) {
    $('[data-scroll-speed]').moveIt();
  };
  $('#home-page').setSectionHeight();
  $('.main-footer').scrolltoSection();
  // show footer when scrolling down
  scrollyStuff();


});

