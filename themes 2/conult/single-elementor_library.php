<?php
/**
 *
 * @author     Gaviasthemes Team     
 * @copyright  Copyright (C) 2020 Gaviasthemes. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 * 
 */
 get_header();
?>

<section id="wp-main-content" class="clearfix main-page">
   <?php do_action('conult_before_page_content'); ?>
   <div class="main-page-content">
      <div class="content-page">      
         <div id="wp-content" class="wp-content clearfix">
            <?php 
               get_template_part('templates/page/single');
            ?>
         </div>    
      </div>      
   </div>   
   <?php do_action('conult_after_page_content'); ?>
</section>

<?php get_footer(); ?>