angular.module('FourCornersEditor').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ng-templates/backstory.html',
    "<legend>Backstory</legend>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"backstory-text\">Story</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <textarea type=\"text\"\n" +
    "                  id=\"backstory-text\"\n" +
    "                  class=\"form-control\" rows=\"10\" placeholder=\"Text of the story\"\n" +
    "                  ng-model=\"backStory.text\"></textarea>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"backstory-author\">Author</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <input type=\"text\"\n" +
    "               id=\"backstory-author\"\n" +
    "               class=\"form-control\" placeholder=\"Name of the author of the story\"\n" +
    "                ng-model=\"backStory.author\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"backstory-magazine\">Magazine</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <input type=\"text\"\n" +
    "               id=\"backstory-magazine\"\n" +
    "               class=\"form-control\" placeholder=\"Name of the magazine\"\n" +
    "                ng-model=\"backStory.magazine\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"backstory-date\">Date</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <datepicker date-format=\"{{dateFormat}}\">\n" +
    "            <input type=\"text\"\n" +
    "                   id=\"backstory-date\"\n" +
    "                   class=\"form-control\" ng-model=\"backStory.date\" placeholder=\"Date of publication\">\n" +
    "        </datepicker>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"backstory-url\">URL</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <input type=\"text\"\n" +
    "               id=\"backstory-url\"\n" +
    "               class=\"form-control\" placeholder=\"Story's URL\" ng-model=\"backStory.url\">\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('ng-templates/context.html',
    "<legend>Context</legend>\n" +
    "<div class=\"form-subgroup\" ng-repeat=\"context in contextSources\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <button type=\"button\" class=\"close\" title=\"Remove\"\n" +
    "                    ng-click=\"removeContext(context)\">&times;</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label class=\"control-label col-sm-3\" for=\"context-type-{{$index}}\">Source type</label>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <select id=\"context-type-{{$index}}\"\n" +
    "                    class=\"form-control\" ng-options=\"item as item for item in sourceTypes track by item\"\n" +
    "                    ng-model=\"context.sourceType\">\n" +
    "                <option>Image</option>\n" +
    "                <option>Youtube</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label class=\"control-label col-sm-3\" for=\"context-source-{{$index}}\"\n" +
    "               ng-show=\"context.sourceType == sourceTypes[0]\">Image source</label>\n" +
    "        <label class=\"control-label col-sm-3\" for=\"context-source-{{$index}}\"\n" +
    "               ng-show=\"context.sourceType == sourceTypes[1]\">YouTube video Id</label>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <input type=\"text\"\n" +
    "                   id=\"context-source-{{$index}}\"\n" +
    "                   class=\"form-control\"\n" +
    "                   placeholder=\"{{context.getPlaceholder()}}\"\n" +
    "                   ng-model=\"context.source\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label class=\"control-label col-sm-3\" for=\"context-credit-{{$index}}\">Credit</label>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <input type=\"text\"\n" +
    "                   id=\"context-credit-{{$index}}\"\n" +
    "                   class=\"form-control\" placeholder=\"Name of a photographer or a journal\"\n" +
    "                   ng-model=\"context.credit\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <div class=\"col-sm-9 col-sm-offset-3\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"addContext()\">\n" +
    "            Add source\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('ng-templates/creative-commons.html',
    "<legend>Creative commons</legend>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"creative-commons-owner\">Copyright</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-8\">\n" +
    "                <input type=\"text\"\n" +
    "                       id=\"creative-commons-owner\"\n" +
    "                       class=\"form-control\" placeholder=\"Name of the copyright owner\"\n" +
    "                       ng-model=\"creativeCommons.ccOwnerName\">\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Year\"\n" +
    "                        ng-model=\"creativeCommons.ccYear\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"creative-commons-ethics\">Code of ethics</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <textarea id=\"creative-commons-ethics\"\n" +
    "                  class=\"form-control\" placeholder=\"\" rows=\"4\"\n" +
    "                  ng-model=\"creativeCommons.codeOfEthics\"></textarea>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-3\" for=\"creative-commons-description\">Description</label>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "        <textarea id=\"creative-commons-description\"\n" +
    "                  class=\"form-control\" placeholder=\"Short description of the photo\" rows=\"4\"\n" +
    "                  ng-model=\"creativeCommons.description\"></textarea>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('ng-templates/links.html',
    "<legend>Links</legend>\n" +
    "<div class=\"form-subgroup\" ng-repeat=\"link in links\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <button type=\"button\" class=\"close\" title=\"Remove\"\n" +
    "                    ng-click=\"removeLink(link)\">&times;</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label class=\"control-label col-sm-3\" for=\"link-title-{{$index}}\">Title</label>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <input type=\"text\"\n" +
    "                   id=\"link-title-{{$index}}\"\n" +
    "                   class=\"form-control\" placeholder=\"Title of a story\"\n" +
    "                   ng-model=\"link.title\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label class=\"control-label col-sm-3\" for=\"link-url-{{$index}}\">URL</label>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <input type=\"text\"\n" +
    "                   id=\"link-url-{{$index}}\"\n" +
    "                   class=\"form-control\" placeholder=\"http://example.com/story.html\"\n" +
    "                   ng-model=\"link.url\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <div class=\"col-sm-9 col-sm-offset-3\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"addLink()\">\n" +
    "            Add link\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('ng-templates/ng-yaml-reader.html',
    "<div class=\"file-reader\" ng-show=\"visible\">\n" +
    "    <div class=\"file-reader-caption\">\n" +
    "        Edit existing YAML file by dropping it here or click to browse\n" +
    "    </div>\n" +
    "    <input type=\"file\">\n" +
    "</div>"
  );

}]);
