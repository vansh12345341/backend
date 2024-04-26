require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const workflowFunctions = require('./workflowfunctions');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors());

const mongoUri = process.env.MONGO_DB_URI;

mongoose.connect(mongoUri);


const WorkflowSchema = new mongoose.Schema({
  id: String,
  elements: { type: Object, required: true },
});

const Workflow = mongoose.model('Workflow', WorkflowSchema);


app.use(bodyParser.json());

// add a new workflow
app.post('/workflows', async (req, res) => {
  try {
    const workflowData = req.body;
    const workflowId = uuidv4(); 

    const workflow = new Workflow({ id: workflowId, elements: workflowData });
    await workflow.save();
    
    res.status(201).send({ id: workflowId });
  } catch (error) {
    res.status(500).send('Error saving workflow: ' + error.message);
  }
});

// get all workflows
app.get('/getworkflows', async (req, res) => {
    try {
      const workflows = await Workflow.find({}, 'id'); // Select only the 'id' field
      const workflowIds = workflows.map(wf => ({ id: wf.id, name: `Workflow ${wf.id}` }));
      res.status(200).send(workflowIds);
    } catch (error) {
      res.status(500).send('Error retrieving workflows: ' + error.message);
    }
  });

// run a workflow
  app.post('/execute',upload.single('fileData'), async (req, res) => {
   
    try {
      const workflowId = req.body.workflowId;  
    const fileData = req.file;  

    console.log('Workflow ID:', workflowId);
    console.log('File metadata:', fileData);
      const workflow = await Workflow.findOne({ id: workflowId });
     let jsonData;
      if (!workflow) {
        return res.status(404).send('Workflow not found');
      }
      console.log("yoo",workflowId, fileData );
      
      let result = fileData;
      let resultPath = fileData.path;
      for (const node of workflow.elements.nodes) {
        console.log(node.data.label, "label");
        switch (node.data.label) {
          case 'Start node':
            break;
          case 'Filter Data node':
            await workflowFunctions.filterData(resultPath);
            break;
          case 'Wait node':
            await workflowFunctions.wait(60);
            break;
          case 'Convert Format node':
            jsonData = await workflowFunctions.convertFormat(resultPath);
            break;
          case 'Send POST Request node':
            await workflowFunctions.sendPostRequest(jsonData);
            break;
          case 'End node':
            break;
          default:
            console.log(`Unknown node type: ${node.data.label}`);
            break;
        }
      }
  
      res.status(200).send('Workflow executed successfully');
    } catch (error) {
      res.status(500).send(`Errors vansh executing workflow: ${error.message}`);
    }
  });
  
app.listen(port, () => {
  console.log(`Workflow backend listening at http://localhost:${port}`);
});
