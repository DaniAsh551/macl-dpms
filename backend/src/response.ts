import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

export interface IResponse {
    status:      number,
    statusText?: string|null,
    data?:       any,
    error?:      string|null
}

export function success(ctx: Context, data:any) {
    const resp:IResponse = {
        status: 200,
        data
    };
    return ctx.json(resp, 200);
}

export function error(ctx: Context, error:string, status:StatusCode, data:any = null) {
    const resp:IResponse = {
        status,
        data,
        error
    };
    return ctx.json(resp, status);
}

export function response(ctx: Context, status:StatusCode, data:any = null, error?:string) {
    const resp:IResponse = {
        status,
        data,
        error
    };
    return ctx.json(resp, status);
}
