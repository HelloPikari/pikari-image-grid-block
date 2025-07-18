/**
 * WordPress dependencies
 */
import {registerBlockType} from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './editor';

/**
 * Register the block
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null, // Dynamic block - no save function needed
} );
