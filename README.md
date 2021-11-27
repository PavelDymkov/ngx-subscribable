# NgxSubscribable

![build: passing](https://raw.githubusercontent.com/PavelDymkov/ngx-subscribable/master/badges/build.svg)
![test: passing](https://raw.githubusercontent.com/PavelDymkov/ngx-subscribable/master/badges/test.svg)
![license: MIT](https://raw.githubusercontent.com/PavelDymkov/ngx-subscribable/master/badges/license.svg)

A subscribable means that the component (or the directive) will have an array of the subscriptions.
The library provides to the class a `subscriptions` property. You can push subscriptions to this property.
Just extends `SubscribableComponent`.

Example:

```ts
import { Component, OnInit } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";

@Component({
    selector: "my-component",
    template: `Content`,
})
export class MyComponent extends SubscribableComponent implements OnInit {
    constructor(
        // service with some observable for subscribing
        private someService: SomeService,
    ) {
        // don't forget to call `super` if using a constructor
        super();
    }

    ngOnInit(): void {
        // property that SubscribableComponent provided
        this.subscriptions = [
            this.someService.observable
                .pipe(
                    finalize(() => {
                        // will be calling when a component will destroyed.
                    }),
                )
                .subscribe(),
        ];
    }
}
```

Don't forget to call `ngOnDestroy.super()` if define `ngOnDestroy`:

```ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";

@Component({
    selector: "my-component",
    template: `Content`,
})
export class MyComponent
    extends SubscribableComponent
    implements OnInit, OnDestroy
{
    constructor(private someService: SomeService) {}

    ngOnInit(): void {
        this.subscriptions = [this.someService.observable.subscribe()];
    }

    ngOnDestroy(): void {
        super.ngOnDestroy(); // <<< !!!

        // do something
    }
}
```

Using a directive:

```ts
import { Directive, OnInit } from "@angular/core";
import { SubscribableDirective } from "ngx-subscribable";
import { from } from "rxjs";

@Directive({ selector: "[directive]" })
export class MyDirective extends SubscribableDirective implements OnInit {
    ngOnInit(): void {
        this.subscriptions = [from(document, "click").subscribe()];
    }
}
```

Using a service:

```ts
import { Injectable } from "@angular/core";
import { SubscribableService } from "ngx-subscribable";
import { from } from "rxjs";

@Injectable()
export class TestService extends SubscribableService {
    constructor() {
        super();

        this.subscriptions = [from(document, "click").subscribe()];
    }
}
```
