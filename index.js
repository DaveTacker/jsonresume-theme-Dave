/*jslint node: true, white: true, nomen: true, plusplus: true, sloppy: true*/

var fs = require("fs"),
    Handlebars = require("handlebars");

/**
 * Render the Handlebars template
 * @param   {object} resume
 * @returns {object}
 */
function render(resume) {

    var css = fs.readFileSync(__dirname + "/style.css", "utf-8"),
        template = fs.readFileSync(__dirname + "/resume.hbs", "utf-8"),
        SORT_KEYWORDS = true,
        CLEAN_DATES = true;

    /**
     * Validates an array
     * @param   {Array}   arr
     * @returns {boolean}
     */
    function validateArray(arr) {
        return arr !== undefined && arr !== null && arr instanceof Array && arr.length > 0;
    }

    /**
     * Format a date string to return just the year
     * @param   {string} date
     * @returns {string}
     */
    function formatDate(date, format) {
        if (date.length === 0) {
            return "";
        }

        var retVal = "",
            d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        if (format === 0) {
            retVal = year;
        } else if (format === 1) {
            retVal = month + "/" + year;
        } else {
            return day + "/" + month + "/" + year;
        }

        return retVal;
    }


    if (CLEAN_DATES) {
        // Modify the dates for education
        if (validateArray(resume.education)) {
            resume.education.forEach(function (block) {
                block.startDate = formatDate(block.startDate, 0);
                block.endDate = formatDate(block.endDate, 0);
            });
        }

        // Modify the dates for volunteering
        if (validateArray(resume.volunteer)) {
            resume.volunteer.forEach(function (block) {
                block.startDate = formatDate(block.startDate, 0);
                block.endDate = formatDate(block.endDate, 0);
            });
        }

        // Modify the dates for work
        if (validateArray(resume.work)) {
            resume.work.forEach(function (block) {
                block.startDate = formatDate(block.startDate, 1);
                block.endDate = formatDate(block.endDate, 1);
            });
        }
    }


    // Sort the keywords for varying areas.
    if (SORT_KEYWORDS && validateArray(resume.skills)) {
        resume.skills.forEach(function (skill) {
            skill.keywords.sort();
        });
    }

    return Handlebars.compile(template)({
        css: css,
        resume: resume
    });
}

module.exports = {
    render: render
};
