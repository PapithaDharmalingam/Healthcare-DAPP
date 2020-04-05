pragma solidity >0.5.6;
pragma experimental ABIEncoderV2;
contract Drug_details {
   struct MedicalAsset {
     uint id;  
     string  sup_name;
     string  drug_name;
     string  date_of_pur;
     string  expiry_date;
     string  quantity; 
    }
   MedicalAsset[] public medicalAssets;
   uint public nextId;
   function create(string memory name, string memory drug_name,string memory date_of_pur, string memory expiry_date,string memory quantity) public {
    medicalAssets.push(MedicalAsset(nextId,name,drug_name,date_of_pur,expiry_date,quantity));
    nextId++;
   }
  function readAll() view public returns(MedicalAsset[] memory ){
    
    return medicalAssets;  
      
  }
  
}