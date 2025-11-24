# shadcn/ui Vite React 프로젝트

이 프로젝트는 Vite와 React, [shadcn/ui](https://ui.shadcn.com)로 구성된 빈 프로젝트입니다.

## 기술 스택

- **Vite** - 빠른 빌드 도구
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 컴포넌트 라이브러리

## 시작하기

의존성을 설치하세요:

```bash
npm install
```

개발 서버를 실행하세요:

```bash
npm run dev
```

브라우저에서 표시된 URL(일반적으로 [http://localhost:5173](http://localhost:5173))을 열어 결과를 확인하세요.

## 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 미리보기

프로덕션 빌드를 미리보려면:

```bash
npm run preview
```

## shadcn/ui 컴포넌트 추가

새로운 shadcn/ui 컴포넌트를 추가하려면:

```bash
npx shadcn@latest add [component-name]
```

예시:

```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

## 프로젝트 구조

```
.
├── public/          # 정적 파일
├── src/            # 소스 코드
│   ├── components/ # React 컴포넌트
│   │   └── ui/     # shadcn/ui 컴포넌트
│   ├── lib/        # 유틸리티 함수
│   │   └── utils.ts # cn 함수 (클래스 병합)
│   ├── App.tsx     # 메인 앱 컴포넌트
│   ├── main.tsx    # 진입점
│   └── index.css   # 전역 스타일 (Tailwind 포함)
├── index.html      # HTML 템플릿
├── vite.config.ts   # Vite 설정
├── tailwind.config.js # Tailwind 설정
├── postcss.config.js   # PostCSS 설정
└── components.json     # shadcn/ui 설정
```

## 테마

이 프로젝트는 **light 모드**를 기본으로 설정되어 있습니다. HTML 요소에 `class="light"`가 적용되어 있습니다.

다크 모드로 전환하려면 HTML 요소의 클래스를 `dark`로 변경하거나, JavaScript로 동적으로 전환할 수 있습니다.

## 참고 자료

- [Vite 문서](https://vite.dev)
- [React 문서](https://react.dev)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
