## webSocket 연습
### 초기 설정
npm init -y
npm i nodemon -D
touch babel.config.json
touch nodemon.json
mkdir src -> server.js


### ._.) 바벨이란? 
#### 자바스크립트 컴파일러, 소스 대 소스 컴파일러
바벨은 새로운 문법이나 타입스크리트 혹은 JSX 같이 다른 언어로 분류되는 언어들에 대해서도 모든 브라우저에서 동작할 수 있도록 호환성을 지켜줍니다.
바벨 동작은 다음 세단계로 구분됩니다.
* 파싱 (parsing) : 코드를 읽고 추상 구문 트리(AST)로 변환하는 단계
* 변환 (Transsforming) : 추상 구문 트리를 변경하는 단계
* 출력 (Printing) : 변경된 결과물을 출력하는 단계
