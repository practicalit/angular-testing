# AngularUnitTesting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notes

### CUSTOM_ELEMENT_SCHEMA
Adding schemas: [CUSTOM_ELEMENT_SCHEMA] in the TestBed.configureTestModule tells
angular to forget anything that is not in the given module.
This is applicable if the component under the test is using component that is 
in the other module and feels foreign about it.
When this happens, one way is to add the component in question to the declaration
array or just to add the schemas with the above array value.

### NO_ERRORS_SCHEMA
Adding this in schemas: [NO_ERRORS_SCHEMA] is basically saying forget about all
the things that are coming from the template and move on.

### Avoid adding whole module in the test's import 
Sometimes, adding the import: [SomeRealAppModule] could solve some of the issues
specially when the component includes other component, but that is a bad idea 
that it can take longer to load all the modules and can make the whole thing 
slow since it is called on every call.
