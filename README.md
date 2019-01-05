# Troth
Troth is a Role based Permission management system for Dapps and Contracts running on Tron. 

A demo version can be found at [http://troth.nasparty.online/](http://troth.nasparty.online/). You can use the tron account with the private key: `6569c6697392a5de8d5259149aeb7d70cae95a245f495d9eb6dec682071e8dbd`
to see the demo prepopulated with demo roles and permissions.

Roles are made up of a group of permissions. Tron addresses can be assigned Roles and/or Permissions. Then a Dapp or Contract can check for Roles and Permissions using the functions `hasRole(address _addr, uint _roleId)` and `hasPermission(address _addr, uint _permId)`.

If a contract wants to directly call the troth contract, it must first register using the function `createUserAdmin(address _admin)` where _admin is the address of the contract.

All other contract functions can be called using the front-end, a demo is available at [http://troth.nasparty.online/](http://troth.nasparty.online/)
