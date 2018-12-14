/**
 * Created by wangxuelei on 2018/12/11.
 */
"use strict";
const fs = require("fs");
const iconv = require("iconv-lite");


(async () => {

  const fileStr = fs.readFileSync("draft");
  let string = "\x22\xE5\x9F\x8E\xE5\xB8\x82\xE5\xB2\x9B\xE5\xB1\xBF";
  console.log(iconv.decode("\x22\xE5\x9F\x8E\xE5\xB8\x82\xE5\xB2\x9B\xE5\xB1\xBF", "utf8"));

})();
