import { Ref, ref } from "vue"
import { defineStore } from "pinia"

export interface UserInformationRefs {
    userId?: Ref<number>
    username?: Ref<string>
    name?: Ref<string>
    firstName?: Ref<string>
    lastName?: Ref<string>
    email?: Ref<string>
    domain?: Ref<string>
    authToken?: Ref<string>
    refreshToken?: Ref<string>
    loggedIn?: Ref<boolean>
}

export interface UserInformation {
    userId?: number
    username?: string
    name?: string
    firstName?: string
    lastName?: string
    email?: string
    domain?: string
    authToken?: string
    refreshToken?: string
    loggedIn?: boolean
}


export const useUserStore = defineStore("user", () => {

    const app = useNuxtApp()
    const userId = ref(0)
    const username = ref("")
    const name = ref("")
    const firstName = ref("")
    const lastName = ref("")
    const email = ref("")
    const domain = ref("")
    const authToken = ref("")
    const refreshToken = ref("")
    const loggedIn = ref(false)

    const userInfo: UserInformationRefs = {
        authToken,
        refreshToken,
        userId,
        username,
        firstName,
        lastName,
        domain,
        name,
        email,
        loggedIn
    }

    function logout() {
        update({
            userId: undefined,
            username: undefined,
            name: undefined,
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            domain: undefined,
            authToken: undefined,
            refreshToken: undefined,
            loggedIn: false
        })
        app.$router.push("/login")

    }

    function update(values: UserInformation) {
        Object.keys(values).forEach(function (key) {
            if (key in userInfo) { // or obj1.hasOwnProperty(key)
                // @ts-ignore
                userInfo[key].value = values[key]
            }
        })
    }

    return {
        update,
        logout,
        ...userInfo
    }
})
