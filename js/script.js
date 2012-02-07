(function($) {
  $(document).ready(function() {

    function activate($el) {
      $el.removeClass('inactive').addClass('active');
      $el.find(':input').removeAttr('disabled');
    }
    function deactivate($el) {
      $el.removeClass('active').addClass('inactive');
      $el.find(':input').attr('disabled','disabled');
    }

    function check_permission() {
      switch(window.webkitNotifications.checkPermission()) {
        case 0:
          // Continue
          activate($('.needs_permission'));
          deactivate($('.needs_support'));
          break;
        case 2:
          // Fail
          $('#blocked').fadeIn();
          break;
      }
    }

    // Disable all input elements per default
    $(':input').attr('disabled', 'disabled');

    // Determine if notifications are supported, currently Chrome only
    if (window.webkitNotifications) {
      activate($('.needs_support'));
      check_permission();
    } else {
      $("#not_supported").fadeIn();
    }

    // Ask for permission
    $('#ask_permission').click(function(e) {
      e.preventDefault();
      window.webkitNotifications.requestPermission(check_permission);
    });

    // Display the plain text notification
    $('#plain_form').submit(function(e) {
      e.preventDefault();
      var icon = $('#plain_icon').val(),
          title = $('#plain_title').val(),
          message = $('#plain_message').val(),
          notification;

      // Create a new notification
      notification = window.webkitNotifications.createNotification(icon, title, message);
      notification.ondisplay = function() {
        $('#plain_debug').html('Fired the <b>ondisplay</b> event<br>' + $('#plain_debug').html());
      };
      notification.onclose = function() {
        $('#plain_debug').html('Fired the <b>onclose</b> event<br>' + $('#plain_debug').html());
      };
      // Display the notification, calling close() on notification will dismiss it
      notification.show();
    });

    // Display the html notification
    $('#html_form').submit(function(e) {
      e.preventDefault();
      var file = $('#html_file').val(),
          notification;

      // Create a new notification
      notification = window.webkitNotifications.createHTMLNotification(file);
      notification.ondisplay = function() {
        $('#html_debug').html('Fired the <b>ondisplay</b> event<br>' + $('#html_debug').html());
      };
      notification.onclose = function() {
        $('#html_debug').html('Fired the <b>onclose</b> event<br>' + $('#html_debug').html());
      };
      // Display the notification, calling close() on notification will dismiss it
      notification.show();
    })

  });
})(jQuery);
