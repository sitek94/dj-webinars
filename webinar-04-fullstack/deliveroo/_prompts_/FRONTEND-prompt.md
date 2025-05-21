# Frontend Prompt

## preparation

- it consumed nearly 150k tokens (daily free limit) in 1 go.
- very minor issues to be fixed:
  - angular templates can include `static {{dynamic}} static` whereas it used `static ${{dynamic}} static` (syntax error, but trivial to fix)
  - a single angular module (AngularReactiveForms module?) cannot be added to standalone components (breaks angular compiler, removed, will need to deal with forms later in Cursor IDE)
- minor changes (e.g. package name, etc)

## Original Prompt

> Please generate an Angular-based (angular v 19) application for managing a logistics fleet, called Deliveroo. The app uses angular routing and tailwind CSS for styling and angular material.
> 
> The main layout includes:
> - header with 2-3 options on the left (dashboard, fleet, personnel) and login button on the right
> - the main container which shows different content, depending on the subpage
> - footer with typical links such(Contact, Sitemap, Privacy Policy, etc).
> 
> It would consist of multiple pages:
> - the index page. header shows only login, footer shows everything, main content shows a call-to-action "deliver your stuff now" which proceeds to the another page (deliver-process). There is also some marketing stuff that encourages customers to use this exact company
> - the deliver process which is a multi-step form
> - a dashboard which shows a table with some mock data
> - login form, which accepts username/email and password (along with submit button and a "Forgot your password" link.
> 
> When login button is clicked, there is an appropriate angular auth service which has a hardcoded isAuthenticated signal which simply turns to true. There's analogical log out button which does the opposite. Also, when the user is logged in.
> 
> organize the codebase around domains, e.g. each functional subpage has its own directory. All logic/view specific to that subpage exists there. There's also a "shared-ui" directory for reusable components.
> 
> All should be very nice looking, and in elegant blue color scheme. You can use advanced tailwind, where appropriate.
