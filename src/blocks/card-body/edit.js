/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InnerBlocks, useBlockProps, __experimentalBlockVariationPicker } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utkwds/button', 'core/paragraph', 'utkwds/card-heading', 'core/list', 'core/quote', 'utkwds/lead', 'utkwds/horizontal-rule', 'utksds/button', 'card/heading', 'lead/main', 'horizontal-rule/main' ];

const HEADING_TEMPLATE = [
	[ 'core/heading', { className: 'card-title' } ],
];

const TOP_CAP_TEMPLATE = [
	[ 'core/image', { className: 'card-img-top' } ],
];

const IMAGE_TEMPLATE = [
	[ 'core/image', { className: 'card-img' } ],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes,
		context,
		setAttributes
	  } = props;

	  const blockProps = useBlockProps();

	  if( context['card/cardOutline'] === true ){
		const thisColor = context['card/cardColor'].slug.replace('border-', 'text-');
		setAttributes( { textColor:thisColor } );
	}

	if( context['card/cardOutline'] === false ){
		attributes.textColor = '';
	}

		return (
			<div { ...blockProps }>
			<div className={ 'card-body ' + attributes.textColor }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } placeholder={ 'Click the + button to add a title, text, button, or other body component.' } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
			</div>
		);
}
