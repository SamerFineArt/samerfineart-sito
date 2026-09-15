import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Applica il middleware a tutte le pagine tranne le API routes,
  // i file statici e gli asset interni di Next.js.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
