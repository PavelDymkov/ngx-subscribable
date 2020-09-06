import { Component, OnInit } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";

@Component({
    selector: "app-test",
    template: `test`,
})
export class TestComponent extends SubscribableComponent implements OnInit {
    ngOnInit(): void {
        this.subscriptions.push({
            unsubscribe() {
                console.log("unsubscribe");
            },
        } as any);
    }
}
