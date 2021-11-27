import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export abstract class SubscribableService implements OnDestroy {
    protected subscriptions: Subscription[] = [];

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
}
