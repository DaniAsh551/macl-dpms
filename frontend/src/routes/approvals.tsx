import { A } from "@solidjs/router";
import { AiFillCalendar, AiFillClockCircle, AiFillCloseCircle, AiFillPlusSquare, AiFillQuestionCircle } from "solid-icons/ai"
import { FaSolidCheck, FaSolidCross, FaSolidQrcode } from "solid-icons/fa"
import { createSignal, onMount } from "solid-js";
import api from "~/api";
import {z} from "zod";
import { getZError, today } from "~/utils";
import Unauthorized from "./403";

export enum PermitType {
  Restricted  = "restricted",
  Temporary   = "temporary",
  Permanent   = "permanent",
}

export type Permit = {
  type: PermitType;
  id: number;
  department_id: number;
  deleted: boolean;
  user_id: number;
  full_name: string;
  approved: boolean|null;
  justification: string | null;
  reason: string | null;
  valid_from: string;
  valid_until: string;
  user: {
    department: {
      id: number;
      deleted: boolean;
      createdAt: Date;
      updatedAt: Date;
      name: string;
    },
    name: string
  }
};

export default function Approvals() {
  if(!api.isLoggedIn() || !api.user.get()!.roles.includes("admin")) return Unauthorized();

  const [showDialog, setShowDialog] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string>("");
  const [pending, setPending] = createSignal<Permit[]>([]);
  
  //form errors
  const [ permitId, setPermitId ] = createSignal<number>(0)
  const [ reason, setReason ] = createSignal<string|undefined>()
  const [reasonE, setReasonE] = createSignal<string|undefined>(undefined);

  const closeDialog = () => {
    setPermitId(0);
    setReason(undefined);
    setReasonE(undefined);
    setShowDialog(false);
  };

  const reject = async(id:number) => {
    console.log("id", id);
    if(id) {
      setPermitId(id);
      setShowDialog(true);
      return;
    }
    else if(permitId() < 1) return;
  }

  const sendRejection = async() => {
    console.log("id", permitId());
    if((reason()?.length ?? 0) < 3) return setReasonE("Please set a reason");

    const resp = await api.put<Permit>(`/permit/${permitId()}`, {
      approved: false,
      reason:   reason()
    });

    if(resp.error)
      return setError(resp.error);
    else await getPermits();

    closeDialog();
  }

  const approve = async(id:number) => {
    const resp = await api.put<Permit>(`/permit/${id}`, {
      approved: true,
      reason:   "Approved"
    });

    if(resp.error)
      return setError(resp.error);
    else await getPermits();
  }

  const getPermits = async function() {
    const response = await api.get<Permit[]>("/permit", { approved: null });
    if(response.error) {
      setError(response.error!);
    } else {
      setPending(response.data!);
    }
  };

  const bagdgeColor = (permit:Permit) => {
    switch(permit.type) {
      case PermitType.Permanent:
        return "bg-green-800";
      case PermitType.Restricted:
        return "bg-purple-800";
      case PermitType.Temporary:
        return "bg-orange-800";
    }
  };

  onMount(async () => await getPermits());

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Approve Permits</h1>
      { error() && <p class="font-thin text-red-500 py-3">{error()}</p> }
      {
        pending().length < 1 && <p class="font-thin text-gray-500 py-3">No permits found.</p>
      }
      {
        pending().length > 0 && <div class="md:px-32 justify-center">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-5">
            { pending().map(permit =>
            <div
              class={`border-2 rounded-2xl border-cyan-200 card shadow-xl p-10 bg-${permit.approved ? "green" : "red"}-300`}>
              <div class="w-11/12">
                {permit.justification}
              </div>
              <div>
                <div class={`rounded text-white text-sm capitalize ${bagdgeColor(permit)}`}>
                  {permit.type}
                </div>
              </div>
              <div class="w-full">
                <span class="inline-block pr-2 pt-2"><AiFillClockCircle /></span>
                <span class="text-sm text-gray-500">{new Date(permit.valid_from).toLocaleDateString()}</span>
                <span class="text-sm text-gray-500 font-extrabold"> TO </span>
                <span class="text-sm text-gray-500">{new Date(permit.valid_until).toLocaleDateString()}</span>
              </div>
              <div class="w-full pt-3">
                <p>Requested by: 
                  <span> {permit.user.name} | <span class="font-thin text-gray-300">{permit.user.department.name}</span></span>
                </p>
              </div>
              <div class="w-full pt-3">
                <button
                  onclick={() => reject(permit.id)} title="Reject"
                  class="hover:cursor-pointer mr-2 text-2xl rounded-full bg-red-800 border border-red-200 text-red-200 hover:bg-red-600">
                    <AiFillCloseCircle />
                </button>
                <button
                  onclick={() => approve(permit.id)} title="Approve"
                  class="hover:cursor-pointer ml-2 text-2xl rounded-full bg-green-800 border border-green-200 text-green-200 hover:bg-green-600">
                    <FaSolidCheck />
                </button>
              </div>
            </div>) }
          </div>
        </div>
      }
      
      {
        showDialog() && <dialog class="bg-[#000000a6] p-4 rounded-lg shadow-md block align-middle content-center text-center w-screen h-screen justify-center absolute top-0">
          <div class="w-96 flex-col justify-center bg-slate-800 rounded-2xl mx-auto">
            <button class="cursor-pointer float-right rounded-full p-2 bg-transparent text-cyan-600 border-none text-2xl hover:text-cyan-800" onclick={closeDialog}><AiFillCloseCircle/></button>
            <div class="grid gap-y-2 w-full px-5 pb-5">
              <h3 class="max-4-xs text-4xl text-sky-700 font-thin uppercase my-5">Reject Permit</h3>
              <label class="input border border-cyan-200 text-cyan-200 flex items-center gap-2 py-2"
              style={ reasonE() ? {
                  "border-color": "var(--color-red-500)" } : {}
                }>
              <AiFillQuestionCircle />
              <input onchange={e => setReason(e.target.value)} type="text" class="grow rounded text-cyan-200" placeholder="Reason" />
              </label>
              
              { reasonE() && <p class="text-red-500">{reasonE()}</p> }
              <button class="border border-cyan-200 text-cyan-200 mt-10 p-3 rounded-2xl hover:bg-cyan-800 cursor-pointer" onclick={() => sendRejection()}>REJECT</button>
            </div>
          </div>
        </dialog>
      }
    </main>
  );
}
