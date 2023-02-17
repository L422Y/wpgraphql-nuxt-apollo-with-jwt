import { UserInformation } from "~/store/user"
import { UnwrapRef } from "vue"
import { _ExtractStateFromSetupStore } from "pinia"

export function parseJwt(token: UnwrapRef<_ExtractStateFromSetupStore<{
    logout: () => void;
    domain?: Ref<string>;
    authToken?: Ref<string>;
    loggedIn?: Ref<boolean>;
    name?: Ref<string>;
    update: (values: UserInformation) => void;
    userId?: Ref<number>;
    email?: Ref<string>;
    username?: Ref<string>;
    refreshToken?: Ref<string>
}>["refreshToken"]> | undefined) {
    if(!token) return "";
    var base64Url = token.split(".")[1]
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    var jsonPayload = decodeURIComponent(window.atob(base64).split("").map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(""))

    return JSON.parse(jsonPayload)
}
