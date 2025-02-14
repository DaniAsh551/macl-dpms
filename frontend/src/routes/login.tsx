import { A } from "@solidjs/router";
import { AiFillMessage, AiFillEye } from "solid-icons/ai"
import { createSignal } from "solid-js";
import api from "~/api";
import {z} from "zod";
import { getZError } from "~/utils";

export default function Login() {
  
  const [error, setError] = createSignal<string|undefined>();
  const [emailError, setEmailError] = createSignal<string|undefined>("");
  const [email, setEmail] = createSignal<string|null>("");
  const [passwordError, setPasswordError] = createSignal<string|undefined>("");
  const [password, setPassword] = createSignal<string|undefined>("");

  const login = async () => {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });
    const result = schema.safeParse({ email: email(), password: password() });

    if(!result.success) {
      setEmailError(getZError(result.error, "email")?.message);
      setPasswordError(getZError(result.error, "password")?.message);
      return;
    }

    const resp = await api.login(email()!, password()!);
    if(resp.error) return setError(resp.error);

    window.location.href = "/";
  };

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Login</h1>
      
      <div class="card bg-base-100 image-full w-96 shadow-xl px-10 pt-24">
        <div class="card-body">
          <label class="input input-bordered flex items-center gap-2 py-2"
            style={ emailError() ? {
                "border-color": "var(--color-red-500)" } : {}
              }
          >
            <AiFillMessage />
            <input onchange={e => setEmail(e.target.value)} type="text" class="grow rounded text-cyan-200" placeholder="Email" />
          </label>
          { emailError() && <p class="text-red-500 text-sm">{emailError()}</p> }
          <label class="input input-bordered flex items-center gap-2 py-2"
          style={ passwordError() ? {
            "border-color": "var(--color-red-500)" } : {}
          }>
            <AiFillEye />
            <input onchange={e => setPassword(e.target.value)} type="password" class="grow text-cyan-200" placeholder="Password" />
          </label>
          { passwordError() && <p class="text-red-500 text-sm">{passwordError()!.replace("String", "Password")}</p> }

          { error() && <p class="text-red-500">{error()}</p> }

          <button class="btn glass mt-10" onclick={login}>LOGIN</button>
        </div>
      </div>
    </main>
  );
}
