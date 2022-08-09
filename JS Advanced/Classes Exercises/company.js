class Company {
    constructor() {
        this.departments = {};
    }
    addEmployee(name, salary, position, department) {
        if (
            !name ||
            !position ||
            !department ||
            salary < 0 ||
            salary === undefined ||
            salary === null ||
            salary === ''
        ) {
            throw new Error('Invalid input!');
        } else {
            if (!this.departments.hasOwnProperty(department)) {
                this.departments[department] = {};
            }
            this.departments[department][name] = { salary, position };
            return `New employee is hired. Name: ${name}. Position: ${position}`;
        }
    }
    bestDepartment() {
        let avrSalary = 0;
        let currentAvgSalary = [];
        let bestDep = '';
        for (const department in this.departments) {
            Object.values(this.departments[department]).forEach((x) => currentAvgSalary.push(x.salary));
            currentAvgSalary = currentAvgSalary.reduce((a, c) => a + c, 0) / currentAvgSalary.length;
            if (avrSalary < currentAvgSalary) {
                avrSalary = currentAvgSalary;
                bestDep = department;
            }
            currentAvgSalary = [];
        }
        let result = `Best Department is: ${bestDep}\nAverage salary: ${avrSalary.toFixed(2)}`;
        Object.entries(this.departments[bestDep])
            .sort((a, b) => b[1].salary - a[1].salary || a[0].localeCompare(b[0]))
            .forEach((x) => (result += `\n${x[0]} ${x[1].salary} ${x[1].position}`));
        return result;
    }
}

let c = new Company();
c.addEmployee('Stanimir', 2000, 'engineer', 'Construction');
c.addEmployee('Pesho', 1500, 'electrical engineer', 'Construction');
c.addEmployee('Slavi', 500, 'dyer', 'Construction');
c.addEmployee('Stan', 2000, 'architect', 'Construction');
c.addEmployee('Stanimir', 1200, 'digital marketing manager', 'Marketing');
c.addEmployee('Pesho', 1000, 'graphical designer', 'Marketing');
c.addEmployee('Gosho', 1350, 'HR', 'Human resources');
console.log(c.bestDepartment());
