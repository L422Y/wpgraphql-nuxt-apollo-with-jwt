<template>
    <template v-if="!userStore.loggedIn || !userStore.username">
        <form action="#" @submit.prevent="doRegister">
            <div>
                <label for="username">Username</label>
                <input id="username" v-model="form.username" data-lpignore="true" name="username" type="text">
            </div>
            <div>
                <label for="password">Email</label>
                <input id="email" v-model="form.email" data-lpignore="true" name="email" type="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" v-model="form.password" data-lpignore="true" name="password" type="password">
            </div>
            <div>
                <label for="password">First Name</label>
                <input id="firstName" v-model="form.firstName" data-lpignore="true" name="firstName" type="text">
            </div>
            <div>
                <label for="password">Last Name</label>
                <input id="lastName" v-model="form.lastName" data-lpignore="true" name="lastName" type="text">
            </div>
            <input type="submit" value="Register">
        </form>
        <div class="errorMessage">{{ errorMessage }}</div>
    </template>
</template>
<script lang="ts" setup>
import { useNuxtApp, useState } from "#app"
import { useUserStore } from "~/store/user"

const errorMessage = useState("errorMessage")
const userStore = useUserStore()
const {$user} = useNuxtApp()

const form = ref({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
})

async function doRegister() {
    const {username, password, firstName, lastName, email} = form.value
    await $user.register(username, password, firstName, lastName, email)
    // await $user.doLogin(username, password)
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
