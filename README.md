# Next-Blog 구현 과제

Next.js의 SSG를 이용하여 마크다운 블로그를 만드는 과제입니다.

[배포 링크](https://main--untitled-sena.netlify.app/)

## 목차

- [실행 방법](#실행-방법)
- [요구사항](#요구사항)
- [구현 내용](#구현-내용)

## 실행 방법

```javascript
// 설치
$ npm install
// 실행
$ npm run dev
```

## 요구사항

1.  사용자는 루트 경로의 \_\_posts 폴더에 작성된 마크다운 파일(.md)을 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다.

2.  블로그에 작성된 게시물을 렌더링하는 목록 페이지와 개별 게시물을 렌더링하는 상세 페이지로 나누어 작성해주세요.

- `/` - 목록 페이지
- `/[id]` - 상세 페이지
- 마크다운을 JavaScript로 변환해주는 도구는 `remark`(마크다운 Parser), `remark-html`(remark로 파싱한 데이터를 html로 변환) 을 참고
- 각 마크다운의 meta data는 `gray-matter`, `frontmatter` 참고
- 마크다운을 React에 삽입할 때는 `dangerouslySetInnerHTML` 을 사용 ([참고 링크](https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml))
- (추가 구현) 코드 하이라이터는 `highlight.js`, `prism.js` 를 참고

- Next.js 12에서 지원하는 Prefetching 메서드를 적절히 사용해주세요.
  - Next.js 13을 설치하고 Pages Router를 사용하셔도 됩니다.
  - 정적 페이지를 생성할 때 필요한 데이터 생성 → `getStaticProps`
  - 각 포스트를 그려줄 상세 페이지 경로를 생성 → `getStaticPaths`

## 구현 내용

- 추가 예정입니다.

<p>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
</p>
