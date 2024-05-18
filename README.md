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

- [기술 스택 선정 이유](https://github.com/ncb6206/stockaca/wiki/%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-%EC%84%A0%EC%A0%95-%EC%9D%B4%EC%9C%A0)

## 📌 구현 내용

<details><summary>회원가입
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/cdc3af96-9ef1-419c-9752-f659ece00399"/>
</details>

<details><summary>로그인
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/614437c0-e637-4155-8713-027e1dba9615"/>
</details>

<details><summary>피드 리스트
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/024b9153-f5f1-4263-81eb-8bf5fbf1f11b"/>
</details>

<details><summary>피드 작성
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/b38cd251-e6ad-4df8-b963-4e230b944d26"/>
</details>

<details><summary>피드 수정
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/75e6de4a-639c-4d58-81ed-034bbb221aa5"/>
</details>

<details><summary>피드 삭제
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/39c19e1a-2f3a-42f8-aadc-505d7997d807"/>
</details>

<details><summary>피드 좋아요
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/1f16caf5-95bd-44b0-8d1a-53ab02e8e888"/>
</details>

<details><summary>답글
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/edd11cf7-9bbd-4cc7-ad06-cdddacd8e934"/>
</details>

<details><summary>유저 프로필
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/2fa4d3bf-c67e-4a04-9f55-478340a83b2a"/>
</details>

<details><summary>팔로우 / 언팔로우
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/706c2695-1208-440b-adde-419c85e2ec3e"/>
</details>

<details><summary> 팔로우 / 팔로잉 리스트
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/ea02c36e-4082-4881-b79a-04df89b7ceed"/>
</details>

<details><summary>채팅
</summary>
  <img src="https://github.com/ncb6206/stockaca/assets/62326659/2cb6d06d-21d7-4e82-9ce2-d9d5a8f7d52b"/>
</details>

## 📌 트러블슈팅

<details>
<summary><b>좋아요 버튼 클릭 시 이벤트 전파</b></summary>
<div markdown="1">

#### 문제

- 특정 피드에 좋아요 버튼을 클릭 시 좋아요와 해당 피드의 상세 페이지로 이동하는 문제 발생

#### 원인

- 해당 피드의 상세 페이지로 이동 시켜주는 onClick이벤트를 가진 부모 div안에 해당 피드의 좋아요를 표시할 수 있는 onClick이벤트를 가진 자식 div가 있어서 이벤트 버블링 현상 발생

#### 해결

- 부모 div의 onClick이벤트 핸들러 내에 `event.stopPropagation()`을 호출하여 이벤트 버블링을 중단시킴으로써 해결

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
