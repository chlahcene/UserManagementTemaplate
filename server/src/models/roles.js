//import { isString, isNumber, isUndefined } from "util";

const isString = function(variable) {
    return (typeof variable) === "string";
};

const isNumber = function(variable) {
    return (typeof variable) === "number";
};

const isUndefined = function(variable) {
    return (typeof variable) === "undefined";
};

const roles = ['SUPERADMIN', 'ADMIN', 'USER'];
const rolesString = {'SUPERADMIN' : 0, 'ADMIN' : 100, 'USER' : 200};
const rolesNumber = {0 : 'SUPERADMIN', 100 : 'ADMIN', 200 : 'USER'};

const isRoleString = function(role) {
    if (isString(role)) {
        let number = rolesString[role];
        if (!isUndefined(number)) {
            return 1;
        }
    }
    return 0; 
};

const isRoleNumber = function(role) {
    if (isNumber(role)) {
        let str = rolesNumber[role];
        if (!isUndefined(str)) {
            return 1;
        }
    }
    return 0; 
};

const isSuperAdmin = (role) => {
    return role.roleNumber === 0;
};

const isAdmin = (role) => {
    return role.roleNumber == 100 || role.roleNumber == 0;
};

const isPriority = (role1, role2) => {
    if (isSuperAdmin(role1)) {
        return 1;
    }
    return role1.roleNumber < role2.roleNumber;
};

class Role {
    

    constructor(role) {
        if (isRoleString(role)) {
            this.roleString = role;
            this.roleNumber = rolesString[role];
        } else if (isRoleNumber(role)) {
            this.roleString = rolesNumber[role];
            this.roleNumber = role;            
        }
    };
};


module.exports = {
    isPriority : isPriority,
    Role : Role,
    isAdmin : isAdmin,    
    isSuperAdmin : isSuperAdmin,
    isRoleNumber : isRoleNumber,
    isRoleString : isRoleString,
    roles: roles
}