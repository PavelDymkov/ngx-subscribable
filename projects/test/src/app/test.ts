import { Component, Directive, Injectable, OnInit } from "@angular/core";
import {
    SubscribableComponent,
    SubscribableDirective,
    SubscribableService,
} from "ngx-subscribable";
import { Subject, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class TestService extends SubscribableService {
    constructor() {
        super();

        this.subscriptions = [getTestSubscription("service")];
    }
}

@Directive({ selector: "app-test" })
export class TestDirective extends SubscribableDirective implements OnInit {
    ngOnInit(): void {
        this.subscriptions = [getTestSubscription("directive")];
    }
}

@Component({
    selector: "app-test",
    template: `test`,
    providers: [TestService],
})
export class TestComponent extends SubscribableComponent implements OnInit {
    constructor(_: TestService) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions = [getTestSubscription("component")];
    }
}

function getTestSubscription(
    target: "component" | "directive" | "service",
): Subscription {
    return new Subject()
        .pipe(finalize(() => console.log(`unsubscribe: ${target}`)))
        .subscribe();
}
