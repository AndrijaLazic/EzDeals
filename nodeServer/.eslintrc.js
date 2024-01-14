module.exports= 
  {
	   root:true,
      parser:"@typescript-eslint/parser",
      plugins:[
        "@typescript-eslint"
      ],
      "env": {
        "browser": true,
        "amd": true,
        "node": true
      },
      extends:[
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
      ],
      parserOptions:{
        ecmaVersion:2020,
        "sourceType":  "module"
      },
      rules: {
          semi: [2,"always"],
          "space-before-function-paren": ["error", "never"],
          "@typescript-eslint/no-non-null-assertion": "off",
          "@typescript-eslint/no-namespace": "off",
          "@typescript-eslint/explicit-module-boundary-types": "off",
          '@typescript-eslint/no-var-requires': 0,
      }
  };
