module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "linebreak-style": 0, // Expected linebreaks to be 'LF' but found 'CRLF' 오류 안뜨게
    quotes: ["error", "double"], //더블 쿼터 사용
    "@typescript-eslint/quotes": ["error", "double"], //더블 쿼터 사용
    "no-unused-vars": "off", //사용안한 변수 경고 중복
    "spaced-comment": "off", //주석을 뒤에 쓰지 말라는 경고
    "@typescript-eslint/no-unused-vars": "warn", //사용안한 변수는 경고
    "react/no-array-index-key": "off", // key값으로 index를 사용할수 있다.
    "arrow-body-style": "off", //화살표 함수 안에 return을 사용 할 수 있다.
    "react/no-unescaped-entities": "off", //문자열 내에서 " ' > } 허용
    "react/jsx-one-expression-per-line": "off", //한라인에 여러개의 JSX를 사용 할 수 있다.
    "react/prop-types": "off", //proptypes를 사용하지 않는다.
    "implicit-arrow-linebreak": "off", // 화살표 함수 다음에 줄 바꿈을 사용할 수 있다.
    "react/react-in-jsx-scope": "off", // jsx를 사용하여도 React를 꼭 import 하지 않아도 된다.
    "react/jsx-props-no-spreading": "off", //props를 스프래드 할 수 있다.
    "jsx-a11y/anchor-is-valid": "off", // next js에서는 a에 href없이 사용
    "global-require": "off", //함수 내에서 require 사용가능
    "jsx-a11y/label-has-associated-control": "off",
    "no-confusing-arrow": "off",
    "react/jsx-curly-newline": "off",
    indent: "off",
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "function-declaration",
      },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "comma-dangle": "off",
    "import/no-unresolved": "off",
    "operator-linebreak": "off",
    "function-paren-newline": "off",
  },
};
