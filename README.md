# 目的

AstroとSupabaseを使用したwebアプリケーションのプロトタイプ

## app概要

create astro@latest -- --template basicsとSupabaseで構築されたwebアプリケーションプロジェクトです。

- ベースはastro、アイランドにsvelte、認証とDBにsupabase
- ヘッダーとフォームはastroとsvelteの両方用意
- OAuth認証はauthorization_codeとpkceの両方用意
- ユーザー情報はastroのmiddleware、sateはsvelteのstoreで管理
- 型チェックはastro checkとsvelteチェック、テストはjest
- github actionsでCI/CD自動化、デプロイ先はnetlify

## 開発環境

- astro 4.1.1
- svelte 4.2.8
- supabase 2.39.3
- zod 3.22.4

```text
/ 
├── public 
├── src
│    │── components
│    │── layouts
│    │── lib
│    │── pages
│    │     │─── api
│    │     │     │──── auth
│    │     │     └──── database
│    │     └────────── callback
│    │── store
│    │── types
│    └── middleware.ts
├── tests
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## 注意点

- svelteを使用するとtypescriptチェックをts/tsxとsvelteを別で行う必要がある。typescriptを使用する場合はtsxのreactかsolid、preactなどが良いかもしれない
- astroのcheckはsvelteのエラーが出たままだが、svelte-checkはastroのエラーも消えるので先にsvelte-checkを行ってからastroのcheckをrunしたほうが良いと思う
- CIなどの事を考えるとESlintなどを考えた方が良いかもしれない
- defineMiddleware関連のエラーはどうしようもない。公式のastro:middlewareはdefineMiddlewareを持っていないと言われてしまうが実際はある。astro/middlewareに変更したらエラーが消えた
- defineMiddlewareのcontextとnextも公式では自動的に型付けされるとあるがエラーがでる。MiddlewareHandlerで型付けするとエラーが消えた
- flowtypeのデフォルトはauthorization_codeでハッシュ、pkceはクエリで取得できる
- nix環境下でe2eツールが悉く使えなかった、唯一testcafeは動いた

## 結論

- CI自動化の事を考えるとtsx/jsxで統一した方が良いと思う
- 型チェックやテストなど大きな問題はなかったがリファレンスなどに書いてない事も多く分かり難いが対応できる範囲である
- 部分的に変える事ができるのがastroの良いところだと感じる
- UIテストツールが動かなかったので、クラウドのautifyやmagicpodのお試しを利用してみたが、テストが非常に簡単に感じるほど時間短縮できる

[astroとDB](https://github.com/k-gitest/astro-supa-auth-database)

[astroと認証](https://github.com/k-gitest/astro-supa-auth)