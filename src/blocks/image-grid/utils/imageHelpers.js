/**
 * Utility functions for image handling
 */

/**
 * Creates a handler for selecting an image
 * @param {Function} setAttributes - Function to update block attributes
 * @param {number}   imageNumber   - The image number (1-4)
 * @return {Function} Handler function for image selection
 */
export const createSelectImageHandler = ( setAttributes, imageNumber ) => ( media ) => {
    setAttributes( {
        [ `image${ imageNumber }Id` ]: media.id,
        [ `image${ imageNumber }Url` ]: media.url,
        [ `image${ imageNumber }Alt` ]: media.alt || '',
    } );
};

/**
 * Creates a handler for removing an image
 * @param {Function} setAttributes - Function to update block attributes
 * @param {number}   imageNumber   - The image number (1-4)
 * @return {Function} Handler function for image removal
 */
export const createRemoveImageHandler = ( setAttributes, imageNumber ) => () => {
    setAttributes( {
        [ `image${ imageNumber }Id` ]: 0,
        [ `image${ imageNumber }Url` ]: '',
        [ `image${ imageNumber }Alt` ]: '',
    } );
};

/**
 * Creates a handler for updating image alt text
 * @param {Function} setAttributes - Function to update block attributes
 * @param {number}   imageNumber   - The image number (1-4)
 * @return {Function} Handler function for alt text update
 */
export const createUpdateAltHandler = ( setAttributes, imageNumber ) => ( value ) => {
    setAttributes( {
        [ `image${ imageNumber }Alt` ]: value,
    } );
};

/**
 * Parse numeric value from a dimension string
 * @param {string} value - The dimension value (e.g., '100px', 'auto')
 * @return {number|null} The numeric value or null
 */
export const getNumericValue = ( value ) => {
    if ( ! value || value === 'auto' ) {
        return null;
    }
    return parseInt( value );
};

/**
 * Extract image data from attributes
 * @param {Object} attributes - Block attributes
 * @return {Array} Array of image objects
 */
export const extractImagesFromAttributes = ( attributes ) => {
    const {
        image1Id,
        image1Url,
        image1Alt,
        image2Id,
        image2Url,
        image2Alt,
        image3Id,
        image3Url,
        image3Alt,
        image4Id,
        image4Url,
        image4Alt,
    } = attributes;

    return [
        { id: image1Id, url: image1Url, alt: image1Alt },
        { id: image2Id, url: image2Url, alt: image2Alt },
        { id: image3Id, url: image3Url, alt: image3Alt },
        { id: image4Id, url: image4Url, alt: image4Alt },
    ];
};

/**
 * Handle multiple image selection for placeholder
 * @param {Array|Object} media         - Selected media item(s)
 * @param {Object}       attributes    - Current block attributes
 * @param {Function}     setAttributes - Function to update block attributes
 */
export const handlePlaceholderImageSelection = ( media, attributes, setAttributes ) => {
    if ( Array.isArray( media ) ) {
        const updates = {};
        media.slice( 0, 4 ).forEach( ( img, index ) => {
            const num = index + 1;
            updates[ `image${ num }Id` ] = img.id;
            updates[ `image${ num }Url` ] = img.url;
            updates[ `image${ num }Alt` ] = img.alt || '';
        } );
        setAttributes( updates );
    } else {
        // Single image - add to first empty slot
        for ( let i = 1; i <= 4; i++ ) {
            if ( ! attributes[ `image${ i }Url` ] ) {
                setAttributes( {
                    [ `image${ i }Id` ]: media.id,
                    [ `image${ i }Url` ]: media.url,
                    [ `image${ i }Alt` ]: media.alt || '',
                } );
                break;
            }
        }
    }
};