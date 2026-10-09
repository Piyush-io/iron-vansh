<?php 
	$conult_options = conult_get_options();
?>

<div class="header-mobile header_mobile_screen">
  	
  	<?php if(conult_get_option('hm_show_topbar') == 'yes'){ ?>

		<div class="topbar-mobile">
			<div class="topbar-content-inner">
				
				<?php if(conult_get_option('hm_topbar_information', '')){ ?>
					<div class="topbar-left">
						<div class="content-inner topbar-information">
							<?php echo html_entity_decode(conult_get_option('hm_topbar_information')) ?>
						</div>
					</div>
				<?php } ?>

				<div class="topbar-right">

					<ul class="socials-2">
					   <?php if(conult_get_option('hm_social_facebook', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_facebook', '')); ?>"><i class="fab fa-facebook-square"></i></a></li>
					   <?php } ?> 

					   <?php if(conult_get_option('hm_social_instagram', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_instagram', '')); ?>"><i class="fab fa-instagram"></i></a></li>
					   <?php } ?>  

					   <?php if(conult_get_option('hm_social_twitter', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_twitter', '')); ?>"><i class="fab fa-twitter"></i></a></li>
					   <?php } ?>  

					   <?php if(conult_get_option('hm_social_linkedin', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_linkedin', '')); ?>"><i class="fab fa-linkedin"></i></a></li>
					   <?php } ?> 

					   <?php if(conult_get_option('hm_social_pinterest', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_pinterest', '')); ?>"><i class="fab fa-pinterest"></i></a></li>
					   <?php } ?> 
				
					   <?php if(conult_get_option('hm_social_tumblr', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_tumblr', '')); ?>"><i class="fab fa-tumblr-square"></i></a></li>
					   <?php } ?>

					   <?php if(conult_get_option('hm_social_vimeo', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_vimeo', '')); ?>"><i class="fab fa-vimeo"></i></a></li>
					   <?php } ?>

					    <?php if(conult_get_option('hm_social_youtube', '')){ ?>
					     <li><a href="<?php echo esc_url(conult_get_option('hm_social_youtube', '')); ?>"><i class="fab fa-youtube"></i></a></li>
					   <?php } ?>
					</ul>

				</div>
				
			</div>
		</div>

	<?php } ?>	

  	<div class="header-mobile-content">
		<div class="header-content-inner clearfix"> 
		 
		  	<div class="header-left">
				<div class="logo-mobile">
					<?php $logo_mobile = (isset($conult_options['hm_logo']['url']) && $conult_options['hm_logo']['url']) ? $conult_options['hm_logo']['url'] : get_template_directory_uri().'/assets/images/logo-mobile.png' ; ?>
				  	<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
					 	<img src="<?php echo esc_url($logo_mobile); ?>" alt="<?php bloginfo( 'name' ); ?>" />
				  	</a>
				</div>
		  	</div>

		  	<div class="header-right">
				<?php get_template_part('templates/parts/canvas-mobile'); ?>
		  	</div>
		</div>  
  	</div>
</div>