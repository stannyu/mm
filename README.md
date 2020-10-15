#### Description for reviewers

*First thing to mention is that I hope it is not a test for creating documentation. Otherwise I would take more time to create proper docs. 
This is just an assignment explanation*. 

*To complete this assignment I used plain Javascript and very simple setup with webpack. I also tried to keep code readable 
and that's why you will not find comments there (well, almost). Method's names should be self-explanatory.*

*Few small notes:* 
  - *You should be able to navigate using keyboard only.*
  - *Didn't remove outline from interactive elements (except for hidden input) due to accessibility.*

*I didn't want to overcomplecate this task and thought about scalability so used **model-view-controller** architectural pattern (MVC).*

*Let me briefly explain this approach:*

 - *The **model** is the data. In this library, model will be responsible for setting optional emails, getting valid emails count, adding 
random emails. In terms of scalability this is the best candidate to extend to State management, proper CRUD and so on.*

 - *The **view** is how the data is displayed. In this library view will create DOM elements: email tags, input element and remove button for email tags.
Can be extended to template engine, components lib etc.*

 - *The **controller** connects the model and the view. It takes user input, such as clicking or typing, and handles callbacks for user interactions.
This is the place where business logic live.*

 - *The model never touches the view. The view never touches the model. The controller connects them.*

*Happy reviewing!*


# Demo

The demo is available [here](https://stannyu.github.io/izanagi/dist/)

# Building and running on localhost

Install dependencies, use `yarn start` or `npm run start` to run project and `yarn build` or `npm run build` to run production build.
Or just use prebuilt version from `dist` folder.

# Usage

Create an instance of `EmailsEditor` by calling globally available variable:

```html
<body>
  <div id="emails-input"></div>
  <script>
    const inputContainerNode = document.querySelector('#emails-input');
    const emailsInput = new EmailsEditor(inputContainerNode);
  </script>
</body>
```

On creation step you can pass some options (`placeholder`, `emails`) and assign `handleAddEmails` and `handleEmailsCount` methods
to DOM elements of your choice:

```html
<body>
  <div id="emails-input"></div>
  <button class="btn" type="button" data-add>Add email</button>
  <button class="btn" type="button" data-get-count>Get emails count</button>
  <script>
    const emailsContainer = document.getElementById('emails-input');
    const options = {
      placeholder: 'custom placeholder',
      emails: ['test@miro.io', 'test1@miro.io', 'not an email', 'email@miro.io'],
    };
    const editor = new EmailsEditor(emailsContainer, options);

    const selectorAddEmail = document.querySelectorAll('[data-add]')[0];
    const selectorGetEmailsCount = document.querySelectorAll('[data-get-count]')[0];

    editor.handleAddEmails(selectorAddEmail);
    editor.handleEmailsCount(selectorGetEmailsCount);
  </script>
</body>
```

# API

## EmailEditor

```typescript
new EmailEditor(element: HTMLElement, options?: object);
```

`element` should be valid DOM element without content

## Options

Example using with options:

```javascript
const options = {
  placeholder: 'custom placeholder', // custom placeholder
  emails: ['test@miro.io', 'test1@miro.io', 'not an email', 'email@miro.io'], // predefined emails
};
```

## Events

You can also assign event listeners of Emails Editor instance to DOM elements of your choice.
There are two of them: `handleAddEmails` and `handleEmailsCount` to add random email and get valid emails count.
Use it like this:

```javascript
const editorInstance = new EmailsEditor(emailsContainer, options);

editorInstance.handleAddEmails([[DOMElement]]);
editorInstance.handleEmailsCount([[DOMElement]]);
```
