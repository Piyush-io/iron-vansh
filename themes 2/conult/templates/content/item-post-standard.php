<?php 
   global $post;

   $thumbnail = 'post-thumbnail';

   $thumbnail = (isset($thumbnail_size) && $thumbnail_size) ? $thumbnail_size : 'conult_medium';
   $excerpt_words = (isset($excerpt_words) && $excerpt_words) ? $excerpt_words : 30;

   $meta_classes = 'entry-meta';
   if(empty(get_the_date())){
      $meta_classes = 'entry-meta schedule-date';
   }
   $content_classes = 'entry-content';
   $content_classes .= has_post_thumbnail() ? ' has-thumbnail' : ' has-no-thumbnail';
   $desc = conult_limit_words($excerpt_words, get_the_excerpt(), '');
?>

   <article id="post-<?php echo esc_attr(get_the_ID()); ?>" <?php post_class('post post-style-standard'); ?>>
      
      <?php if(has_post_thumbnail()){ ?>
         <div class="post-thumbnail">
            <a href="<?php echo esc_url( get_permalink() ) ?>">
               <?php the_post_thumbnail( $thumbnail, array( 'alt' => get_the_title() ) ); ?>
            </a>
         </div>   
      <?php } ?>   

      <div class="<?php echo esc_attr($content_classes) ?>">
         <div class="content-inner">
            <div class="<?php echo esc_attr($meta_classes) ?>">
               <?php conult_posted_on_2(); ?>
            </div> 
            <h3 class="entry-title"><a href="<?php echo esc_url( get_permalink() ) ?>" rel="bookmark"><?php the_title() ?></a></h3>
            <?php if($desc){ ?>
               <div class="entry-desc">
                  <?php echo esc_html($desc) ?>
               </div>   
            <?php } ?>
            <div class="read-more">
               <a class="btn-border" href="<?php echo esc_url( get_permalink() ) ?>"><?php echo esc_html__('Read more', 'conult'); ?></a>
            </div>
         </div>

      </div>
   </article>   

  