module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		// "eslint:recommended",
		// "plugin:react/recommended",
		// "plugin:@typescript-eslint/recommended",
		// "airbnb",
		// "prettier"
	],
	"overrides": [
		{
			"files": ["*.ts", "*.tsx", "*.js"]
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": ["react", "@typescript-eslint"],
	"rules": {
		"no-console": "error",
		"camelcase": "warn",
		"no-debugger" : "error",
		"no-alert":"warn",
		"max-lines-per-function": ["warn", { "max": 350 }]
	}
}

