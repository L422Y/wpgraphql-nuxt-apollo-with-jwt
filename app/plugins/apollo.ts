import {useUserStore} from "~/store/user"
import {parseJwt} from "~/composables/useJwtUtils"
import refreshToken from "~/gql/refreshJwtAuthToken.gql"
import {_AsyncData} from "#app/composables/asyncData"

export default defineNuxtPlugin((nuxtApp) => {
  let refreshingToken = false
  const userStore = useUserStore()

  const tryRefresh = async () => {
    if (!refreshingToken && userStore?.refreshToken) {
      const expiryDate = new Date(parseJwt(userStore.refreshToken).exp * 1000)
      const beforeExpiry = new Date(expiryDate.getTime() - 84000 * 1000)
      const shouldRenew = new Date().getTime() > beforeExpiry.getTime()
      if (shouldRenew) {
        console.log("expired! renewing...")
        refreshingToken = true
        await useAsyncQuery<any>(refreshToken, {jwtRefreshToken: userStore.refreshToken})
          .then((result: _AsyncData<any, Error>) => {
              if (result.error.value) {
                const message = result.error.value?.message
                console.error(message)
              } else if (result?.data) {
                const data = result.data.value.refreshJwtAuthToken
                userStore.update({
                  authToken: data.authToken,
                  refreshToken: data.refreshToken,
                })
              }
            }
          )
      }
    }
  }

  nuxtApp.hook("apollo:auth", async ({client, token}) => {
    await tryRefresh()
    token.value = userStore.authToken || null
  })
})
