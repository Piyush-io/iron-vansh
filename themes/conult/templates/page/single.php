<?php
/**
 * @author     Gaviasthemes Team     
 * @copyright  Copyright (C) 2022 Gaviasthemes. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 */

$disable_page_title = false;
if (metadata_exists('post', get_the_ID(), 'conult_disable_page_title')){
  $disable_page_title = get_post_meta(get_the_ID(), 'conult_disable_page_title', true);
}
?>

<div class="single-page-template">
	<?php do_action( 'conult_page_breacrumb' ); ?>
	<div class="container single-content-inner">
		<div class="row">
			<div class="col-12">
				<?php if(have_posts()) : the_post(); ?>
					<div <?php post_class( 'clearfix' ); ?> id="<?php echo esc_attr(get_the_ID()); ?>">

						<?php if(!$disable_page_title){ ?>
			          	<h1 class="title"><?php the_title(); ?></h1>
			        <?php } ?>

						<?php the_content(); ?>

						<div class="link-pages"><?php wp_link_pages(); ?></div>

						<div class="comment-page-wrapper clearfix">
							<?php
								if(comments_open() || get_comments_number()){
									comments_template();
								}          
							?>
						</div>

					</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>				