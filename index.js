/*jslint node: true, white: true, nomen: true, plusplus: true, sloppy: true*/

var fs = require("fs"),
    Handlebars = require("handlebars");
    moment = require("moment");

Handlebars.registerHelper("stripHttp", function(website) {
  return website.replace(/https?:\/\/(www\.)?/gi, "");
});

function GetSortOrder(prop, reverse = true){
   reverse = reverse ? -1 : 1;
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1 * reverse;
      }else if( a[prop] < b[prop] ){
          return -1 * reverse;
      }
      return 0;
   }
}

function getFormattedDate(date, date_format) {
    var DATE_FORMAT_INPUT = 'YYYY-MM-DD'; // resume.json standard date format
    date_format = date_format || config.date_format; // output format

    return moment(date, DATE_FORMAT_INPUT).format(date_format);
}

/**
 * Render the Handlebars template
 * @param   {object} resume
 * @returns {object}
 */
function render(resume) {

    var css = fs.readFileSync(__dirname + "/style.css", "utf-8"),
        template = fs.readFileSync(__dirname + "/resume.hbs", "utf-8"),
        SORT_KEYWORDS = false,
        SORT_WORK_BY_ENDDATE = true,
        CLEAN_DATES = true;

    /**
     * Validates an array
     * @param   {Array}   arr
     * @returns {boolean}
     */
    function validateArray(arr) {
        var retVal = false;

        try {
            if (arr !== undefined &&
                arr !== null &&
                arr instanceof Array &&
                arr.length > 0) {
                retVal = true;
            }
        } catch (e) {
            console.warn(e.message);
        }

        return retVal;
    }

    // Sort work by endDate
    if (SORT_WORK_BY_ENDDATE) {
        resume.work.sort(GetSortOrder("endDate"));
    }

    if (CLEAN_DATES) {
        // Modify the dates for education
        if (validateArray(resume.education)) {
            resume.education.forEach(function (block) {
                block.startDate = getFormattedDate(block.startDate, "YYYY");
                block.endDate = getFormattedDate(block.endDate, "YYYY");
            });
        }

        // Modify the dates for military
        if (validateArray(resume.military)) {
            resume.military.forEach(function (block) {
                block.startDate = getFormattedDate(block.startDate, "YYYY");
                block.endDate = getFormattedDate(block.endDate, "YYYY");
            });
        }

        // Modify the dates for volunteering
        if (validateArray(resume.volunteer)) {
            resume.volunteer.forEach(function (block) {
                block.startDate = getFormattedDate(block.startDate, "YYYY");
                block.endDate = getFormattedDate(block.endDate, "YYYY");
            });
        }

        // Modify the dates for work
        if (validateArray(resume.work)) {
            resume.work.forEach(function (block) {
                block.startDate = getFormattedDate(block.startDate, "MMM YYYY");
                block.endDate = getFormattedDate(block.endDate, "MMM YYYY");
            });
        }

        // Modify the dates for publications
        if (validateArray(resume.publications)) {
            resume.publications.forEach(function (block) {
                block.releaseDate = getFormattedDate(block.releaseDate, "YYYY");
            });
        }
      
        // Modify the dates for presentations
        if (validateArray(resume.presentations)) {
            resume.presentations.forEach(function (block) {
                block.date = getFormattedDate(block.date, "YYYY-MM-DD");
            });
        }

        // Modify the dates for awards
        if (validateArray(resume.awards)) {
            resume.awards.forEach(function (block) {
                block.date = getFormattedDate(block.date, "MMM YYYY");
            });
        }

        // Modify the dates for certifications
        if (validateArray(resume.certifications)) {
            resume.certifications.forEach(function (block) {
                block.startDate = getFormattedDate(block.startDate, "MMM YYYY");
                block.endDate = getFormattedDate(block.endDate, "MMM YYYY");
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
