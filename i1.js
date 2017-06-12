var EmployeeDetailForm = Backbone.View.extend({
  tagName: "div",
  events: {
    "click .next": "nextClicked"
  },
  initialize: function(resolve) {
    this.resolve = resolve;
  },
  nextClicked: function(e) {
    e.preventDefault();
    var data = {
      name: this.$("#name").val(),
      email: this.$("#email").val()
    };
    var employee = new Employee(data);
    console.log("Calling this.resolve");
    this.resolve(employee, "next");
  },
  template: _.template($("#emplFormTemplate").html()),
  model: Employee,
  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});

var SelectManagerForm = Backbone.View.extend({
  events: {
    "click .save": "saveClicked"
  },
  initialize: function(options) {
    this.model = options.model;
    this.resolve = options.resolve;
  },
  saveClicked: function(e) {
    e.preventDefault();

    var managerId = this.$("#manager").val();
    console.log("managerId="+managerId);
    this.model.set({ managerId: managerId }); 
    console.log(JSON.stringify(this.model.toJSON()));
    console.log("Calling this.resolve in saveClicked()");
    this.resolve(this.model, "save");
  },
  template: _.template($("#managerFormTemplate").html()),
  model: Employee,
  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});

var Employee = Backbone.Model.extend({});

var orgChart = {
  getEmployeeDetail: function(resolve, reject) {
    return new Promise(function(resolve, reject) {
       var form = new EmployeeDetailForm(resolve);
       form.render();
       $("#wizard").html(form.el);
    });
  },
  problem: () => { console.log("PROBLEM!!!"); },
  addNewEmployee: function() {
    let nextStep = (employee, buttonName) => {
        console.log("nextStep: employee.save()");
	console.log("buttonName="+buttonName);
        console.log(JSON.stringify(employee.toJSON()));
    };
    var employeeDetail = this.getEmployeeDetail(nextStep, this.problem);
    employeeDetail.then((e) => {
      console.log(JSON.stringify(e.toJSON()));
      let sm = this.selectManager(e, nextStep);
      sm.then((e) => {
        console.log("In sm.then:");
        console.log(JSON.stringify(e.toJSON()));
      });
      console.log("Done with employeeDetail.THEN function.");
    });
  },
  selectManager: function(employee, nextStep) {
    return new Promise(function(nextStep, problem) {
    	var form = new SelectManagerForm({ model: employee, resolve: nextStep });
    	form.render();
    	$("#wizard").html(form.el);
    });
  }
};

$(document).ready(function() {
  orgChart.addNewEmployee();
});
