# Deno KV Template

This application is a starter template that uses [Fresh](https://fresh.deno.dev/) and [Deno KV](https://deno.com/kv) for persistence. [Check out a live demo here!](https://fresh-kv-example.deno.dev/) Learn more about [building web applications with Fresh](https://fresh.deno.dev/docs/introduction), and about interacting with [Deno KV to store data](https://deno.com/manual/runtime/kv).

## Running locally

To run this application locally, ensure the [Deno runtime is installed first](https://deno.com/manual/getting_started/installation). In the folder where you cloned this app, run this command:

```
deno task start
```

This will start the Fresh server, as configured in `deno.json` at the root of this project. Your project will be monitored for changes, and restart if necessary.

## Running on Deno Deploy

To run this project in production, you will need access to the [Deno KV private beta on Deno Deploy](https://deno.com/manual/runtime/kv). Once you have access to Deno KV on Deploy, you can deploy this project like any other - you can [deploy using a GitHub integration](https://deno.com/deploy/docs/ci_github) if your app is pushed up to GitHub, or you can [deploy from the CLI using deployctl](https://deno.com/deploy/docs/deployctl) and the commands below.

```
# Install the "deployctl" command line tool
deno install --allow-all --no-check -r -f https://deno.land/x/deploy/deployctl.ts

# Store your personal access token in a DENO_DEPLOY_TOKEN environment variable
# Create a token at https://dash.deno.com/account#access-tokens
export DENO_DEPLOY_TOKEN=ddp_Nxxxxxxxxx

# Deploy to a project created at https://dash.deno.com
deployctl deploy --project=<your project name here> --prod main.ts
```

## A quick project overview

This template is a lightly modified version of the default Deno Fresh application template. It displays a simple counter that is persisted by Deno KV. Here's where to find a few key parts of this Fresh application:

* `utils/db.ts` - opens a Deno KV data store and handles updating a count property
* `routes/index.tsx` - Handles and renders server-side a request to the home page
* `routes/api/count.ts` - a route that handles an HTTP POST request to update the count
* `islands/Counter.tsx` - a client-side [island](https://fresh.deno.dev/docs/concepts/islands) that handles user interaction in the browser

To learn more about how your Fresh project works, check out the [Fresh manual](https://fresh.deno.dev/docs/introduction).

## License

MIT
