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
  getEmployeeDetail: function(resolve, reject) {
    return new Promise(function(resolve, reject) {
       var form = new EmployeeDetailForm(resolve);
       form.render();
       $("#wizard").html(form.el);
    });
  },

  addNewEmployee: function() {
    let problem = () => { console.log("PROBLEM!!!"); };
    let nextStep = (employee, buttonName) => {
        console.log("nextStep: employee.save()");
	console.log("buttonName="+buttonName);
        console.log(JSON.stringify(employee.toJSON()));
    };
    var employeeDetail = this.getEmployeeDetail(nextStep, problem);
    console.log("About to block on employeeDetail.then....");
    employeeDetail.then((e) => {
    console.log(JSON.stringify(e.toJSON()));
    console.log("Done with THEN clause.");
    });
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
