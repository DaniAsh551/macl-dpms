import { A } from "@solidjs/router";
import { AiFillCalendar, AiFillClockCircle, AiFillCloseCircle, AiFillPlusSquare, AiFillQuestionCircle } from "solid-icons/ai"
import { FaSolidCheck, FaSolidCross, FaSolidFileCsv, FaSolidFilePdf, FaSolidMagnifyingGlass, FaSolidQrcode } from "solid-icons/fa"
import { createSignal, onMount } from "solid-js";
import api from "~/api";
import {z} from "zod";
import { getZError, today } from "~/utils";
import Unauthorized from "./403";
import jsPDF from "jspdf";
import { json2csv } from "json-2-csv";

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
    name: string,
    department: {
      id: number;
      deleted: boolean;
      createdAt: Date;
      updatedAt: Date;
      name: string;
    }
  },
  department: {
    id: number;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  }
};

export type Filter = {
  s?: string,
  type?: PermitType|string,
  department_id?: number,
  approved?:boolean,
  user_id?:number
};

export default function Dashboard() {
  if(!api.isLoggedIn() || !api.user.get()!.roles.includes("admin")) return Unauthorized();

  const [error, setError] = createSignal<string>("");
  const [ filters, setFilters ] = createSignal<Filter>({});
  const [expiring, setExpiring] = createSignal<Permit[]>([]);
  const [permits, setPermits] = createSignal<Permit[]>([]);

  const getExpiring = async function() {
    const response = await api.get<Permit[]>("/permit/expiring");
    if(response.error) {
      setError(response.error!);
    } else {
      setExpiring(response.data!);
    }
  };

  const getPermits = async function() {
    const filter = { ...filters() };
    if(filter.type === undefined || filter.type === "") delete filter.type;
    if(filter.s === undefined || filter.s === "") delete filter.s;
    const response = await api.get<Permit[]>("/permit", filter);
    if(response.error) {
      setError(response.error!);
    } else {
      setPermits(response.data!);
    }
    await getExpiring();
  };

  const exportPdf = async function() {
    if(permits().length < 1) return;
    const pdf = new jsPDF("l", "px", "a4");
    await pdf.html(document.querySelector("table")!, {
      margin: [ 10, 10, 10, 10 ],
      html2canvas: {
        scale: 0.5
      }
    });
    pdf.save("permits.pdf");
  };

  const exportCsv = async function() {
    if(permits().length < 1) return;
    const csv = json2csv(permits().map(x => ({
      ID: x.id,
      Type: x.type,
      Staff: x.user.name,
      Department: x.department.name,
      Justification: x.justification,
      From: new Date(x.valid_from).toLocaleDateString(),
      Until: new Date(x.valid_until).toLocaleDateString(),
      Approved: x.approved === null || x.approved === undefined ? "N/A"
      : x.approved ? "Yes" : "No",
    })));

    const file = new Blob([csv], {type: "text/csv"});
    const lnk = document.createElement("a");
    lnk.download = "permits.csv";
    lnk.href = URL.createObjectURL(file);
    lnk.style.display = "none";
    document.body.appendChild(lnk);

    setTimeout(() => {
      lnk.click();
      lnk.remove();
    }, 100);
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
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Permits</h1>
      { error() && <p class="font-thin text-red-500 py-3">{error()}</p> }
      {
        expiring().length > 1 && <div class="md:px-24 pb-20">
          <h3 class="max-3-xs text-3xl text-orange-700 font-thin uppercase my-16">The following permits are expiring soon (2 weeks):</h3>
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3">
            { expiring().map(permit =>
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
                    <span> {permit.user.name} | <span class="font-thin text-gray-300">{permit.department.name}</span></span>
                  </p>
                </div>
              </div>) }
          </div>
        </div>
      }
      <div class="max-w-lg mx-auto">
        <div class="flex">
            <select
              onchange={(e) => setFilters({ ...filters(), type: e.target.value })}
              class="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
              <option value="">All</option>
              <option value={PermitType.Permanent}>{PermitType.Permanent}</option>
              <option value={PermitType.Restricted}>{PermitType.Restricted}</option>
              <option value={PermitType.Temporary}>{PermitType.Temporary}</option>
            </select>
            <div class="relative w-full">
              <input onchange={(e) => setFilters({ ...filters(), s: e.target.value })} type="text" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search ..." />
              <button onclick={getPermits} class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <FaSolidMagnifyingGlass />
                  <span class="sr-only">Search</span>
              </button>
            </div>
            {
          permits().length > 0 && <>
            <button
              onclick={exportCsv} title="Export to CSV"
              class="px-2 hover:cursor-pointer ml-2 text-2xl rounded bg-green-800 border border-green-200 text-green-200 hover:bg-green-600">
                <FaSolidFileCsv />
            </button>
            <button
              onclick={exportPdf} title="Export to CSV"
              class="px-2 hover:cursor-pointer ml-2 text-2xl rounded bg-red-800 border border-red-200 text-green-200 hover:bg-green-600">
                <FaSolidFilePdf />
            </button>
          </>
        }
        </div>
        
      </div>

      {
        permits().length < 1 && <p class="font-thin text-gray-500 py-3">No permits found.</p>
      }
      {
        permits().length > 0 && <div class="md:px-32 justify-center">
          <table class="mt-10 mx-auto">
            <thead style={{ color: "#99a1af", "background-color": "#191a1b" }} class="text-xs uppercase">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Staff
                </th>
                <th scope="col" class="px-6 py-3">
                  Department
                </th>
                <th scope="col" class="px-6 py-3">
                  Justification
                </th>
                <th scope="col" class="px-6 py-3">
                  From
                </th>
                <th scope="col" class="px-6 py-3">
                  Until
                </th>
                <th scope="col" class="px-6 py-3">
                  Approved
                </th>
              </tr>
            </thead>
            <tbody>
            { permits().map(permit =>
              <tr 
              style={{ "background-color": "#1e2939", "color": "white", "border": "1px solid black" }}>
                <td class="px-6 py-4">
                    {permit.id}
                </td>
                <td class="px-6 py-4">
                    {permit.type}
                </td>
                <td class="px-6 py-4">
                    {permit.user.name}
                </td>
                <td class="px-6 py-4">
                    {permit.user.department.name}
                </td>
                <td class="px-6 py-4">
                    {permit.justification}
                </td>
                <td class="px-6 py-4">
                  {new Date(permit.valid_from).toLocaleDateString()}
                </td>
                <td class="px-6 py-4">
                  {new Date(permit.valid_until).toLocaleDateString()}
                </td>
                <td class="px-6 py-4">
                  {
                    permit.approved === null || permit.approved === undefined ? "N/A"
                    : permit.approved ? "Yes" : "No"
                  }
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      }
    </main>
  );
}
