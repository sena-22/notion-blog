# Next-Blog 구현 과제

Next.js를 마크다운 블로그를 만드는 과제입니다.

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

- Page Router로 작성된 코드를 Next.js 13 버전의 App Router로 변경해보세요.
- getStaticPaths는 generateStaticParams로 대체해주세요.
- SEO 설정을 위해 generateMetadata를 사용해주세요.

## 구현 내용

> [app router 마이그레이션 가이드](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)를 참고하였습니다.

1. app 폴더를 만들고 `_app.tsx`, `_document.tsx` 를 대체할 `layout.tsx` 파일 만들기

- 루트 레이아웃에는 `<html>`,`<body>` 태그가 정의되어야 합니다.

```tsx
import {Metadata} from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: "Sena's Blog",
  description: 'untitled',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark:bg-zinc-900">{children}</body>
    </html>
  )
}
```

2. app 폴더에 들어갈 페이지 만들기

- `pages/index.tsx`는 `app/page.tsx`로 대체
- `pages/[slug].tsx`는 `app/[slog]/page.tsx`로 대체

3. fetch 변경

- `getServerSideProps`, `getStaticProps` 제거

<p>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
</p>
