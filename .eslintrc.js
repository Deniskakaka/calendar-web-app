module.exports = {
    extends: 'eslint-config-airbnb-base',
    rules: {
        'no-console': 1,
        'eqeqeq': 1,
        'import/prefer-default-export': 0
    },
    env: {
        browser: true
    }
};