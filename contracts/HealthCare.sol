pragma solidity ^0.5.0;

import "./Doctor.sol";
import "./Patient.sol";

contract HealthCare is Doctor, Patient {
    address private owner;
    
    constructor () public { 
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function checkProfile(address _user) public view onlyOwner returns(string memory, string memory){
        patient storage p = patients[_user];
        doctor storage d = doctors[_user];
          
        if(p.id > address(0x0))
            return (p.name, 'patient');
        else if(d.id > address(0x0))
            return (d.name, 'doctor');
        else
            return ('', '');
    }
   //patient calls this
    function grantAccessToDoctor() public checkPatient(msg.sender) {
        patient storage p = patients[msg.sender];
        address doctor_id = p.request_list[p.request_list.length-1];
        doctor storage d = doctors[doctor_id];
        require(patientToDoctor[msg.sender][doctor_id] < 1);// this means doctor already been access
      
        uint pos = p.doctor_list.push(doctor_id);// new length of array

        patientToDoctor[msg.sender][doctor_id] = pos;
        d.patient_list.push(msg.sender);
        delete p.request_list[p.request_list.length-1];
        p.request_list.length--;
    }
  
    function addFile(string memory _prescription) public checkDoctor(msg.sender) {
        doctor storage d = doctors[msg.sender];
        address pid = d.patient_list[d.patient_list.length-1];
        patient storage p = patients[pid];
        string memory temp;
        
        temp = p.history;
        p.history =string(abi.encodePacked(temp, ",", _prescription));
    }
    
    function getPatientInfoForDoctor(address pat) public view checkPatient(pat) checkDoctor(msg.sender) returns(string memory, address, string memory){
        patient storage p = patients[pat];
        require(patientToDoctor[pat][msg.sender] > 0);
        return (p.name, p.id, p.history);
    }
    
    function getFileInfoPatient() public view 
    onlyOwner checkPatient(msg.sender) returns(string memory) {
        patient storage p = patients[msg.sender];
        return (p.history);
    }
    //doc calls this patient list la doc id will be stored
    function requestAccess(address pat)public checkPatient(pat) checkDoctor(msg.sender){
        patient storage p = patients[pat];
        p.request_list.push(msg.sender);
    }
  
}