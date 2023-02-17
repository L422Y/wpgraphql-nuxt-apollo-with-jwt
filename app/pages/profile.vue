<template>
    <h1>Profile</h1>
    <ClientOnly>
        <template v-if="profile.registeredDate">
            <span v-if="profile.registeredDate">Registered: {{ registeredDate }}</span>
            <div>
                <label for="firstName">First Name</label>
                <input id="firstName" v-model="profile.firstName" aria-label="First Name" type="text"/>
            </div>
            <div>
                <label for="lastName">Last Name</label>
                <input v-model="profile.lastName" aria-label="Last Name" type="text"/>
            </div>
            <div>
                <label for="firstName">Email</label>
                <input v-model="profile.email" aria-label="Email" type="text"/>
            </div>
            <div>
                <label for="username">Username</label>
                <input v-model="profile.username" aria-label="Last Name" type="text"/>
            </div>
        </template>
    </ClientOnly>
</template>

<script setup>
import {useUserStore} from "~/store/user"
import userInfo from "~/gql/userInfo.gql"
import {useNuxtApp} from "#app"

const userStore = useUserStore()
const {$router} = useNuxtApp()
let profile = ref({}),
    results = false,
    domain = userStore?.domain || "Not Configured",
    loading = ref(true),
    error = false,
    registeredDate = computed(() => new Date(profile.value.registeredDate).toLocaleDateString())


onMounted(async () => {
    if (userStore.loggedIn) {
        await useAsyncQuery(userInfo).then(async (result) => {
            await result.execute()
            if (result.error.value) {
                error = result.error.value
            } else {
                profile.value = result?.data.value.viewer
            }
            loading.value = false
        }).catch(error => console.error)
    } else {
        $router.push("/login")
    }
})
</script>
<style lang="scss" scoped>
.loading {
  display: block;
  width: 100%;
  padding: 4rem;
  text-align: center;
}

input {
  display: block;

  &:before {
    content: attr(label);
    display: block;
  }
}

div {
  margin-top: 1rem;
}
</style>
