var exec = require('child_process').exec,
   async = require('async'),
   util = require('util'),
   _ = require('lodash');

var mergedOptions = {};

var defaultOptions = {
   update: false,
   plugins: (function() {
      var parentPackge = require('../package.json');
      if(typeof parentPackge.vagrantPlugins !== "undefined") {
         return parentPackge.vagrantPlugins;
      }
      return [];
   })()
};

function pluginCommand(command) {
   return function installPlugin(plugin, cb) {
      var version = mergedOptions.plugins[plugin];
      var initialCmd = command + ' ' + plugin;
      var cmd = version === "*" ? initialCmd : initialCmd + " --plugin-version=" + version;

      exec(cmd, cb)
         .stdout.on("data", function(chunk) {
            util.log(chunk.trim());
         });
   };
}

function mergeOptionsWithDefaults(options) {
   return _.extend(defaultOptions, options);
}

module.exports = function(options) {
   mergedOptions = _.cloneDeep(mergeOptionsWithDefaults(options));

   if (!mergedOptions.update) {
      async.eachSeries(Object.keys(mergedOptions.plugins), pluginCommand('vagrant plugin install'));
   } else {
      async.eachSeries(mergedOptions.plugins, pluginCommand('vagrant plugin update'));
   }
}