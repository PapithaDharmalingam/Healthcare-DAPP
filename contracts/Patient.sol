pragma solidity ^0.5.0;

contract Patient {
    mapping (address => patient) internal patients;
    mapping (address => mapping (address => uint)) internal patientToDoctor;
    
    struct patient {
        string name;
        address id;
        string history;// hashes of file that belong to this user for display purpose
        address[] doctor_list;
        address[] request_list;
    }
    
    modifier checkPatient(address id) {
        patient storage p = patients[id];
        require(p.id > address(0x0));//check if patient exist
        _;
    }
    
    function getPatientInfo() public view checkPatient(msg.sender) returns(string memory,address, string memory, address[] memory, address[] memory) {
        patient storage p = patients[msg.sender];
        return (p.name,p.id, p.history, p.doctor_list, p.request_list);
    }
    
    function signupPatient(string memory _name) public {
        patient storage p = patients[msg.sender];
        require(!(p.id > address(0x0)));
        string memory initial = "";

        patients[msg.sender] = patient({name:_name,id:msg.sender,history:initial,doctor_list:new address[](0),request_list:new address[](0)});
    }

}