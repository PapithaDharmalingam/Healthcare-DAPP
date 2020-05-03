pragma solidity ^0.5.0;

contract Doctor {
    mapping (address => doctor) internal doctors;
    mapping (address => mapping(address => uint)) internal doctorToPatient;
    
    struct doctor {
        string name;
        address id;
        address[] patient_list;
    }
    
    modifier checkDoctor(address id) {
        doctor storage d = doctors[id];
        require(d.id > address(0x0));//check if doctor exist
        _;
    }
    
    function getDoctorInfo() public view checkDoctor(msg.sender) returns(string memory,address, address[] memory){
        doctor storage  d = doctors[msg.sender];
        return (d.name,d.id, d.patient_list);
    }
    
    function signupDoctor(string memory _name) public {
        doctor storage d = doctors[msg.sender];
        require(!(d.id > address(0x0)));

        doctors[msg.sender] = doctor({name:_name,id:msg.sender,patient_list:new address[](0)});
    }    
    
}