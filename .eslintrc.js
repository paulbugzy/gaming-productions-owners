module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'airbnb', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', 'react-hooks', 'simple-import-sort'],
	ignorePatterns: ['src/shared'],
	rules: {
		indent: 'off',
		semi: [2, 'never'],
		'no-unused-vars': 'off',
		'no-tabs': 'off',
		'no-nested-ternary': 'off',
		'comma-dangle': 'off',
		'arrow-parens': 'off',
		'arrow-body-style': 'off',
		'no-console': 'off',
		'no-underscore-dangle': 'off',
		'object-curly-newline': 'off',
		'prefer-destructuring': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'consistent-return': 'off',
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-filename-extension': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
		'react/function-component-definition': 'off',
		'react/destructuring-assignment': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-indent-props': [2, 'tab'],
		'react/button-has-type': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/forbid-prop-types': 'off',
		'import/prefer-default-export': 'off',
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'react/no-array-index-key': 'off',
		'jsx-a11y/label-has-associated-control': 'off'
	}
}
