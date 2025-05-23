const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const { AgentsController, getAgentById } = require('../controllers/agentController');
const { getCdrData, getCdrDataSigletime } = require('../controllers/cdrController');
const checkBarrierToken = require('../middlewares/authMiddleware');

const {
    getInboundCdrData,
    getOutboundCdrData
} = require('../controllers/callTypeController');

const { getConnectedCall,
    getNotconnectedCall,
    getMissedOutboundCall,
    getMissedCall
} = require('../controllers/callDisposition');

const { getCdrByAgent } = require('../controllers/singleAgent');

const { ManagerController } = require('../controllers/managerController');


const {
    getCustomcdrLength,
    getInboundLength,
    getOutboundLength,
    getconnectedLength,
    getnotconnectedLength,
    getMissedoutboundLength,
    getMissedLength,
    getUniqueCalls
} = require('../controllers/dashboard');


const { insertCdr, postCdrData, insertAgent, updateAgent } = require('../controllers/postCdrController');

router.post('/cdr', postCdrData);

router.post('/custom_cdr',checkBarrierToken, insertCdr);

router.post('/insertagent', insertAgent);

router.put('/updateagent/:id', updateAgent)

router.post('/login', login);

router.get('/manager', ManagerController);

router.get('/agents/:manager_id', AgentsController);

router.get('/agent/:id', getAgentById)

router.get('/customcdr/:manager_id', getCdrData);

router.get('/cdrsingletime/:manager_id', getCdrDataSigletime)

router.get('/inbound/:manager_id', getInboundCdrData);

router.get('/outbound/:manager_id', getOutboundCdrData);

router.get('/connectedcalls/:manager_id', getConnectedCall);

router.get('/notconnectedcalls/:manager_id', getNotconnectedCall);

router.get('/missedoutboundcalls/:manager_id', getMissedOutboundCall);

router.get('/missedcalls/:manager_id', getMissedCall);

router.get('/cdr/:agent', getCdrByAgent);



router.get('/totalcdr/:manager_id', getCustomcdrLength);

router.get('/totalinbound/:manager_id', getInboundLength);

router.get('/totaloutbound/:manager_id', getOutboundLength);

// router.get('/totalconnected/:manager_id', getconnectedLength);

// router.get('/totalnotconnected/:manager_id', getnotconnectedLength);

// router.get('/totalmissedoutbound/:manager_id', getMissedoutboundLength);

router.get('/totalmissed/:manager_id', getMissedLength);

router.get('/uniqueCalls/:manager_id', getUniqueCalls);

module.exports = router;
