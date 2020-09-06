import { Component, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

@Component({
    template: "",
})
export abstract class SubscribableComponent implements OnDestroy {
    protected subscriptions: Subscription[] = [];

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
}
