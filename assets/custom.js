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
});