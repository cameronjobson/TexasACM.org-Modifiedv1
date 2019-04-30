// Use of this Script Requires the Tabletop.js Library. The Calling HTML File must include tabletop.js

// Address of the Google Sheets Database
var public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1wwobshcqPMDMPzTL9G1k2cT6bHfVnyw2He2gCFcuBxI/edit?usp=sharing";

// Column Names from Google Sheets Database
let nameColumn = "Name\n(Must be 1 word)";
let embedColumn = "Embed in ACM\n(Default value [blank] yes)";
let addressColumn = "Address\n(include http:// if external link)";

window.addEventListener("DOMContentLoaded", init)	// Calls method init when Sheets has loaded

function init() {
	// Tabletop.init( { key: public_spreadsheet_url,
  //                callback: showInfo,
  //                simpleSheet: true } );
								 showInfo(getStaticJSON())
}

// Static JSON handmade from Google Sheets
function getStaticJSON() {
	var data = [
		{
			[nameColumn]: "Complaints",
			[embedColumn]: "",
			[addressColumn]: "https://goo.gl/forms/07t1rhkUpK77FZIP2"
		},
		{
			[nameColumn]: "Join",
			[embedColumn]: "",
			[addressColumn]: "https://docs.google.com/forms/d/e/1FAIpQLSdgl_Y7VuPky6aZQYwOUT9wxkK8jqyVOJg-1IjtzEmDvwkG4A/viewform"
		},
		{
			[nameColumn]: "Lockers",
			[embedColumn]: "",
			[addressColumn]: "https://goo.gl/forms/5ngqB7zAbpQ1J0j82"
		},
		{
			[nameColumn]: "PC",
			[embedColumn]: "No",
			[addressColumn]: "https://docs.google.com/forms/d/1bYpQkwchxqzNPtqHAAOkT0CuN9H5bpQmUKscGRsR5hk/viewform"
		},
		{
			[nameColumn]: "SignIn",
			[embedColumn]: "No",
			[addressColumn]: "https://goo.gl/forms/nEYLjA34n5tiB7GG3"
		},
		{
			[nameColumn]: "Wishlist",
			[embedColumn]: "No",
			[addressColumn]: "https://docs.google.com/forms/d/e/1FAIpQLSdmLnUuBDVyFzzkLEbYGWpR0L1pqAJyK9kfRn-RCZUgTtHMtg/viewform"
		},
		{
			[nameColumn]: "Tubing",
			[embedColumn]: "",
			[addressColumn]: "https://docs.google.com/forms/d/e/1FAIpQLSc72bY8m0e_5Fp18uZlIaLjv-xfuQHXBf9yJvM4f4A9mWS5rg/viewform"
		}
	];
	// console.log(data)
	return data
}

// Method that gets called when data has been pulled from Google Sheets
function showInfo(data) {
	let desiredForm = getQueryString();
	var index = indexOfDesiredForm(data, desiredForm);

	// If the desired form doesn't exist, or no form is selected as desired
	if (index == -1) {
		var content = "";
		// If user wants to select a form, but form doesn't exist in Database, say 'Form not found.'
		if (desiredForm != "") {
			content += "<p>The form <strong>" + desiredForm + "</strong> cannot be found. Here is a list of all forms:</p>";
		}
		content += buildAllForms(data);
		document.getElementById("dynamic").innerHTML = content;
		document.title = "All Forms | Texas ACM";
	}

	// If the desired form exists in Database
	else {
		showForm(data[index]);
	}
}

function indexOfDesiredForm(data, desiredForm) {
	var index = 0;
	if (desiredForm != "") {
		for (var index = 0; index < data.length; ++index) {
			if (data[index][nameColumn].toLowerCase() == desiredForm.toLowerCase()) {
				return index;
			}
		}
	}
	return -1;
}

function buildAllForms(data) {
	var content = "<h1 id='forms-h1'>Forms</h1>";
	content += "<div id='forms-table-div'>";
	content += "<table id='forms-table'><tr><th>List of Available Forms</th></tr>"

	data.forEach(form => {
		content += "<tr><td><a href='forms.html?" + form[nameColumn] + "'>" + form[nameColumn] + "</a></td></tr>";
	});
	content += "</table>";

	// Edit button under the table
	content += "<a href='" + public_spreadsheet_url + "'><button class='button admin'>Edit Forms List</button></a>";

	content += "</div>";
	return content;
}

// Get the part of the URL after the question mark in URL.
function getQueryString() {
	var result = "";
	if ((window.location.href).indexOf("?") > 0) {
		result = (window.location.href).substring((window.location.href).indexOf("?") + 1 );
	}
	return result;
}

function showForm(form) {
	// If no address is available for, display Unavailable
	if (form[addressColumn] == "") {
		document.getElementById("dynamic").innerHTML = "<h1>Sorry, the form <strong>" + form[nameColumn] + "</strong> is not available</h1><p>The ACM staff has not specified the form " + form[nameColumn] +"'s address. Please notify an officer and try again later. Thanks</p>";
		document.title = "Form not available | Texas ACM";
	}
	else {
		window.location.replace(form[addressColumn]);
	}
}
