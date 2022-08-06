import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

/* An interface that represents your data model */
export interface AppResolver {
  id: number;
  name: string;
}

export class AppResolverService implements Resolve<AppResolver> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppResolver> {
    // your logic goes here
  }
}