$(document).ready(function(){
  // mega_menu sub_menu selection 
  $("li.main_menu_cu").on("click", function(){
      // Reset font-family for all siblings within the same mega-menu
      const $megaMenu = $(this).closest(".mega-menu");

      // Show only the relevant submenu within the same mega-menu
      let $child_mm = $(this).find("ul.sub_menu_cu");
      if($child_mm.length > 0){
          $megaMenu.find("ul.sub_menu_cu").hide();
          $megaMenu.find("li.active").removeClass('active');
          $child_mm.css('display', 'flex');
          $(this).addClass('active');
      }
  });

  // Drag to scroll for product offer list and kit products
  const sliders = document.querySelectorAll('.product-info__offer-list, .kit-products');

  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  });

  // Delivery Estimation Logic
  $(document).on('click', '.delivery-estimation__button', function() {
    const $container = $(this).closest('.delivery-estimation');
    const $input = $container.find('.delivery-estimation__input');
    const $result = $container.find('.delivery-estimation__result');
    const $message = $container.find('.delivery-estimation__message');
    const pinCode = $input.val().trim();
    const deliveryDays = parseInt($container.data('delivery-days')) || 5;
    const messageFormat = $container.data('message-format') || "Get it delivered by [date]";

    if (/^\d{6}$/.test(pinCode)) {
      // Valid Pincode (Simple check for 6 digits)
      const date = new Date();
      date.setDate(date.getDate() + deliveryDays);
      
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      
      // Function to add ordinal suffix (st, nd, rd, th)
      const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
      };

      const formattedDate = `${getOrdinal(day)} ${month}`;
      const finalMessage = messageFormat.replace('[date]', formattedDate);

      $message.text(finalMessage).removeClass('delivery-estimation__error');
      $result.show();
      $input.addClass('valid'); // Optional styling hook
    } else {
      // Invalid Pincode
      $message.text('Please enter a valid 6-digit pincode').addClass('delivery-estimation__error');
      $result.show();
    }
  });

  // Allow "Enter" key to trigger check
  $(document).on('keypress', '.delivery-estimation__input', function(e) {
    if (e.which == 13) {
      $(this).siblings('.delivery-estimation__button').click();
    }
  });
});