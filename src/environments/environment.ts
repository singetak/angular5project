// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serverURL: 'http://localhost:8001/v1/',
  userName: 'admin@store.com',
  password: '123456',
  firebase: {
    apiKey: "AIzaSyCY_46nikDgEitoyeyVWT-6sViwnBWg5oM",
    authDomain: "itechuse-13595.firebaseapp.com",
    databaseURL: "https://itechuse-13595.firebaseio.com",
    projectId: "itechuse-13595",
    storageBucket: "itechuse-13595.appspot.com",
    messagingSenderId: "747546130232"
  }
};
