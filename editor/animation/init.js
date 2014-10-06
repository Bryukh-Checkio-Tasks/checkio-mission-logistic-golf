//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_212'],
    function (ext, $, Raphael) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var ends = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"]

            options = options || {};
            var is_new_record = options.is_new_record || false;
            var place_rating = String(options.place_rating || 0);
            var best_points = options.best_points || 0;
            var current_points = options.current_points || 0;
            var $div = $("<div></div>");
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div class="result"></div></div>'));
            var $resultDiv = $h.find(".result");
            var $table = $("<table></table>").addClass("numbers");
            if (is_new_record) {
                $resultDiv.addClass("win-sign");
                $resultDiv.append($("<div></div>").text("You beat your best results!"));
                var $tr = $("<tr></tr>");
                $tr.append($("<th></th>").text(best_points));
                $tr.append($("<th></th>").text(place_rating).append($("<span></span>").addClass(".ends").text(ends[Number(place_rating[place_rating.length - 1])])));

                $table.append($tr);
                $tr = $("<tr></tr>");
                $tr.append($("<td></td>").text("Personal best"));
                $tr.append($("<td></td>").text("Place"));
                $table.append($tr);
            }
            else {
                $resultDiv.addClass("norm-sign");
                $resultDiv.append($("<div></div>").text("Your results"));
                $tr = $("<tr></tr>");
                $tr.append($("<th></th>").text(current_points));
                $tr.append($("<th></th>").text(best_points));
                $tr.append($("<th></th>").text(place_rating).append($("<span></span>").addClass(".ends").text(ends[Number(place_rating[place_rating.length - 1])])));

                $table.append($tr);
                $tr = $("<tr></tr>");
                $tr.append($("<td></td>").text("Points"));
                $tr.append($("<td></td>").text("Personal best"));
                $tr.append($("<td></td>").text("Place"));
                $table.append($tr);
            }
            $resultDiv.append($table);
            this_e.setAnimationHeight(255);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            //YOUR FUNCTION NAME
            var fname = 'golf';

            var checkioInput = data.in || 1401;
            var checkioInputStr = fname + '(' + JSON.stringify(checkioInput) + ')';
            var isCall = true;

            var failError = function (dError) {
                if (isCall) {
                    $content.find('.call').html('Fail: ' + checkioInputStr);
                    $content.find('.call').addClass('error');
                }

                $content.find('.output').html(dError.replace(/\n/g, ","));
                $content.find('.output').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
            };

            if (data.error) {
                failError(data.error);
                return false;
            }

            if (data.ext && data.ext.inspector_fail) {
                failError(data.ext.inspector_result_addon);
                $content.find('.call').remove();
                isCall = false;
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: ' + checkioInputStr);
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: ' + checkioInputStr);
                $content.find('.answer').remove();
            }

            var canvas = new SVG($content.find(".explanation")[0]);
            canvas.draw(checkioInput, explanation);


            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//            });
//        });
        function SVG(dom) {

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var cell = 40;
            var radius = cell * 0.4;

            var pad = radius * 1.5;

            var size = pad * 2 + cell * 8;

            var paper = Raphael(dom, size, size);

            var aPoint = {"stroke": colorBlue4, "stroke-width": 2, "fill": colorBlue1};
            var aNumber = {"stroke": colorBlue4, "font-size": radius, "font-family": "Roboto"};
            var aLine = {"stroke": colorBlue4, "stroke-width": 5};
            var aLineX = {"stroke": colorOrange4, "stroke-width": 5};


            this.draw = function (matrix, data) {
                var coordinates = data[0];
                var path = "," + String(data[1]) + ",";

                for (var i = 0; i < coordinates.length; i++) {
                    paper.circle(pad + (coordinates[i][0] - 1) * cell,
                        pad + (coordinates[i][1] - 1) * cell, radius).attr(aPoint);
                    paper.text(pad + (coordinates[i][0] - 1) * cell,
                        pad + (coordinates[i][1] - 1) * cell, i).attr(aNumber);
                }

                for (var r = 0; r < matrix.length; r++) {
                    for (var c = r; c < matrix[r].length; c++) {
                        if (matrix[r][c] != 0) {
                            var p = paper.path([
                                ["M", pad + (coordinates[r][0] - 1) * cell,
                                    pad + (coordinates[r][1] - 1) * cell],
                                ["L", pad + (coordinates[c][0] - 1) * cell,
                                    pad + (coordinates[c][1] - 1) * cell]
                            ]).attr(aLine);
                            if (path.indexOf("," + r + "," + c + ",") !== -1 || path.indexOf("," + c + "," + r + ",") !== -1) {
                                p.attr(aLineX);
                            }
                            p.toBack();
                        }
                    }
                }
            }

        }


//Your Additional functions or objects inside scope
//
//
//


    }
)
;
