<template>
    <template v-if="!userStore.loggedIn || !userStore.username">
        <form action="#" @submit.prevent="doLogin">
            <div>
                <label for="username">Username</label>
                <input id="username" v-model="form.username" data-lpignore="true" name="username" type="text">
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" v-model="form.password" data-lpignore="true" name="password" type="password">
            </div>
            <input type="submit" value="Login">
        </form>
        <div style="text-align: center;margin-top: 1rem;">Or <nuxt-link to="/register">Register</nuxt-link></div>
        <div class="errorMessage">{{ errorMessage }}</div>
    </template>
    <div v-else>
        Logged in as {{ userStore.username }}, proceed to
        <nuxt-link to="/profile">view your profile</nuxt-link>
    </div>
</template>
<script lang="ts" setup>
import { useNuxtApp, useState } from "#app"
import { useUserStore } from "~/store/user"

const errorMessage = useState("errorMessage")
const userStore = useUserStore()
const {$user} = useNuxtApp()

const form = ref({
    username: "",
    password: ""
})

async function doLogin() {
    const {username, password} = form.value
    await $user.login(username, password)
}

</script>
<style lang="scss" scoped>
form {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  max-width: 320px;
  justify-content: center;
  margin: 0 auto;

  > div {
    display: flex;
    gap: .5rem;

    input {
      width: 100%;
    }
  }

}
</style>
