pragma solidity ^0.5.0;

contract Manager {
  struct medicalAsset {
    uint id;
    string name;
  }
 medicalAsset[] public assets;
  uint public nextId = 1;

  function create(string memory name) public {
    assets.push(medicalAsset(nextId, name));
    nextId++;
  }

  function read(uint id) view public returns(uint, string memory) {
    uint i = find(id);
    return(assets[i].id,assets[i].name);
  }

 
  function find(uint id) view internal returns(uint) {
    for(uint i = 0; i < assets.length; i++) {
      if(assets[i].id == id) {
        return i;
      }
    }
    revert('medicalAsset does not exist!');
  }

}
