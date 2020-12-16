import { Component, OnInit } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";
import { BehaviorSubject } from "rxjs";
import { finalize } from "rxjs/operators";

const observable = new BehaviorSubject(null);

@Component({
    selector: "app-test",
    template: `test`,
})
export class TestComponent extends SubscribableComponent implements OnInit {
    ngOnInit(): void {
        this.subscriptions = [
            observable
                .pipe(finalize(() => console.log("unsubscribe")))
                .subscribe(),
        ];
    }
}
