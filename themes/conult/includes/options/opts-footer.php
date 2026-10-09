<?php
Redux::setSection( $opt_name, array(
  	'title' => esc_html__('Footer Options', 'conult'),
  	'icon' => 'el-icon-compass',
  	'fields' => array(
	 	array(
			'id' 			=> 'copyright_default',
			'type' 		=> 'button_set',
			'title' 		=> esc_html__('Enable/Disable Copyright Text', 'conult'),
			'options' 	=> array(
				'yes' 	=> esc_html__('Enable', 'conult'),
				'no' 		=> esc_html__('Disable', 'conult')
			),
			'default' 	=> 'yes'
	 	),
	 	array(
			'id' 			=> 'copyright_text',
			'type' 		=> 'editor',
			'title' 		=> esc_html__('Footer Copyright Text', 'conult'),
			'default' 	=> esc_html__('Copyright - 2022 - Company - All rights reserved. Powered by WordPress.', 'conult')
	 	),
  	)
));