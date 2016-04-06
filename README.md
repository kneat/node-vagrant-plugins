
# Node Vagrant Plugins

A module that installs vagrant plugins listed in your package.json **Requires Vagrant**

```
npm install vagrant-plugins
```

### Example:
Add a key to your ```package.json``` called ```"vagrantPlugins"```.
```
"vagrantPlugins": {
    "vagrant-aws": "*",
    "vagrant-aws-winrm": "0.0.3",
    "vagrant-env": "*",
    "vagrant-vsphere": "*"
 }
```

Gulp examaple:
```
var gulp = require('gulp');
var vp = require('vagrant-plugins');

gulp.task('install', function () {
    vp();
});
```

You can also pass in the plugins you want:
```
var gulp = require('gulp');
var vp = require('vagrant-plugins');

gulp.task('install', function () {
    vp({
        plugins: {
            "vagrant-aws": "*",
            "vagrant-vsphere": "*"
        }
    });
});
```


