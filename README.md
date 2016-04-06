
# Node Vagrant Plugins

```
npm install @gx/vagrant-plugins
```

A module that installs vagrant plugins listed in your package.json **Requires Vagrant >= 1.7.4**

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
var vp = require('@gx/vagrant-plugins');

gulp.task('install', function () {
    vp();
});
```


