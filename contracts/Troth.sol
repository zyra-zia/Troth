pragma solidity >=0.4.22 <0.6.0;

contract Troth {
  
  struct Role {
    uint id;
    address owner;
    string title;
    string description;
    uint[] permissions;
  }
  
  struct Permission {
    uint id;
    address owner;
    string title;
    string description;
  }
  
  Role[] roles;
  Permission[] permissions;
  mapping(address => address[]) users;
  mapping(address => uint[]) userRoles;
  mapping(address => uint[]) userPermissions;
  mapping(address => uint) ownerRoleCount;
  mapping(address => uint) ownerPermissionCount;
  mapping(address => address[]) userAdmins;
  
  event NewRole(uint roleId, string title, string description, uint[] permissions);
  event NewPermission(uint permissionId, string title, string description);
  event UserRoleChanged(address user, uint roleId, bool assigned);
  event UserPermissionChanged(address user, uint permId, bool assigned);
  
  function _createRole(string memory _title, string memory _description, uint[] memory _perms) internal {
    uint id = roles.push( Role(roles.length, msg.sender, _title, _description, _perms)) - 1;
    ownerRoleCount[msg.sender]++;
    emit NewRole(id, _title, _description, _perms);
  }
  
  function _createPermission(string memory _title, string memory _description) internal {
    uint id = permissions.push( Permission(permissions.length, msg.sender, _title, _description)) - 1;
    ownerPermissionCount[msg.sender]++;
    emit NewPermission(id, _title, _description);
  }
  
  function _assignPermissionToRole(uint _roleId, Permission memory _permission) internal {
    //check the permission isnt already assigned to this role
    uint[] memory existingPerms = roles[_roleId].permissions;
    
    for(uint i=0; i<existingPerms.length; i++){
      if(existingPerms[i] == _permission.id){
        return;
      }
    }
    
    roles[_roleId].permissions.push(_permission.id);
  }
  
  function _assignRoleToUser(address _user, uint _roleId) internal _isAdmin(roles[_roleId].owner) {
    //check the role isnt already assigned
    for(uint i=0; i<userRoles[_user].length; i++){
      if(userRoles[_user][i] == _roleId){
        return;
      }
    }
    userRoles[_user].push(_roleId);
	emit UserRoleChanged(_user, _roleId, true);
  }
  
  function _unassignRoleFromUser(address _user, uint _roleId) internal _isAdmin(roles[_roleId].owner) {
    uint[] storage roleIds = userRoles[_user];
    for(uint i=0; i<roleIds.length; i++){
      if(roleIds[i] == _roleId){
        roleIds[i] = roleIds[roleIds.length - 1];
        roleIds.length--;
        break;
      }
    }
	
	emit UserRoleChanged(_user, _roleId, false);
  }
  
  function _assignPermissionToUser(address _user, uint _permissionId) internal _isAdmin(permissions[_permissionId].owner) {
    //check the permission isnt already assigned
    for(uint i=0; i<userPermissions[_user].length; i++){
      if(userPermissions[_user][i] == _permissionId){
        return;
      }
    }
    
    userPermissions[_user].push(_permissionId);
	emit UserPermissionChanged(_user, _permissionId, true);
  }
  
  function _unassignPermissionFromUser(address _user, uint _permissionId) internal _isAdmin(permissions[_permissionId].owner) {
     
    uint[] storage permissionIds = userPermissions[_user];
    for(uint i=0; i<permissionIds.length; i++){
      if(permissionIds[i] == _permissionId){
        
        permissionIds[i] = permissionIds[permissionIds.length - 1];
        permissionIds.length--;
        break;
      }
    }
	emit UserPermissionChanged(_user, _permissionId, false);
  }
  
  function getRolesByOwner(address _owner) external view _isAdmin(_owner) returns (uint[] memory) {
    uint[] memory roleIds = new uint[](ownerRoleCount[msg.sender]);
    
    uint counter = 0;
    for(uint i=0; i<roles.length; i++){
      if(roles[i].owner == _owner){
        roleIds[counter++] = roles[i].id;
      }
    }
    
    return roleIds;
  }
  
  function getPermissionsByOwner(address _owner) external view  _isAdmin(_owner) returns (uint[] memory) {
    uint[] memory permissionIds = new uint[](ownerPermissionCount[msg.sender]);
    
    uint counter = 0;
    for(uint i=0; i<permissions.length; i++){
      if(permissions[i].owner == _owner){
        permissionIds[counter++] = permissions[i].id;
      }
    }
    
    return permissionIds;
  }
  
  function getRoleDetails(uint _roleId) external view _isAdmin(msg.sender) returns (uint id, address owner, string memory title, string memory description, uint[] memory perms) {
    Role memory role = roles[_roleId];
    return (role.id, role.owner, role.title, role.description, role.permissions);
  }
  
  function getPermissionDetails(uint _permId) external view _isAdmin(permissions[_permId].owner) returns (uint id, address owner, string memory title, string memory description) {
    Permission memory p = permissions[_permId];
    
    return (p.id, p.owner, p.title, p.description);
  }
  
  function _uintToString(uint i) internal pure returns (string memory){
    if (i == 0) return "0";
    uint j = i;
    uint length;
    while (j != 0){
      length++; j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint k = length - 1;
    while (i != 0){
      bstr[k--] = byte(48 + i % 10); i /= 10;
    }
    return string(bstr);
  }
  
  function _strConcatenate(string memory _a, string memory _b, string memory _c) internal pure returns (string memory){
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    bytes memory _bc = bytes(_c);
    string memory abc = new string(_ba.length + _bb.length + _bc.length);
    bytes memory babc = bytes(abc);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) babc[k++] = _ba[i];
    for (uint j = 0; j< _bb.length; j++) babc[k++] = _bb[j];
    for (uint l = 0; l < _bc.length; l++) babc[k++] = _bc[l];
    return string(babc);
  }
  
  function getRoleTitles() external view returns (string memory){
    string memory titles = "";
    for(uint i=0; i<roles.length; i++){
      if(roles[i].owner == msg.sender){
        string memory t = roles[i].title;
        uint idCopy = roles[i].id;
        titles = _strConcatenate(titles, _uintToString(idCopy), "-");
        titles = _strConcatenate(titles, t, ",");
      }
    }
    return titles;
  }
  
  function getPermissionTitles() external view returns (string memory){
    string memory titles = "";
    for(uint i=0; i<permissions.length; i++){
      if(permissions[i].owner == msg.sender){
        string memory t = permissions[i].title;
        uint idCopy = permissions[i].id;
        titles = _strConcatenate(titles, _uintToString(idCopy), "-");
        titles = _strConcatenate(titles, t, ",");
      }
    }
    return titles;
  }
  
  function createRole(string _title, string _description, uint[] _permissions) external {
    _createRole(_title, _description, _permissions);
  }
  
  function updatePermissionsForRole(uint _roleId, uint[] _perms) external {
    roles[_roleId].permissions = _perms;
  }
  
  function createPermission(string _title, string _description) external {
    _createPermission(_title, _description);
  }
  
  function updateRole(uint id, string _title, string _description, uint[] _permissions) external _isAdmin(roles[id].owner) {
    roles[id].title = _title;
    roles[id].description = _description;
    roles[id].permissions = _permissions;
  }
  
  function updatePermission(uint id, string _title, string _description) external _isAdmin(permissions[id].owner) {
    permissions[id].title = _title;
    permissions[id].description = _description;
  }
  
  function deleteRole(uint id) external _isAdmin(roles[id].owner) {
    delete roles[id];
    
    //update userRoles to remove role
    _unassignRoleFromUser(roles[id].owner, id);
    
    ownerRoleCount[roles[id].owner]--;
  }
  
  function _removePermissionFromRole(uint permissionId, uint roleId) internal _isAdmin(permissions[permissionId].owner) {
    uint[] storage p = roles[roleId].permissions;
	bool shift = false;
    for(uint i=0; i<p.length; i++){
      if(p[i] == permissionId){
        delete p[i];
		shift = true;
      }
	  if(shift == true && i != p.length-1){
		p[i] = p[i + 1];
	  }
    }
	if(shift == true){
		p.length--;
	}
  }
  
  function deletePermission(uint id) external _isAdmin(permissions[id].owner) {
    delete permissions[id];
    
    //update roles to remove permissions
    for(uint i=0; i<roles.length; i++){
		if(roles[i].owner == permissions[id].owner){
			_removePermissionFromRole(id, roles[i].id);
		}
    }
    
    //update userPermissions to remove permissions
    _unassignPermissionFromUser(permissions[id].owner, id);
    
    ownerPermissionCount[msg.sender]--;
  }
  
  function addUser(address _address) external {
    //check user isnt already added
    address[] memory us = users[msg.sender];
    for(uint i=0; i<us.length; i++){
      if(us[i] == _address){
        return;
      }
    }
    users[msg.sender].push(_address);
  }
  
  function removeUser(address _address) external {
    for(uint i=0; i<users[msg.sender].length; i++){
      if(users[msg.sender][i] == _address){
        users[msg.sender][i] = users[msg.sender][users[msg.sender].length - 1];
		users[msg.sender].length--;
        return;
      }
    }
  }
  
  function removeUsers(address[] _addresses) external {
    
    for(uint i=0; i<_addresses.length; i++){
		this.removeUser(_addresses[i]);
    }
  }
  
  function assignRoleToUser(uint _roleId, address _address) external _isAdmin(roles[_roleId].owner) {
    _assignRoleToUser(_address, _roleId);
  }
  
  function assignRoleToUsers(uint _roleId, address[] _addrs) external {
    
    for(uint i=0; i<_addrs.length; i++){
      this.assignRoleToUser(_roleId, _addrs[i]);
    }
  }
  
  function assignPermissionToUser(uint _permId, address _address) external _isAdmin(permissions[_permId].owner) {
    _assignPermissionToUser(_address, _permId);
  }
  
  function assignPermissionToUsers(uint _permId, address[] _addrs) external {
    
    for(uint i=0; i<_addrs.length; i++){
      this.assignPermissionToUser(_permId, _addrs[i]);
    }
  }
  
  function unassignRoleFromUser(uint _roleId, address _address) external _isAdmin(roles[_roleId].owner) {
    _unassignRoleFromUser(_address, _roleId);
  }
  
  function unassignRoleFromUsers(uint _roleId, address[] _addrs) external {
    
    for(uint i=0; i<_addrs.length; i++){
      this.unassignRoleFromUser(_roleId, _addrs[i]);
    }
  }
  
  function unassignPermissionFromUser(uint _permId, address _address) external _isAdmin(permissions[_permId].owner) {
    _unassignPermissionFromUser(_address, _permId);
  }
  
  function unassignPermissionFromUsers(uint _permId, address[] _addrs) external {
    
    for(uint i=0; i<_addrs.length; i++){
      this.unassignPermissionFromUser(_permId, _addrs[i]);
    }
  }
  
  function getUsersForOwner() external view returns (address[]){
	return users[msg.sender];
  }
  
  function getUserRoles(address _addr) external view returns (uint[]){
	//check that this address can be read by this msg.sender
	address[] memory us = users[msg.sender];
	bool found = false;
	for(uint i=0; i<us.length; i++){
		if(us[i] == _addr){
			found = true;
			break;
		}
	}
	if(found == false){
		uint[] memory empty = new uint[](0);
		return empty;
	}
	
	return userRoles[_addr];
  }
  
  function getUserPermissions(address _addr) external view returns (uint[]){
	//check that this address can be read by this msg.sender
	address[] memory us = users[msg.sender];
	bool found = false;
	for(uint i=0; i<us.length; i++){
		if(us[i] == _addr){
			found = true;
			break;
		}
	}
	if(found == false){
		uint[] memory empty = new uint[](0);
		return empty;
	}
	
	return userPermissions[_addr];
  }
  
  function hasRole(address _addr, uint _roleId) external view returns (bool){
	uint[] memory rolesForUser = userRoles[_addr];
	for(uint i=0; i<rolesForUser.length; i++){
		if(rolesForUser[i] == _roleId){
			return true;
		}
	}
	return false;
  }
  
  function hasPermission(address _addr, uint _permId) external view returns (bool){
	uint[] memory permsForUser = userPermissions[_addr];
	for(uint i=0; i<permsForUser.length; i++){
		if(permsForUser[i] == _permId){
			return true;
		}
	}
	return false;
  }
  
  modifier _isAdmin(address _propertyOwner) {
	if(msg.sender == _propertyOwner){
		_;
	}
	address[] storage ads = userAdmins[msg.sender];
	for(uint i=0; i<ads.length; i++){
		if(ads[i] == _propertyOwner){
			_;
		}
	}
  }
  
  function createUserAdmin(address _admin) external {
	userAdmins[msg.sender].push(_admin);
  }
  
  function removeUserAdmin(address _admin) external {
	address[] storage ads = userAdmins[msg.sender];
	for(uint i=0; i<ads.length; i++){
		if(ads[i] == _admin){
			delete ads[i];
			return;
		}
	}
  }
}
