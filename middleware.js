import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

// export const function middleware(req, res, next) {
//     return NextResponse.rewrite("/new-path")
// }
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
