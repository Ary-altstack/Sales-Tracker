
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require("path");
const multer = require("multer");

const User = require("./models/User");
const Sale = require("./models/Sale");


const dashboardSummarySchema = new mongoose.Schema({
  ytdValue: String,
  bpValue: String,
  growth: String,
  dateRange: String,
});
const DashboardSummary = mongoose.model('DashboardSummary', dashboardSummarySchema);

const newCustomersSchema = new mongoose.Schema({
  customerCount: String,
  target: String,
  growth: String,
});
const NewCustomers = mongoose.model('NewCustomers', newCustomersSchema);

const globalSalesChartSchema = new mongoose.Schema({
  labels: [String],
  salesData: [Number],
});
const GlobalSalesChart = mongoose.model('GlobalSalesChart', globalSalesChartSchema);

const coreModelSchema = new mongoose.Schema({
  name: String,
  image: String,
  units: String,
  growth: String,
  colorClass: String,
});
const CoreModel = mongoose.model('CoreModel', coreModelSchema);

const topSellingModelSchema = new mongoose.Schema({
  name: String,
  image: String,
  sales: String,
  colorClass: String,
});
const TopSellingModel = mongoose.model('TopSellingModel', topSellingModelSchema);

const salesByRegionSchema = new mongoose.Schema({
  name: String,
  flag: String,
  volume: String,
  bp: String,
  change: String,
  trend: String,
});
const SalesByRegion = mongoose.model('SalesByRegion', salesByRegionSchema);

const channelMixSchema = new mongoose.Schema({
  name: String,
  value: String,
  color: String,
});
const ChannelMix = mongoose.model('ChannelMix', channelMixSchema);

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

app.get("/saledetails", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const result = await Sale.find({ userId });  // Fetch all sales for this user
    res.json({ message: 'Sales fetched successfully', result });
  } catch (err) {
    console.error('Error fetching sales:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



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
app.delete('/sales/:id', async (req, res) => {
  console.log("DELETE request for ID:", req.params.id);
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    console.log("inside delete index.js");
    
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.redirect('/saledetails'); // redirect to sales listing or details page
  } catch (err) {
    console.error(err);
    res.status(500).json({message : "Server error"});
  }
});



// Server Listening
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 



app.get('/api/dashboard-summary', async (req, res) => {
  try {
    const summary = await DashboardSummary.findOne(); 
    if (summary) {
      res.json(summary);
    } else {
      res.status(404).json({ message: 'Dashboard summary not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/new-customers', async (req, res) => {
  try {
    const newCust = await NewCustomers.findOne(); 
    if (newCust) {
      res.json(newCust);
    } else {
      res.status(404).json({ message: 'New customers data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/global-sales-chart', async (req, res) => {
  try {
    const chartData = await GlobalSalesChart.findOne(); 
    if (chartData) {
      res.json(chartData);
    } else {
      res.status(404).json({ message: 'Global sales chart data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/core-models', async (req, res) => {
  try {
    const models = await CoreModel.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/top-selling-models', async (req, res) => {
  try {
    const models = await TopSellingModel.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/sales-by-region', async (req, res) => {
  try {
    const sales = await SalesByRegion.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/channel-mix', async (req, res) => {
  try {
    const mix = await ChannelMix.find();
    res.json(mix);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Node.js backend listening at http://localhost:${PORT}`);
});

