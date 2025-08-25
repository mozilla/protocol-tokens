module.exports = {
    rules: {
        'color-no-invalid-hex': true,
        'font-family-no-duplicate-names': true,
        'font-family-name-quotes': 'always-where-recommended',
        'function-name-case': 'lower',
        'function-url-no-scheme-relative': true,
        'function-url-quotes': 'always',
        'length-zero-no-unit': true,
        'unit-no-unknown': true,
        'property-no-unknown': true,
        'keyframe-declaration-no-important': true,
        'declaration-no-important': true,
        'declaration-block-no-shorthand-property-overrides': true,
        'declaration-block-single-line-max-declarations': 1,
        'block-no-empty': true,
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-element-no-unknown': true,
        'selector-type-no-unknown': true,
        'media-feature-name-no-unknown': [
            true,
            {
                ignoreMediaFeatureNames: ['min--moz-device-pixel-ratio']
            }
        ],
        'comment-no-empty': true,
        'max-nesting-depth': 5,
        'no-invalid-double-slash-comments': true,
        'no-unknown-animations': true
    }
};
