<template>
  <div>
    <nav>
      <ul class="navbar">
          <li><nuxt-link to="/">메인</nuxt-link></li>
          <li><nuxt-link to="/Board/boardList">게시판</nuxt-link></li>
      </ul>
      <br>
  </nav>
    <slot />
  </div>
</template>