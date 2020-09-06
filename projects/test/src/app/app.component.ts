import { Component } from "@angular/core";
import { SubscribableComponent } from "ngx-subscribable";

@Component({
    selector: "app-root",
    template: `
        <button (click)="isTestShow = !isTestShow">Toggle</button>
        <br />
        <app-test *ngIf="isTestShow"></app-test>
    `,
    styles: [],
})
export class AppComponent extends SubscribableComponent {
    isTestShow = false;
}
