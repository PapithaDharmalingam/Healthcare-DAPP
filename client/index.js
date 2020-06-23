import Web3 from 'web3';
import Manager from '../build/contracts/Manager.json';
import HealthCare from '../build/contracts/HealthCare.json';

let web3;
let manager;
let healthcare;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initManagerContract = () => {
  const deploymentKey = Object.keys(Manager.networks)[0];
  return new web3.eth.Contract(
    Manager.abi, 
    Manager
      .networks[deploymentKey]
      .address,
      {gas: '3000000'}
  );
};

const initHealthContract = () => {
  const deploymentKey = Object.keys(HealthCare.networks)[0];
  return new web3.eth.Contract(
    HealthCare.abi, 
    HealthCare
      .networks[deploymentKey]
      .address,
      {gas: '3000000'}
  );
};
const managerApp = () => {
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('create-result');
 // const $createResult = document.getElementById('history');
 
  
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });
 
  $create.addEventListener('submit', (e) => {
    console.log(accounts[1]);
    e.preventDefault();
   // const name = e.target.elements[0].value;
    const sup = e.target.elements[0].value;
    const drug = e.target.elements[1].value;
    const quant = e.target.elements[2].value;
    const date_of_pur = e.target.elements[3].value;
    const date_of_exp = e.target.elements[4].value;
    console.log(sup+drug+quant+date_of_pur+date_of_exp);
	  
    const name=String(sup)+','+String(drug)+','+String(quant)+','+String(date_of_pur)+','+String(date_of_exp);
    console.log(name);
	  
   function createHistoryCard(names){
    var ans = names.split(",");
     var historyList=$(
      '<div class="col mb-4">'+
      '<div class="card border-success "style="background-color: #61ff99" >'+
       ' <div class="card-body">'+
         ' <h5 class="card-title">Drug Name:'+ans[1]+'</h5>'+
         ' <h6 class="card-subtitle mb-2 text-muted">Suppliers name:'+ans[0]+'</h6>'+
          '<ul class="card-text">'+
             ' <li>DOP:'+ans[3]+'</li>'+
              '<li>DOE:'+ans[4]+'</li>'+
              '<li>Quantity:'+ans[2]+'</li>'+
           ' </ul>'+
       ' </div> </div> </div>'
     );
     $('#history').append(historyList);
   }


    manager.methods.create(name).send({from: accounts[2]})
    .then(result => {
      createHistoryCard(name);
      $createResult.innerHTML = `New drug details added successfully to blockchain`;
    })
    .catch(_e => {
      console.log(_e);
      $createResult.innerHTML = `Ooops... there was an error while trying to add drug details to the blockchain...`;
    });
  });
 
 
};
const doctorApp = () => {
  let accounts = [];
  var i;
  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
    for(i=1;i<5;i++){
    if(i!=3){
      var patients='<option value='+accounts[i] +'>Patient '+i+'</option>';
      $("#patientName").append(patients)
    }
   }
   healthcare.methods.getDoctorInfo().call({from:accounts[0]})
   .then(result => {
     if(result[2].length>0){
     console.log(result);
    // var accepted=$( '<a data-toggle="modal" data-target="#alice" class="list-group-item list-group-item-action active">  ALICE </a>');
    var accepted=$( '<a  data-toggle="modal" data-target="#alice" class="list-group-item list-group-item-action active">  Patient 1 </a>');
    $('#acceptedPatientsList').append(accepted);
     }
   })
   .catch(_e => {
     console.log(_e);
    
   });  
  });
 
 $("#selectedPatient").click(function(){
  healthcare.methods.requestAccess($('#patientName').val()).send({from:accounts[0]})
  .then(result => {
    console.log('request sent');
  })
  .catch(_e => {
    console.log(_e);
   // $errorResult.innerHTML = `Ooops... there was an error while trying to connect to blockchain...`;
  });    
 })
 $("#patientData").click(function(){
  const dataPatient=String($("#consultation_date").val())+','+String($("#diagnosis_name").val())+','+String($("#comments").val()) ;
  healthcare.methods.addFile(dataPatient).send({from:accounts[0]})
  .then(result => {
    console.log(' Added patient Data');
  })
  .catch(_e => {
    console.log(_e);
    $errorResult.innerHTML = `Ooops... there was an error while trying to connect to blockchain...`;
  });    
 })

 
 
 
};
const patientApp = () => {
  let accounts = [];
  var flag=0;
  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
    healthcare.methods.getPatientInfo().call({from:accounts[1]})
  .then(result => {
    console.log(result[4]);
    
    if(result[4].length>0) {
    var accept=$('<li class="list-group-item d-flex justify-content-between align-items-center" id="list1">'+
                  " Doctor1"+
                 '<span class="btn badge badge-primary badge-pill" id="'+result[4][0]+'">Accept</span>'+
                 '</li>');
    $('#removeDoc').append(accept);            
    }
   if(result[2]!='')
   {
     console.log(result[2]);
     var ans = result[2].split(",");
     var hello=$(' <div class="card border-success col-sm-6"style="background-color: #61ff99" >'+
  '  <div class="card-body px-0 mx-0 ">'+
    '<h5 class="card-title">Consulted Doctor1</h5>'+
    '<h6 class="card-subtitle mb-2 text-muted">for'+ ans[2]+'</h6>'+
    '<ul class="card-text">'+
      ' <li>on '+ans[1]+'</li>'+
      ' <li>'+ans[3]+'</li>'+
      ' </ul>'+
      ' </div>'+
      '</div>');
      $('#another').append(hello);   
 }
   
    $('#'+result[4][0]).click(function(){
      healthcare.methods.grantAccessToDoctor().send({from:accounts[1]})
      .then(result => {
        console.log("removing");
        $("#list1").remove();
        var add = $(' <li class="list-group-item d-flex justify-content-between align-items-center"> Doctor 1 <span class="btn badge badge-danger badge-pill">Deny</span> </li>');
        $('#denyList').append(add);
      })
      .catch(_e => {
        console.log(_e);
       
      });  
     
    })

  })
  .catch(_e => {
    console.log(_e);
   
  });  
  });
  
  
};
const SignUpApp = () => {
  let accounts = [];

    web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });
  $("#doctorsubmit").click(function(){
    
  // console.log(accounts[3]);
    const $errorResult = document.getElementById('errorDoctor');
    if( $('#doctorUserName').val() == 'doctor1' && $('#doctorPassword').val() =='doctor') { 
      const name= $('#doctorUserName').val();
      healthcare.methods.signupDoctor(name).send({from:accounts[0]})
      .then(result => {
        window.location.href = "http://localhost:8080/doctor.html";
      })
      .catch(_e => {
        console.log(_e);
        $errorResult.innerHTML = `Ooops... there was an error while trying to connect to blockchain...`;
      });
    }
    else{
      $errorResult.innerHTML = 'invalid username or password';
    }

  })
  $("#patientsubmit").click(function(){
    const $errorResult = document.getElementById('errorPatient');
    if( $('#patientUserName').val() == 'patient1' && $('#patientPassword').val() =='patient') { 
      const name= $('#patientUserName').val(); 
      healthcare.methods.signupPatient(name).send({from:accounts[1]})
      .then(result => {
        window.location.href = "http://localhost:8080/patient.html";
      })
      .catch(_e => {
        console.log(_e);
        $errorResult.innerHTML = `Ooops... there was an error while trying to connect to blockchain...`;
      });
    
    }
    else{
      $errorResult.innerHTML = 'invalid username or password';
    }
   })
   $("#managerSubmit").click(function(){
   
    const $errorResult = document.getElementById('errorManager');
    if( $('#managerUserName').val() == 'aadmin' && $('#managerPassword').val() =='aadmin') { 
     window.location.href = "http://localhost:8080/manager.html";
    }
    else{
      $errorResult.innerHTML = 'invalid username or password';
    }
   })
 
};
//waiting for dom to be loaded callback
document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      //check url and initialise contract manager or healthcare
      if(window.location.pathname=="/manager.html") {
         console.log(window.location.pathname);  
         manager = initManagerContract();
         managerApp(); 
      }
      else if(window.location.pathname=="/doctor.html") {
         console.log("i am doc");
         healthcare = initHealthContract();
         doctorApp(); 
      }
      else if(window.location.pathname=="/patient.html") {
         healthcare = initHealthContract();
         patientApp(); 
      }
      else{
        healthcare = initHealthContract();
        SignUpApp(); 
      }
    })
    .catch(e => console.log(e.message));
});
