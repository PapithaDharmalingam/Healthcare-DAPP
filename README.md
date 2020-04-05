# Healthcare-DAPP
## FUNCTIONALITIES
**1.Requesting Patient’s details and providing prescriptions**<br/>
The patient’s health history which includes the doctor’s details, patient’s health condition, the prescribed medications if any can be found in the blockchain.Any attempt by any of the users to view the patient’s details has to be by posting a request to the patient.If the patient denies the request then the user cannot view, on acceptance data is visible. When a patient visits a doctor, the doctor can request to view and add data to the patient’s medical history. The patient on the other side will receive this request in his account, on approval by the patient the medical history of the patient becomes visible to the doctor and the doctor can now add notes on patient’s current health, prescription details and append via a form. These details are appended into the blockchain.<br/>
**2.Purchasing drugs and equipment**<br/>
The manager records the details of the drugs and equipment into the blockchain.The manager can use a form to enter details about the supplier, the date of purchase, the purchased goods, their quantity, the expiry date for drugs etc.All of these details can be appended to the blockchain.The manager can also view the purchase history that is stored in the blockchain.

## PROJECT SETUP
**Dependencies**<br/>
1.node.js (download it)<br/>
2.truffle (install it using 'npm install truffle')<br/>
**To run the application**<br/>
1.To start the development server use the cmd 'truffle develop'<br/>
2.To deploy the smart contract use the cmd 'migrate --reset'<br/>
3.To start the application use the cmd 'static-server public'<br/>
