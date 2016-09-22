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
    footerHeight = $('.main-footer', context).height();

  function setHeroHeight() {
    hero.height(windowHeight - footerHeight);
    sections.each(function(i,e) {
      $(e).height(windowHeight - footerHeight)
    });
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


$(function(){
  $('[data-scroll-speed]').moveIt();
  $('#home-page').setSectionHeight();
  $('.main-footer').scrolltoSection();
});

