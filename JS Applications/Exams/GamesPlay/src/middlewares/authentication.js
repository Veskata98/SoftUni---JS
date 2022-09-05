import { getUser } from "../utils/userUtils.js";


export const auth = (ctx, next) => {
    const user = getUser();
    ctx.user = user;

    next();
}