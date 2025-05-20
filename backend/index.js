/* const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const errorHandler = require("./utils").errorHandler;
const config = require("./config.json");


const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(
  session({
    secret: "your-session-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

const url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;
mongoose
  .connect(url)
  .then(() => console.log("DB Connected!!"))
  .catch((error) => console.log("Error", error));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = mongoose.model(
  "User",
  new Schema({
    id: ObjectId,
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, required: true },
    phoneNo: String,
    password: { type: String, required: true },
  })
);
 
const saleSchema = new mongoose.Schema({
  salespersonid: String,
  customername: String,
  customeremail: String,
  customerphone: String,
  vehiclebrand: String,
  vehiclemodel: String,
  saledate: Date,
  saleamount: Number,
  vehicleimage: String,
  vehicleyear: Number,
});

module.exports = mongoose.model('Sale', saleSchema);


app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      phoneNo,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid email or password" });

    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNo: user.phoneNo,
    };

    res.status(200).json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/home", async (req, res) => {
  if (!req.session.user || !req.session.user._id)
    return res.status(401).json({ error: "Not authenticated" });

  try {
    const user = await User.findById(req.session.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.post("/sales", async (req, res) => {
  try {
    const sale = new Sale(req.body); // 🔧 Create Sale
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    console.error("Error creating sale:", err);
    res.status(500).json({ error: "Failed to create sale" });
  }
});

app.get("/sales/:userId", async (req, res) => {
  try {
    const sales = await Sale.find({ salespersonid: req.params.userId }); // 🔧 Fetch by User
    res.status(200).json(sales);
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

app.get("/sales/:userId/:saleId", async (req, res) => {
  const { userId, saleId } = req.params;
  try {
    const sale = await Sale.findOne({ _id: saleId, salespersonid: userId }); // 🔧 Detail route
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.status(200).json(sale);
  } catch (err) {
    console.error("Error fetching sale:", err);
    res.status(500).json({ error: "Failed to fetch sale" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ error: "Could not log out" });
    res.send({ message: "Logout successful" });
  });
});

app.listen(config.port, config.host, () => {
  console.log(`Server running on ${config.host}:${config.port}`);
});
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require("path");
const multer = require("multer");

const User = require("./models/User");
const Sale = require("./models/Sale");


const app = express();
app.use(cors({
  origin: 'http://localhost:4200',  // Only allow your frontend
  credentials: true                 // Allow cookies, credentials
}));
// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(session({
  secret: 'ydckyghvgjhvgudutrswyer5td74e56dfuvjl',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,           // true only for HTTPS
    httpOnly: true,
    sameSite: 'lax'  ,
    maxAge: 1000 * 60 * 60,        // or 'none' if cross-origin with HTTPS
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// app.set("view engine", "ejs");

/* const methodOverride = require('method-override');
app.use(methodOverride('_method')); */


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Save in public/uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });
// app.use(
//   session({
//     secret: "ydckyghvgjhvgudutrswyer5td74e56dfuvjl",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60, // 1 hour
//     },
//   })
// );

// Database connection
// let url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;
let url = `mongodb+srv://sakshisukhani26:sakshi2601@valtech.j2mb7h2.mongodb.net/salesTracker?retryWrites=true&w=majority&appName=valtech`;


mongoose
  .connect(url)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database Connection Error:", err));


// Home Page
app.get("/", (req, res) => {
  // res.render("index",{user : null,message: ""});
});


app.post("/signup" ,async (req,res) => {
    console.log("in signup api");
    
    const {firstName,lastName,email,password,contactNo} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.render("index", { user: null, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            contactNo
        });
        await user.save();
        req.session.user = user;
        res.status(200).json({ message: 'Hi', user: req.session.user.name });
        // res.redirect("/home");
    }catch (err) {
    console.error(err);
    res.render("index", { user: null, message: "Error signing up" });
  }
})
 
app.post("/login",async(req,res) => {
    const{email,password} = req.body;
    
    try{
        console.log("inside try of login");
        const user = await User.findOne({email});
        if(!user){
        console.log("inside if of user");
            // return res.render("index",{user : null , message : "User doesnt exist"});
            return res.status(401).json({ error:  "User doesnt exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
           return res.status(401).json({ error: "Invalid credentials"});
            // return res.render("index",{user : null, message : "Invalid credentials"});
        }
        console.log("here user "+user);
        req.session.user = user;
        
        console.log("Session after login:", req.session);
        res.status(200).json({ message: 'Hi', user: req.session.user.name });
    }catch(err){
        console.error(err);
        // res.render("index", { user: null, message: "Login error" });
    }
})
app.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // proceed if session user exists
  res.status(200).json({ message: 'Welcome!', user: req.session.user });
});

app.post("/addSales",upload.single("carImage"), async(req,res) => {
  console.log("Session user:", req.session.user);
  console.log("Body:", req.body);
  console.log("File:", req.file);
    const{ 
      customerName,
      customerEmail,
      customerContact,
      model,
      price,
      saleDate,
      type} = req.body;
    const userId = req.session.user?._id;

    if(!userId){
        return res.status(401).json({message : "Unauthorized. Please login first"});
    }
    try{
        console.log("Body:", req.body);
        console.log("File:", req.file);
        
         const newSale = new Sale({
            userId,
            customerName,
            customerEmail,
            customerContact,
            model,
            price,
            saleDate,
            type,
            carImage: "uploads/" + req.file.filename,
         });
         await newSale.save();
        res.status(201).json({ message: "Sale data saved", sale: newSale });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Failed to save sale data" , error: err.message});
    }
})

app.get("/saledetails",async(req,res) => {
    let result = await Sale.find()
    // res.render("list",{details:result})
     res.json({ message: 'Welcome to home page' ,result});
})


app.get('/sales/:id/edit', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).send("Sale not found");
    }
    // res.render('edit', { sale });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.post('/sales/:id', upload.single('carImage'), async (req, res) => {
  try {
    const saleId = req.params.id;
    const updateData = {
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerContact: req.body.customerContact,
    };

    // If user uploaded a new image, update carImage path
    if (req.file) {
      updateData.carImage = req.file.path;
    }

    const updatedSale = await Sale.findByIdAndUpdate(saleId, updateData, { new: true });

    if (!updatedSale) {
      return res.status(404).send("Sale not found");
    }

    res.redirect('/saledetails'); // redirect to sales listing or details page
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.delete("/sales/:id/delete", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.redirect("/saledetails"); // Redirect after deletion
  } catch (err) {
    console.error("Failed to delete sale:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Server Listening
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 