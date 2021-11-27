import { npmPackagr } from "npm-packagr";
import { assets, badge, BadgeType, git, publish } from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        ({ exec }) => exec("npx ng build"),

        badge(BadgeType.Build),

        ({ exec }) => exec("npm test"),

        badge(BadgeType.Test),

        badge(BadgeType.License),

        assets("LICENSE", "README.md"),

        git("commit", "ngx-subscribable"),
        git("push"),

        publish({ account: "paveldymkov", email: "dymkov86@gmail.com" }),
    ],
});
