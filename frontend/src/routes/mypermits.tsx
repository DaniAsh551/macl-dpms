import { A } from "@solidjs/router";
import { AiFillCalendar, AiFillClockCircle, AiFillCloseCircle, AiFillPlusSquare, AiFillQuestionCircle } from "solid-icons/ai"
import { FaSolidQrcode } from "solid-icons/fa"
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
};

export type Permits = {
  approved: Permit[];
  pending: Permit[];
  rejected: Permit[];
};

export default function MyPermits() {
  if(!api.isLoggedIn() || !api.user.get()!.roles.includes("staff")) return Unauthorized();

  const [showDialog, setShowDialog] = createSignal<boolean>(false);
  const [showReq, setShowReq] = createSignal<boolean>(false);
  const [showQr, setShowQr] = createSignal<boolean>(false);
  const [qr, setQr] = createSignal<string>("Example");
  const [error, setError] = createSignal<string>("");
  const [approved, setApproved] = createSignal<Permit[]>([]);
  const [pending, setPending] = createSignal<Permit[]>([]);
  const [rejected, setRejected] = createSignal<Permit[]>([]);
  
  //form fields
  const [justification, setJustification] = createSignal<string>("");
  const [permitType, setPermitType] = createSignal<PermitType>(PermitType.Temporary);
  const [validFrom, setValidFrom] = createSignal<Date|undefined>(undefined);
  const [validUntil, setValidUntil] = createSignal<Date|undefined>(undefined);
  
  //form errors
  const [justificationE, setJustificationE] = createSignal<string|undefined>(undefined);
  const [permitTypeE, setPermitTypeE] = createSignal<string|undefined>(undefined);
  const [validFromE, setValidFromE] = createSignal<string|undefined>(undefined);
  const [validUntilE, setValidUntilE] = createSignal<string|undefined>(undefined);
  const [formError, setFormError] = createSignal<string|undefined>(undefined);

  const setAndShowQr = (id:string) => {
    setQr(id);
    setShowReq(false);
    setShowQr(true);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setValidFrom(undefined);
    setValidUntil(undefined);
    setPermitType(PermitType.Temporary);
    setShowReq(false);
    setShowQr(false);
    setShowDialog(false);
  };

  const getPermits = async function() {
    const response = await api.get<Permits>("/permit/mine");
    if(response.error) {
      setError(response.error!);
    } else {
      setPending(response.data!.pending);
      setApproved(response.data!.approved);
      setRejected(response.data!.rejected);
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

  // request for a new permit
  const request = async() => {
    const schema = z.object({
      justification: z.string().min(3, { message: "Justification is required" }),
      type: z.nativeEnum(PermitType),
      valid_from: z.date().min(today()),
      valid_until: z.date().min(today())
    })

    const result = schema.safeParse({
      justification: justification(),
      type: permitType(),
      valid_from: validFrom(),
      valid_until: validUntil()
    });

    if(result.error) {
      setJustificationE(getZError(result.error, "justification")?.message);
      setPermitTypeE(getZError(result.error, "type")?.message);
      setValidFromE(getZError(result.error, "valid_from")?.message);
      setValidUntilE(getZError(result.error, "valid_until")?.message);
      return;
    }

    const response = await api.post<Permit>("/permit", result.data!);

    if(response.error) {
      return setFormError(response.error);
    } else {
      closeDialog();
      await getPermits();
    };
  };

  onMount(async () => await getPermits());

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">My Permits</h1>
      <button class="border border-cyan-200 text-cyan-200 mt-10 p-3 rounded-2xl hover:bg-cyan-800 cursor-pointer" title="Request New Permit"
        onclick={() => { setShowReq(true); setShowDialog(true); }}>
        <AiFillPlusSquare class="pr-1 inline-block text-2xl" /> Request
      </button>
      { error() && <p class="font-thin text-red-500 py-3">{error()}</p> }
      {
        (pending().length + approved().length + rejected().length) < 1 && <p class="font-thin text-gray-500 py-3">No permits found.</p>
      }
      {
        pending().length > 0 && <div class="md:px-32 justify-center">
          <h2 class="max-3-xs text-3xl text-sky-700 font-thin uppercase my-5">Pending</h2>
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
            </div>) }
          </div>
        </div>
      }
      {
        approved().length > 0 && <div class="md:px-32 justify-center">
          <h2 class="max-3-xs text-3xl text-sky-700 font-thin uppercase my-5">Approved</h2>
          <div class="grid grid-cols-1 md:grid-cols-6 gap-5">
            { approved().map(permit =>
            <div
              class={`border-2 rounded-2xl border-cyan-200 card shadow-xl px-10 pb-10 bg-${permit.approved ? "green" : "red"}-300`}>
              <button class="w-2/12 self-end float-right border border-cyan-200 text-cyan-200 mt-10 p-3 rounded-2xl hover:bg-cyan-800 cursor-pointer"
                title="Show QR"
                onclick={() => setAndShowQr(permit.id.toString())}>
                  <FaSolidQrcode />
                </button>
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
            </div>) }
          </div>
        </div>
      }
      {
        rejected().length > 0 && <div class="md:px-32 justify-center">
          <h2 class="max-3-xs text-3xl text-sky-700 font-thin uppercase my-5">Rejected</h2>
          <div class="grid grid-cols-1 md:grid-cols-6 gap-5">
            { rejected().map(permit =>
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
              <p class="font-thin">{permit.reason}</p>
              <div class="w-full">
                <span class="inline-block pr-2 pt-2"><AiFillClockCircle /></span>
                <span class="text-sm text-gray-500">{new Date(permit.valid_from).toLocaleDateString()}</span>
                <span class="text-sm text-gray-500 font-extrabold"> TO </span>
                <span class="text-sm text-gray-500">{new Date(permit.valid_until).toLocaleDateString()}</span>
              </div>
            </div>) }
          </div>
        </div>
      }
      
      {
        showDialog() && <dialog class="bg-[#000000a6] p-4 rounded-lg shadow-md block align-middle content-center text-center w-screen h-screen justify-center absolute top-0">
          <div class="w-96 flex-col justify-center bg-slate-800 rounded-2xl mx-auto">
            {
              showReq() && <>
                <button class="cursor-pointer float-right rounded-full p-2 bg-transparent text-cyan-600 border-none text-2xl hover:text-cyan-800" onclick={closeDialog}><AiFillCloseCircle/></button>
                <div class="grid gap-y-2 w-full px-5 pb-5">
                  <h3 class="max-4-xs text-4xl text-sky-700 font-thin uppercase my-5">Request Permit</h3>
                  <label class="input border border-cyan-200 text-cyan-200 flex items-center gap-2 py-2"
                  style={ permitTypeE() ? {
                      "border-color": "var(--color-red-500)" } : {}
                    }>
                  Type
                  <select onchange={e => setPermitType(e.target.value as PermitType)}>
                    <option value={PermitType.Temporary}>Temporary</option>
                    <option value={PermitType.Restricted}>Restricted</option>
                    <option value={PermitType.Permanent}>Permanent</option>
                  </select>
                  </label>
                  <label class="input border border-cyan-200 text-cyan-200 flex items-center gap-2 py-2"
                  style={ justificationE() ? {
                      "border-color": "var(--color-red-500)" } : {}
                    }>
                  <AiFillQuestionCircle />
                  <input onchange={e => setJustification(e.target.value)} type="text" class="grow rounded text-cyan-200" placeholder="Justification" />
                  </label>
                  <label class="input border border-cyan-200 text-cyan-200 flex items-center gap-2 py-2"
                    style={ validFromE() ? {
                        "border-color": "var(--color-red-500)" } : {}
                      }>
                    <AiFillCalendar /> From
                    <input type="date" onchange={e => setValidFrom(new Date(e.target.value))} class="grow rounded text-cyan-200" placeholder="Valid From" />
                  </label>
                  <label class="input border border-cyan-200 text-cyan-200 flex items-center gap-2 py-2"
                    style={ validUntilE() ? {
                        "border-color": "var(--color-red-500)" } : {}
                      }>
                    <AiFillCalendar /> From
                    <input type="date" onchange={e => setValidUntil(new Date(e.target.value))} class="grow rounded text-cyan-200" placeholder="Valid Until" />
                  </label>
                  { formError() && <p class="text-red-500">{formError()}</p> }
                  <button class="border border-cyan-200 text-cyan-200 mt-10 p-3 rounded-2xl hover:bg-cyan-800 cursor-pointer" onclick={request}>REQUEST</button>
                </div>
              </>
            }
            {
              showQr() && <img class="bg-white p-10" onclick={closeDialog} src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=permit-${qr()}`} />
            }
          </div>
        </dialog>
      }
    </main>
  );
}
