<?php
Redux::setSection( $opt_name, array(
	'title' => esc_html__('General Options', 'conult'),
	'icon' => 'el-icon-wrench',
	'fields' => array(
		array(
			'id'           => 'page_layout',
			'type'         => 'button_set',
			'title'        => esc_html__('Page Layout', 'conult'),
			'subtitle'     => esc_html__('Select the page layout type', 'conult'),
			'options'      => array(
				'boxed'     => esc_html__('Boxed', 'conult'),
				'fullwidth' => esc_html__('Fullwidth', 'conult')
			),
			'default' => 'fullwidth'
		),
      array(
        'id' => 'map_api_key',
        'type' => 'text',
        'title' => esc_html__('Google Map API key', 'conult'),
        'default' => ''
      ),

		// Breadcrumb Default Settings
		array(
         'id'     => 'breadcrumb_default',
         'type'   => 'info',
         'icon'   => true,
         'raw'    => '<h3 class="margin-bottom-0">' . esc_html__('Breadcrumb Settings Without Elementor', 'conult') . '</h3>',
      ),
		array(
         'id'        => 'breadcrumb_title',
         'type'      => 'button_set',
         'title'     => esc_html__('Breadcrumb Title', 'conult'),
         'options'   => array(
            1 => esc_html__('Enable', 'conult'),
            0 => esc_html__('Disable', 'conult')
         ),
         'default'   => 1
      ),
      array(
         'id'        => 'breadcrumb_padding_top',
         'type'      => 'slider',
         'title'     => esc_html__('Breadcrumb Padding Top', 'conult'),
         'default'   => 120,
         'min'       => 50,
         'max'       => 500,
         'step'      => 1,
         'display_value' => 'text',
      ),
      array(
         'id'        => 'breadcrumb_padding_bottom',
         'type'      => 'slider',
         'title'     => esc_html__('Breadcrumb Padding Top', 'conult'),
         'default'   => 120,
         'min'       => 50,
         'max'       => 500,
         'step'      => 1,
         'display_value' => 'text',
      ),
      array(
         'id'        => 'breadcrumb_bg_color',
         'type'      => 'color',
         'title'     => esc_html__('Background Overlay Color', 'conult'),
         'default'   => ''
      ),
      array(
         'id'        => 'breadcrumb_bg_opacity',
         'type'      => 'slider',
         'title'     => esc_html__('Breadcrumb Ovelay Color Opacity', 'conult'),
         'default'   => 50,
         'min'       => 0,
         'max'       => 100,
         'step'      => 2,
         'display_value' => 'text',
      ),
      array(
         'id'        => 'breadcrumb_bg_image',
         'type'      => 'media',
         'url'       => true,
         'title'     => esc_html__('Breadcrumb Background Image', 'conult'),
         'default'   => '',
      ),
      array(
         'id'        => 'breadcrumb_text_stype',
         'type'      => 'select',
         'title'     => esc_html__('Breadcrumb Text Stype', 'conult'),
         'options'   => 
         array(
            'text-light'     => esc_html__('Light', 'conult'),
            'text-dark'      => esc_html__('Dark', 'conult')
         ),
         'default' => 'text-light'
      )
	)
));