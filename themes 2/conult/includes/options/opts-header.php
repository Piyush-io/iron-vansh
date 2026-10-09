<?php
	 function conult_get_all_menus(){
     $menus = get_terms( 'nav_menu', array( 'hide_empty' => true ) ); 
     $results = array();
     foreach ($menus as $key => $menu) {
      $results[$menu->slug] = $menu->name;
     }
     return $results;
  }
  	Redux::setSection( $opt_name, array(
	 	'title' 	=> esc_html__('Header Options', 'conult'),
	 	'icon' 	=> 'el-icon-compass',
	 	'fields' => array(
			array(
			  'id' 		=> 'header_logo', 
			  'type' 	=> 'media',
			  'url' 		=> true,
			  'title' 	=> esc_html__('Logo in header default', 'conult'), 
			  'default' => ''
			),  
			array(
			  'id'  		=> 'header_mobile_settings',
			  'type'  	=> 'info',
			  'raw' 		=> '<h3 class="margin-bottom-0">' . esc_html__('Header Mobile settings', 'conult') . '</h3>'
			),
			array(
			  'id' 		=> 'hm_logo',
			  'type' 	=> 'media',
			  'url' 		=> true,
			  'title' 	=> esc_html__('Header Mobile | Logo', 'conult'),
			  'default' => ''
			),
			array(
			  'id' 		=> 'hm_show_topbar',
			  'type' 	=> 'button_set',
			  'title' 	=> esc_html__('Show Topbar', 'conult'),
			  'options' => array('yes' => 'Enable', 'no' => 'Disable'),
			  'default' => 'yes'
			),
			array(
	        'id' 		=> 'hm_topbar_information',
	        'type' 	=> 'editor',
	        'title' 	=> esc_html__('Topbar Information', 'conult'),
	        'default' => '<ul class="inline"><li><i class="fa fa-envelope"></i>contact@example.com</li><li><i class="fa fa-phone"></i>666 888 0000</li></ul>'
	      ),
			
			//-- Socials --
			array(
			  'id'  		=> 'header_mobile_socials_settings',
			  'type'  	=> 'info',
			  'raw' 		=> '<h3 class="margin-bottom-0">' . esc_html__('Social Header Mobile Settings', 'conult') . '</h3>'
			),
			array(
				'id'			=> 'hm_social_facebook',
				'type' 		=> 'text',
				'title' 		=> esc_html__('Facebook', 'conult'),
				'desc'		=> esc_html__('Enter your Facebook profile URL.', 'conult'),
				'default'	=> ''
			),
			array(
				'id'			=> 'hm_social_instagram',
				'type'		=> 'text',
				'title'		=> esc_html__('Instagram', 'conult'),
				'desc'		=> esc_html__('Enter your Instagram profile URL.', 'conult'),
				'default'	=> ''
			),
			array(
				'id'			=> 'hm_social_twitter',
				'type'		=> 'text',
				'title'		=> esc_html__('Twitter', 'conult'),
				'desc'		=> esc_html__('Enter your Twitter profile URL.', 'conult'),
				'default'	=> ''
			),
			array(
				'id'			=> 'hm_social_linkedin',
				'type'		=> 'text',
				'title'		=> esc_html__('LinedIn', 'conult'),
				'desc'		=> esc_html__('Enter your LinkedIn profile URL.', 'conult'),
				'default'	=> ''
			),
			array(
				'id'			=> 'hm_social_pinterest',
				'type'		=> 'text',
				'title'		=> esc_html__('Pinterest', 'conult'),
				'desc'		=> esc_html__('Enter your Pinterest profile URL.', 'conult'),
				'default'	=> ''
			),
			array(
				'id'			=> 'hm_social_tumblr',
				'type'		=> 'text',
				'title'		=> esc_html__('Tumblr', 'conult'),
				'desc'		=> esc_html__('Enter your Tumblr profile URL.', 'conult'),
				'default'	=> ''
			),
			array(
				'id'			=> 'hm_social_vimeo',
				'type'		=> 'text',
				'title'		=> esc_html__('Vimeo', 'conult'),
				'desc'		=> esc_html__('Enter your Vimeo profile URL.', 'conult'),
				'default'	=> ''
			),
			array(
				'id'			=> 'hm_social_youtube',
				'type'		=> 'text',
				'title'		=> esc_html__('YouTube', 'conult'),
				'desc'		=> esc_html__('Enter your YouTube profile URL.', 'conult'),
				'default'	=> ''
			)
	 	)
  	));