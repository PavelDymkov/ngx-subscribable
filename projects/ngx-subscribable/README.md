# NgxSubscribable

Example:

```ts
import { Component, OnInit } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";

@Component({
    selector: "app-foo",
    template: `Content`,
})
export class FooComponent extends SubscribableComponent implements OnInit {
    constructor(
        // Service with some observable for subscribe
        someService,
    ) {}

    ngOnInit(): void {
        // Property that SubscribableComponent provided
        this.subscriptions = [
            someService.observable
                .pipe(
                    finalize(() => {
                        // Will be call when component will destroyed
                    }),
                )
                .subscribe(),
        ];
    }
}
```

Don't forget call ngOnDestroy.super() if define ngOnDestroy:

```ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";

@Component({
    selector: "app-foo",
    template: `Content`,
})
export class FooComponent
    extends SubscribableComponent
    implements OnInit, OnDestroy {
    constructor(someService) {}

    ngOnInit(): void {
        this.subscriptions = [someService.observable.subscribe()];
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();

        // do something
    }
}
```

Using directive:

```ts
import { Component, OnInit } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";
import { from } from "rxjs";

@Directive({
    selector: "app-foo",
})
export class FooDirective extends SubscribableDirective implements OnInit {
    ngOnInit(): void {
        this.subscriptions = [from(document, "click").subscribe()];
    }
}
```
