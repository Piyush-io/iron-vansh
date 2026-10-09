<?php
/**
	*
	* @author     Gaviasthemes Team     
	* @copyright  Copyright (C) 2022 Gaviasthemes. All Rights Reserved.
	* @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
	* 
 */
get_header(); 
 ?>

<section id="wp-main-content" class="clearfix main-page">
	<?php do_action( 'conult_page_breacrumb' ); ?>
	<div class="container-full">  
		<div class="main-page-content">
		  	<div class="content-page">      
			 	<div id="wp-content" class="wp-content clearfix">
					<?php while ( have_posts() ) : the_post(); ?>
					  	<div class="portfolio-content">
						 	<div class="content-inner">
								<?php the_content() ?>
						 	</div>
					  	</div>  
					<?php endwhile; ?>  

					<?php 
					  	if( comments_open() || get_comments_number() ) {
						 	comments_template();
					  	}
					?>
					<?php conult_post_nav(); ?>
			 	</div>    
		  	</div>      
		</div>   
	</div>
</section>

<?php get_footer(); ?>
