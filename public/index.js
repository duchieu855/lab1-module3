var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
{
    var $_1 = document.getElementById.bind(document);
    var $$ = document.querySelector.bind(document);
    var app = (function () {
        var btnAddStaff = $_1("btnAddStaff");
        var btnShowStaffs = $_1("btnShowStaffs");
        var btnSearch = $_1("btnSearch");
        var btnDel = $_1("btnDel");
        var listStaffs = $_1("listStaffs");
        var formInput = $_1("formInput");
        var staffs = [];
        var staff = { id: 0, name: "", regency: "", totalSalary: 0, tax: 0 };
        var idStaff = $_1("idStaff");
        var nameStaff = $_1("nameStaff");
        var regencyStaff = $_1("regencyStaff");
        var addStaff = $_1("addStaff");
        var tBodyStaff = $_1("tBodyStaffs");
        var keySearchStaff = $_1("keySearchStaff");
        var keyDelStaff = $_1("keyDelStaff");
        return {
            add: function () {
                var _this = this;
                addStaff.onclick = function (e) {
                    var _a;
                    e.preventDefault;
                    staff.id = idStaff.value;
                    staff.name = nameStaff.value;
                    staff.regency = regencyStaff.value;
                    console.log(_this.totalSalaryStaff(staff.regency.toLowerCase()));
                    _a = _this.totalSalaryStaff(staff.regency.toLowerCase()), staff.totalSalary = _a[0], staff.tax = _a[1];
                    staffs.push(__assign({}, staff));
                    console.log(staff, staffs);
                    idStaff.value = null;
                    nameStaff.value = null;
                    regencyStaff.value = null;
                    idStaff.focus();
                };
            },
            find: function (key) {
                return [staffs.find(function (element) { return element.id === key; })];
            },
            delete: function (key) {
                var indexStaffDel = staffs.findIndex(function (element) { return element.id === key; });
                console.log(indexStaffDel);
                console.log(staffs.splice(indexStaffDel, 1));
                return staffs.splice(indexStaffDel, 1);
            },
            totalSalaryStaff: function (regencyStaff) {
                var basicSalary = 8500000;
                var employee = ["developer", "tester", "human resource", "accountant", "corporate branding"];
                var manager = ["project manager", "engineering manager", "human resources manager", "accountant manager", "corporate branding manager"];
                var BUHead = "business unit head";
                var salary = 0;
                var tax = 0;
                if (regencyStaff == "") {
                    return [salary, tax];
                }
                if (regencyStaff == BUHead) {
                    salary = basicSalary * 1.3;
                }
                else if (employee.includes(regencyStaff)) {
                    salary = basicSalary;
                }
                else if (manager.includes(regencyStaff)) {
                    salary = basicSalary * 1.2;
                }
                else {
                    salary = basicSalary * 1.5;
                }
                if (salary >= 9000000 && salary <= 12000000) {
                    tax = salary * 0.1;
                }
                else if (salary > 12000000) {
                    tax = salary * 0.12;
                }
                else {
                    tax = 0;
                }
                return [salary, tax];
            },
            render: function (elements) {
                // console.log(tBodyStaff)
                tBodyStaff.innerHTML = "";
                elements.forEach(function (e) {
                    var row = tBodyStaff.insertRow(-1);
                    row.insertCell(0).innerHTML = e.id;
                    row.insertCell(1).innerHTML = e.name;
                    row.insertCell(2).innerHTML = e.regency;
                    row.insertCell(3).innerHTML = e.totalSalary;
                    row.insertCell(4).innerHTML = e.tax;
                });
            },
            init: function () {
                var _this = this;
                btnAddStaff.onclick = function () {
                    listStaffs.classList.add("hidden");
                    formInput.classList.toggle("hidden");
                    _this.add();
                    var btnCloseForm = $_1("btnCloseForm");
                    btnCloseForm.onclick = function () {
                        formInput.classList.toggle("hidden");
                    };
                };
                btnShowStaffs.onclick = function () {
                    listStaffs.classList.toggle("hidden");
                    _this.render(staffs);
                    var btnCloseList = $_1("btnCloseList");
                    btnCloseList.onclick = function () {
                        listStaffs.classList.toggle("hidden");
                    };
                };
                btnSearch.onclick = function () {
                    listStaffs.classList.toggle("hidden");
                    if (keySearchStaff.value) {
                        var valueKey = _this.find(keySearchStaff.value);
                        // console.log(valueKey);
                        _this.render(valueKey);
                    }
                    var btnCloseList = $_1("btnCloseList");
                    btnCloseList.onclick = function () {
                        listStaffs.classList.toggle("hidden");
                        keySearchStaff.value = "";
                        keySearchStaff.focus();
                    };
                };
                btnDel.onclick = function () {
                    listStaffs.classList.toggle("hidden");
                    if (keyDelStaff.value) {
                        var valueKeyDel = _this.delete(keyDelStaff.value);
                        console.log(valueKeyDel);
                        _this.render(valueKeyDel);
                    }
                    var btnCloseList = $_1("btnCloseList");
                    btnCloseList.onclick = function () {
                        listStaffs.classList.toggle("hidden");
                        keyDelStaff.value = "";
                        keyDelStaff.focus();
                    };
                };
            }
        };
    })();
    app.init();
}
