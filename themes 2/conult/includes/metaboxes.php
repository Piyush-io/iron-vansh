<?php
function conult_register_meta_boxes(){
	$prefix = 'conult_';
	global $meta_boxes;
	$meta_boxes = array();

	/* ====== Metabox Template ====== */
	$meta_boxes[] = array(
		'id'    => 'gavias_metaboxes_page',
		'title' => esc_html__('Page Meta', 'conult'),
		'pages' => array( 'gva__template'),
		'priority'   => 'high',
		'fields' => array(
			array(
				'name' => esc_html__('Template Type', 'conult'),
				'id'   => "gva_template_type",
				'type' => 'text'
			),
		)
	);

	/* ====== Metabox Page ====== */
	$meta_boxes[] = array(
		'id'    => 'gavias_metaboxes_page',
		'title' => esc_html__('Page Meta', 'conult'),
		'pages' => array( 'page'),
		'priority'   => 'high',
		'fields' => array(
			array(
				'name' => esc_html__('Layout Page', 'conult'),
				'id'   => "{$prefix}template_layout",
				'type' => 'select',
				'options' => conult_get_page_layout(),
				'desc' => esc_html__('Use "_Default Page Content" when create page content default without Elementor Page Builder', 'conult'),
				'multiple' => false,
				'std'  => '',
			),
			array(
				'name' => esc_html__('Extra page class', 'conult'),
				'id' => $prefix . 'extra_page_class',
				'desc' => esc_html__("If you wish to add extra classes to the body class of the page (for custom css use), then please add the class(es) here.", 'conult'),
				'clone' => false,
				'type'  => 'text',
				'std' => '',
			),
		)
	);

	/* ====== Metabox Page Title ====== */
	$meta_boxes[] = array(
		'id' => 'gavias_metaboxes_page_heading',
		'title' => esc_html__('Page Title & Breadcrumb', 'conult'),
		'pages' => array( 'post', 'page', 'product', 'portfolio', 'tribe_events'),
		'context' => 'normal',
		'priority'   => 'high',
		'fields' => array(
		  	array(
				'name' => esc_html__('Remove Title of Page', 'conult'),   
				'id'   => "{$prefix}disable_page_title",
				'type' => 'switch',
				'std'  => 0,
		  	),
		  	array(
			 	'name' => esc_html__('Disable Breadcrumbs', 'conult'),
			 	'id'   => "{$prefix}no_breadcrumbs",
			 	'type' => 'switch',
			 	'desc' => esc_html__('Disable the breadcrumbs from under the page title on this page.', 'conult'),
			 	'std' => 0,
		  	),
		  	array(
			 	'name' => esc_html__('Breadcrumb Layout', 'conult'),
			 	'id'   => "{$prefix}breadcrumb_layout",
			 	'type' => 'select',
			 	'options' => array(
				 	'layout_options'    => esc_html__('Default Options in Layout Template', 'conult'),
				 	'page_options'      => esc_html__('Individuals Options This Page', 'conult')
			 	),
			 	'multiple' => false,
			 	'std'  => 'theme_options',
			 	'desc' => esc_html__('You can use breadcrumb settings default in Layout Template or individuals this page', 'conult')
		  	),
		  	array(
			 	'name' 	=> esc_html__( 'Background Overlay Color', 'conult' ),
			 	'id'   	=> "{$prefix}conult_breacrumb_bg_color",
			 	'desc' 	=> esc_html__( "Set an overlay color for hero heading image.", 'conult' ),
			 	'type' 	=> 'color',
			 	'class' => 'breadcrumb_setting',
			 	'std'  	=> '',
		  	),
		  	array(
			 	'name'       => esc_html__( 'Overlay Opacity', 'conult' ),
			 	'id'         => "{$prefix}breacrumb_bg_opacity",
			 	'desc'       => esc_html__( 'Set the opacity level of the overlay. This will lighten or darken the image depening on the color selected.', 'conult' ),
			 	'clone'      => false,
			 	'type'       => 'slider',
			 	'prefix'     => '',
			 	'class'   	  => 'breadcrumb_setting',
			 	'js_options' => array(
				  	'min'  => 0,
				  	'max'  => 100,
				  	'step' => 1,
			 	),
			 	'std'   => '50'
		  	),
		  	array(
			 	'name'  	=> esc_html__('Breadcrumb Background Image', 'conult'),
			 	'id'    	=> "{$prefix}conult_breacrumb_image",
			 	'type'  	=> 'image_advanced',
			 	'class'   	=> 'breadcrumb_setting',
			 	'max_file_uploads' => 1
		  	),
		)
	);

	return $meta_boxes;
 }  
  /********************* META BOX REGISTERING ***********************/
  add_filter( 'rwmb_meta_boxes', 'conult_register_meta_boxes' , 99 );

