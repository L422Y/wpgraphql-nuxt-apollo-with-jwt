import { Ref } from "vue"

export interface UserInformation {
  userId?: number | Ref<number>
  username?: string | Ref<string>
  name?: string | Ref<string>
  firstName?: string | Ref<string>
  lastName?: string | Ref<string>
  email?: string | Ref<string>
  domain?: string | Ref<string>
  authToken?: string | Ref<string>
  refreshToken?: string | Ref<string>
  loggedIn?: boolean | Ref<boolean>
}
