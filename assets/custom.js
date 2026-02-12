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

  // Drag to scroll for product offer list
  const slider = document.querySelector('.product-info__offer-list');
  let isDown = false;
  let startX;
  let scrollLeft;

  if(slider) {
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
  }
});