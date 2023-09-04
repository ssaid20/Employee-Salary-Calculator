$(document).ready(function () {

    // Variable to track total monthly cost of all salaries
    let totalMonthlyCost = 0;

    // Event listener for form submission
    $("#employeeForm").on("submit", function (event) {
        // Prevent form from refreshing the page
        event.preventDefault();

        // Gather input values into an employee object
        let employee = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            idNumber: $("#idNumber").val(),
            jobTitle: $("#jobTitle").val(),
            annualSalary: parseFloat($("#annualSalary").val()) 
        };

        // Add employee to the table and update the total cost
        appendEmployeeToList(employee);
        calculateTotalMonthlyCost(employee.annualSalary);

        // Clear the form fields
        $("#employeeForm").trigger("reset");
    });

    // Event listener for delete button clicks
    $(document).on("click", ".deleteBtn", function () {
        // Get the annual salary from the row being deleted
        let salary = $(this).closest("tr").data("salary");
        
        // Delete the row
        $(this).closest("tr").remove();
        
        // Update total cost after removal
        calculateTotalMonthlyCost(-salary);
    });

    // Function to add employee data to the table
    function appendEmployeeToList(employee) {
        $("#employeeList").append(`
            <tr data-salary="${employee.annualSalary}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.annualSalary}</td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `);
    }

    // Function to update the displayed total monthly cost
    function calculateTotalMonthlyCost(annualSalary) {
        totalMonthlyCost += annualSalary / 12;
        $("#totalMonthlyCost").text(totalMonthlyCost.toFixed(2));

        // Add/remove a CSS class based on the cost threshold
        if (totalMonthlyCost > 20000) {
            $("#totalMonthlyCost").addClass("exceedCost");
        } else {
            $("#totalMonthlyCost").removeClass("exceedCost");
        }
    }
});