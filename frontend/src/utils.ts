import {z} from "zod";

/**
 * Get Zod error
 * @param error 
 * @param field 
 * @returns 
 */
export function getZError(error:z.ZodError, field:string) {
    return error.issues.filter(issue => issue.path.includes(field)).findLast(x => x);
}

export function today() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}