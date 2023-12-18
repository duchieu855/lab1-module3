
    {
        interface staff {
        id: number;
        name: string;
        regency: string;
        totalSalary : number;
        tax: number;
    }

    const $ = document.getElementById.bind(document);
    const $$ = document.querySelector.bind(document);

    
    
    
    
    
    
    
    
    const app = (() => {
        const form1 = $("form1");
        form1.onsubmit = (e:any) => {
            e.preventDefault();
        }

        const btnAddStaff = $("btnAddStaff");
        const btnShowStaffs = $("btnShowStaffs");
        const btnSearch = $("btnSearch");
        const btnDel = $("btnDel");
        const btnSortStaffs = $("btnSortStaffs");
        const btnFix = $("btnFix");
        const btnTopSalary = $("btnTopSalary");


        const listStaffs = $("listStaffs");
        const formInput = $("formInput");
        const staffs : Array<staff> = [];
        const staff : staff= {id:0,name:"",regency:"",totalSalary:0, tax: 0};
        const idStaff  = $("idStaff");
        const nameStaff = $("nameStaff");
        const regencyStaff = $("regencyStaff");
        const addStaff = $("addStaff");
        const fixStaff = $("fixStaff");
        const tBodyStaff = $("tBodyStaffs");
        const keySearchStaff = $("keySearchStaff");
        const keyDelStaff = $("keyDelStaff");
        const keyFixStaff = $("keyFixStaff");


        return {
            add() {
                
                if ((addStaff.classList.contains("hidden"))&&!(fixStaff.classList.contains("hidden"))) {
                    fixStaff.classList.add("hidden");
                    addStaff.classList.remove("hidden");
                }
                
                addStaff.onclick = () => {

                    staff.id = idStaff.value;
                    staff.name = nameStaff.value;
                    staff.regency = regencyStaff.value;
                    // console.log (this.totalSalaryStaff(staff.regency.toLowerCase()));
                    [staff.totalSalary , staff.tax] = this.totalSalaryStaff(staff.regency.toLowerCase());
                    staffs.push({...staff});
                    console.log(staff,staffs);
                    idStaff.value = null;
                    nameStaff.value = null;
                    regencyStaff.value = null;
                    idStaff.focus();
                    
                }

                
            },
            fix(key : number) {
                if (!(addStaff.classList.contains("hidden"))&&(fixStaff.classList.contains("hidden"))) {
                    fixStaff.classList.remove("hidden");
                    addStaff.classList.add("hidden");
                }
                const indexStaffFix = staffs.findIndex((element : staff) => element.id === key);
                
                    console.log("indexStaffFix",indexStaffFix);
                    idStaff.value = staffs[indexStaffFix].id;
                    nameStaff.value = staffs[indexStaffFix].name;
                    regencyStaff.value = staffs[indexStaffFix].regency;
                    fixStaff.onclick = () => {
                        staffs[indexStaffFix].id = idStaff.value;
                        staffs[indexStaffFix].name = nameStaff.value;
                        staffs[indexStaffFix].regency = regencyStaff.value;
                        [staffs[indexStaffFix].totalSalary , staffs[indexStaffFix].tax] = this.totalSalaryStaff(staffs[indexStaffFix].regency.toLowerCase());

                        formInput.classList.toggle("hidden");
                        keyFixStaff.value = "";
                        keyFixStaff.focus();
                    }
                
            },
            findTopSalary () {
                const lengthStaffs = staffs.length;
                if (lengthStaffs >= 5) {
                    const newStaffs = ([...staffs].sort((a,b) => a.totalSalary - b.totalSalary));

                    return newStaffs.splice(lengthStaffs - 6 ,5);
                }
            },
            findID (key:number) {
                
                return [staffs.find((element:staff) => element.id === key)];
            },
            delete(key:number){
                const indexStaffDel = staffs.findIndex((element : staff) => element.id === key);
                // console.log(indexStaffDel);
                const newStaffs = [...staffs]
                newStaffs.splice(indexStaffDel,1);
                // console.log(newStaffs);
                return newStaffs;
            },
            sortID (array : staff[]) { 
                const array2 = [...array];

                return array2.sort((a,b)=> a.id - b.id);
            },
            totalSalaryStaff (regencyStaff : string) : number[] {
                const basicSalary : number = 8500000;
                const employee  = ["developer", "tester", "human resource", "accountant", "corporate branding"];
                const manager  = ["project manager", "engineering manager", "human resources manager", "accountant manager", "corporate branding manager"];
                const BUHead : string = "business unit head";
                let salary : number = 0;
                let tax : number = 0;
                if (regencyStaff == "") {
                    return [salary,tax];

                }
                if (regencyStaff == BUHead) {
                    salary  = basicSalary * 1.3;
                } else if (employee.includes(regencyStaff)) {
                    salary  = basicSalary;
                } else if(manager.includes(regencyStaff)) {
                    salary = basicSalary * 1.2;
                } else {
                    salary  = basicSalary * 1.5;
                }
                
                if (salary >= 9000000 && salary <= 12000000) {
                    tax = salary * 0.1;
                } else if ( salary > 12000000) {
                    tax = salary * 0.12;
                } else {
                    tax = 0
                }
               
                return [salary,tax] ;
                
            }
            ,
            render(elements : Array <staff>){ 
                // console.log(tBodyStaff)
                tBodyStaff.innerHTML = "";
                if (elements) {
                    elements.forEach((e:staff) => {
                        const row = tBodyStaff.insertRow(-1);
                        row.insertCell(0).innerHTML = e.id;
                        row.insertCell(1).innerHTML = e.name;
                        row.insertCell(2).innerHTML = e.regency;
                        row.insertCell(3).innerHTML = e.totalSalary;
                        row.insertCell(4).innerHTML = e.tax;
                    
                    })
                }

            },
            init() {

                btnAddStaff.onclick = () => {
                    listStaffs.classList.add("hidden");
                    formInput.classList.toggle("hidden");
                    this.add();
                    const btnCloseForm = $("btnCloseForm");
                    btnCloseForm.onclick = ()=> {
                        formInput.classList.toggle("hidden");
                    }
                }

                btnShowStaffs.onclick = ()=> {
                    listStaffs.classList.toggle("hidden");
                    this.render(staffs);
                    const btnCloseList = $("btnCloseList");
                    btnCloseList.onclick = ()=> {
                        listStaffs.classList.toggle("hidden");
                    }
                }

                btnSearch.onclick = () => {
                    listStaffs.classList.toggle("hidden");
                    if (keySearchStaff.value) {
                        const valueKey = this.findID(keySearchStaff.value);
                        // console.log(valueKey);
                        this.render(valueKey);
                    }
                    const btnCloseList = $("btnCloseList");
                    btnCloseList.onclick = ()=> {
                        listStaffs.classList.toggle("hidden");
                        keySearchStaff.value = "";
                        keySearchStaff.focus();
                    }
                }

                btnDel.onclick = () => {
                    listStaffs.classList.toggle("hidden");
                    if (keyDelStaff.value) {
                        const valueKeyDel = this.delete(keyDelStaff.value);
                        console.log(valueKeyDel);
                        this.render(valueKeyDel);
                    }
                    const btnCloseList = $("btnCloseList");
                    btnCloseList.onclick = ()=> {
                        listStaffs.classList.toggle("hidden");
                        keyDelStaff.value = "";
                        keyDelStaff.focus();
                    }
                }
                
                btnSortStaffs.onclick = () => {
                    listStaffs.classList.toggle("hidden");
                    const newStaffs = this.sortID(staffs);
                    console.log(newStaffs);
                    this.render(newStaffs);
                    const btnCloseList = $("btnCloseList");
                    btnCloseList.onclick = ()=> {
                        listStaffs.classList.toggle("hidden");
                    }
                }

                btnFix.onclick = () => {
                    listStaffs.classList.add("hidden");
                    formInput.classList.toggle("hidden");
                    console.log(keyFixStaff.value);
                    this.fix(keyFixStaff.value);
                    const btnCloseForm = $("btnCloseForm");
                    btnCloseForm.onclick = ()=> {
                        formInput.classList.toggle("hidden");
                        keyFixStaff.value = "";
                        keyFixStaff.focus();
                    }
                }

                btnTopSalary.onclick = () => {
                    listStaffs.classList.toggle("hidden");
                    const topStaffs = this.findTopSalary();
                    console.log(topStaffs);
                    this.render(topStaffs);
                    const btnCloseList = $("btnCloseList");
                    btnCloseList.onclick = ()=> {
                        listStaffs.classList.toggle("hidden");
                    }
                }





            }
        }
    })();


    app.init();







}