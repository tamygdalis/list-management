const express = require("express"); // ME ena suntomo research poy pragmatopoihsa ola ta tutorials proteinan to express. Einai eukolo sth xrhsh
//kai me liges grammes kwdika pragmatopoihsa auto poy hthela

const app = express();

const apiUri = `https://api.createsend.com/api/v3.3/`;
const clientId = "b667d82f7d30793f804118bd5c8e3fcb";
const listId = "70f61368536809e3532f5bb40210a8f4";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));// Dinei th dunatothta sto express na steilei pisw statika arxeia (html,css,js)

auth = {
    username:
      "tH+9OMXIVozg5jjoRdfsTb8XXcwaOHU5W6PWYIekzOtfj9JlXfPURWFRiFA3by+oWkQOv6jsiKWE2BorB15cwKg7M6vSZGYqJsaGzE6Vo+1SPXDZwagkY2XUdCWL+6EcbbyIopH/68+lerv0HhLMOQ==",
    password: "",
  };

app.listen(3000, () => {
    console.log("Started");
});
