import { CanActivate } from "@angular/router";

class LoggedInGuard implements CanActivate {
    canActivate():boolean{
        return true;
    }
}