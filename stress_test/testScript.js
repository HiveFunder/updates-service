import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1000,
  duration: '120s',
  rps: 1500
};

const min = 40000000;
const max = 60000000;
const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

export default function() {
  http.get(`http://localhost:8080/api/${randNum}/updates`);
  sleep(1);
}
