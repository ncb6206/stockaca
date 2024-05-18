# Stockaca
> Next.js + Typescript + Firebase Stock SNS Service
- [배포 링크](https://stockaca.vercel.app)
```
테스트 계정

ID : test@naver.com 
PW : test1234!
```

## 📌 기술 스택 & 사용 라이브러리
  
|구분| 스택 & 라이브러리|
|--|--|
|언어| <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">|
|메인 라이브러리|<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">|
|기타 라이브러리|<img alt="Static Badge" src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black"> <img src="https://img.shields.io/badge/tanstack query-FF4154?style=for-the-badge"> <img src="https://img.shields.io/badge/justand-2359C6?style=for-the-badge&logo=justand"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge"> <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge"> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui"> 
|패키지 관리|<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm"> |
|배포| <img src="https://img.shields.io/badge/vercel-232F3E?style=for-the-badge&logo=vercel&logoColor=white">

<details>
<summary><b>기술 스택 선정 이유</b></summary>
<div markdown="1">

| 기술 스택 | 선정 이유 | 
|:---|:---:| 
| Next.js | - 각 피드의 게시물과 유저의 개인 프로필 페이지에 서버 사이드 렌더링(SSR)를 적용하여 초기 로딩 속도 개선과 검색 엔진 최적화(SEO)에 유리하게 하였습니다. <br/> - 프레임워크 안에 내장된 라우팅 시스템을 통해 프로젝트 구조화에 도움이 되었습니다. <br/> - Next/image, 코드 스플리팅, 프리페칭 등의 최적화 기능을 활용하여 성능을 향상시킬 수 있었습니다. | 
| TailwindCss | - 유틸리티 클래스 기반의 CSS 프레임워크로, 빠른 UI 개발과 일관된 디자인 시스템 구축에 효과적입니다. <br/> - 반응형 디자인을 위한 클래스를 제공하여 모바일 친화적인 개발이 가능했습니다. <br/> - CSS-in-JS 방식은 런타임에 스타일을 생성하고 적용하므로 서버 측 렌더링 시 추가 오버헤드가 발생할 수 있음. Tailwind CSS를 사용하면 별도의 JavaScript 런타임이 필요하지 않아 서버 부담을 줄일 수 있었습니다.  | 
| Tanstack Query(React Query) | - 데이터 fetching, 캐싱, 동기화를 처리할 수 있어 파이어베이스와의 연동이 수월하였습니다. <br/> - useQuery나 useMutation과 같은 선언적이고 직관적인 API를 제공하여 코드 가독성과 유지보수성을 높일 수 있었습니다. <br/> - enabled라는 옵션을 사용하여 해당 인자가 존재하지 않는 경우에는 fetch를 실행하지 않도록 하여 불필요한 요청을 줄일 수 있었습니다.  | 
| React Hook Form | - 폼 상태 관리와 유효성 검사를 간편하게 처리할 수 있어 코드의 양을 줄일 수 있었습니다. <br/> - 비제어 컴포넌트로 이루어져 있어 불필요한 렌더링 최소화로 성능 최적화를 할 수 있었습니다. <br/> - 회원가입, 로그인, 게시글 작성 폼에 사용하여 개발 생산성을 향상시킬 수 있었습니다.  | 
| Shadcn/UI | - 이 프로젝트에서는 Shadcn/UI의 다양한 컴포넌트를 활용하여 모달, 버튼, 스켈레톤 UI, 드롭다운 등의 UI 요소를 일관되고 세련되게 구현했습니다. | 
| Firebase (Authentication, Firestore, storage) | - 백엔드 인프라를 별도로 구축하지 않고도 인증, 데이터베이스, 스토리지 등의 기능을 제공하여 빠른 개발이 가능하기에 채택하였습니다. | 

</div>
</details>

## 📌 폴더 구조

<details>
<summary><b>폴더 구조</b></summary>


```
📦 
├─ .eslintignore
├─ .eslintrc.json
├─ .gitignore
├─ .husky
│  └─ pre-commit
├─ .prettierignore
├─ .prettierrc.cjs
├─ .vscode
│  └─ settings.json
├─ README.md
├─ app
│  ├─ (afterLogin)
│  │  ├─ [userId]
│  │  │  └─ post
│  │  │     └─ [postId]
│  │  │        ├─ _components
│  │  │        │  ├─ CommentList.tsx
│  │  │        │  ├─ SinglePost.tsx
│  │  │        │  └─ WriteComment.tsx
│  │  │        ├─ _hooks
│  │  │        │  ├─ useGetCommentList.ts
│  │  │        │  └─ useGetSinglePost.ts
│  │  │        ├─ _services
│  │  │        │  ├─ getCommentList.ts
│  │  │        │  └─ getPost.ts
│  │  │        ├─ edit
│  │  │        │  ├─ _components
│  │  │        │  │  └─ EditForm.tsx
│  │  │        │  ├─ _hooks
│  │  │        │  │  ├─ useEditForm.ts
│  │  │        │  │  └─ useEditPost.ts
│  │  │        │  └─ page.tsx
│  │  │        └─ page.tsx
│  │  ├─ _components
│  │  │  ├─ BackButton.tsx
│  │  │  ├─ CommentCount.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ LikeCount.tsx
│  │  │  ├─ NavigationBar.tsx
│  │  │  ├─ NavigationItem.tsx
│  │  │  ├─ PostCard.tsx
│  │  │  ├─ PostContent.tsx
│  │  │  ├─ PostCreatedAt.tsx
│  │  │  ├─ PostImages.tsx
│  │  │  ├─ PostSetting.tsx
│  │  │  ├─ PostUserImage.tsx
│  │  │  ├─ PostUserNickName.tsx
│  │  │  ├─ RQProvider.tsx
│  │  │  └─ RedirectToLogin.tsx
│  │  ├─ home
│  │  │  ├─ _components
│  │  │  │  ├─ FollowPostList.tsx
│  │  │  │  ├─ PostList.tsx
│  │  │  │  ├─ Tab.tsx
│  │  │  │  └─ TabDecider.tsx
│  │  │  ├─ _hooks
│  │  │  │  ├─ useFollowPostList.ts
│  │  │  │  ├─ useInfinitePostList.ts
│  │  │  │  ├─ usePostSetting.ts
│  │  │  │  └─ useToggleLike.ts
│  │  │  ├─ _services
│  │  │  │  ├─ deletePost.ts
│  │  │  │  ├─ getFollowingPostList.ts
│  │  │  │  ├─ getLike.ts
│  │  │  │  ├─ getPostList.ts
│  │  │  │  ├─ likePost.ts
│  │  │  │  ├─ unLikePost.ts
│  │  │  │  ├─ updatePost.ts
│  │  │  │  └─ writePost.ts
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ messages
│  │  │  ├─ [userId]
│  │  │  │  ├─ _components
│  │  │  │  │  ├─ MessageForm.tsx
│  │  │  │  │  ├─ MessageList.tsx
│  │  │  │  │  └─ UserInfo.tsx
│  │  │  │  ├─ _hooks
│  │  │  │  │  ├─ useEndScroll.ts
│  │  │  │  │  ├─ useMessageForm.ts
│  │  │  │  │  ├─ useMessageList.ts
│  │  │  │  │  ├─ useRoomId.ts
│  │  │  │  │  └─ useSendMessage.ts
│  │  │  │  ├─ _services
│  │  │  │  │  └─ sendMessage.ts
│  │  │  │  └─ page.tsx
│  │  │  ├─ _components
│  │  │  │  ├─ MessageRoom.tsx
│  │  │  │  └─ MessageRoomList.tsx
│  │  │  ├─ _hooks
│  │  │  │  └─ useMessageRooms.ts
│  │  │  ├─ _services
│  │  │  │  ├─ getMessageRooms.ts
│  │  │  │  └─ getRoomId.ts
│  │  │  └─ page.tsx
│  │  ├─ post
│  │  │  ├─ _components
│  │  │  │  └─ PostForm.tsx
│  │  │  ├─ _hooks
│  │  │  │  ├─ usePostForm.ts
│  │  │  │  └─ useWritePost.ts
│  │  │  └─ page.tsx
│  │  ├─ search
│  │  │  └─ page.tsx
│  │  └─ users
│  │     └─ [userId]
│  │        ├─ _components
│  │        │  ├─ FollowButton.tsx
│  │        │  ├─ FollowCard.tsx
│  │        │  ├─ FollowModal.tsx
│  │        │  ├─ LogoutButton.tsx
│  │        │  ├─ MessageButton.tsx
│  │        │  └─ UserProfile.tsx
│  │        ├─ _hooks
│  │        │  ├─ useFollow.ts
│  │        │  ├─ useGetFollowData.ts
│  │        │  └─ useGetUserData.ts
│  │        ├─ _services
│  │        │  ├─ follow.ts
│  │        │  ├─ getFollowData.ts
│  │        │  ├─ getUser.ts
│  │        │  ├─ logout.ts
│  │        │  └─ unFollow.ts
│  │        └─ page.tsx
│  ├─ (beforeLogin)
│  │  ├─ _components
│  │  │  └─ RedirectToHome.tsx
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  ├─ _components
│  │  │  │  └─ LoginForm.tsx
│  │  │  ├─ _hooks
│  │  │  │  └─ useLoginForm.ts
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  └─ signup
│  │     ├─ _components
│  │     │  └─ SignUpForm.tsx
│  │     ├─ _hooks
│  │     │  └─ useSignUpForm.ts
│  │     ├─ _services
│  │     │  ├─ saveUserData.ts
│  │     │  └─ signUp.ts
│  │     └─ page.tsx
│  ├─ _hooks
│  │  ├─ useInfiniteScroll.ts
│  │  ├─ useOnAuth.ts
│  │  └─ usePreviewImage.ts
│  ├─ _services
│  │  └─ handleUpload.ts
│  ├─ _store
│  │  ├─ useFollowModal.ts
│  │  ├─ usePost.ts
│  │  └─ useTab.ts
│  ├─ _types
│  │  ├─ follow.ts
│  │  ├─ like.ts
│  │  ├─ message.ts
│  │  ├─ navigation.ts
│  │  ├─ post.ts
│  │  └─ user.ts
│  ├─ _utils
│  │  ├─ formatDateTime.ts
│  │  └─ hashUid.ts
│  ├─ favicon.ico
│  ├─ firebase.js
│  ├─ layout.tsx
│  ├─ loading.tsx
│  └─ not-found.tsx
├─ components.json
├─ components
│  └─ ui
│     ├─ SubmitButton.tsx
│     ├─ alert-dialog.tsx
│     ├─ alert.tsx
│     ├─ avatar.tsx
│     ├─ button.tsx
│     ├─ dialog.tsx
│     ├─ dropdown-menu.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ loader.tsx
│     ├─ skeleton.tsx
│     └─ textarea.tsx
├─ lib
│  └─ utils.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ icon.svg
│  ├─ logo.png
│  ├─ next.svg
│  └─ vercel.svg
├─ styles
│  └─ globals.css
├─ tailwind.config.ts
└─ tsconfig.json
```


</details>


## 📌 구현 기능 및 시연

### 회원관리
- Firebase Authentication을 통한 회원가입 및 로그인/로그아웃 기능 구현

- 비밀번호 보안 가이드라인 준수

- 회원가입 필수 요소: 이름, 닉네임, 프로필 이미지, 인사말

|회원가입|로그인|
|---|---|
| <img width=350 height=500 src="https://github.com/ncb6206/stockaca/assets/62326659/cdc3af96-9ef1-419c-9752-f659ece00399"/> | <img width=300 height=500 src="https://github.com/ncb6206/stockaca/assets/62326659/614437c0-e637-4155-8713-027e1dba9615"/>|

### 게시글 피드

- 게시글 CRUD 기능 구현 (Create, Read, Update, Delete)

- 게시글 조회 시 useInfiniteQuery 기능을 사용한 무한 스크롤 페이지네이션 적용

- 게시글 상세 페이지 모달로 구현 및 서버 사이드 렌더링 적용

- 이미지 파일 첨부 및 Firebase Cloud Storage 활용

|피드 리스트|피드 작성|
|---|---|
| <img width=300 height=500  src="https://github.com/ncb6206/stockaca/assets/62326659/024b9153-f5f1-4263-81eb-8bf5fbf1f11b"/> | <img width=300 height=500 src="https://github.com/ncb6206/stockaca/assets/62326659/b38cd251-e6ad-4df8-b963-4e230b944d26"/>|

|피드 수정|피드 삭제|
|---|---|
| <img width=300 height=500  src="https://github.com/ncb6206/stockaca/assets/62326659/75e6de4a-639c-4d58-81ed-034bbb221aa5"/> | <img width=300 height=500 src="https://github.com/ncb6206/stockaca/assets/62326659/39c19e1a-2f3a-42f8-aadc-505d7997d807"/>|

### 좋아요 및 댓글 기능

- 사용자는 모든 게시글에 좋아요 가능

- 댓글 조회, 생성, 수정, 삭제 기능 구현

- 댓글 조회 시 useInfiniteQuery 기능을 사용한 무한 스크롤 페이징 적용

|피드 좋아요|댓글 작성|
|---|---|
| <img width=300 height=500  src="https://github.com/ncb6206/stockaca/assets/62326659/1f16caf5-95bd-44b0-8d1a-53ab02e8e888"/> | <img width=300 height=500 src="https://github.com/ncb6206/stockaca/assets/62326659/edd11cf7-9bbd-4cc7-ad06-cdddacd8e934"/>|

### 유저 프로필, 팔로우/언팔로우 기능 

- 사용자 간 팔로우/언팔로우 관계 설정 및 수정

- 팔로우/팔로잉 수 표시 및 유저 리스트 제공

- 팔로우한 사용자의 게시글만 볼 수 있는 페이지 제공

|유저 프로필|팔로우 / 언팔로우|팔로우 / 팔로잉 리스트|
|---|---|---|
| <img width=300 height=500  src="https://github.com/ncb6206/stockaca/assets/62326659/2fa4d3bf-c67e-4a04-9f55-478340a83b2a"/> | <img width=300 height=500  src="https://github.com/ncb6206/stockaca/assets/62326659/706c2695-1208-440b-adde-419c85e2ec3e"/>| <img width=300 height=500  src="https://github.com/ncb6206/stockaca/assets/62326659/ea02c36e-4082-4881-b79a-04df89b7ceed"/>|

### 실시간 채팅 기능

- Firebase를 활용한 1:1 실시간 채팅 구현

- 채팅 메시지 보내기 및 받기 기능

- 채팅 목록 페이지 제공

|채팅|
|---|
| <img width=800 height=600 src="https://github.com/ncb6206/stockaca/assets/62326659/2cb6d06d-21d7-4e82-9ce2-d9d5a8f7d52b"/> | 

## 📌 트러블슈팅

<details>
<summary><b>좋아요 버튼 클릭 시 의도하지 않은 페이지 이동 문제</b></summary>
<div markdown="1">

#### 문제

- 피드의 좋아요 버튼을 클릭할 때, 좋아요 그능은 정상적으로 동작하지만 동시에 해당 피드의 상세 페이지로 이동하는 문제 발생

#### 원인

- 좋아요 버튼을 감싸고 있는 부모 요소(div)에 피드 상세 페이지로 이동하는 onClick 이벤트가 설정되어 있었음
- 좋아요 버튼 클릭 시, 이벤트 버블링으로 인해 부모 요소의 onClick 이벤트까지 실행되어 의도하지 않은 페이지 이동이 발생했습니다.

#### 해결

- 좋아요 버튼의 onClick 이벤트 핸들러 내에서 `event.stopPropagation()`을 호출하여 이벤트 버블링을 막음
- 이를 통해 좋아요 버튼 클릭 시, 해당 이벤트가 부모 요소로 전파되는 것을 막을 수 있었음

```tsx
const onToggleLike = (event: MouseEvent<HTMLDivElement>) => {
  event.stopPropagation();
  setLiked(prev => !prev);
  if (liked) {
    mutationUnLike.mutate();
  } else {
    mutationLike.mutate();
  }
};
```

</div>
</details>

<details>
<summary><b>좋아요 카운트 동기화 문제</b></summary>
<div markdown="1">

#### 문제

- 메인 피드리스트에 있는 피드의 좋아요 버튼을 클릭 시 정상작동하지만, 해당 피드의 상세 페이지로 이동하면 좋아요 카운트가 동기화되지 않는 문제 발생 
<img src="https://github.com/ncb6206/stockaca/assets/62326659/f15a50d5-1914-49b9-ab9c-18e36f493ba4"/>

#### 원인

- `LikeCount`컴포넌트의 좋아요 카운트 값과 `PostCard`의 좋아요 카운트 값이 연동되지 않아 좋아요 개수가 실시간으로 업데이트되지 않음
- `LikeCount`컴포넌트 내부에서 좋아요 카운트값을 별도로 관리하고 있어서, `PostCard` 컴포넌트의 좋아요 카운트 값과 동기화되지 않음

#### 해결

- 좋아요 카운트 값을 `LikeCount`컴포넌트에서 관리하지 않고, `PostCard`컴포넌트에서 props로 전달하도록 변경
- 좋아요 `useMutation`의 `onSuccess` 콜백에서 `queryClient.invalidateQueries`를 호출하여 해당 피드와 관련된 쿼리를 무효화하고 최신 데이터를 가져오도록하여 해결
```tsx
  const mutationLike = useMutation({
    mutationFn: () => likePost({ userId, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['like', userId] });
    },
    onError: error => {
      console.error('Error like post:', error);
    },
  });

```
- 고려사항 : 특정 피드의 좋아요 상태만을 업데이트 했는데 invalidateQueries로 인해 메인 피드의 목록들 전체가 초기화되어 불필요한 초기화가 생기는 것 같아 더 나은 최적화 방법에 대해 고려해야 될 필요가 있음


</div>
</details>
