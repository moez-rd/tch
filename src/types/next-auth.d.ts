import { type DefaultSession } from 'next-auth';

import type { User } from '@/types/technofest';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User & DefaultSession['user'];
  }
}
