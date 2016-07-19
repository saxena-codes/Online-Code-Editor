# Online Code Editor

Code editor for your website. Easy integration and easy set up.

Check this online at: http://code.runnable.com/u/harshitvsaxena

---

#### Disclaimer:

We are using Hacker Rank API for compiling and running the code. You can know more about it by visiting: https://www.hackerrank.com/api/docs

We have used ACE editor, you can visit this great editor at: https://ace.c9.io

---

### Structure of the folder:

```
|-- public
|   |-- ace_modes.json
|   |-- ace_themes.json
|   |-- script.js
|   |-- index.html
|
|-- server.js
|-- package.json
```

---

### [public/ace_modes.json](public/ace_modes.json)

This contain all ace editor modes, also it contains ace modes according to the Hacker Rank API language codes. The languages which are not supported by ACE editor are marked as false with respective codes.

When this false is found the editor theme is set to `text`.

---

### [public/ace_themes.json](public/ace_themes.json)

All the ACE themes are indexed in this json file.

---

### [public/index.html](public/index.html) and [public/script.js](public/script.js)

Main front-end files. Display the editor, as well as script.js contains all the AJAX calls made to the server.

---

### [server.js](server.js)

Main server file, run it like this:

```sh
$ npm install
$ node server.js
```

This will start the server at `localhost:8080`.

---

### [package.json](package.json)

Main packages used in creating this app are:

- http
- express
- body-parser
- multer

---

## Thank You
