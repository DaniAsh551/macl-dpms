const API_BASE = `${(new URL(window.location.href)).protocol}/${window.location.hostname}:3000/api`;

export interface IResponse<T> {
    status: number;
    statusText?: string | null;
    data?: T;
    error?: string | null;
}

export type RefreshResponse = {
    access_token: string;
    refresh_token: string;
};

export type User = {
    id: number;
    email: string;
    password: string;
    refresh_token: string | null;
    name: string | null;
    uuid: string;
    department_id: number;
    deleted: boolean;
    roles: string[],
    permissions: string[];
    department: {
        id: number,
        name: string
    }
};

function setLs(key:string, value?:string) {
    if(!value)
        return localStorage.removeItem(key);
    localStorage.setItem(key, value);
}
export class ApiClient {
    authToken = {
        get: () => localStorage["authToken"],
        set: (token?: string) => setLs("authToken", token),
    };

    refreshToken = {
        get: () => localStorage["refreshToken"],
        set: (token?: string) => setLs("refreshToken", token),
    };

    user = {
        get: () => localStorage["user"] ? JSON.parse(localStorage["user"]) as User : null,
        set: (user?:User) => setLs("user", JSON.stringify(user)),
    };

    async request<T>(
        uri: string,
        method: string,
        data?: any,
        headers: any = {}
    ): Promise<IResponse<T>> {
        headers = {
            ...headers,
            "content-type": "application/json;charset=UTF-8",
        };

        if (this.authToken.get())
            headers["Authorization"] = `Bearer ${this.authToken.get()}`;

        const url: URL = new URL(API_BASE + uri);

        if (!["post", "patch"].includes(method) && data)
            Object.keys(data).forEach((k) => url.searchParams.set(k, data[k]));

        const fetchResp = await fetch(url, {
            method,
            body:
                ["post", "patch"].includes(method) && data
                    ? JSON.stringify(data)
                    : undefined,
            headers,
        });

        const resp = (await fetchResp.json()) as IResponse<any>;

        if (
            resp.status == 401 &&
            ([ "Access token expired", "Invalid access token" ].includes(resp.error!)) &&
            this.refreshToken.get()
        ) {
            //refresh the token
            const refResp = await this.request<RefreshResponse>(
                "/auth/refresh",
                "post",
                { refresh_token: this.refreshToken.get() }
            );
            if (refResp.status == 200 && !refResp.error) {
                this.authToken.set(refResp.data!.access_token);
                this.refreshToken.set(refResp.data!.refresh_token);
                return this.request(uri, method, data, headers);
            } else {
                throw new Error(refResp.error!);
            }
        }

        return resp;
    }

    async get<T>(url: string, data?: any, headers: any = {}) {
        return await this.request<T>(url, "get", data, headers);
    }

    async post<T>(url: string, data?: any, headers: any = {}) {
        return await this.request<T>(url, "post", data, headers);
    }

    async patch<T>(url: string, data?: any, headers: any = {}) {
        return await this.request<T>(url, "patch", data, headers);
    }

    async delete<T>(url: string, data?: any, headers: any = {}) {
        return await this.request<T>(url, "delete", data, headers);
    }

    async getMyself() {
        const resp = await this.get<User>(
            "/auth/user"
        );

        if (resp.status == 200 && !resp.error) {
            this.user.set(resp.data!);
        }

        return resp;
    }

    async login(
        email: string,
        password: string
    ): Promise<IResponse<RefreshResponse>> {
        const resp = await this.post<RefreshResponse>(
            "/auth/login",
            { email, password }
        );

        if (resp.status == 200 && !resp.error) {
            this.authToken.set(resp.data!.access_token);
            this.refreshToken.set(resp.data!.refresh_token);
        }

        //populate user
        await this.getMyself();

        return resp;
    }

    logout() {
        ["authToken", "refreshToken", "user"].forEach(x => localStorage.removeItem(x));
    }

    isLoggedIn() {
        return !!this.authToken.get();
    }
}

export const api = new ApiClient();
export default api;
