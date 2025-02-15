import { AiFillMessage, AiFillEye, AiFillClockCircle, AiFillCloseCircle } from "solid-icons/ai"
import { createSignal } from "solid-js";
import api from "~/api";
import Camera from "~/components/Camera";

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

export default function Verify() {
  
  const [showDialog, setShowDialog] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string|undefined>();
  const [ permit, setPermit ] = createSignal<Permit|null>(null);

  const handleQr = async (qr: string) => {
    const re = /^permit-([0-9]*)$/;
    const matches = re.exec(qr);
    if(!matches || matches.length < 2 || matches[1] == "") {
      setError("Invalid QR");
      return setShowDialog(true);
    }
    const id = matches[1];
    const resp = await api.get<Permit>(`/permit/${id}`);

    if(resp.error) {
      setError(resp.error);
      return setShowDialog(true);
    }
    setPermit(resp.data!);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setError(undefined);
    setPermit(null);
    setShowDialog(false);
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

  return (
    <main class="mx-auto text-gray-700 p-4 justify-center text-center">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Verify</h1>
      <div class="w-screen flex justify-center">
        <Camera onQr={d => handleQr(d)} />
      </div>
      {
        showDialog() && <dialog class="bg-[#000000a6] p-4 rounded-lg shadow-md block align-middle content-center text-center w-screen h-screen justify-center absolute top-0">
          <div class="w-96 flex-col justify-center bg-slate-800 rounded-2xl mx-auto">
            <button class="cursor-pointer float-right rounded-full p-2 bg-transparent text-cyan-600 border-none text-2xl hover:text-cyan-800" onclick={closeDialog}><AiFillCloseCircle/></button>
            <div class="grid gap-y-2 w-full px-5 pb-5">
              {
                error() && 
                <h3 class="max-3-xs text-3xl text-orange-700 font-thin uppercase">{error()}</h3>
              }
              {
                !error() && permit() && <div
                  class={`border-2 rounded-2xl border-cyan-200 card shadow-xl p-10 bg-${permit()!.approved ? "green" : "red"}-300`}>
                  { (new Date(permit()!.valid_until) > new Date()) && <h3 class="max-3-xs text-3xl text-orange-700 font-thin uppercase">
                    EXPIRED
                  </h3> }
                  <div class="w-11/12">
                    {permit()!.justification}
                  </div>
                  <div>
                    <div class={`rounded text-white text-sm capitalize ${bagdgeColor(permit()!)}`}>
                      {permit()!.type}
                    </div>
                  </div>
                  <div class="w-full">
                    <span class="inline-block pr-2 pt-2"><AiFillClockCircle /></span>
                    <span class="text-sm text-gray-500">{new Date(permit()!.valid_from).toLocaleDateString()}</span>
                    <span class="text-sm text-gray-500 font-extrabold"> TO </span>
                    <span class="text-sm text-gray-500">{new Date(permit()!.valid_until).toLocaleDateString()}</span>
                  </div>
                  <div class="w-full pt-3">
                    <p>Requested by: 
                      <span> {permit()!.user.name} | <span class="font-thin text-gray-300">{permit()!.user.department.name}</span></span>
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        </dialog>
      }
    </main>
  );
}
