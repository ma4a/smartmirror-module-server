#SmartMirror module server

*Note: This is only for internal usage at the moment! Please use with caution. Only few error handling and no authorization of actions.*

URL: [http://localhost:3333](http://localhost:3333 "")

Functionality: Central collection point for all known and working SmartMirror modules. Modules can be added, modified and deleted.

Purpose: Central point for collecting all available modules.

API:  

**/api/getModules** prints a list of all known packages in JSON

URLs: 

**/new** is a form to add new modules

**/list** prints all known packages