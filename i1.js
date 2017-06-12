var EmployeeDetailForm = Backbone.View.extend({
  tagName: "div",
  events: {
    "click .next": "nextClicked"
  },
  initialize: function(resolve) {
    this.resolve = resolve;
    //console.log("initizlize, set this.resolve=" + resolve);
    //console.log(resolve);
  },
  nextClicked: function(e) {
    e.preventDefault();
    var data = {
      name: this.$("#name").val(),
      email: this.$("#email").val()
    };
    //console.log("nextClicked() data=" + JSON.stringify(data));
    var employee = new Employee(data);
    //console.log("nextClicked() employee=" + JSON.stringify(employee.toJSON()));
    //console.log(this.resolve);
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

  saveClicked: function(e) {
    e.preventDefault();

    var managerId = this.$(".manager").val();
    this.model.set({ managerId: managerId });

    this.model.save();
    // do something to close the wizard and move on
  },
  render: function() {}
});

var Employee = Backbone.Model.extend({});

var orgChart = {
  addNewEmployee: function() {
    let problem = () => { console.log("PROBLEM!!!"); };
    let nextStep = (employee, buttonName) => {
      console.log("nextStep: employee.save()");
	console.log(buttonName);
	console.log(employee);
      console.log(JSON.stringify(employee.toJSON()));
      //console.log('nextClicked() employee='+JSON.stringify(employee.toJSON()));
      //var managerSelector = this.selectManager(employee);
      //managerSelector.on("save",function(employee) {
      // employee.save();
    };
    var employeeDetail = this.getEmployeeDetail(nextStep, problem);
    employeeDetail.then((e, bn) => {
      console.log("in THEN bn=" + bn);
      console.log(e);
      console.log(JSON.stringify(e.toJSON));
      /// TODO: Get manager assignment
    });
  },

  getEmployeeDetail: function(resolve, reject) {
    var form = new EmployeeDetailForm(resolve);
    form.render();
    $("#wizard").html(form.el);
    return new Promise(resolve, reject);
  },

  selectManager: function(employee) {
    var form = new SelectManagerForm({ model: employee });
    form.render();
    $("#wizard").html(form.el);
    return form;
  }
};

$(document).ready(function() {
  orgChart.addNewEmployee();
});
