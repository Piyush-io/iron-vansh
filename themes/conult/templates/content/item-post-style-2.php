<?php 
   $thumbnail = isset($thumbnail_size) && $thumbnail_size ? $thumbnail_size : 'post-thumbnail';
?>

<article id="post-<?php echo esc_attr(get_the_ID()); ?>" <?php post_class('post post-style-2'); ?>>
   <div class="post-thumbnail" style="background-image:url('<?php echo get_the_post_thumbnail_url(get_the_ID(), $thumbnail) ?>');"></div>   
   <div class="entry-content">
      <div class="content-inner">
         <div class="entry-meta">
            <?php conult_posted_on_width_avata(); ?>
         </div> 
         <h2 class="entry-title">
            <a href="<?php echo esc_url( get_permalink() ) ?>"><?php the_title() ?></a>
         </h2>
      </div>
      <div class="read-more">
         <a href="<?php echo esc_url( get_permalink() ) ?>">
            <i class="icon las la-arrow-right"></i>
         </a>
      </div>
   </div>
   <a href="<?php echo esc_url( get_permalink() ) ?>" class="link-overlay"></a>
</article>   

  