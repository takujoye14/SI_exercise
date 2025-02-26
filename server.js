const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/firebase"); 

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(express.json());

app.post("/data", async (req, res) => {
  try {
    const { name, value } = req.body;
    const docRef = await db.collection("data").add({ name, value });
    res.status(201).send({ id: docRef.id, message: "Document created!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/data", async (req, res) => {
    try {
      const snapshot = await db.collection("data").get();
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).send(docs);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  

  app.put("/data/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection("data").doc(id).update(req.body);
      res.status(200).send({ message: "Document updated!" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  app.delete("/data/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection("data").doc(id).delete();
      res.status(200).send({ message: "Document deleted!" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
