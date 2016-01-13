import styles from './styles.css';

export default function (body) {
    return `
    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="/style.css" />
    </head>
    <body>
    <div id="mount" class="${styles.mount}">${body}</div>
    <script type="text/javascript" src="/client.js"></script>
    </body>
    </html>
    `;
}
