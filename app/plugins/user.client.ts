import { useUserStore } from "~/store/user"
import { defineNuxtPlugin, useNuxtApp, useState } from "#app"
import { _AsyncData } from "#app/composables/asyncData"
// @ts-ignore
import registerUser from "~/gql/registerUser.gql"
// @ts-ignore
import login from "~/gql/login.gql"


export default defineNuxtPlugin(function () {

        const user = {
            ...useUserStore(),
            login: async (username: string, password: string) => {

                const app = useNuxtApp()
                const errorMessage = useState("errorMessage")
                const userStore = useUserStore()

                const res = await useAsyncQuery<any>(login, {username, password})
                    .then((result: _AsyncData<any, Error>) => {
                            if (result.error.value) {
                                const message = result.error.value?.message
                                if (message === "incorrect_password") {
                                    errorMessage.value = "Sorry, please try again."
                                } else if (message === "empty_username") {
                                    errorMessage.value = "You must specify a username."
                                } else if (message === "invalid_username") {
                                    errorMessage.value = "Please check your details and try again."
                                } else {
                                    errorMessage.value = message
                                }
                            } else if (result?.data.value) {
                                const data = result.data.value.login
                                userStore.update({
                                    username: data.user.username,
                                    name: data.user.name,
                                    userId: data.user.userId,
                                    authToken: data.authToken,
                                    refreshToken: data.authToken,
                                    email: data.user.email,
                                    loggedIn: true
                                })
                                userStore.loggedIn = true
                                app.$router.push("/profile")
                            }

                        }
                    )
            },
            logout: () => {
                useUserStore().logout()
            },
            register: async (username: string, password: string, firstName: string, lastName: string, email: string) => {

                const app = useNuxtApp()
                const errorMessage = useState("errorMessage")
                const userStore = useUserStore()

                await useAsyncQuery<any>(registerUser, {
                    username,
                    firstName,
                    lastName,
                    email,
                    password
                })
                    .then(async (result: _AsyncData<any, Error>) => {
                        console.log(result.data.value)

                            if (result.error.value) {
                                const message = result.error.value?.message
                                if (message === "empty_username") {
                                    errorMessage.value = "You must specify a username."
                                } else if (message === "invalid_username") {
                                    errorMessage.value = "Please check your details and try again."
                                } else {
                                    errorMessage.value = message
                                }
                            } else if (result?.data.value) {
                                const data = result.data.value.registerUser
                                userStore.update({
                                    username: data.user.username,
                                    firstName: data.user.firstName,
                                    lastName: data.user.lastName,
                                    userId: data.user.userId,
                                    authToken: data.authToken,
                                    refreshToken: data.refreshToken,
                                    email: data.user.email,
                                    loggedIn: true
                                })
                                app.$router.push("/profile")
                            }
                        }
                    )
            }
        }

        return {
            provide: {
                user
            }
        }
    }
)
