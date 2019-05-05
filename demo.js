const FormData = require('form-data');
const params = new FormData();
params.append("Book[name]", "测试");
params.append("Book[author]", "数据");

const fetch = require('node-fetch');
fetch('http://localhost/basic/web/index.php?r=book/add', { method: 'POST', body: params })
    .then(res => res.json())
    .then(json => console.log(json))
