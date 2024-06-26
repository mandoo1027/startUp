<template>
  <div>
    <nav>
      <div class="navbar">
          <h1 ><nuxt-link to="/">home</nuxt-link></h1>
          <li><nuxt-link to="/LOG/login">login</nuxt-link></li>
          <li><nuxt-link to="/Board/boardList">게시판</nuxt-link></li>
      </div>
      <br>
  </nav>
    <slot />
  </div>
</template>

<style scoped>


.navbar {
  display: flex;
  justify-content: flex-start; /* or use space-between, space-around, etc. as needed */
  align-items: center; /* vertically center the items */
  height: 80px;
  background-color: bisque;
  
}
.navbar h1 {
  margin: 0 20px; /* Adjust the margin as needed */
  font-size: 35px;
  
}
.navbar li {
  margin: 0 20px; /* Adjust the margin as needed */
}
.navbar a {
    text-decoration: none; /* Remove the underline */
    color: inherit; /* Optional: inherit color from the parent element */
}
</style>