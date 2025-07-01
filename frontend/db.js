const fs = require("fs");
const { exec } = require("child_process");

// 여러 JSON 파일을 불러오기
const aprilExpenses = require("./data/monthly_expenses/april_expenses.json"); 
const mayExpenses = require("./data/monthly_expenses/may_expenses.json");

// 하나의 객체로 합치기
const db = { 
  expenses: [ ...aprilExpenses, ...mayExpenses, ]
};

// db.json 파일로 저장
const dbPath = "./data/db.json";
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("db.json 생성 완료");

// json-server 실행: --host 0.0.0.0를 붙여 실행해 줘야, 외부 기기(모바일)에서 서버로 접근이 가능
const server = exec(`npx json-server --watch ${dbPath} --port 4000 --host 0.0.0.0`);

server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);

// json-server 실행 명령어: node data/db.js