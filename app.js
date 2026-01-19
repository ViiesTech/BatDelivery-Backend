const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const PORT = 4010 || process.env.PORT;
const connectDB = require("./db/config");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bat Delivery Backend is Working")
});

app.use("/",
    express.static( path.resolve(__dirname, "./public/vendor/"))
);

app.use("/",
    express.static( path.resolve(__dirname, "./public/user/"))
);

app.use("/",
    express.static( path.resolve(__dirname, "./public/driver/"))
);

app.use("/",
    express.static( path.resolve(__dirname, "./public/product/"))
);

app.use("/api", require("./routes/admin"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/vendor"));
app.use("/api", require("./routes/driver"));

const start = async () => {
    try {
        connectDB();
        server.listen(PORT, () => {
            console.log(`Server is Successfully Running on Port: ${PORT}`)
        })
    } catch (error) {
        console.log("Having Errors Running Server :", error)
    }
};

start();