<template>
    <nav>
        <nuxt-link to="/">Home</nuxt-link>

        <ClientOnly>
            <nuxt-link v-if="!userStore.loggedIn" to="/login">Login</nuxt-link>
            <nuxt-link v-else @click="userStore.logout">Logout</nuxt-link>
        </ClientOnly>
    </nav>
</template>

<script setup>
import {useUserStore} from "~/store/user"

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
nav {
  background-color: #ccc;
  padding: 0.8rem 1rem;
  border-radius: 0.25rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>
