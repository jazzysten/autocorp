$(document).ready(function () {

    $.fn.matches = function (selector) {
       return (
          this[0].matches ||
          this[0].msMatchesSelector ||
          this[0].mozMatchesSelector ||
          this[0].webkitMatchesSelector ||
          function (s) {
             var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
             while (--i >= 0 && matches.item(i) !== this) {}
             return i > -1;
          }
       ).call(this[0], selector);
    };
 
    $.fn.closest = function (selector) {
       var el = this[0];
       while (el && el.nodeType === 1) {
          if ($(el).matches(selector)) {
             return el;
          }
          el = el.parentNode;
       }
       return null;
    };
 
    $(document).on('click', '.js-modal-close', function (e) {
       var parentModal = $(this).closest('.modal');
 
       if (parentModal.length) {
          parentModal.removeClass('active');
       } else {
          $('.modal.active').removeClass('active');
       }
 
       $('.js-overlay-modal').removeClass('active');
    });
 
    $(document).on('click', '.js-overlay-modal', function (e) {
      if ($('[data-modal="credit"]').hasClass('active')) {
          e.stopPropagation();
          return;
      }
      $('.modal.active').removeClass('active');
      $(this).removeClass('active');
  });
  
 
    $('.js-open-modal').on('click', function (e) {
       e.preventDefault();
 
       var modalId = $(this).data('modal'),
          modalElem = $('.modal[data-modal="' + modalId + '"]');
 
       modalElem.addClass('active').css('top', '50%');
       $('.js-overlay-modal').addClass('active');
    });
 
    $('.modal-link').on('click', function (e) {
       e.preventDefault();
 
       $('.modal.active').removeClass('active');
       $('.js-overlay-modal').removeClass('active');
       $('html, body').animate({
          scrollTop: $('#contact').offset().top - 80
       }, 500);
    });
 
    $('body').on('keyup', function (e) {
       var key = e.keyCode;
 
       if (key == 27) {
          $('.modal.active').removeClass('active');
          $('.js-overlay-modal').removeClass('active');
       }
    });

    $('.home .to-top').click(function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
    });
 
 
    //-----------------------------------------------------------------
 
    $('.slider-container').slick({
       slidesToShow: 1,
       slidesToScroll: 1,
       autoplay: true,
       autoplaySpeed: 5000,
       dots: true,
       arrows: true,
       pauseOnFocus: true,
       pauseOnHover: true,
       pauseOnDotsHover: true,
       fade: true,
       cssEase: 'ease-in-out'
    });
 
 
    $('.slider-container').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
       var direction;
 
       if (currentSlide === 0 && nextSlide === 1) {
          direction = 'left';
       } else if (currentSlide === 1 && nextSlide === 2) {
          direction = 'left';
       } else if (currentSlide === 2 && nextSlide === 0) {
          direction = 'left';
       } else if (currentSlide === 0 && nextSlide === 2) {
          direction = 'right';
       } else if (currentSlide === 2 && nextSlide === 1) {
          direction = 'right';
       } else if (currentSlide === 1 && nextSlide === 0) {
          direction = 'right';
       }
 
       if (direction === 'right') {
          $('.china-truck-img, .china-car, .china-yamaha, .japan-car, .korea-car').css({
             'left': '-500%'
          });
       } else {
          $('.china-truck-img, .china-car, .china-yamaha, .japan-car, .korea-car').css({
             'left': '500%'
          });
       }
    });
 
    $('.slider-container').on('afterChange', function (event, slick, currentSlide) {
 
       $('.japan-car, .korea-car').css('left', 0);
       $('.china-truck-img').css('left', '25%');
       $('.china-car').css('left', '65%');
       $('.china-yamaha').css('left', '105%');
    });
 
    //-----------------------------------------------------------------
 
    $('.contact-form input').on('focus hover', function () {
       $('.contact-car').css('filter', 'grayscale(0)');
    });
 
    $('.contact-form input').on('blur', function () {
       $('.contact-car').css('filter', 'grayscale(100%)');
    });
 
    //-----------------------------------------------------------------

   window.onload = function () {
      setTimeout(function () {
          var fixedForm = document.getElementById('fixed_form');
          var chatIcon = document.querySelector('.chat-icon');
          var fixedFormButton = document.getElementById('fixed_button');
  
          chatIcon.style.zIndex = "-1";
          $('.chat-icon').addClass('chat-icon-hover');
          fixedFormButton.style.display = "block";
          fixedFormButton.style.opacity = "1";
          fixedForm.style.opacity = "1";
          fixedForm.style.zIndex = "1";
          fixedForm.style.width = "800%";
      }, 10000);
   };
 
    function isElementInViewport(element) {
       var rect = element.getBoundingClientRect();
       return (
          rect.bottom >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)
       );
    }
 
    var fixedButton = document.querySelector(".fixed-chat");
    fixedButton.style.opacity = "0";
    fixedButton.style.zIndex = "-1";
 
 
    function toggleFixedButtonVisibility() {
       var fixedButton = document.querySelector(".fixed-chat");
       var blocksToShowOn = [
          "main",
          "footer"
       ];
 
       if (fixedButton) {
          var shouldShow = blocksToShowOn.some(function (blockId) {
             var block = document.getElementById(blockId);
             return block && isElementInViewport(block);
          });
 
          if (shouldShow) {
             fixedButton.style.opacity = "0";
             fixedButton.style.zIndex = "-1";
          } else {
             fixedButton.style.opacity = "1";
             fixedButton.style.zIndex = "999";
          }
       }
    }
 
    window.addEventListener("scroll", toggleFixedButtonVisibility);
 
    //-----------------------------------------------------------------
 
    var fixedForm = document.getElementById('fixed_form');
    var chatIcon = document.querySelector('.chat-icon');
    var fixedFormButton = document.getElementById('fixed_button');
    var fixedChat = $('.fixed-chat');
 
    fixedChat.on('click', function () {
       chatIcon.style.zIndex = "-1";
       $('.chat-icon').addClass('chat-icon-hover');
       fixedFormButton.style.display = "block";
       fixedFormButton.style.opacity = "1";
       fixedForm.style.opacity = "1";
       fixedForm.style.zIndex = "1";
       fixedForm.style.width = "800%";
    });
 
    $(document).on('click', function (event) {
       if (event.target && !$(event.target).closest('.fixed-chat') && !$(event.target).closest('.fixed-form')) {
          fixedFormButton.style.opacity = "0";
          fixedFormButton.style.display = "none";
          fixedForm.style.opacity = "0";
          fixedForm.style.zIndex = "-1";
          fixedForm.style.width = "0";
          $('.chat-icon').removeClass('chat-icon-hover');
          chatIcon.style.zIndex = "1";
       }
    });

   $('input').on('focus', function() {
      $('meta[name=viewport]').remove();
      $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');
   });
   
   $('input').on('blur', function() {
         $('meta[name=viewport]').remove();
         $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">');
   });
 
 
    //-----------------------------------------------------------------
 
    $('.contact-form').submit(function (event) {
       event.preventDefault();
       var formData = $(this).serialize();
 
       $.ajax({
          type: 'POST',
          url: $(this).attr('action'),
          data: formData,
          success: function (response) {
             $('.contact-form-fields').css('display', 'none');
             $('.contact-form-thanks').removeClass('hidden');
          },
          error: function (xhr, status, error) {
             $('.contact-form-error').removeClass('hidden');
             setTimeout(function () {
                $('.contact-form-error').addClass('hidden');
                $('.contact-form-fields').css('display', 'block');
             }, 3000);
          }
       });
    });
 
    //-----------------------------------------------------------------
 
    $('#fixed_button').click(function (event) {
       event.preventDefault();
 
       var currentInput = $('.fixed-input:not(.hidden)').last();
       var nextInput = currentInput.next('.fixed-input');
 
       if (!currentInput.get(0).checkValidity()) {
          return;
       }
 
       if (nextInput.length > 0) {
          currentInput.addClass('hidden');
          nextInput.removeClass('hidden');
 
          nextInput.focus();
 
          if (nextInput.attr('id') === 'fixed_contact') {
             $('#fixed_button').addClass('hidden');
             $('#submit_button').addClass('visible');
          }
       }
    });
 
    function submitForm() {
       var formData = $('#fixed_form').serialize();
 
       if (!$('#fixed_form').get(0).checkValidity()) {
          return;
       }
 
       $.ajax({
          type: 'POST',
          url: 'admin/functions/chat_base.php',
          data: formData,
          success: function (response) {
             $('.fixed-input').addClass('hidden');
             $('.fixed-button').addClass('hidden');
             $('#fixed_button').addClass('hidden');
             $('#submit_button').removeClass('visible');
             $('#fixed_success').addClass('visible');
          },
          error: function (xhr, status, error) {
             $('.fixed-input').addClass('hidden');
             $('.fixed-button').addClass('hidden');
             $('#fixed_button').addClass('hidden');
             $('#submit_button').removeClass('visible');
             $('#fixed_error').addClass('visible');
          }
       });
    }
 
    $('#submit_button').click(function (event) {
       event.preventDefault();
       submitForm();
    });
 
    $('#fixed_contact').keypress(function (event) {
       if (event.keyCode === 13) {
          event.preventDefault();
          submitForm();
       }
    });
 
    //-----------------------------------------------------------------
 
      $('.review-form').submit(function (event) {
      event.preventDefault();
  
      var nameValue = $('#review_name').val().trim();
      var textView = $('#review_text').val().trim();
  
      if (nameValue !== '' && textView !== '') {
          var formData = $(this).serialize();
          $('.review-p').addClass('hidden');
  
          $.ajax({
              type: 'POST',
              url: $(this).attr('action'),
              data: formData,
              success: function (response) {
                  $('.review-form-fields').css('display', 'none');
                  $('.review-form-thanks').removeClass('hidden');
              },
              error: function (xhr, status, error) {
                  $('.review-form-error').removeClass('hidden');
                  setTimeout(function () {
                      $('.review-form-error').addClass('hidden');
                      $('.review-form-fields').css('display', 'block');
                  }, 3000);
              }
          });
      } else {
            $('.review-p').removeClass('hidden');
      }
      });
 
    //-----------------------------------------------------------------
 
    $(".read-review-button").click(function () {
       var reviewId = $(this).parent().data('review');
       var imgSrc = $(this).parent().find('img').attr('src');
 
       $('.review-img').data('original-src', $('.review-img').attr('src'));
       $('.review-img').css('opacity', '0');
 
       setTimeout(function () {
          $('.review-img').attr('src', imgSrc);
          $('.review-img').css('opacity', '1');
       }, 200);
 
       $('.read-review-button').css({
          'z-index': '-1',
          'opacity': '0'
       });
       $('.review-read-block-content[data-review="' + reviewId + '"]').css({
          'z-index': '10',
          'opacity': '1'
       });
    });
 
    $(".close-review").click(function () {
       var originalImgSrc = $('.review-img').data('original-src');
 
       $('.review-img').css('opacity', '0');
 
       setTimeout(function () {
          $('.review-img').attr('src', originalImgSrc);
          $('.review-img').css('opacity', '1');
       }, 200);
 
       $(this).parent().css({
          'z-index': '-1',
          'opacity': '0'
       });
       $('.read-review-button').css({
          'z-index': '9',
          'opacity': '1'
       });
    });
 
    //-----------------------------------------------------------------
 
    var navMobileOpen = $('.nav-mobile-open');
    var navMobileClose = $('.nav-mobile-close');
    var navOverlay = $('.nav-m');
    var body = $('body');
    var links = document.querySelectorAll('a[href^="#"]');

      if (window.location.pathname === '/') {
         $('.review-link').each(function() {
            $(this).attr('href', '#reviews');
         });
      }
 
    links.forEach(function (link) {
       link.addEventListener('click', function (e) {
          e.preventDefault();
 
          navOverlay.removeClass('show');
          navMobileOpen.css('display', 'flex');
          navMobileClose.removeClass('show').addClass('hidden');
          body.css('overflowY', 'auto');
 
          var target = document.querySelector(this.getAttribute('href'));
          var offset = target.offsetTop - 80;
 
          window.scrollTo({
             top: offset,
             behavior: 'smooth'
          });
       });
    });
 
    navMobileOpen.click(function () {
       navMobileOpen.css('display', 'none');
       navMobileClose.addClass('show').removeClass('hidden');
       navOverlay.addClass('show');
       body.css('overflow', 'hidden');
    });
 
    navMobileClose.click(function () {
       navOverlay.removeClass('show');
       navMobileOpen.css('display', 'flex');
       navMobileClose.removeClass('show').addClass('hidden');
       body.css('overflowY', 'auto');
    });

   //-----------------------------------------------------------------

   function getFileNameWithoutExtension(url) {
      var lastSlashIndex = url.lastIndexOf('/');
      var lastDotIndex = url.lastIndexOf('.');
      if (lastDotIndex === -1 || lastDotIndex < lastSlashIndex) {
          return url.substring(lastSlashIndex + 1);
      }
      return url.substring(lastSlashIndex + 1, lastDotIndex);
   }

   var currentUrl = window.location.href;

   document.querySelectorAll('.nav-pc a').forEach(function(link) {
         var fileNameWithoutExtension = getFileNameWithoutExtension(link.href);
         var currentFileNameWithoutExtension = getFileNameWithoutExtension(currentUrl);
         if (fileNameWithoutExtension === currentFileNameWithoutExtension && !link.getAttribute('href').includes('#')) {
            link.classList.add('active-red');
         }
   });

   //-----------------------------------------------------------------

   $(".catalog-button").click(function(){
      $(".catalog-cards").addClass("hidden");

      var btnClass = $(this).attr("class").split(" ")[1].replace("-button", "");

      $("." + btnClass + "-catalog").removeClass("hidden");
      $(".close-catalog").removeClass("hidden");

      $("." + btnClass + "-catalog").each(function(){
         $(this).slick({
           slidesToShow: 1,
           slidesToScroll: 1,
           autoplay: false,
           dots: true,
           arrows: true,
           fade: true,
           cssEase: 'ease-in-out'
         });
      });
    });
 
    $(".close-catalog").click(function(){
      $(".close-catalog").addClass("hidden");
      $(".open-catalog").addClass("hidden");
      $(".catalog-cards").removeClass("hidden");
    });


    $("#catalog_button").click(function(){
      $("#catalog_button").addClass('hidden');
      $(".catalog-cards").addClass("hidden");

      var btnClass = $(this).attr("class").split(" ")[1].replace("-button", "");

      $("." + btnClass + "-catalog").removeClass("hidden");
      $(".close-catalog").removeClass("hidden");

      $("." + btnClass + "-catalog").each(function(){
         $(this).slick({
           slidesToShow: 1,
           slidesToScroll: 1,
           autoplay: false,
           dots: true,
           arrows: true,
           fade: true,
           cssEase: 'ease-in-out'
         });
      });
    });
 
    $(".close-catalog").click(function(){
      $(".close-catalog").addClass("hidden");
      $(".open-catalog").addClass("hidden");
      $("#catalog_button").removeClass('hidden');
      $(".catalog-cards").removeClass("hidden");
    });

   //-----------------------------------------------------------------

   $('.dropdown-list li').click(function(){
      var selectedValue = $(this).text();
      var inputField = $(this).parent().siblings('input');
      inputField.val(selectedValue).attr('value', selectedValue);
   });
   
   $('.custom-dropdown input, .dropdown-icon').click(function(e){
         var dropdown = $(this).siblings('.dropdown-list');
         var icon = $(this).siblings('.dropdown-icon');
   
         $('.dropdown-list').not(dropdown).removeClass('active').slideUp(100);
         $('.dropdown-icon').not(icon).removeClass('rotated');
         dropdown.slideToggle(100, function() {
            dropdown.toggleClass('active');
            
         });
         icon.toggleClass('rotated');
   
         e.stopPropagation();
   });
   
   $(document).click(function(){
         $('.dropdown-list.active').slideUp(100).removeClass('active');
         $('.dropdown-icon').removeClass('rotated');
   });

   //-----------------------------------------------------------------



});