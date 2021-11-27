import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TestComponent, TestDirective } from "./test";

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, TestComponent, TestDirective],
    bootstrap: [AppComponent],
})
export class AppModule {}
