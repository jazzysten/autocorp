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

    //-----------------------------------------------------------------

    function startSlider(selector) {
      $(selector).each(function(){
          if ($(this).is(':visible') && !$(this).hasClass('slick-initialized')) {
              $(this).slick({
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: false,
                  dots: true,
                  arrows: true,
                  pauseOnFocus: true,
                  pauseOnHover: true,
                  pauseOnDotsHover: true,
                  fade: true,
                  cssEase: 'ease-in-out'
              });
          }
      });
  }

    function setActiveItem(item) {
        $(".korea-panel, .japan-panel, .china-panel, .reviews-panel").hide();
        $(".panel-links a").removeClass("active-item");

        $("." + item + "-panel").show();
        $("a:contains('" + item + "')").addClass("active-item");

        localStorage.setItem('selectedItem', item);
        startSlider("." + item + "-catalog");
    }
       
    var selectedItem = localStorage.getItem('selectedItem');
       
    if (!selectedItem) {
        selectedItem = 'korea';
    }
       
    setActiveItem(selectedItem);
       
    $(".panel-links a").click(function(){
      var item = $(this).text().trim().toLowerCase();
      $(".slick-initialized").slick('unslick');
      setActiveItem(item);
      startSlider("." + item + "-catalog");
   });

    $(".catalog-button").click(function(){
      $(".catalog-cards").addClass('hidden');
  
      var btnClass = $(this).attr("class").split(" ")[1].replace("-button", "");
      var catalogId = "." + btnClass + "-catalog";
  
      $(catalogId).removeClass('hidden');
      $(".slider-group-buttons").removeClass('hidden');
  
      startSlider(catalogId);
  
      $(".add-modal[data-button='japan_add']").attr("id", "japan_" + btnClass + "_add");
      $(".add-modal[data-button='china_add']").attr("id", "china_" + btnClass + "_add");
   });

    $(".close-catalog").click(function(){
         location.reload()
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

   function hideNotifications() {
      $(".noti").addClass('hidden');
      $(".noti p").addClass('hidden');
  }

  function hideNotificationsReload() {
   location.reload();
}

   $('.save-button').click(function(event) {
      event.preventDefault();
      var table_name = $(this).attr('id').replace('_save', '');
      var form = $(this).closest('form');
  
      var record_id = $(form).find('input[name="record_id"]').val();
  
      var formData = new FormData(form);
     
         formData.append('table_name', table_name);
         formData.append('record_id', record_id);
     
         $.ajax({
             type: 'POST',
             url: '../admin/functions/car_edit.php',
             data: formData,
             contentType: false,
             processData: false,
             success: function(response) {
                   $('.noti').removeClass('hidden');
                   $('.noti .saved').removeClass('hidden');
                  setTimeout(hideNotifications, 3000);
               },
               error: function(xhr, status, error){
                  if(xhr.status === 413) {
                      $('.noti').removeClass('hidden');
                      $('.bigsize').removeClass('hidden');
                      setTimeout(hideNotifications, 3000);
                  } else {
                      $('.noti').removeClass('hidden');
                      $('.noti .errorsave').removeClass('hidden');
                      setTimeout(hideNotifications, 3000);
                  }
                  console.log(error);
              }
         });
   });
  
   //-----------------------------------------------------------------

   $(".js-open-modal[data-modal='delete']").click(function(){
      var tableToDelete = $(this).data('delete');
      var recordId = $(this).attr('id');
      var form = $('form.' + tableToDelete);
      
      form.each(function() {
          if ($(this).hasClass(recordId)) {
              var carName = $(this).find('input[name="car_name"]').val();
              var carImg = $(this).find('img').attr('src').split('/').pop();
              $("#car_name_del").val(carName);
              $("#record_id_del").val(recordId);
              $("#table_to_delete").val(tableToDelete);
              $("#car_img_del").val(carImg);
          }
      });
   });
   

   $(".js-modal-close[data-modal='delete'], .js-overlay-modal").click(function(){
         $("#car_name_del").val("");
         $("#record_id_del").val("");
         $("#table_to_delete").val("");
   });

   $("#delete_form").submit(function(e){
         e.preventDefault();
         var formData = $(this).serialize();
         $.ajax({
            type: "POST",
            url: '../admin/functions/car_delete.php',
            data: formData,
            dataType: 'json',
            success: function(response){
               $('body').removeClass('loaded');
               $('.noti').removeClass('hidden');
               $('.noti .deleted').removeClass('hidden');
               setTimeout(hideNotificationsReload, 1500);
            },
            error: function(xhr, status, error){
               if(xhr.status === 413) {
                   $('.noti').removeClass('hidden');
                   $('.bigsize').removeClass('hidden');
                   setTimeout(hideNotifications, 3000);
               } else {
                  $('.noti').removeClass('hidden');
                  $('.noti .errordelete').removeClass('hidden');
                  setTimeout(hideNotifications, 3000);
               }
               console.log(error);
           }
         });
   });

   //-----------------------------------------------------------------

   $(".js-open-modal[data-modal='add']").click(function(){
      var table = $(this).attr('id').replace('_add', '');
      $('input[name="table_to_add"]').val(table);
      console.log(table);
  });
  
  $("#add_form").submit(function(e){
      e.preventDefault();

      var formData = new FormData($(this)[0]);
      var fileInput = $('#new_car_img')[0].files[0];
      if (!fileInput) {
          $('.noti').removeClass('hidden');
          $('.addimg').removeClass('hidden');
          setTimeout(hideNotifications, 3000);
          return;
      }

      $.ajax({
          url: '../admin/functions/car_add.php',
          method: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
              $('body').removeClass('loaded');
              $('.noti').removeClass('hidden');
              $('.noti .added').removeClass('hidden');
              setTimeout(hideNotificationsReload, 1500);
          },
          error: function(xhr, status, error){
            if(xhr.status === 413) {
                $('.noti').removeClass('hidden');
                $('.bigsize').removeClass('hidden');
                setTimeout(hideNotifications, 3000);
            } else {
               $('.noti').removeClass('hidden');
               $('.noti .errorsave').removeClass('hidden');
               setTimeout(hideNotifications, 3000);
            }
            console.log(error);
        }
      });
  });
  
   //-----------------------------------------------------------------


   $(".save-review").click(function(e){
      e.preventDefault();
      
      var form = $(this.form);
      var formId = form.find('input[name="form_id"]').val();
      var formData = new FormData(form[0]);
      
      formData.append('review_id_to_add', formId);
  
      $.ajax({
          url: '../admin/functions/review.php',
          method: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
              $('body').removeClass('loaded');
              $('.noti').removeClass('hidden');
              $('.noti .saved').removeClass('hidden');
              setTimeout(hideNotificationsReload, 1500);
          },
          error: function(xhr, status, error){
              if(xhr.status === 413) {
                  $('.noti').removeClass('hidden');
                  $('.bigsize').removeClass('hidden');
                  setTimeout(hideNotifications, 3000);
              } else {
                  $('.noti').removeClass('hidden');
                  $('.noti .errorsave').removeClass('hidden');
                  setTimeout(hideNotifications, 3000);
              }
              console.log(error);
          }
      });
   });
  
        
});
