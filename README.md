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

1.  사용자는 루트 경로의 `__posts` 폴더에 작성된 마크다운 파일(.md)을 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다.

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

1. `__posts` 폴더

- `__posts` 폴더 내부에 `.md` 확장자를 가진 파일을 작성하였습니다. 파일에는 게시글의 메타 데이터와 본문이 마크다운으로 작성되어 있습니다.

```md
---
categories:
  - Development
date: '2023-07-10'
description: 설명을 적어주세요.
title: Next.js로 블로그 만들기
---

**_content_**
```

2. 목록 페이지와 상세 페이지 만들기

- `src/pages` 폴더 안에 작성된 파일은 그대로 페이지가 됩니다.
- `index.tsx` 페이지는 `yarn dev`나 `npm run dev` 로 실행했을 때 http://localhost:3000 주소에서 볼 수 있는 페이지입니다. [getStaticProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)를 이용하면 빌드 시 `getStaticProps`에서 반환된 props를 이용하여 빌드 시 미리 렌더링을 진행합니다.

```tsx
export async function getStaticProps() {
  const posts = getAllPost()
  return {
    props: {
      posts,
    },
  }
}
```

- `[id].tsx` 페이지는 동적 라우팅 규칙이 적용되어 id에 따라 다른 페이지를 보여줍니다. 상세 페이지 경로를 얻어내기 위해 [getStaticPaths](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)를 이용합니다.

```tsx
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}
```

`getAllPostIds()` 함수는 `__posts` 폴더에서 `.md` 확장자를 제거하여 파일명을 id로 받는 함수입니다.

```tsx
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}
```

3. 마크다운 변환하기

- `.md` 확장자를 가진 마크다운을 보여주기 위해서는 먼저 사용할 수 있도록 변환해주어야 합니다.
- [grey-matter](https://www.npmjs.com/package/gray-matter)를 적용하면 meta data를 파싱해줍니다.

- matter 적용 전

```tsx
---
date: '2023-07-10'
description: 설명을 적어주세요.
title: Next.js로 블로그 만들기
---

# 제목 1
```

- matter 적용 후

```tsx
{
data: {
  date: '2023-07-10',
  description: '설명을 적어주세요.',
  title: 'Next.js로 블로그 만들기'
 },
content: '\n# 제목 1\n'
}
```

내용 부분은 HTML 형태의 텍스트로 변환해주어야 합니다. 마크다운을 처리하는 `remark`와 HTML을 처리하는 `remark-html` 라이브러리를 사용하였습니다.

```tsx
const remarkedContent = await remark().use(html).process(matterResult.content)
const contentHtml = remarkedContent.toString()
```

- remark 적용

```tsx
 VFile {
    ...
    value: '<h1>제목 1</h1>\n'
}
```

- toString 적용:

```tsx
<h1>제목 1</h1>
```

- 실제 페이지에서는 [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) 속성을 이용합니다.

```tsx
<div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
```

<p>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
</p>
