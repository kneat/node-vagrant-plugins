var exec = require('child_process').exec,
    async = require('async'),
    util = require('util'),
    _ = require('lodash');

function pluginCommand(command) {
   return function installPlugin(plugin, cb) {
      var version = plugins[plugin];
      var initialCmd = command + ' ' + plugin;
      var cmd = version === "*" ? initialCmd : initialCmd + " --plugin-version=" + version;
      
      exec(cmd, cb)
         .stdout.on("data", function(chunk){
            util.log(chunk.trim());
         });
   };
}

function mergeOptionsWithDefaults(options) {
   return _.extend(defaultOptions, options);
}

var defaultOptions = {
   update: false,
   plugins: require('./package.json').vagrantPlugins
}

module.exports = function(options) {
   var mergedOptions = _.cloneDeep(mergeOptionsWithDefaults(options));
   
   if(!mergedOptions.update) {
      async.eachSeries(Object.keys(options.plugins), pluginCommand('vagrant plugin install'));
   } else {
      async.eachSeries(options.plugins, pluginCommand('vagrant plugin update'));
   }
}