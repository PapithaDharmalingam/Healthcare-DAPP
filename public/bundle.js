const drug_detailsABI =   [
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "medicalAssets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "sup_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "drug_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date_of_pur",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "expiry_date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "quantity",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "nextId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "drug_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date_of_pur",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "expiry_date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "quantity",
        "type": "string"
      }
    ],
    "name": "create",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "readAll",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "sup_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "drug_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date_of_pur",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "expiry_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "quantity",
            "type": "string"
          }
        ],
        "internalType": "struct Drug_details.MedicalAsset[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
//address of smart contact
const drug_detailsAddress = '0x92fBF274F53C0fB3BaAB254541f5581e475f648b';
const web3 = new Web3('http://localhost:9545');
const drug_details = new web3.eth.Contract(drug_detailsABI, drug_detailsAddress,{gas: '1000000'});

document.addEventListener('DOMContentLoaded', () => {
//elements to be manipulated
const $setData = document.getElementById('set_data');
const $data = document.getElementById('data');
let accounts = [];
//getting the accounts
  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });
  

  const getData = () => {
    drug_details.methods
      .readAll()
      .call()
      .then(result => {
        console.log(result);
        $data.innerHTML = result[3];
      })
  };
 getData();

  $setData.addEventListener('submit', e => {
    //prevent reloadd
    e.preventDefault();
     const sup = e.target.elements[0].value;
     const drug = e.target.elements[1].value;
     const quant = e.target.elements[2].value;
     const date_of_pur = e.target.elements[3].value;
     const date_of_exp = e.target.elements[4].value;
    	console.log(sup+drug+quant+date_of_pur+date_of_exp);
	  
    drug_details.methods
      .create(sup,drug,date_of_pur,date_of_exp,quant)
      .send({from: accounts[0]})
      .then(getData);
  });
});


